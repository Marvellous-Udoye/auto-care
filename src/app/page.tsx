import { AnimationLayer } from "@/components/sections/animation-layer";
import { AutocareAppointment } from "@/components/external/autocare-appointment";
import { AutocareBlog } from "@/components/external/autocare-blog";
import { AutocareCtaAbout } from "@/components/external/autocare-cta-about";
import { AutocareFaq } from "@/components/external/autocare-faq";
import { AutocareFooter } from "@/components/external/autocare-footer";
import { AutocareHero } from "@/components/external/autocare-hero";
import { AutocareProcess } from "@/components/external/autocare-process";
import { AutocareServices } from "@/components/external/autocare-services";
import { AutocareTestimonials } from "@/components/external/autocare-testimonials";
import { AutocareWhy } from "@/components/external/autocare-why";

export default function Home() {
  return (
    <main>
      <AnimationLayer />
      <AutocareHero />
      <AutocareServices />
      <AutocareWhy />
      <AutocareTestimonials />
      <AutocareCtaAbout />
      <AutocareProcess />
      <AutocareAppointment />
      <AutocareBlog />
      <AutocareFaq />
      <AutocareFooter />
    </main>
  );
}
