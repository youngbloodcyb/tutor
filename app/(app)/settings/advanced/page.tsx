import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { getSession } from "@/lib/auth/server";
  import { redirect } from "next/navigation";
  import Link from "next/link";
  
  export default async function Page() {
    const session = await getSession();
  
    if (!session) {
      redirect("/login");
    }
  
    return (
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-1 h-full min-w-min">
          <Card className="w-full h-full bg-bg">
            <CardHeader className="leading-loose">
              <Link href="/settings/general">
                <h3 className="hover:text-opacity-50">General</h3>
              </Link>
              <h3>Security</h3>
              <h3>Integrations</h3>
              <h3>Support</h3>
              <h3>Organizations</h3>
              <h3>Advanced</h3>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <h1>This is the advanced specific page</h1>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    );
  }
  