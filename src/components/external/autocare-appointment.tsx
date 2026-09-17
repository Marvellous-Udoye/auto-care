import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoItems, serviceChecks } from "@/constants/autocare";
import { Container, SectionHeading } from "@/components/external/autocare-shared";

export function AutocareAppointment() {
  return (
    <section id="appointment" className="section-animate bg-[#292929] py-[118px] pb-[95px] max-[700px]:py-[78px]">
      <Container>
        <SectionHeading eyebrow="Book An" title="Appointment Form" centered>
          <span className="mt-[19px] block text-[19px] text-[#8e8e8e]">
            Schedule your next appointment with us using our easy-to-use online appointment form.
          </span>
        </SectionHeading>
        <form className="mt-[60px] rounded-[14px] bg-[#f7f7f7] px-[88px] py-[70px] pb-16 text-[#333] max-[700px]:px-[22px] max-[700px]:py-[34px]">
          <h3 className="mb-[18px] text-xl font-extrabold">Contact Info</h3>
          <div className="mb-7 grid grid-cols-3 gap-x-10 gap-y-[18px] max-[1050px]:grid-cols-2 max-[700px]:grid-cols-1">
            {["Your Name", "Phone Number", "Email Address", "Date", "Time", "Location"].map((placeholder) => (
              <input
                className="h-[53px] rounded-[14px] border border-[#a5a5a5] bg-transparent px-[22px] text-[#333] outline-none focus:border-[#ec3042]"
                key={placeholder}
                placeholder={placeholder}
                aria-label={placeholder}
              />
            ))}
          </div>
          <h3 className="mb-[18px] text-xl font-extrabold">Car Detail</h3>
          <div className="mb-7 grid grid-cols-3 gap-x-10 gap-y-[18px] max-[1050px]:grid-cols-2 max-[700px]:grid-cols-1">
            {["Maker", "Model", "Year"].map((placeholder) => (
              <input
                className="h-[53px] rounded-[14px] border border-[#a5a5a5] bg-transparent px-[22px] text-[#333] outline-none focus:border-[#ec3042]"
                key={placeholder}
                placeholder={placeholder}
                aria-label={placeholder}
              />
            ))}
          </div>
          <p className="mt-[18px] mb-3 text-sm text-[#777]">Select Services Needed</p>
          <div className="mb-10 grid grid-cols-3 gap-x-[50px] gap-y-3 max-[1050px]:grid-cols-2 max-[700px]:grid-cols-1">
            {serviceChecks.map((check, index) => (
              <label className="text-sm text-[#737373]" key={check}>
                <input className="mr-3 size-[13px] accent-[#ec3042]" type="checkbox" defaultChecked={index === 4 || index === 6} />
                {check}
              </label>
            ))}
          </div>
          <Button className="h-[55px] rounded-[13px] bg-[#ec3042] px-[30px] font-extrabold text-white shadow-[0_12px_24px_rgb(236_48_66/22%)] hover:bg-[#ec3042]/90">
            Make an Appointment <ArrowUpRight size={16} />
          </Button>
        </form>
        <div className="mt-[88px] flex items-center justify-between gap-[30px] text-[29px] font-black text-[#5f5f5f] max-[700px]:flex-wrap max-[700px]:justify-center max-[700px]:text-xl">
          {logoItems.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </Container>
    </section>
  );
}
