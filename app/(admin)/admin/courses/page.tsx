import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Courses</h1>
      <Link href="/admin/courses/create">
        <Button>Create Course</Button>
      </Link>
    </main>
  );
}
