import { getCourse } from "@/lib/data/course";
import { Text } from "@/components/course/text";
import { Quiz } from "@/components/course/quiz";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
export default async function Page({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  return (
    <main className="p-4">
      <div className="flex flex-col gap-4 items-start w-2/3 border-2 border-black">
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
      </div>
    </main>
  );
}

const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-10 gap-4 w-full p-6 border-b border-black">
      <div className="col-span-9 border-black">{children}</div>
      <Button size="sm">
        <Sparkles className="h-4 w-4" />
      </Button>
    </div>
  );
};
