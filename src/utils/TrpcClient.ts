import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export const trpcClientOptions = {
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_URL || "http://localhost:3000/api/trpc",
      transformer: superjson, // ✅ Move transformer inside the link
    }),
  ],
};
