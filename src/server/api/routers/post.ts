import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.text}` };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session?.user;
      if (!user) throw new Error("Unauthorized");

      return ctx.prisma.post.create({ // ✅ Corrected lowercase `post`
        data: {
          name: input.name,
          createdBy: { connect: { id: user.id } }, 
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session?.user;
    if (!user) throw new Error("Unauthorized");

    const post = await ctx.prisma.post.findFirst({ // ✅ Corrected lowercase `post`
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
