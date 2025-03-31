import { getCourse } from "@/lib/data/course";
import { Text } from "@/components/course/text";
import { Quiz } from "@/components/course/quiz";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export default async function Page({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  return (
    <main className="p-4 flex flex-col gap-4 items-start">
      {/* @ts-ignore */}
      {course?.content?.map((block: any) => {
        if (block.type === "tiptap") {
          return (
            <BlockWrapper>
              <Text content={block.content} />
            </BlockWrapper>
          );
        }
        if (block.type === "quiz") {
          return (
            <BlockWrapper>
              <Quiz quizData={block} />
            </BlockWrapper>
          );
        }
      })}
    </main>
  );
}

const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-4 items-center">
      {children}
      <Button size="sm">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
