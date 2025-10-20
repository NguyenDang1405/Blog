import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Tạo user mới
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      // Nếu user đã tồn tại, trả về ID hiện tại
      return existingUser._id;
    }

    // Tạo user mới
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      avatar: args.avatar,
      role: args.role || "user",
      isActive: true,
      createdAt: Date.now(),
    });

    return userId;
  },
});

// Lấy user theo email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Lấy user theo ID
export const getUserById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Cập nhật thông tin user
export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Loại bỏ các field undefined
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(cleanUpdates).length > 0) {
      await ctx.db.patch(id, cleanUpdates);
    }

    return await ctx.db.get(id);
  },
});

// Cập nhật last login
export const updateLastLogin = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      lastLoginAt: Date.now(),
    });
  },
});

// Lấy tất cả users (chỉ admin)
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Xóa user
export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
