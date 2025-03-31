import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/lib/data/course";

export default async function Page() {
  const courses = await getAllCourses();

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Courses</h1>
      <Link href="/admin/courses/create">
        <Button>Create Course</Button>
      </Link>
      <div className="flex flex-col gap-2">
        {courses.map((course) => (
          <div key={course.id}>
            <Link href={`/admin/courses/edit/${course.id}`}>
              <Button>{course.name}</Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
