import { getCourse } from "@/lib/data/course";
import { Text } from "@/components/course/text";
import { Quiz } from "@/components/course/quiz";
import { AddToChatButton } from "./add-to-chat-button";
import { CourseChat } from "./course-chat";

export default async function Page({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  return (
    <main className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4 items-start border-2 border-black">
          {/* @ts-ignore */}
          {course?.content?.map((block: any) => {
            if (block.type === "tiptap") {
              return (
                <BlockWrapper key={block.id}>
                  <Text content={block.content} />
                </BlockWrapper>
              );
            }
            if (block.type === "quiz") {
              return (
                <BlockWrapper key={block.id}>
                  <Quiz quizData={block} />
                </BlockWrapper>
              );
            }
          })}
        </div>
        <div className="col-span-1 border-2 border-black relative">
          <CourseChat courseId={params.id} />
        </div>
      </div>
    </main>
  );
}

const BlockWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-10 gap-4 w-full p-6 border-b border-black">
      <div className="col-span-9 border-black">{children}</div>
      <AddToChatButton />
    </div>
  );
};
