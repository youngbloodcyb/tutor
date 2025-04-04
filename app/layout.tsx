import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tutor App",
  description: "An AI Tutoring App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">{children}</html>;
}
