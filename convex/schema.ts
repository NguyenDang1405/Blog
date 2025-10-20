import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.string(),
    userId: v.optional(v.id("users")), // ID của user tạo bài viết (optional cho bài viết cũ)
    featuredImage: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isFeatured: v.optional(v.boolean()),
    isPublished: v.optional(v.boolean()),
    viewCount: v.optional(v.number()),
    relatedLinks: v.optional(v.array(v.object({
      title: v.string(),
      url: v.string(),
      description: v.optional(v.string())
    }))),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
  .index("by_created_at", ["createdAt"])
  .index("by_author", ["author"])
  .index("by_user_id", ["userId"])
  .index("by_category", ["category"])
  .index("by_featured", ["isFeatured"])
  .index("by_published", ["isPublished"]),
  
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
    createdAt: v.number(),
  })
  .index("by_slug", ["slug"]),

  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    role: v.optional(v.string()), // 'admin', 'author', 'user'
    isActive: v.optional(v.boolean()),
    createdAt: v.number(),
    lastLoginAt: v.optional(v.number()),
  })
  .index("by_email", ["email"])
  .index("by_role", ["role"]),
});
