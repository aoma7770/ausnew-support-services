import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here

/**
 * Blog posts published via Arvow webhook
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  arvowId: varchar("arvowId", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  slug: varchar("slug", { length: 512 }).notNull().unique(),
  content: text("content").notNull(),
  contentMarkdown: text("contentMarkdown"),
  thumbnail: varchar("thumbnail", { length: 1024 }),
  thumbnailAltText: varchar("thumbnailAltText", { length: 512 }),
  metaDescription: varchar("metaDescription", { length: 512 }),
  keywordSeed: varchar("keywordSeed", { length: 256 }),
  languageCode: varchar("languageCode", { length: 16 }).default("en"),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Lead enquiries submitted via native forms on the website
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 64 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  message: text("message"),
  sourcePage: varchar("sourcePage", { length: 256 }).notNull(),
  ndisNumber: varchar("ndisNumber", { length: 64 }),
  supportType: varchar("supportType", { length: 128 }),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "converted", "not_suitable"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;