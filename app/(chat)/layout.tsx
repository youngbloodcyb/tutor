import { NavMenu } from "@/components/main/nav-menu";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className="antialiased bg-bg overflow-auto">
      <NavMenu />
      <main className="p-4 h-[calc(100vh-theme(spacing.16))]">{children}</main>
      <Toaster />
    </body>
  );
}
