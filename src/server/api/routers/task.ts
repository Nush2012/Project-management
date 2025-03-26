import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return prisma.task.findMany(); // ✅ Changed Task → task (Prisma auto-lowercases model names)
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        priority: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.task.create({ data: input }); // ✅ Changed Task → task
    }),
});
