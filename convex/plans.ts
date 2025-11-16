import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUserPlans = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const plans = await ctx.db
      .query("plans")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return plans;
  },
});
