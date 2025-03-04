import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cards = [
  {
    title: "Active Courses",
    description: "View all of your active courses",
    amount: 10,
  },
  {
    title: "Hours spent",
    description: "View all of your hours spent",
    amount: 20,
  },
  {
    title: "Goals achieved",
    description: "View all of your goals achieved",
    amount: 30,
  },
];

export default function Page() {
  return (
    <main className="p-4 h-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card) => (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">{card.amount}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                Continue learning with the following courses
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
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
            <CardContent>
              <h3 className="text-2xl font-bold">100%</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
