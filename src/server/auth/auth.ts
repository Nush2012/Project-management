import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const { PrismaClient } = require("@prisma/client");
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Explicitly type credentials as strings
        const email = String(credentials.email);
        const password = String(credentials.password);

        const user = await prisma.user.findUnique({
          where: { email: email },
          select: { id: true, email: true, password: true },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
};

export default NextAuth(authOptions);
