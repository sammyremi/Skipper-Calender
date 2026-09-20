import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import CustomCursor from "@/components/shared/CustomCursor";
import LoveSparkles from "@/components/shared/LoveSparkles";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Private Interactive Love Story | Memories & Journal",
  description:
    "An interactive digital love story celebrating our real photos, videos, important dates, and moments together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased selection:bg-babyBlue-100 selection:text-charcoal-900">
        <CustomCursor />
        <LoveSparkles />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
