export function Features() {
  const features = [{
    title: "Personalized Learning Paths",
    text: "Tailored lessons and exercises based on the student's unique strengths and areas for improvement.",
    },
    {
      title: "Interactive Problem-Solving",
      text: "Hands-on, step-by-step guidance that adapts to each student's pace and learning style.",
    },
    {
      title: "Real-Time Feedback",
      text: "Instant feedback on answers, helping students correct mistakces and reinforce understanding.",
    },
    {
      title: "Engaging Gamification",
      text: "Fun challenges, rewards, and leaderboards to keep students motivated and excited about learning.",
    },
    {
      title: "Comprehensive Curriculum Coverage",
      text: "Covers all K-12 math concepts, from basic arithmetic to advanced calculus and geometry.",
    },
    {
      title: "Parental and Teacher Insights",
      text: "Progress reports and analytics to help parents and educators track the child's development.",
    }]

  return (
    <section className="border-t-border dark:border-t-darkBorder dark:bg-darkBg border-t-2 bg-bg py-20 font-base lg:py-[100px]">
      <h2 className="mb-14 px-5 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
        Use Artificial Intelligence to your advantage
      </h2>

      <div className="mx-auto grid w-container max-w-full grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          return (
            <div
              className="border-border dark:border-darkBorder dark:bg-secondaryBlack shadow-light dark:shadow-dark flex flex-col gap-3 rounded-base border-2 bg-white p-5"
              key={i}
            >
              <h4 className="text-xl font-heading">
                {feature.title}
              </h4>
              <p>{feature.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
