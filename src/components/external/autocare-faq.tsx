"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Container, SectionHeading } from "@/components/external/autocare-shared";

const faqs = [
  {
    question: "What types of vehicles do you service?",
    answer: "We service all types of vehicles, including cars, trucks, and SUVs.",
  },
  {
    question: "Do I need an appointment for auto repairs?",
    answer: "Appointments help us serve you faster, but we also accept urgent walk-ins when our schedule allows.",
  },
  {
    question: "How long does it typically take to complete an auto repair?",
    answer: "Timing depends on the diagnosis and parts availability. We provide an estimate after inspection.",
  },
  {
    question: "Do you offer any warranties on your repairs?",
    answer: "Yes, eligible services include repair warranties. Ask our team for coverage details for your vehicle.",
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept cash, major credit cards, and approved insurance payments.",
  },
];

export function AutocareFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-animate border-b border-[#57272a] bg-[#292929] py-[120px] pb-[150px] max-[700px]:py-[78px]" id="faq">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" centered />
        <div className="mt-[70px] grid grid-cols-[490px_1fr] items-start gap-[90px] max-[1050px]:grid-cols-1 max-[1050px]:gap-[50px]">
          <img
            className="h-[470px] w-full rounded-[10px] object-cover brightness-[0.65] grayscale max-[700px]:h-[310px]"
            src="https://images.unsplash.com/photo-1599256630445-67b5772b1204?auto=format&fit=crop&w=900&q=80"
            alt="Mechanic working behind a car"
          />
          <div>
            {faqs.map((faq, index) => {
              const isOpen = index === openIndex;
              return (
                <div className="border-b border-[#626262]" key={faq.question}>
                  <button
                    className="flex w-full items-center justify-between border-0 bg-transparent py-[30px] text-left text-xl font-extrabold text-white"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {faq.question}
                    {isOpen ? <Minus className="text-[#ec3042]" size={20} /> : <Plus className="text-[#ec3042]" size={20} />}
                  </button>
                  {isOpen ? <p className="-mt-3 mb-7 text-sm font-semibold leading-[1.65] text-[#858585]">{faq.answer}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
