import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="text-8xl mb-4">🛒</div>
      <h1 className="text-4xl font-extrabold text-slate-800 mb-2">৪০৪ - পেজটি পাওয়া যায়নি</h1>
      <p className="text-slate-500 max-w-md mb-6">
        আপনি যে পেজটি খুঁজছেন তা সরিয়ে ফেলা হয়েছে অথবা লিংকটি ভুল।
      </p>
      <Link
        href="/"
        className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}