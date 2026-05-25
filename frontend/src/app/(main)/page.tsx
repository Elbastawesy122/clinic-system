import { AboutSection } from "@/components/Home/AboutSection";
import { AppointmentSection } from "@/components/Home/AppointmentSection";
import { HeroSection } from "@/components/Home/HeroSection";
import { ServicesSection } from "@/components/Home/ServicesSection";



export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AppointmentSection />
    </>
  )
}
