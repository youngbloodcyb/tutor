import { NavMenu } from "@/components/main/nav-menu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavMenu />
      <main className="p-4 h-[calc(100vh-theme(spacing.16))]">{children}</main>
    </>
  );
}
