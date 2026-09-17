import { process } from "@/constants/autocare";
import { Container, SectionHeading } from "@/components/external/autocare-shared";

export function AutocareProcess() {
  return (
    <section className="section-animate bg-[#202020] py-[135px] pb-[140px] max-[700px]:py-[78px]">
      <Container>
        <SectionHeading eyebrow="How It Works" title="Our Business Process" centered />
        <div className="mt-[92px] grid grid-cols-3 gap-x-[110px] gap-y-[70px] text-center max-[1050px]:grid-cols-1 max-[1050px]:gap-[50px]">
          {process.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="relative" key={item.title}>
                <div className="relative mx-auto mb-[42px] grid size-[168px] place-items-center rounded-full bg-[#ec3042] text-white">
                  <b className="absolute top-[-24px] grid size-[68px] place-items-center rounded-full bg-white text-[28px] text-[#ec3042]">
                    {index + 1}
                  </b>
                  <Icon size={54} />
                </div>
                <h3 className="mb-[26px] min-h-[72px] whitespace-pre-line text-[28px] font-extrabold leading-[1.18] text-white">
                  {item.title}
                </h3>
                <p className="text-[15px] font-semibold leading-[1.65] text-[#858585]">{item.text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
