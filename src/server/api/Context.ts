import getServerSession from "next-auth"; 
import type { Session } from "next-auth"; // ✅ Import Session type correctly
import { authOptions } from "../auth/auth"; 
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function createContext({ req, res }: { req: any; res: any }) {
  const authResult = await getServerSession(authOptions); // ✅ Returns NextAuthResult
  const session: Session | null = authResult as unknown as Session | null; // ✅ Explicitly cast

  return { prisma, session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
