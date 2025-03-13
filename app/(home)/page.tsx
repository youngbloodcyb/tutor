import { Community } from "@/components/landing/community";
import { Features } from "@/components/landing/features";
import { Header } from "@/components/landing/header";
import { Faq } from "@/components/landing/faq";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Features />
      <Community />
      <Faq />
      <Pricing />
      <Footer />
    </>
  );
}
