"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

/**
 * Client component — reads auth session on the client via useSession().
 * This keeps the Navbar server component free of headers() calls,
 * allowing category and other pages to be statically pre-rendered.
 */
export default function NavbarAuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে।");
    }
  };

  // Show a neutral placeholder while session is loading to avoid layout shift
  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-24 h-8 rounded-lg bg-gray-100 animate-pulse" />
        <div className="w-20 h-8 rounded-lg bg-gray-100 animate-pulse" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-full py-1.5 px-3 shadow-xs hover:bg-emerald-50 transition"
        >
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover border border-emerald-500"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#008744] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {(session.user.name || session.user.email || "U")[0].toUpperCase()}
            </div>
          )}
          <span className="text-xs font-semibold text-gray-700 hidden sm:block max-w-[100px] truncate">
            {session.user.name || "প্রোফাইল"}
          </span>
        </Link>
        <button
          onClick={handleSignOut}
          className="px-3 py-2 text-xs font-bold text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        className="px-4 py-2 text-xs font-bold text-[#008744] border border-[#008744]/30 rounded-lg hover:bg-emerald-50 transition"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 text-xs font-bold text-white bg-[#008744] rounded-lg hover:bg-[#007038] shadow-xs transition"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
