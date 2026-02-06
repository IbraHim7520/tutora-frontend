import BottomHeroBar from "@/components/pageComponents/Bar";
import HeroSection from "@/components/pageComponents/Hero";
import OurTeachersSection from "@/components/pageComponents/OurTeachersSection";
import SuccessSection from "@/components/SuccessSection";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <BottomHeroBar></BottomHeroBar>
      <SuccessSection></SuccessSection>
      <OurTeachersSection></OurTeachersSection>
    </div>
  );
}
