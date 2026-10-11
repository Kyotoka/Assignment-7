"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    setIsLoading(true);

    try {
      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/");
    } catch (error) {
      toast.error("অ্যাকাউন্ট তৈরি করা সম্ভব হয়নি। ইমেইল ইতিমধ্যে ব্যবহৃত হতে পারে।");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleGoogleSignUp = async () => {
    setSocialLoading("google");
    try {
      const res = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (res?.error) {
        toast.error(res.error.message || "Google দিয়ে সাইন আপ ব্যর্থ হয়েছে (Client ID/Secret কনফিগার করা নেই)।");
        setSocialLoading(null);
      }
    } catch (error: any) {
      toast.error(error?.message || "Google দিয়ে সাইন আপ ব্যর্থ হয়েছে।");
      console.error("Google sign up error:", error);
      setSocialLoading(null);
    }
  };

  const handleGithubSignUp = async () => {
    setSocialLoading("github");
    try {
      const res = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
      if (res?.error) {
        toast.error(res.error.message || "GitHub দিয়ে সাইন আপ ব্যর্থ হয়েছে (Client ID/Secret কনফিগার করা নেই)।");
        setSocialLoading(null);
      }
    } catch (error: any) {
      toast.error(error?.message || "GitHub দিয়ে সাইন আপ ব্যর্থ হয়েছে।");
      console.error("GitHub sign up error:", error);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center py-12 px-4 bg-[#F3F6F3]">
      {/* Title & Subtitle */}
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#FAFDFB] rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#F7FAF8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008744] focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-[#F7FAF8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008744] focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-[#F7FAF8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008744] focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              placeholder="আবার লিখুন"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full bg-[#F7FAF8] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008744] focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-[#008744] hover:bg-[#007038] text-white font-bold py-3 px-4 rounded-xl shadow-xs transition duration-200 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="shrink mx-3 text-xs text-gray-400 font-medium">
            অথবা
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading || !!socialLoading}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold py-2.5 px-3 rounded-xl text-xs transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.14C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.29c-.82 1.63-1.29 3.47-1.29 5.41s.47 3.78 1.29 5.41l3.99-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.59l3.99 3.14c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
          </button>

          <button
            type="button"
            onClick={handleGithubSignUp}
            disabled={isLoading || !!socialLoading}
            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold py-2.5 px-3 rounded-xl text-xs transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 fill-current text-gray-900" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
          </button>
        </div>

        {/* Existing Account Footer Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="text-[#008744] hover:underline font-bold"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>

      {/* ← হোম পেজে ফিরে যান (Matching exact design) */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition font-normal"
        >
          <span>←</span>
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}