import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts, InsertBlogPost, InsertUser, InsertLead, leads, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// ─── Blog Helpers ────────────────────────────────────────────────────────────

export async function upsertBlogPost(post: InsertBlogPost): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(post).onDuplicateKeyUpdate({
    set: {
      title: post.title,
      content: post.content,
      contentMarkdown: post.contentMarkdown,
      thumbnail: post.thumbnail,
      thumbnailAltText: post.thumbnailAltText,
      metaDescription: post.metaDescription,
      keywordSeed: post.keywordSeed,
    },
  });
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: blogPosts.id,
    title: blogPosts.title,
    slug: blogPosts.slug,
    thumbnail: blogPosts.thumbnail,
    thumbnailAltText: blogPosts.thumbnailAltText,
    metaDescription: blogPosts.metaDescription,
    keywordSeed: blogPosts.keywordSeed,
    publishedAt: blogPosts.publishedAt,
  }).from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Leads Helpers ───────────────────────────────────────────────────────────

export async function insertLead(data: Omit<InsertLead, 'id' | 'status' | 'notes' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(leads).values({
    name: data.name,
    phone: data.phone,
    email: data.email,
    message: data.message ?? null,
    sourcePage: data.sourcePage,
    ndisNumber: data.ndisNumber ?? null,
    supportType: data.supportType ?? null,
    status: 'new',
  });
  return { id: (result as any).insertId as number };
}

export type InsertJaniceLead = {
  name: string;
  phone: string;
  email?: string | null;
  sourcePage: string;
  supportType: string;
  leadSummary: string;
  supportDetails?: string | null;
  location?: string | null;
  preferredStartTime?: string | null;
  expectedDuration?: string | null;
  preferredContactTime?: string | null;
  relationshipToParticipant?: string | null;
  ndisPlanStatus?: string | null;
  conversationTranscript: string;
};

export async function insertJaniceLead(data: InsertJaniceLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(leads).values({
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    message: data.leadSummary,
    sourcePage: data.sourcePage,
    supportType: data.supportType,
    sourceType: "janice_chat",
    leadSummary: data.leadSummary,
    supportDetails: data.supportDetails ?? null,
    location: data.location ?? null,
    preferredStartTime: data.preferredStartTime ?? null,
    expectedDuration: data.expectedDuration ?? null,
    preferredContactTime: data.preferredContactTime ?? null,
    relationshipToParticipant: data.relationshipToParticipant ?? null,
    ndisPlanStatus: data.ndisPlanStatus ?? null,
    conversationTranscript: data.conversationTranscript,
    zapierDeliveryStatus: "pending",
    status: "new",
  });

  const id = (result as any).insertId as number;
  const rows = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  if (!rows[0]) throw new Error("Saved Janice lead could not be reloaded");
  return rows[0];
}

export async function updateJaniceZapierDelivery(
  id: number,
  delivery: { status: "delivered"; deliveredAt: Date } | { status: "failed"; error: string }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (delivery.status === "delivered") {
    await db.update(leads).set({
      zapierDeliveryStatus: "delivered",
      zapierDeliveredAt: delivery.deliveredAt,
      zapierError: null,
    }).where(eq(leads.id, id));
    return;
  }

  await db.update(leads).set({
    zapierDeliveryStatus: "failed",
    zapierError: delivery.error.slice(0, 512),
  }).where(eq(leads.id, id));
}

export async function getAllLeads() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}
