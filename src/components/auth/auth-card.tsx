import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/external/autocare-shared";

export function AuthCard({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";

  return (
    <main className="grid min-h-screen bg-[#030303] text-white lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <Logo />
          <div className="mt-14">
            <p className="mb-4 text-[14px] font-extrabold uppercase tracking-[0.32em] text-[#ec3042]">Staff portal</p>
            <h1 className="text-[clamp(38px,4vw,56px)] font-extrabold leading-tight">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-4 text-[15px] font-semibold leading-relaxed text-[#858585]">
              Access AutoCare reputation intelligence, feedback queues, branch alerts, and draft response workflows.
            </p>
          </div>
          <form className="mt-9 grid gap-5">
            {!isLogin ? (
              <div>
                <Label htmlFor="name">Username</Label>
                <Input id="name" className="mt-2" placeholder="Ada Okafor" />
              </div>
            ) : null}
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" className="mt-2" type="email" placeholder="you@autocare.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" className="mt-2" type="password" placeholder="Enter password" />
            </div>
            <Button asChild className="h-[52px] rounded-[13px] bg-[#ec3042] font-extrabold text-white shadow-[0_12px_24px_rgb(236_48_66/22%)] hover:bg-[#ec3042]/90">
              <Link href="/dashboard">
                {isLogin ? "Login" : "Create account"} <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button type="button" variant="outline" className="h-[52px] rounded-[13px] border-[#3a3a3a] bg-transparent font-extrabold text-white hover:bg-white/[0.04]">
              Continue with Google
            </Button>
          </form>
          <p className="mt-8 text-center text-[14px] font-semibold text-[#858585]">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <Link className="font-extrabold text-[#ec3042]" href={isLogin ? "/signup" : "/login"}>
              {isLogin ? "Create one" : "Login"}
            </Link>
          </p>
        </div>
      </section>
      <section className="relative hidden min-h-screen overflow-hidden bg-[#030303] lg:block">
        <div className="absolute inset-0 -left-24 [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]">
          <Image src="/images/hero-bg.jpg" alt="AutoCare red performance car" fill priority className="object-cover" sizes="55vw" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="absolute bottom-10 right-10 max-w-md text-right">
          <p className="mb-4 text-[14px] font-extrabold uppercase tracking-[0.32em] text-[#ec3042]">Reputation engine</p>
          <h2 className="text-[42px] font-extrabold leading-tight">Turn every reply into action.</h2>
        </div>
      </section>
    </main>
  );
}
