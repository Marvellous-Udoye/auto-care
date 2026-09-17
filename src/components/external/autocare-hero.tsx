import { AutocareHeader } from "@/components/external/autocare-header";
import { Container } from "@/components/external/autocare-shared";

export function AutocareHero() {
  return (
    <section className="section-animate relative min-h-[846px] overflow-hidden border-b-[5px] border-[#ec3042] bg-[#030303] max-[1050px]:min-h-[780px] max-[700px]:min-h-[720px]">
      <AutocareHeader />
      <div
        className="absolute inset-y-0 right-0 left-[44%] bg-cover bg-[center_right] max-[1050px]:inset-x-0 max-[1050px]:top-[210px] max-[1050px]:opacity-70"
  style={{
  backgroundImage: "linear-gradient(90deg, #030303 0%, rgba(0, 0, 0, 0.18) 24%, rgba(0, 0, 0, 0) 60%), url('/images/hero-bg.jpg')"
}}   
        aria-hidden="true"
      />
      <Container className="relative z-[2] grid min-h-[710px] grid-cols-[1fr_80px] items-center max-[1050px]:min-h-[650px] max-[1050px]:grid-cols-1">
        <div className="max-w-[710px] max-[1050px]:self-start max-[1050px]:pt-20">
          <div className="mb-5 md:mb-11 bg-[#ec3042] px-[25px] py-[10px] text-center font-medium uppercase tracking-[0.12em] text-white [clip-path:polygon(0_0,94%_0,100%_100%,6%_100%)] w-fit text-[10px]">
            Welcome to Auto Care
          </div>
          <h1 className="m-0 text-[clamp(56px,5.3vw,84px)] font-extrabold leading-[1.08] text-white max-[700px]:text-[47px]">
            Your <span className="text-[#ec3042]">Trusted</span> Auto Repair Service Provider
          </h1>
          <p className="mt-[33px] w-[570px] text-[21px] font-semibold leading-[1.45] text-[#8a8a8a] max-[700px]:w-auto max-[700px]:text-[17px]">
            We offer reliable and efficient services to ensure your vehicle is always in top condition. Let us take care
            of your car, so you can focus on what matters most.
          </p>
        </div>
        <div className="grid justify-items-center gap-[22px] text-base font-bold text-[#d8d8d8] max-[1050px]:hidden" aria-hidden="true">
          <b className="grid size-14 place-items-center rounded-full bg-[#333]">01</b>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>
      </Container>
    </section>
  );
}
