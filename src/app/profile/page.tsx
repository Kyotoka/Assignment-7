"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  if (isPending || !session) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="max-w-xl mx-auto px-4 py-12 flex-grow w-full">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">আমার প্রোফাইল</h1>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-slate-400 block">নাম</span>
              <p className="text-lg font-semibold text-slate-800">{session.user.name || "N/A"}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">ইমেইল</span>
              <p className="text-lg font-semibold text-slate-800">{session.user.email}</p>
            </div>
          </div>
          <Link
            href="/profile/update"
            className="inline-block bg-emerald-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </main>
    </div>
  );
}