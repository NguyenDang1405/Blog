import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.string(),
    createdAt: v.number(),
  })
  .index("by_created_at", ["createdAt"])
  .index("by_author", ["author"]),
});
