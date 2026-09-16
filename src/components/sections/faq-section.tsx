"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

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

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section section-animate" id="faq">
      <div className="site-container">
        <div className="section-heading centered">
          <p>FAQ</p>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-grid">
          <img
            src="https://images.unsplash.com/photo-1599256630445-67b5772b1204?auto=format&fit=crop&w=900&q=80"
            alt="Mechanic working behind a car"
          />
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = index === openIndex;
              return (
                <div className="faq-item" key={faq.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {faq.question}
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                  {isOpen ? <p>{faq.answer}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
