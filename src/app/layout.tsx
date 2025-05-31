import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const ptSansFont = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Paradise Rides - Your Reliable Taxi Service",
  description: "Paradise Rides offers easy taxi booking, real-time ride tracking, and seamless payments. Sign up or log in to get started.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ptSansFont.className} bg-background text-foreground antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
