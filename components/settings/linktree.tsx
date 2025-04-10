import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import Link from "next/link";

export function LinkTree() {
    return (
        <div className="col-span-1 h-full min-w-min">
        <Card className="w-full h-full bg-bg">
          <CardHeader className="leading-loose">
            <Link href="/settings/general">
              <h3 className="font-bold hover:text-opacity-70 transition-all duration-200">General</h3>
            </Link>
            <Link href="/settings/security">
              <h3 className="font-bold hover:text-opacity-70 transition-all duration-200">Security</h3>
            </Link>
            <Link href="/settings/integrations">
              <h3 className="font-bold hover:text-opacity-70 transition-all duration-200">Integrations</h3>
            </Link>
            <Link href="/settings/support">
              <h3 className="font-bold hover:text-opacity-70 transition-all duration-200">Support</h3>
            </Link>
            <Link href="/settings/organizations">
              <h3 className="font-bold hover:text-opacity-70 transition-all duration-200">Organizations</h3>
            </Link>
            <Link href="/settings/advanced">
              <h3 className="font-bold hover:text-opacity-70 transition-all duration-200">Advanced</h3>
            </Link>
          </CardHeader>
        </Card>
      </div>
    )
}