import { ArrowUpRight, Mail, MapPin, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Logo } from "@/components/external/autocare-shared";

export function AutocareFooter() {
  return (
    <footer className="section-animate bg-[#202020] pt-[85px] pb-[34px]">
      <Container className="grid grid-cols-[1.4fr_0.9fr_1.35fr] gap-[70px] border-b border-[#666] pb-16 max-[1050px]:grid-cols-1 max-[1050px]:gap-9">
        <div>
          <Logo />
          <ul className="mt-7 grid list-none gap-4 p-0">
            <li className="flex items-center gap-[15px] text-[15px] font-semibold leading-[1.65] text-[#858585]"><MapPin className="text-[#ec3042]" size={17} />1271 Gladstone Rd, Lagos, Nigeria</li>
            <li className="flex items-center gap-[15px] text-[15px] font-semibold leading-[1.65] text-[#858585]"><Phone className="text-[#ec3042]" size={17} />+234 708 908 2476</li>
            <li className="flex items-center gap-[15px] text-[15px] font-semibold leading-[1.65] text-[#858585]"><Mail className="text-[#ec3042]" size={17} />hello@autocare.com</li>
            <li className="flex items-center gap-[15px] text-[15px] font-semibold leading-[1.65] text-[#858585]"><Zap className="text-[#ec3042]" size={17} />www.useautocare.vercel.app</li>
          </ul>
        </div>
        <div>
          <h3 className="mt-[9px] mb-7 text-xl font-extrabold text-white">Opening Hours</h3>
          <p className="text-[15px] font-semibold leading-[1.65] text-[#858585]">Mon-Fri : 08.00 - 20.00</p>
          <p className="text-[15px] font-semibold leading-[1.65] text-[#858585]">Sat-Sun: 10.00 - 16.00</p>
        </div>
        <div>
          <h3 className="mt-[9px] mb-7 text-xl font-extrabold text-white">Subscribe to Our Newsletter</h3>
          <p className="text-[15px] font-semibold leading-[1.65] text-[#858585]">Sign up for our newsletter to receive exclusive promotions, news, and tips straight to your inbox.</p>
          <input className="my-[18px] h-[53px] w-full rounded-[14px] border border-[#a5a5a5] bg-transparent px-[22px] text-white outline-none focus:border-[#ec3042]" placeholder="Email Address" aria-label="Newsletter email" />
          <Button className="h-[55px] rounded-[13px] bg-[#ec3042] px-[30px] font-extrabold text-white shadow-[0_12px_24px_rgb(236_48_66/22%)] hover:bg-[#ec3042]/90">
            Submit <ArrowUpRight size={16} />
          </Button>
        </div>
      </Container>
      <Container className="pt-[31px] text-center text-sm font-semibold text-[#777]">
        Copyright © 2026 AutoCare. All rights reserved.
      </Container>
    </footer>
  );
}
