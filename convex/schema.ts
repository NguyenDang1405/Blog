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
    // Phân cấp Điểm đến
    destinationId: v.optional(v.id("destinations")), // ID điểm đến (thành phố)
    // Gallery
    gallery: v.optional(v.array(v.string())), // Mảng URL ảnh cho gallery
    isFeatured: v.optional(v.boolean()),
    isPublished: v.optional(v.boolean()),
    viewCount: v.optional(v.number()),
    relatedLinks: v.optional(v.array(v.object({
      title: v.string(),
      url: v.string(),
      description: v.optional(v.string())
    }))),
    // SEO fields
    seoTitle: v.optional(v.string()), // Custom SEO title
    seoDescription: v.optional(v.string()), // Meta description
    seoKeywords: v.optional(v.array(v.string())), // SEO keywords
    // Scheduled posts
    scheduledAt: v.optional(v.number()), // Timestamp để lên lịch bài viết
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
  .index("by_created_at", ["createdAt"])
  .index("by_author", ["author"])
  .index("by_user_id", ["userId"])
  .index("by_category", ["category"])
  .index("by_featured", ["isFeatured"])
  .index("by_published", ["isPublished"])
  .index("by_scheduled_at", ["scheduledAt"])
  .index("by_destination", ["destinationId"]),
  
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
    passwordHash: v.optional(v.string()), // Hash của mật khẩu (optional để tương thích với user cũ)
    avatar: v.optional(v.string()),
    role: v.optional(v.string()), // 'admin', 'author', 'user'
    isActive: v.optional(v.boolean()),
    createdAt: v.number(),
    lastLoginAt: v.optional(v.number()),
  })
  .index("by_email", ["email"])
  .index("by_role", ["role"]),

  // Comments system
  comments: defineTable({
    postId: v.id("posts"), // ID của bài viết
    userId: v.optional(v.id("users")), // ID của user (optional cho comment ẩn danh)
    authorName: v.string(), // Tên người comment
    authorEmail: v.optional(v.string()), // Email (optional)
    content: v.string(), // Nội dung comment
    parentId: v.optional(v.id("comments")), // ID của comment cha (để hỗ trợ reply)
    isApproved: v.optional(v.boolean()), // Comment đã được duyệt chưa
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
  .index("by_post_id", ["postId"])
  .index("by_parent_id", ["parentId"])
  .index("by_user_id", ["userId"])
  .index("by_created_at", ["createdAt"]),

  // Phân cấp Điểm đến (Châu lục -> Quốc gia -> Thành phố)
  destinations: defineTable({
    name: v.string(), // Tên điểm đến
    type: v.union(v.literal("continent"), v.literal("country"), v.literal("city")), // Loại: châu lục, quốc gia, thành phố
    parentId: v.optional(v.id("destinations")), // ID của điểm đến cha (null nếu là châu lục)
    slug: v.string(), // URL slug
    description: v.optional(v.string()), // Mô tả
    image: v.optional(v.string()), // Ảnh đại diện
    createdAt: v.number(),
  })
  .index("by_type", ["type"])
  .index("by_parent_id", ["parentId"])
  .index("by_slug", ["slug"]),

  // Newsletter subscribers
  newsletterSubscribers: defineTable({
    email: v.string(), // Email đăng ký
    name: v.optional(v.string()), // Tên (optional)
    isActive: v.optional(v.boolean()), // Trạng thái active
    subscribedAt: v.number(), // Thời gian đăng ký
    unsubscribedAt: v.optional(v.number()), // Thời gian hủy đăng ký
  })
  .index("by_email", ["email"])
  .index("by_active", ["isActive"]),
});
