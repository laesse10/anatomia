import CallToAction from "@/components/call-to-action";
import ContentSection from "@/components/content-7";
import FAQsThree from "@/components/faqs-3";
import Features from "@/components/features-1";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import KontaktPage from "@/components/sign-up";
import TeamSection from "@/components/team";


export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <ContentSection />
      <FAQsThree />
      <TeamSection />
      <KontaktPage />
      <FooterSection />
    </>
  );
}
