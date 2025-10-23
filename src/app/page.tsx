import CallToAction from "@/components/call-to-action";
import ContentSection from "@/components/content-7";
import FAQsThree from "@/components/faqs-3";
import Features from "@/components/features-1";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import KontaktPage from "@/components/sign-up";
import TeamSection from "@/components/team";
import TestimonialsSection from "@/components/testimonials";


export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <ContentSection />
      <TestimonialsSection />
      <FAQsThree />
      <TeamSection />
      <KontaktPage />
      <FooterSection />
    </>
  );
}
