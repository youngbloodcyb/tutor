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
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight, Edit, BookText } from "lucide-react";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { getAllCourses } from "@/lib/data/course";
import Link from "next/link";

const evaluations = [
  {
    courseName: "Pre-algebra",
    proficiency: 0.8,
    style: "w-9 h-9 rounded-full bg-green-600",
  },
  {
    courseName: "Graphing",
    proficiency: 0.55,
    style: "w-9 h-9 rounded-full bg-orange-300",
  },
  {
    courseName: "Solving equations",
    proficiency: 0.67,
    style: "w-9 h-9 rounded-full bg-yellow-200",
  },
];

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const courses = await getAllCourses();

  return (
    <main className="p-4 h-full">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-3 flex flex-col gap-4">
          <Card className="w-full h-full bg-bg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Courses</CardTitle>
                  <CardDescription>All Courses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>In progress</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Link href={`/courses/${course.id}`}>
                            <Button size="icon" variant="default">
                              <BookText className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
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
                    className="border-border border-t p-4 flex justify-between"
                  >
                    <div className={evaluation.style}></div>
                    <h4 className="flex items-center text-md font-bold w-8/12">
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
