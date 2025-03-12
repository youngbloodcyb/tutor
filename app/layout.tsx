import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { NavMenu } from "@/components/main/nav-menu";

export const metadata: Metadata = {
  title: "Tutor App",
  description: "An AI Tutoring App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg h-screen">
        <NavMenu />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
