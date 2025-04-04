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
            description="Lorem ipsum dolor sit amet"
            price="10"
            perks={[
              "5 products",
              "Up to 1,000 subscribers",
              "Basic analytics",
              "48-hour support response time",
            ]}
          />
          <PricingPlan
            planName="Essential"
            description="Lorem ipsum dolor sit amet"
            price="25"
            perks={[
              "25 products",
              "Up to 10,000 subscribers",
              "Advanced analytics",
              "24-hour support response time",
              "Marketing automations",
            ]}
            mostPopular
          />
          <PricingPlan
            planName="Growth"
            description="Lorem ipsum dolor sit amet"
            price="50"
            perks={[
              "Unlimited products",
              "Unlimited subscribers",
              "Advanced analytics",
              "1-hour, dedicated support response time",
              "Marketing automations",
              "Custom reporting tools",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
