import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-4 h-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-1 h-full min-w-min">
          <Card className="w-full h-full bg-bg">
            <CardHeader className="leading-loose">
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <h1>You made it to the chats page!</h1>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
