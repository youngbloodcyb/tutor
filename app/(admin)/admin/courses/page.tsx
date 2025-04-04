import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/lib/data/course";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Page() {
  const courses = await getAllCourses();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link href="/admin/courses/create">
          <Button>
            Create Course
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of all courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.name}</TableCell>
              <TableCell>{course.description || "No description"}</TableCell>
              <TableCell>{course.draft ? "Draft" : "Published"}</TableCell>
              <TableCell>
                {new Date(course.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link href={`/admin/courses/edit/${course.id}`}>
                  <Button size="sm">Edit</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
