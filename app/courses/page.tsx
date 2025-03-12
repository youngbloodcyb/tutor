import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DataTable from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight } from "lucide-react";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";

const evaluations = [
  {
    courseName: "Pre-algebra",
    proficiency: 0.8,
  },
  {
    courseName: "Graphing",
    proficiency: 0.55,
  },
  {
    courseName: "Solving equations",
    proficiency: 0.67,
  },
];

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-4 h-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-3 flex flex-col gap-4">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>All Courses</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 h-full">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>Evaluation</CardTitle>
                  <CardDescription>Recent evalution</CardDescription>
                </div>
                <div>
                  <Button className="flex items-center gap-1">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 justify-between border-border border-2 p-4">
                <div className="flex justify-between">
                  <h4 className="text-lg font-bold">Topic</h4>
                  <h4 className="text-lg">Proficiency</h4>
                </div>
                {evaluations.map((evaluation) => (
                  <div
                    key={evaluation.courseName}
                    className="border-border border-2 p-2 shadow-shadow flex justify-between"
                  >
                    <h4 className="text-lg font-bold">
                      {evaluation.courseName}
                    </h4>
                    <h4 className="text-lg">
                      {(evaluation.proficiency * 100).toFixed(0)}%
                    </h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
