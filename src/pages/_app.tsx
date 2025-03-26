import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Geist } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient
import { trpc } from "../utils/Trpc";
import { trpcClientOptions } from "../utils/TrpcClient";
import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
});

// Create QueryClient instance
const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <trpc.Provider client={trpc.createClient(trpcClientOptions)} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <div className={geist.className}>
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default MyApp;
