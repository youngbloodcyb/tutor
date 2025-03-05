import Marquee from '@/components/ui/marquee'
import ImageCard from '@/components/ui/image-card'



export default function CoursesPage() {
  const items = ['You are killing it!', 'Move any faster and I will have ', ' Long live Papa Johns! ']

  return (
  <main className="p-4 h-full">
    <div>
      <ImageCard
        caption="Image"
        imageUrl="https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*"
      ></ImageCard>
    </div>
    <div className="mt-10">
      <Marquee items={items} />
    </div>   
  </main>
  );
}
