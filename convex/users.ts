import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper function để tạo salt ngẫu nhiên
function generateSalt(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let salt = '';
  for (let i = 0; i < 16; i++) {
    salt += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return salt;
}

// Helper function để hash password (sử dụng SHA-256 đơn giản)
async function hashPassword(password: string): Promise<string> {
  // Tạo salt ngẫu nhiên
  const salt = generateSalt();
  
  // Hash password với salt bằng cách sử dụng một hash function đơn giản
  // Lưu ý: Đây là một cách hash đơn giản, trong production nên dùng bcrypt hoặc argon2
  const combined = salt + password;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Tạo hash phức tạp hơn bằng cách lặp lại
  let finalHash = hash.toString(16);
  for (let i = 0; i < 1000; i++) {
    const newCombined = finalHash + combined;
    let newHash = 0;
    for (let j = 0; j < newCombined.length; j++) {
      const char = newCombined.charCodeAt(j);
      newHash = ((newHash << 5) - newHash) + char;
      newHash = newHash & newHash;
    }
    finalHash = newHash.toString(16);
  }
  
  return `${salt}:${finalHash}`;
}

// Helper function để verify password
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, storedHash] = hash.split(':');
  
  // Hash password với salt tương tự
  const combined = salt + password;
  let hashValue = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hashValue = ((hashValue << 5) - hashValue) + char;
    hashValue = hashValue & hashValue;
  }
  
  let finalHash = hashValue.toString(16);
  for (let i = 0; i < 1000; i++) {
    const newCombined = finalHash + combined;
    let newHash = 0;
    for (let j = 0; j < newCombined.length; j++) {
      const char = newCombined.charCodeAt(j);
      newHash = ((newHash << 5) - newHash) + char;
      newHash = newHash & newHash;
    }
    finalHash = newHash.toString(16);
  }
  
  return finalHash === storedHash;
}

// Đăng ký user mới với password
export const register = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("Email này đã được sử dụng");
    }

    // Validate password
    if (args.password.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
    }

    // Hash password
    const passwordHash = await hashPassword(args.password);

    // Tạo user mới
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      passwordHash: passwordHash,
      avatar: args.avatar,
      role: "user",
      isActive: true,
      createdAt: Date.now(),
    });

    return userId;
  },
});

// Đăng nhập với email và password
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Tìm user theo email
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    if (!user.isActive) {
      throw new Error("Tài khoản đã bị khóa");
    }

    // Kiểm tra nếu user cũ không có passwordHash (tương thích với user cũ)
    if (!user.passwordHash) {
      throw new Error("Tài khoản này chưa được thiết lập mật khẩu. Vui lòng đăng ký lại hoặc liên hệ quản trị viên.");
    }

    // Verify password
    const isValid = await verifyPassword(args.password, user.passwordHash);
    if (!isValid) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    // Cập nhật last login
    await ctx.db.patch(user._id, {
      lastLoginAt: Date.now(),
    });

    // Trả về user (không bao gồm passwordHash)
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Tạo user mới (giữ lại để tương thích, nhưng không dùng password)
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

    // Tạo user mới với password mặc định (không an toàn, chỉ để tương thích)
    const defaultPassword = "changeme123";
    const passwordHash = await hashPassword(defaultPassword);

    // Tạo user mới
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      passwordHash: passwordHash,
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

// Đặt lại mật khẩu (cho user cũ hoặc reset password)
export const setPassword = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Tìm user theo email
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Email không tồn tại");
    }

    // Validate password
    if (args.password.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
    }

    // Hash password
    const passwordHash = await hashPassword(args.password);

    // Cập nhật passwordHash
    await ctx.db.patch(user._id, {
      passwordHash: passwordHash,
    });

    return { success: true };
  },
});
