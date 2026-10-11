import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="light" style={{ colorScheme: "light" }}>
      <body className="bg-[#F3F6F3] text-gray-900 min-h-screen flex flex-col antialiased">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}