import { EditBlockEditor } from "@/components/admin/edit-block-editor";
import { getCourse } from "@/lib/data/course";

export default async function Page({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);
  return (
    <EditBlockEditor
      name={course.name}
      id={course.id}
      defaultBlocks={course.content as any[]}
    />
  );
}
