import app from "./app";
import { logger } from "./lib/logger";
import path from "node:path";
import { existsSync } from "node:fs";
import express from "express";

const rawPort = process.env["PORT"] ?? "10000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Serve the built frontend (artifacts/current-news/dist/public) from the API server.
// This lets Render run a single web service for both API and UI.
const staticDir = path.resolve(
  new URL(".", import.meta.url).pathname,
  "../../current-news/dist/public",
);

if (existsSync(staticDir)) {
  app.use(express.static(staticDir));
  // SPA fallback: serve index.html for any non-API route
  app.get(/^(?!\/api).*$/, (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
  logger.info({ staticDir }, "Serving static frontend");
} else {
  logger.warn({ staticDir }, "Static frontend directory not found, skipping static file serving");
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
