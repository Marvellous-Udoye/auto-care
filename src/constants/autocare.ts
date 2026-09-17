import {
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  Gauge,
  Mail,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const navItems = ["Services", "FAQ", "About", "Testimonials", "Contact"];

export const services = [
  {
    number: "01",
    title: "Engine\nRepair",
    image:
      "https://images.unsplash.com/photo-1635437536607-b8572f443763?auto=format&fit=crop&w=820&q=80",
  },
  {
    number: "02",
    title: "Brake\nRepair",
    image:
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=820&q=80",
  },
  {
    number: "03",
    title: "Transmission\nRepair",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=820&q=80",
  },
  {
    number: "04",
    title: "Suspension\nRepair",
    image:
      "/images/services-4.jpg",
  },
];

export const reasons = [
  {
    title: "Competitive pricing",
    text: "We understand that auto repair can be expensive, which is why we offer competitive pricing for all of our services. We strive to provide affordable solutions without sacrificing quality.",
    icon: Gauge,
  },
  {
    title: "Fast and efficient service",
    text: "We know that your time is valuable, which is why we work quickly and efficiently to get your car back on the road as soon as possible. Our team is dedicated to completing your repairs in a timely manner without compromising quality.",
    icon: Clock3,
  },
  {
    title: "Experienced and certified technicians",
    text: "Our team of technicians is highly trained and experienced in all aspects of auto repair. We only hire certified professionals who have a proven track record of delivering high-quality work.",
    icon: ShieldCheck,
  },
  {
    title: "Use of high-quality parts and equipment",
    text: "We only use the highest quality parts and equipment for all of our repairs. We believe that using top-of-the-line components helps to ensure the longevity and reliability of your vehicle.",
    icon: CheckCircle2,
  },
];

export const process = [
  {
    title: "Schedule an\nAppointment",
    text: "The first step in getting your car repaired at AutoCare is to schedule an appointment. You can do this by phone, online, or by visiting our shop in person.",
    icon: CalendarDays,
  },
  {
    title: "Diagnostic and\nInspection",
    text: "When you bring your car in for repairs, our technicians will perform a comprehensive diagnostic and inspection to determine the root cause of any issues.",
    icon: Car,
  },
  {
    title: "Repair work",
    text: "We will keep you informed of the progress of your repairs and let you know if any additional work is needed.",
    icon: Wrench,
  },
  {
    title: "Quality\nassurance",
    text: "We take great pride in the quality of our work and want to ensure that you are completely satisfied with the repairs we have done.",
    icon: ShieldCheck,
  },
  {
    title: "Payment and\npick-up",
    text: "We accept various forms of payment, including credit cards and cash, and can also work with your insurance company if your repairs are covered under your policy.",
    icon: Mail,
  },
];

export const posts = [
  {
    title: "5 Common Car Maintenance Mistakes and How to Avoid Them",
    date: "May 1, 2023",
    author: "John Smith",
    comments: "Comments (11)",
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Importance of Regular Oil Changes for Your Car",
    date: "June 15, 2023",
    author: "Sarah Johnson",
    comments: "Comments (21)",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Benefits of Regular Engine Tune-ups for Your Car",
    date: "September 1, 2023",
    author: "Michael Wilson",
    comments: "Comments (4)",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=80",
  },
];

export const logoItems = [
  "TESLA",
  "TOYOTA",
  "HYUNDAI",
  "Mercedes-Benz",
  "SUZUKI",
  "JAGUAR",
];

export const serviceChecks = [
  "Air Conditioner",
  "Heating & Cooling",
  "Transmission Repair",
  "Brakes Repair",
  "Oil, Lube & Filters",
  "Wheel Alignment",
  "Engine Diagnostics",
  "Steering & Suspension",
  "Others:",
];
