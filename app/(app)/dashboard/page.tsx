import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCoursesWithProgress } from "@/lib/data/course";
import { getAllUserProgress, getEvaluation } from "@/lib/data/progress";
import { Evaluate } from "./evaluate";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const courses = (await getCoursesWithProgress()).slice(0, 5); // only show 5 courses here
  const stats = await getAllUserProgress();
  const userData = await getEvaluation();

  const cards = [
    {
      title: "Total Courses",
      description: "View all of your active courses",
      amount: stats.totalCourses,
    },
    {
      title: "Completed Courses",
      description: "View all of your hours spent",
      amount: stats.completedCourses,
    },
    {
      title: "Goals achieved",
      description: "View all of your goals achieved",
      amount: stats.achievedGoals,
      link: "/goals",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <div className="col-span-3 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card key={index} className="w-full bg-bg">
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <h3 className="text-2xl font-bold">{card.amount}</h3>
                {card.link && (
                  <Link href={card.link}>
                    <Button size="icon">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="w-full h-full bg-bg">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>
                  Continue learning with the following courses
                </CardDescription>
              </div>
              <Link href="/courses">
                <Button>View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="border-0">
              <TableHeader>
                <TableRow className="bg-bg">
                  <TableHead colSpan={4}>Course</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course: any, index: number) => (
                  <TableRow key={index} className="bg-bg">
                    <TableCell colSpan={4}>{course.name}</TableCell>
                    <TableCell className="flex justify-end mr-3 my-1">
                      {course.hasProgress ? "Completed" : "Incomplete"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 h-full min-w-min">
        <Card className="w-full h-full bg-bg">
          <CardHeader>
            <div className="flex justify-between">
              <div className="space-y-2">
                <CardTitle>Evaluation</CardTitle>
                <CardDescription>AI Tutor Feedback</CardDescription>
                <Evaluate />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {userData?.evaluation ? (
              <div className="text-sm !overflow-y-auto">
                {userData.evaluation}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p>No evaluation available yet.</p>
                <p className="text-sm mt-2">
                  Click &quot;Get New Evaluation&quot; to generate your first
                  progress report.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
