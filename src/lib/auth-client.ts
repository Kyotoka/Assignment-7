import { createAuthClient } from "better-auth/react";

// In the browser, omit baseURL or use window.location.origin so requests always hit the current host.
// This prevents "Failed to fetch" on Vercel deployments when NEXT_PUBLIC_BASE_URL is missing or mismatched.
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
});

export const { useSession, signIn, signUp, signOut, updateUser } = authClient;