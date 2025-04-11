import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section className=" dark:bg-darkBg bg-bg py-20 font-base lg:py-[100px]">
      <h2 className="mb-14 px-5 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
        Frequently asked questions
      </h2>

      <div className="mx-auto grid w-[700px] max-w-full px-5">
        <Accordion className="text-base sm:text-lg" type="single" collapsible>
          <AccordionItem className="mb-2" value="item-1">
            <AccordionTrigger>How does the AI math tutor personalize lessons for my child?</AccordionTrigger>
            <AccordionContent>
              The app analyzes each student's strengths and areas for 
              improvement, crafting customized lessons and exercises
              to match their unique learning style.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="mb-2" value="item-2">
            <AccordionTrigger>Is the app suitable for all grade levels?</AccordionTrigger>
            <AccordionContent>
              Absolutely! The app covers a comprehensive K-12 curriculum,
              ensuring students at any grade level receive tailored support
              and guidance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="mb-2" value="item-3">
            <AccordionTrigger>Can I track my child's progress?</AccordionTrigger>
            <AccordionContent>
              Yes! The app provides detailed progress reports and performance
              analytics to help parents and teachers monitor development
              and celebrate milestones.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Does the app make math engaging and fun?</AccordionTrigger>
            <AccordionContent>
              Definitely! With interactive problem-solving, gamified challenges,
              and rewards, the app turns learning math into an enjoyable experience.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
