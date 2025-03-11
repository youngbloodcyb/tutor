import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DataTable from "@/components/ui/data-table"; 

const tips = [
  {
    title: "Tip 1",
    description: "Tip 1 description",
  },
  {
    title: "Tip 2",
    description: "Tip 2 description",
  },
  {
    title: "Tip 3",
    description: "Tip 3 description",
  },
];

export default function Page() {
  return (
    <main className="p-4 h-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-3 flex flex-col gap-4">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                All Courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 h-full">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <CardTitle>Tips</CardTitle>
              <CardDescription>
                View your progress in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">100%</h3>
              {tips.map((tip) => (
                <div
                  key={tip.title}
                  className="border-border border-2 p-2 shadow-shadow"
                >
                  <h4 className="text-lg font-bold">{tip.title}</h4>
                  <p className="text-sm">{tip.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
