import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_NeO7kW2qmirE@ep-summer-mountain-a4jqbfqs-pooler.us-east-1.aws.neon.tech/ai-short-video-generator?sslmode=require",
  },
});
