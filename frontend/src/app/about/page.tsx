import { StatisticsSection } from "@/components/About/StatisticsSection";
import { AboutHeroSection } from "../../components/About/AboutHeroSection";
import { VisionSection } from "../../components/About/VisionSection";


export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <VisionSection />
      <StatisticsSection />
    </>
  );
}