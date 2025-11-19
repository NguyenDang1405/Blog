import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Lấy tất cả châu lục
export const getContinents = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("destinations")
      .withIndex("by_type", (q) => q.eq("type", "continent"))
      .order("asc")
      .collect();
  },
});

// Lấy quốc gia theo châu lục
export const getCountriesByContinent = query({
  args: { continentId: v.id("destinations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("destinations")
      .withIndex("by_parent_id", (q) => q.eq("parentId", args.continentId))
      .filter((q) => q.eq(q.field("type"), "country"))
      .order("asc")
      .collect();
  },
});

// Lấy thành phố theo quốc gia
export const getCitiesByCountry = query({
  args: { countryId: v.id("destinations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("destinations")
      .withIndex("by_parent_id", (q) => q.eq("parentId", args.countryId))
      .filter((q) => q.eq(q.field("type"), "city"))
      .order("asc")
      .collect();
  },
});

// Lấy điểm đến theo ID
export const getDestinationById = query({
  args: { id: v.id("destinations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Lấy điểm đến theo slug
export const getDestinationBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("destinations")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Tạo điểm đến mới
export const createDestination = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("continent"), v.literal("country"), v.literal("city")),
    parentId: v.optional(v.id("destinations")),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate: continent không có parent, country phải có parent là continent, city phải có parent là country
    if (args.type === "continent" && args.parentId) {
      throw new Error("Châu lục không thể có điểm đến cha");
    }
    if (args.type === "country" && !args.parentId) {
      throw new Error("Quốc gia phải thuộc một châu lục");
    }
    if (args.type === "city" && !args.parentId) {
      throw new Error("Thành phố phải thuộc một quốc gia");
    }

    // Kiểm tra parent có đúng type không
    if (args.parentId) {
      const parent = await ctx.db.get(args.parentId);
      if (!parent) {
        throw new Error("Điểm đến cha không tồn tại");
      }
      if (args.type === "country" && parent.type !== "continent") {
        throw new Error("Quốc gia phải thuộc châu lục");
      }
      if (args.type === "city" && parent.type !== "country") {
        throw new Error("Thành phố phải thuộc quốc gia");
      }
    }

    const destinationId = await ctx.db.insert("destinations", {
      name: args.name,
      type: args.type,
      parentId: args.parentId,
      slug: args.slug,
      description: args.description,
      image: args.image,
      createdAt: Date.now(),
    });

    return destinationId;
  },
});

// Cập nhật điểm đến
export const updateDestination = mutation({
  args: {
    id: v.id("destinations"),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      slug: args.slug,
      description: args.description,
      image: args.image,
    });
  },
});

// Xóa điểm đến
export const deleteDestination = mutation({
  args: { id: v.id("destinations") },
  handler: async (ctx, args) => {
    // Kiểm tra xem có điểm đến con không
    const children = await ctx.db
      .query("destinations")
      .withIndex("by_parent_id", (q) => q.eq("parentId", args.id))
      .collect();
    
    if (children.length > 0) {
      throw new Error("Không thể xóa điểm đến có điểm đến con");
    }

    await ctx.db.delete(args.id);
  },
});

// Lấy đường dẫn đầy đủ của điểm đến (Châu lục > Quốc gia > Thành phố)
export const getDestinationPath = query({
  args: { id: v.id("destinations") },
  handler: async (ctx, args) => {
    const path: Array<{ id: string; name: string; type: string }> = [];
    let current = await ctx.db.get(args.id);
    
    while (current) {
      path.unshift({
        id: current._id,
        name: current.name,
        type: current.type,
      });
      
      if (current.parentId) {
        current = await ctx.db.get(current.parentId);
      } else {
        break;
      }
    }
    
    return path;
  },
});

