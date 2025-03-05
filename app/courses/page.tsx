import Marquee from '@/components/ui/marquee'
import ImageCard from './imageCard'
import { courseList } from './courseList'


export default function CoursesPage() {
  const items = ['  ', ' Long live Papa Johns! ', '   ']

  return (
  <main className="p-4 h-full">
    <div className="flex flex-row flex-wrap">
      {courseList.map((course) =>
      <div className="p-[10px]">
        <ImageCard
          caption={course.caption}
          imageUrl={course.imageUrl}
          link={course.link}
        ></ImageCard>
      </div>)}
    </div>
    <div className="mt-10">
      <Marquee items={items} />
    </div>   
  </main>
  );
}
