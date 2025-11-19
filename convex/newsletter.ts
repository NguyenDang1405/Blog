import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Đăng ký newsletter
export const subscribeNewsletter = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Kiểm tra email đã đăng ký chưa
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      if (existing.isActive) {
        throw new Error("Email này đã được đăng ký");
      } else {
        // Re-subscribe
        await ctx.db.patch(existing._id, {
          isActive: true,
          name: args.name,
          unsubscribedAt: undefined,
        });
        return existing._id;
      }
    }

    // Tạo subscriber mới
    const subscriberId = await ctx.db.insert("newsletterSubscribers", {
      email: args.email,
      name: args.name,
      isActive: true,
      subscribedAt: Date.now(),
    });

    return subscriberId;
  },
});

// Hủy đăng ký newsletter
export const unsubscribeNewsletter = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!subscriber) {
      throw new Error("Email không tồn tại trong danh sách đăng ký");
    }

    await ctx.db.patch(subscriber._id, {
      isActive: false,
      unsubscribedAt: Date.now(),
    });
  },
});

// Lấy tất cả subscribers (cho admin)
export const getAllSubscribers = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("desc")
      .collect();
  },
});

// Lấy số lượng subscribers
export const getSubscriberCount = query({
  handler: async (ctx) => {
    const subscribers = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
    
    return subscribers.length;
  },
});

