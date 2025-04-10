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
            <Link href="/settings/general" className="font-bold hover:text-opacity-70 transition-all duration-200">
              <h3>General</h3>
            </Link>
            <h3 className="font-bold hover:text-opacity-70 transition-all duration-200 cursor-pointer">Security</h3>
            <h3 className="font-bold hover:text-opacity-70 transition-all duration-200 cursor-pointer">Integrations</h3>
            <h3 className="font-bold hover:text-opacity-70 transition-all duration-200 cursor-pointer">Support</h3>
            <h3 className="font-bold hover:text-opacity-70 transition-all duration-200 cursor-pointer">Organizations</h3>
            <h3 className="font-bold hover:text-opacity-70 transition-all duration-200 cursor-pointer">Advanced</h3>
          </CardHeader>
        </Card>
      </div>
      <div className="col-span-3 flex flex-col gap-4">
        <Card className="w-full h-full bg-bg">
          <CardHeader>
            <h1>You made it to the settings page!</h1>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
