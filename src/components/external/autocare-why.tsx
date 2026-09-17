import { reasons } from "@/constants/autocare";
import { Container, SectionHeading } from "@/components/external/autocare-shared";

export function AutocareWhy() {
  return (
    <section id="about" className="section-animate bg-[#202020] pt-[45px] pb-[150px] max-[700px]:py-[78px]">
      <Container>
        <SectionHeading title="Why Choose Us?" centered>
          <strong className="mt-[25px] block text-[27px] font-medium text-[#ec3042]">
            We’re here for whatever you need
          </strong>
        </SectionHeading>
        <div className="mt-[82px] grid grid-cols-2 gap-x-[120px] gap-y-[72px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[50px]">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article className="grid grid-cols-[50px_1fr] gap-9 max-[700px]:grid-cols-1 max-[700px]:gap-5" key={reason.title}>
                <div className="grid size-[50px] place-items-center rounded-full bg-[#ec3042] text-white">
                  <Icon size={25} />
                </div>
                <div>
                  <h3 className="m-0 mb-[21px] text-[29px] font-extrabold leading-[1.18] text-white">{reason.title}</h3>
                  <p className="text-[15px] font-semibold leading-[1.65] text-[#858585]">{reason.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
