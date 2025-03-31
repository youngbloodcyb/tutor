import { getCourse } from "@/lib/data/course";
import { Text } from "@/components/course/text";
import Quiz from "@/components/course/quiz";
export default async function Page({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  return (
    <main className="p-4 flex flex-col gap-4 items-start">
      {/* @ts-ignore */}
      {course?.content?.map((block: any) => {
        if (block.type === "tiptap") {
          return <Text content={block.content} />;
        }
        if (block.type === "quiz") {
          return <Quiz quizData={block} />;
        }
      })}
    </main>
  );
}
