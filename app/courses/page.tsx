import Marquee from "@/components/ui/marquee";
import ImageCard from "./image-card";
import { courseList } from "./course-list";

export default function CoursesPage() {
  const items = ["  ", " Long live Papa Johns! ", "   "];

  return (
    <main className="p-4 h-full">
      <div className="flex flex-row flex-wrap">
        {courseList.map((course, index) => (
          <div key={index} className="p-[10px]">
            <ImageCard
              caption={course.caption}
              imageUrl={course.imageUrl}
              link={course.link}
            />
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Marquee items={items} />
      </div>
    </main>
  );
}
