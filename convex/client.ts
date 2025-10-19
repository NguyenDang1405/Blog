import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "https://scintillating-gerbil-351.convex.cloud");

export default convex;
