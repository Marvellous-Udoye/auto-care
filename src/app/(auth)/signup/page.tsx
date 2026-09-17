import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Create Staff Account",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return <AuthCard mode="signup" />;
}
