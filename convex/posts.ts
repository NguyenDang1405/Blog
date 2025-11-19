import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Lấy tất cả bài viết (chỉ lấy bài đã publish và không có scheduled hoặc đã đến lịch)
export const getAllPosts = query({
  handler: async (ctx) => {
    const now = Date.now();
    const allPosts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .collect();
    
    // Lọc bài viết: chỉ lấy bài không có scheduledAt hoặc scheduledAt đã qua
    return allPosts.filter(post => 
      !post.scheduledAt || post.scheduledAt <= now
    );
  },
});

// Lấy bài viết nổi bật
export const getFeaturedPosts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .collect();
  },
});

// Lấy bài viết theo category
export const getPostsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("category"), args.category))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .collect();
  },
});

// Tìm kiếm bài viết
export const searchPosts = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const allPosts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(args.searchTerm.toLowerCase())))
    );
  },
});

// Tăng view count
export const incrementViewCount = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (post) {
      await ctx.db.patch(args.id, {
        viewCount: (post.viewCount || 0) + 1
      });
    }
  },
});

// Lấy bài viết theo ID
export const getPostById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Tạo bài viết mới
export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    author: v.string(),
    userId: v.id("users"), // ID của user tạo bài viết
    featuredImage: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isFeatured: v.optional(v.boolean()),
    isPublished: v.optional(v.boolean()),
    relatedLinks: v.optional(v.array(v.object({
      title: v.string(),
      url: v.string(),
      description: v.optional(v.string())
    }))),
    // SEO fields
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    seoKeywords: v.optional(v.array(v.string())),
    // Scheduled posts
    scheduledAt: v.optional(v.number()),
    // Phân cấp Điểm đến
    destinationId: v.optional(v.id("destinations")),
    // Gallery
    gallery: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    // Nếu có scheduledAt và chưa đến lịch, set isPublished = false
    const shouldPublish = !args.scheduledAt || args.scheduledAt <= now;
    
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      author: args.author,
      userId: args.userId, // Lưu userId
      featuredImage: args.featuredImage,
      category: args.category,
      tags: args.tags,
      isFeatured: args.isFeatured || false,
      isPublished: shouldPublish ? (args.isPublished !== false) : false, // Nếu scheduled thì chưa publish
      viewCount: 0,
      relatedLinks: args.relatedLinks,
      seoTitle: args.seoTitle,
      seoDescription: args.seoDescription,
      seoKeywords: args.seoKeywords,
      scheduledAt: args.scheduledAt,
      destinationId: args.destinationId,
      gallery: args.gallery,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return postId;
  },
});

// Cập nhật bài viết
export const updatePost = mutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    content: v.string(),
    author: v.string(),
    userId: v.optional(v.id("users")), // ID của user cập nhật (optional)
    featuredImage: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isFeatured: v.optional(v.boolean()),
    isPublished: v.optional(v.boolean()),
    relatedLinks: v.optional(v.array(v.object({
      title: v.string(),
      url: v.string(),
      description: v.optional(v.string())
    }))),
    // SEO fields
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    seoKeywords: v.optional(v.array(v.string())),
    // Scheduled posts
    scheduledAt: v.optional(v.number()),
    // Phân cấp Điểm đến
    destinationId: v.optional(v.id("destinations")),
    // Gallery
    gallery: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    // Kiểm tra quyền sở hữu (chỉ nếu có userId)
    if (args.userId) {
      const post = await ctx.db.get(args.id);
      if (!post) {
        throw new Error("Bài viết không tồn tại");
      }
      
      if (post.userId && post.userId !== args.userId) {
        throw new Error("Bạn không có quyền chỉnh sửa bài viết này");
      }
    }

    const now = Date.now();
    // Nếu có scheduledAt và chưa đến lịch, set isPublished = false
    const shouldPublish = !args.scheduledAt || args.scheduledAt <= now;
    const finalIsPublished = args.isPublished !== undefined 
      ? (shouldPublish ? args.isPublished : false)
      : undefined;

    await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
      author: args.author,
      featuredImage: args.featuredImage,
      category: args.category,
      tags: args.tags,
      isFeatured: args.isFeatured,
      isPublished: finalIsPublished,
      relatedLinks: args.relatedLinks,
      seoTitle: args.seoTitle,
      seoDescription: args.seoDescription,
      seoKeywords: args.seoKeywords,
      scheduledAt: args.scheduledAt,
      destinationId: args.destinationId,
      gallery: args.gallery,
      updatedAt: Date.now(),
    });
  },
});

// Xóa bài viết
export const deletePost = mutation({
  args: { 
    id: v.id("posts"),
    userId: v.optional(v.id("users")) // ID của user xóa bài viết (optional)
  },
  handler: async (ctx, args) => {
    // Kiểm tra quyền sở hữu (chỉ nếu có userId)
    if (args.userId) {
      const post = await ctx.db.get(args.id);
      if (!post) {
        throw new Error("Bài viết không tồn tại");
      }
      
      if (post.userId && post.userId !== args.userId) {
        throw new Error("Bạn không có quyền xóa bài viết này");
      }
    }

    await ctx.db.delete(args.id);
  },
});

// Lấy bài viết của user
export const getPostsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Kiểm tra quyền sở hữu bài viết
export const checkPostOwnership = query({
  args: { 
    postId: v.id("posts"),
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return false;
    return post.userId === args.userId;
  },
});
