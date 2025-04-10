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
import { Plus, ArrowUpRight } from "lucide-react";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCoursesWithProress } from "@/lib/data/course";

const courses = [
  {
    name: "Pre-algebra",
    progress: 0.74,
  },
  {
    name: "Trigonometry",
    progress: 0.89,
  },
  {
    name: "Geometry",
    progress: 0.97,
  },
];

const cards = [
  {
    title: "Total Courses",
    description: "View all of your active courses",
    amount: 10,
  },
  {
    title: "Completed Courses",
    description: "View all of your hours spent",
    amount: 20,
  },
  {
    title: "Goals achieved",
    description: "View all of your goals achieved",
    amount: 30,
    link: "/goals",
  },
];

const evaluations = [
  {
    courseName: "Pre-algebra",
    proficiency: 0.8,
    style: "w-4 h-4 rounded-full bg-green-600",
  },
  {
    courseName: "Graphing",
    proficiency: 0.55,
    style: "w-4 h-4 rounded-full bg-orange-300",
  },
  {
    courseName: "Solving equations",
    proficiency: 0.67,
    style: "w-4 h-4 rounded-full bg-yellow-200",
  },
];

export default async function Page() {
  const session = await getSession();
  const courses = await getCoursesWithProress();

  if (!session) {
    redirect("/login");
  }

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
                {courses.map((course, index) => (
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
            <div className="flex flex-col justify-between">
              <div className="flex justify-between ml-3 mr-3">
                <h4 className="text-lg font-bold">Topic</h4>
                <h4 className="text-lg font-bold">Proficiency</h4>
              </div>
              {evaluations.map((evaluation) => (
                <div
                  key={evaluation.courseName}
                  className="border-border border-t p-4 flex justify-between items-center gap-2"
                >
                  <div className={evaluation.style} />
                  <h4 className=" flex items-center text-md font-bold w-8/12">
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
  );
}
