import { Toaster } from "@/components/ui/toaster";
import { NavMenu } from "@/components/admin/nav-menu";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <body className="antialiased bg-bg overflow-hidden">
      <NavMenu />
      <main className="p-4 h-[calc(100vh-theme(spacing.16))]">{children}</main>
      <Toaster />
    </body>
  );
}
