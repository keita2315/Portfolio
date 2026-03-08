import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1aee2bae/health", (c) => {
  return c.json({ status: "ok" });
});

// Get portfolio data
app.get("/make-server-1aee2bae/portfolio", async (c) => {
  try {
    const data = await kv.get("portfolio-data");
    if (!data) {
      return c.json({ error: "No data found" }, 404);
    }
    return c.json({ data });
  } catch (error) {
    console.log("Error fetching portfolio data:", error);
    return c.json({ error: "Failed to fetch data" }, 500);
  }
});

// Save portfolio data
app.post("/make-server-1aee2bae/portfolio", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("portfolio-data", body);
    return c.json({ success: true });
  } catch (error) {
    console.log("Error saving portfolio data:", error);
    return c.json({ error: "Failed to save data" }, 500);
  }
});

Deno.serve(app.fetch);