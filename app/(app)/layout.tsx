import { NavMenu } from "@/components/main/nav-menu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavMenu />
      {children}
    </>
  );
}
