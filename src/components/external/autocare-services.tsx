"use client";

import { useMemo, useState } from "react";
import { services } from "@/constants/autocare";
import { Container, SectionHeading } from "@/components/external/autocare-shared";

export function AutocareServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleServices = useMemo(
    () => services.map((_, index) => services[(activeIndex + index) % services.length]),
    [activeIndex],
  );

  function move(direction: 1 | -1) {
    setActiveIndex((current) => (current + direction + services.length) % services.length);
  }

  return (
    <section id="services" className="section-animate bg-[#202020] py-[166px] pb-[95px] max-[700px]:py-[78px]">
      <Container>
        <div className="grid grid-cols-[1fr_520px] items-end max-[1050px]:grid-cols-1">
          <div className="flex gap-[18px] text-[50px] font-extralight text-[#bdbdbd]">
            <button
              className="transition-colors hover:text-white cursor-pointer"
              type="button"
              aria-label="Show previous service"
              onClick={() => move(-1)}
            >
              ←
            </button>
            <button
              className="transition-colors hover:text-white cursor-pointer"
              type="button"
              aria-label="Show next service"
              onClick={() => move(1)}
            >
              →
            </button>
          </div>
          <SectionHeading eyebrow="What We Offer" title="Our Services" alignRight>
            <a className="mt-[46px] inline-block border-b border-white text-[19px] text-white" href="#appointment">
              View More
            </a>
          </SectionHeading>
        </div>
        <div className="mt-[30px] mb-[58px] ml-auto h-px w-[calc(100%-140px)] bg-[#ec3042] max-[700px]:w-full" />
        <div className="grid grid-cols-4 gap-[18px] max-[1050px]:grid-cols-2 max-[700px]:grid-cols-1">
          {visibleServices.map((service) => (
            <article
              className="relative h-[365px] overflow-hidden rounded-[10px] bg-[#111] transition-transform duration-300 max-[700px]:h-[310px]"
              key={`${service.number}-${service.title}`}
            >
              <img className="h-full w-full object-cover grayscale" src={service.image} alt="" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0%)_30%,rgb(0_0_0/72%)_100%)]" />
              <div className="absolute bottom-[30px] left-7 grid grid-cols-[auto_1fr] items-start gap-3">
                <small className="mt-[5px] text-[15px] font-bold text-white">{service.number}</small>
                <h3 className="m-0 whitespace-pre-line text-[29px] font-extrabold leading-[1.22] text-white">
                  {service.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
