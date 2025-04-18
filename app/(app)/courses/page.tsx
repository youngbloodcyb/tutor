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
import { BookText } from "lucide-react";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { getCoursesWithProgress } from "@/lib/data/course";
import Link from "next/link";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const courses = await getCoursesWithProgress();

  return (
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
                  <TableCell>
                    {course.hasProgress ? "Completed" : "Incomplete"}
                  </TableCell>
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
  );
}
