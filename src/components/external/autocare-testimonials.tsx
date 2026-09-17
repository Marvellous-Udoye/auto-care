import { Star } from "lucide-react";
import { Container, SectionHeading } from "@/components/external/autocare-shared";

const testimonials = [
  [
    "Sarah Tumiwa",
    "I have been taking my car to AutoCare for years and have always had a great experience. The staff is knowledgeable and friendly, and they always take the time to explain the repairs needed.",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  ],
  [
    "John Dolton",
    "I had an urgent issue with my car and was able to get an appointment at AutoCare the same day. The team was able to diagnose the problem quickly and had my car back on the road in no time.",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  ],
];

export function AutocareTestimonials() {
  return (
    <section id="testimonials" className="section-animate overflow-hidden bg-[#292929] py-[110px] pb-[135px] max-[700px]:py-[78px]">
      <Container className="grid grid-cols-[415px_1fr] items-start gap-[185px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[50px]">
        <div>
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" />
          <p className="text-[15px] font-semibold leading-[1.65] text-[#858585]">
            Read what our satisfied customers have to say about our products and services
          </p>
          <div className="mt-[205px] flex gap-[18px] text-[50px] font-extralight text-[#bdbdbd]" aria-hidden="true">
            <span>←</span>
            <span>→</span>
          </div>
        </div>
        <div className="flex w-max gap-7 max-[1050px]:w-full max-[1050px]:overflow-x-auto">
          {testimonials.map(([name, text, image]) => (
            <article className="min-h-[410px] w-[400px] shrink-0 rounded-[9px] bg-[#f7f7f7] px-10 py-[54px] text-[#333] max-[700px]:w-[310px] max-[700px]:px-7 max-[700px]:py-[38px]" key={name}>
              <img className="mb-12 size-[88px] rounded-[5px] object-cover" src={image} alt={`${name} portrait`} />
              <p className="text-[15px] font-semibold leading-[1.65] text-[#777]">{text}</p>
              <h3 className="mt-7 mb-[9px] text-xl font-extrabold text-[#333]">{name}</h3>
              <div className="flex text-[#ec3042]" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
