import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllCourses } from "@/lib/data/course";

export default async function Page() {
  const courses = await getAllCourses();

  return (
    <main>
      <h1 className="text-2xl font-bold">Courses</h1>
      <Link href="/admin/courses/create">
        <Button>Create Course</Button>
      </Link>
      <div className="grid grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course.id}>{course.name}</div>
        ))}
      </div>
    </main>
  );
}
