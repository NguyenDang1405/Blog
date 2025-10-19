import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Lấy tất cả categories
export const getAllCategories = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .order("desc")
      .collect();
  },
});

// Lấy category theo slug
export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
  },
});

// Tạo category mới
export const createCategory = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const categoryId = await ctx.db.insert("categories", {
      name: args.name,
      slug: args.slug,
      description: args.description,
      color: args.color,
      createdAt: Date.now(),
    });
    return categoryId;
  },
});

// Cập nhật category
export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      slug: args.slug,
      description: args.description,
      color: args.color,
    });
  },
});

// Xóa category
export const deleteCategory = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
