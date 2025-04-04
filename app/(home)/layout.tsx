import { Toaster } from "@/components/ui/toaster";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="antialiased bg-bg overflow-auto">
      {children}
      <Toaster />
    </body>
  );
}
