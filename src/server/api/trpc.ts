import { initTRPC } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import type { Context } from "./Context"; 
 // ✅ Relative import (instead of `~/server/api/context`)

const t = initTRPC.context<Context>().create(); 

export const createTRPCRouter = t.router; 
export const publicProcedure = t.procedure; 

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});
