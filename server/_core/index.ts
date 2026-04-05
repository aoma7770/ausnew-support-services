import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { upsertBlogPost } from "../db";
import { notifyOwner } from "./notification";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// ─── Fallback Image Mapping ─────────────────────────────────────────────────
// Maps keywords to branded fallback images for all four support areas
// These are used when Arvow does not provide a thumbnail
const FALLBACK_IMAGES: Record<string, string> = {
  // SDA (Specialist Disability Accommodation)
  sda: "/public/fallback-images/fallback_sda.png",
  "specialist disability accommodation": "/public/fallback-images/fallback_sda.png",
  accommodation: "/public/fallback-images/fallback_sda.png",
  housing: "/public/fallback-images/fallback_sda.png",
  
  // SIL (Supported Independent Living)
  sil: "/public/fallback-images/fallback_sil.png",
  "supported independent living": "/public/fallback-images/fallback_sil.png",
  "daily life": "/public/fallback-images/fallback_sil.png",
  "assistance with daily life": "/public/fallback-images/fallback_sil.png",
  "daily living": "/public/fallback-images/fallback_sil.png",
  
  // Community Access
  "community access": "/public/fallback-images/fallback_community.png",
  community: "/public/fallback-images/fallback_community.png",
  "social activities": "/public/fallback-images/fallback_community.png",
  
  // Transport
  transport: "/public/fallback-images/fallback_transport.png",
  "ndis transport": "/public/fallback-images/fallback_transport.png",
};

/**
 * Selects a fallback image based on the keyword seed or article title
 * Defaults to SIL (most common support area) if no match found
 */
function selectFallbackImage(keywordSeed?: string | null, title?: string): string {
  const searchText = (keywordSeed || title || "").toLowerCase();
  
  for (const [keyword, imagePath] of Object.entries(FALLBACK_IMAGES)) {
    if (searchText.includes(keyword)) {
      return imagePath;
    }
  }
  
  // Default fallback: SIL (day-to-day support is most common)
  return FALLBACK_IMAGES.sil;
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // ─── Arvow Webhook ──────────────────────────────────────────────────────────
  app.post("/api/blog/webhook", async (req, res) => {
    try {
      const secret = req.headers["x-secret"] || req.headers["x-arvow-secret"] || req.headers["authorization"]?.replace("Bearer ", "");
      const expectedSecret = process.env.ARVOW_WEBHOOK_SECRET;

      if (!expectedSecret || secret !== expectedSecret) {
        console.warn("[Arvow Webhook] Unauthorized request");
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { id, title, content, content_markdown, thumbnail, thumbnail_alt_text, metadescription, keyword_seed, language_code } = req.body;

      if (!id || !title || !content) {
        res.status(400).json({ error: "Missing required fields: id, title, content" });
        return;
      }

      // Generate a URL-friendly slug from the title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .substring(0, 200);

      // ─── NEW: Apply fallback image logic ─────────────────────────────────────
      // If no thumbnail is provided by Arvow, select a branded fallback image
      // based on the keyword seed or article title
      let finalThumbnail = thumbnail ?? null;
      let finalThumbnailAltText = thumbnail_alt_text ?? null;
      
      if (!finalThumbnail) {
        finalThumbnail = selectFallbackImage(keyword_seed, title);
        // Generate a descriptive alt text for the fallback image
        finalThumbnailAltText = `AUSnew Support Services - ${title}`;
        console.log(`[Arvow Webhook] No thumbnail provided. Using fallback: ${finalThumbnail}`);
      }

      await upsertBlogPost({
        arvowId: String(id),
        title,
        slug,
        content,
        contentMarkdown: content_markdown ?? null,
        thumbnail: finalThumbnail,
        thumbnailAltText: finalThumbnailAltText,
        metaDescription: metadescription ?? null,
        keywordSeed: keyword_seed ?? null,
        languageCode: language_code ?? "en",
      });

      // Notify owner of new blog post
      await notifyOwner({
        title: `📝 New SEO Blog Post Published: ${title}`,
        content: `A new article has been published to the AUSnew blog via Arvow.\n\nTitle: ${title}\nKeyword: ${keyword_seed ?? "N/A"}\nSlug: /blog/${slug}\nThumbnail: ${finalThumbnail ? (finalThumbnail.startsWith("/public") ? "Fallback Image" : "Custom Image") : "None"}`,
      }).catch(() => {}); // non-blocking

      console.log(`[Arvow Webhook] Published: "${title}" -> /blog/${slug}`);
      res.status(200).json({ success: true, slug });
    } catch (err) {
      console.error("[Arvow Webhook] Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
