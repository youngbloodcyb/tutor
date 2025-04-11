import { PricingPlan } from "@/components/landing/pricing-plan";

export function Pricing() {
  return (
    <section className="border-b-border dark:border-b-darkBorder dark:bg-secondaryBlack inset-0 flex w-full flex-col items-center justify-center border-b-2 bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base">
      <div className="mx-auto w-container max-w-full px-5 py-20 lg:py-[100px]">
        <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Pricing
        </h2>
        <div className="grid grid-cols-3 gap-8 w900:mx-auto w900:w-2/3 w900:grid-cols-1 w500:w-full">
          <PricingPlan
            planName="Basic"
            description="Perfect for students just starting their math journey."
            price="10"
            perks={[
              "Access to core math lessons and exercises",
              "Interactive problem-solving",
              "Instant Feedback",
              "Progress tracking for student",
            ]}
          />
          <PricingPlan
            planName="Essential"
            description="For families seeking personalized learning and enhanced features."
            price="25"
            perks={[
              "Includes all Basic features",
              "Customized learning paths",
              "Gamified challenges and rewards",
              "Parental insights and monitoring",
              "Progress reports",
            ]}
            mostPopular
          />
          <PricingPlan
            planName="Growth"
            description="Designed for advanced learners and ambitious goals."
            price="50"
            perks={[
              "Includes all Essential features",
              "Access to advanced topics and test prep",
              "Priority support and one-on-one tutoring sessions",
              "Exclusive challenges and competitions",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
