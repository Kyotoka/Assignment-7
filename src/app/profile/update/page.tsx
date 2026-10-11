"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateUser({ name });
      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
    } catch {
      toast.error("তথ্য আপডেট করা সম্ভব হয়নি");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending || !session) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="max-w-md mx-auto px-4 py-12 flex-grow w-full">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">তথ্য আপডেট করুন</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">নাম</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={updating}
              className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm"
            >
              {updating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}