#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Đang khắc phục lỗi Convex...\n');

// Kiểm tra Convex đã cài đặt chưa
try {
  console.log('📦 Kiểm tra Convex...');
  execSync('npx convex --version', { stdio: 'pipe' });
  console.log('✅ Convex đã được cài đặt');
} catch (error) {
  console.log('❌ Convex chưa được cài đặt, đang cài đặt...');
  execSync('npm install convex', { stdio: 'inherit' });
}

// Kiểm tra file convex.json
const convexConfigPath = path.join(__dirname, 'convex.json');
if (!fs.existsSync(convexConfigPath)) {
  console.log('❌ Không tìm thấy convex.json');
  console.log('📝 Tạo file convex.json...');
  
  const convexConfig = {
    "functions": "convex/",
    "generateCommonJSApi": false,
    "node": {
      "externalPackages": []
    }
  };
  
  fs.writeFileSync(convexConfigPath, JSON.stringify(convexConfig, null, 2));
  console.log('✅ Đã tạo convex.json');
}

// Kiểm tra thư mục convex
const convexDir = path.join(__dirname, 'convex');
if (!fs.existsSync(convexDir)) {
  console.log('❌ Không tìm thấy thư mục convex');
  console.log('📁 Tạo thư mục convex...');
  fs.mkdirSync(convexDir, { recursive: true });
  console.log('✅ Đã tạo thư mục convex');
}

// Kiểm tra file users.ts
const usersPath = path.join(convexDir, 'users.ts');
if (!fs.existsSync(usersPath)) {
  console.log('❌ Không tìm thấy convex/users.ts');
  console.log('📝 Tạo file users.ts...');
  
  const usersContent = `import { mutation, query } from "./_generated/server";
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
`;
  
  fs.writeFileSync(usersPath, usersContent);
  console.log('✅ Đã tạo convex/users.ts');
}

// Kiểm tra file schema.ts
const schemaPath = path.join(convexDir, 'schema.ts');
if (!fs.existsSync(schemaPath)) {
  console.log('❌ Không tìm thấy convex/schema.ts');
  console.log('📝 Tạo file schema.ts...');
  
  const schemaContent = `import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.string(),
    userId: v.id("users"), // ID của user tạo bài viết
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
`;
  
  fs.writeFileSync(schemaPath, schemaContent);
  console.log('✅ Đã tạo convex/schema.ts');
}

console.log('\n🚀 Đang chạy Convex dev...');
console.log('📝 Lưu ý: Giữ terminal này mở để Convex hoạt động');

try {
  execSync('npx convex dev', { stdio: 'inherit' });
} catch (error) {
  console.log('\n❌ Lỗi khi chạy Convex dev:');
  console.log(error.message);
  console.log('\n🔧 Thử chạy thủ công:');
  console.log('npx convex dev');
}
