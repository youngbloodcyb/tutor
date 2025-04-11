import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { getSession } from "@/lib/auth/server";
  import { redirect } from "next/navigation";
  import { LinkTree } from "@/components/settings/linktree"
  import Link from "next/link";
  
  export default async function Page() {
    const session = await getSession();
  
    if (!session) {
      redirect("/login");
    }
  
    return (
      <div className="grid grid-cols-4 gap-4 h-full">
        <LinkTree />
        <div className="col-span-3 flex flex-col gap-4">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <h1>You made it to the general page!</h1>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    );
  }
  