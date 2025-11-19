import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Lấy tất cả comments của một bài viết
export const getCommentsByPostId = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post_id", (q) => q.eq("postId", args.postId))
      .filter((q) => q.eq(q.field("isApproved"), true)) // Chỉ lấy comment đã được duyệt
      .order("desc")
      .collect();
    
    return comments;
  },
});

// Lấy comment theo ID
export const getCommentById = query({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Tạo comment mới
export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.optional(v.id("users")),
    authorName: v.string(),
    authorEmail: v.optional(v.string()),
    content: v.string(),
    parentId: v.optional(v.id("comments")), // Để reply comment
  },
  handler: async (ctx, args) => {
    // Kiểm tra bài viết có tồn tại không
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Bài viết không tồn tại");
    }

    const commentId = await ctx.db.insert("comments", {
      postId: args.postId,
      userId: args.userId,
      authorName: args.authorName,
      authorEmail: args.authorEmail,
      content: args.content,
      parentId: args.parentId,
      isApproved: true, // Tự động approve (có thể thay đổi thành false để cần duyệt)
      createdAt: Date.now(),
    });

    return commentId;
  },
});

// Cập nhật comment
export const updateComment = mutation({
  args: {
    id: v.id("comments"),
    content: v.string(),
    userId: v.optional(v.id("users")), // Để kiểm tra quyền
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.id);
    if (!comment) {
      throw new Error("Comment không tồn tại");
    }

    // Kiểm tra quyền (chỉ chủ sở hữu mới được sửa)
    if (args.userId && comment.userId && comment.userId !== args.userId) {
      throw new Error("Bạn không có quyền chỉnh sửa comment này");
    }

    await ctx.db.patch(args.id, {
      content: args.content,
      updatedAt: Date.now(),
    });
  },
});

// Xóa comment
export const deleteComment = mutation({
  args: {
    id: v.id("comments"),
    userId: v.optional(v.id("users")), // Để kiểm tra quyền
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.id);
    if (!comment) {
      throw new Error("Comment không tồn tại");
    }

    // Kiểm tra quyền (chỉ chủ sở hữu hoặc admin mới được xóa)
    if (args.userId) {
      const user = await ctx.db.get(args.userId);
      const isOwner = comment.userId === args.userId;
      const isAdmin = user?.role === "admin";
      
      if (!isOwner && !isAdmin) {
        throw new Error("Bạn không có quyền xóa comment này");
      }
    }

    // Xóa tất cả reply của comment này
    const replies = await ctx.db
      .query("comments")
      .withIndex("by_parent_id", (q) => q.eq("parentId", args.id))
      .collect();
    
    for (const reply of replies) {
      await ctx.db.delete(reply._id);
    }

    await ctx.db.delete(args.id);
  },
});

// Duyệt comment (cho admin)
export const approveComment = mutation({
  args: {
    id: v.id("comments"),
    isApproved: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isApproved: args.isApproved,
    });
  },
});

// Lấy số lượng comments của một bài viết
export const getCommentCount = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post_id", (q) => q.eq("postId", args.postId))
      .filter((q) => q.eq(q.field("isApproved"), true))
      .collect();
    
    return comments.length;
  },
});

