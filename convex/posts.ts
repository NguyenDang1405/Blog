import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Lấy tất cả bài viết
export const getAllPosts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .collect();
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
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      author: args.author,
      featuredImage: args.featuredImage,
      category: args.category,
      tags: args.tags,
      isFeatured: args.isFeatured || false,
      isPublished: args.isPublished !== false, // Default to true
      viewCount: 0,
      relatedLinks: args.relatedLinks,
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
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
      author: args.author,
      featuredImage: args.featuredImage,
      category: args.category,
      tags: args.tags,
      isFeatured: args.isFeatured,
      isPublished: args.isPublished,
      relatedLinks: args.relatedLinks,
      updatedAt: Date.now(),
    });
  },
});

// Xóa bài viết
export const deletePost = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
