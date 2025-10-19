import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Lấy tất cả bài viết
export const getAllPosts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("posts")
      .order("desc")
      .collect();
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
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      author: args.author,
      createdAt: Date.now(),
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
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      content: args.content,
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
