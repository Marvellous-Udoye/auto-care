import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/external/autocare-shared";

export function AutocareCtaAbout() {
  return (
    <>
      <section className="section-animate bg-[#292929] py-[75px] pb-[100px]" id="contact">
        <Container>
          <div
            className="relative min-h-[438px] overflow-hidden rounded-lg bg-cover bg-center max-[700px]:min-h-[520px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg,#ec3042 0 34%,transparent 34%),linear-gradient(90deg,rgb(0 0 0 / 12%),rgb(0 0 0 / 84%)),url('https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1800&q=90')",
            }}
          >
            <div
              className="absolute bottom-[-24px] left-0 h-[76%] w-[47%] bg-cover bg-center [clip-path:polygon(0_0,88%_0,100%_100%,0%_100%)] max-[700px]:h-[45%] max-[700px]:w-[82%]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=1200&q=90')",
              }}
            />
            <div className="absolute top-[130px] right-[95px] max-[1050px]:right-10 max-[700px]:top-[52px] max-[700px]:right-6 max-[700px]:left-6">
              <h2 className="text-[52px] font-extrabold leading-[1.14] text-white max-[700px]:text-[36px]">
                Ready to schedule <br /> an <span className="text-white md:text-[#ec3042]">appointment?</span>
              </h2>
              <p className="mt-5 text-[21px] text-white">Contact us today to book your next service.</p>
            </div>
          </div>
        </Container>
      </section>
      <section id="about" className="section-animate bg-[#202020] py-[95px] pb-[150px] max-[700px]:py-[78px]">
        <Container className="grid grid-cols-[430px_1fr] gap-[160px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[50px]">
          <div className="pt-20 max-[700px]:pt-0">
            <SectionHeading eyebrow="About Us" title="Our Reputation Speaks for Itself" />
            <p className="mt-[84px] mb-[42px] text-[15px] font-semibold leading-[1.65] text-[#858585] max-[700px]:mt-9">
              AutoCare is a family-owned and operated business that has been providing auto repair services to the
              community for over 20 years. We pride ourselves on our commitment to quality and customer satisfaction.
            </p>
            <Button className="h-[55px] rounded-[13px] bg-[#ec3042] px-[30px] font-extrabold text-white shadow-[0_12px_24px_rgb(236_48_66/22%)] hover:bg-[#ec3042]/90">
              Learn More <ArrowUpRight size={16} />
            </Button>
          </div>
          <div className="relative min-h-[520px] max-[700px]:min-h-[430px]">
            <div className="absolute right-[95px] bottom-[130px] size-[225px] rounded-full bg-[#ec304247]" />
            <img
              className="absolute top-0 right-0 h-[245px] w-[480px] rounded-3xl object-cover grayscale max-[700px]:w-[82%]"
              src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=650&q=80"
              alt="Car underbody inspection"
            />
            <img
              className="absolute top-[172px] left-0 h-[330px] w-[470px] rounded-l-3xl object-cover grayscale max-[700px]:top-[145px] max-[700px]:w-[82%]"
              src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=850&q=80"
              alt="Technician inspecting car door"
            />
          </div>
        </Container>
      </section>
      <section className="section-animate relative h-[610px] overflow-hidden border-y-[5px] border-[#ec3042] max-[700px]:h-[430px]">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=2200&q=90"
          alt="Red performance car drifting"
        />
        <button className="absolute inset-0 m-auto grid size-[86px] place-items-center rounded-full border-[7px] border-white bg-[#ec304273] text-[34px] text-white" aria-label="Play video">
          ▶
        </button>
        <div className="absolute right-0 bottom-0 w-[44%] bg-[#ec3042] py-[58px] pr-[100px] pl-30 text-[49px] font-extrabold leading-[1.13] text-white [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)] max-[1050px]:w-[70%] max-[1050px]:px-10 max-[1050px]:pl-[110px] max-[700px]:w-[96%] max-[700px]:py-[20px] max-[700px]:pr-4 max-[700px]:pl-[60px] max-[700px]:text-[30px]">
          Our feedbacks <br className="md:hidden"/> do the talking.
        </div>
      </section>
    </>
  );
}
