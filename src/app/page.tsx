import {
  ArrowUpRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  Gauge,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Wrench,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimationLayer } from "@/components/sections/animation-layer";
import { FaqSection } from "@/components/sections/faq-section";

const navItems = ["About", "Gallery", "Pricing", "Blog", "Contact"];

const services = [
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
      "https://images.unsplash.com/photo-1597766353939-b5f49e7b3f0e?auto=format&fit=crop&w=820&q=80",
  },
];

const reasons = [
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

const process = [
  {
    title: "Schedule an\nAppointment",
    text: "The first step in getting your car repaired at AutoWorks is to schedule an appointment. You can do this by phone, online, or by visiting our shop in person.",
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

const posts = [
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

const logoItems = ["TESLA", "TOYOTA", "HYUNDAI", "Mercedes-Benz", "SUZUKI", "JAGUAR"];

function Logo() {
  return (
    <a className="logo" href="#" aria-label="AutoWorks home">
      Aut<span>o</span>Works
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Logo />
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button aria-label="Search">
            <Search size={24} />
          </button>
          <button className="menu-button" aria-label="Open menu">
            <Menu size={26} />
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero section-animate">
      <SiteHeader />
      <div className="hero-image" aria-hidden="true" />
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <div className="hero-ribbon">Welcome to Auto Works</div>
          <h1>
            Your <span>Trusted</span> Auto Repair Service Provider
          </h1>
          <p>
            We offer reliable and efficient services to ensure your vehicle is
            always in top condition. Let us take care of your car, so you can
            focus on what matters most.
          </p>
        </div>
        <div className="hero-pagination" aria-hidden="true">
          <b>01</b>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="gallery" className="services-section section-animate">
      <div className="site-container">
        <div className="section-row">
          <div className="arrows" aria-hidden="true">
            <span>←</span>
            <span>→</span>
          </div>
          <div className="section-heading align-right">
            <p>What We Offer</p>
            <h2>Our Services</h2>
            <a href="#appointment">View More</a>
          </div>
        </div>
        <div className="red-rule" />
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <img src={service.image} alt="" />
              <div className="service-overlay" />
              <div className="service-label">
                <small>{service.number}</small>
                <h3>{service.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section id="about" className="why-section section-animate">
      <div className="site-container">
        <div className="section-heading centered">
          <h2>Why Choose Us?</h2>
          <strong>We’re here for whatever you need</strong>
        </div>
        <div className="reason-grid">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article className="reason-card" key={reason.title}>
                <div className="round-icon">
                  <Icon size={25} />
                </div>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="testimonials section-animate">
      <div className="site-container testimonial-grid">
        <div className="testimonial-copy">
          <div className="section-heading">
            <p>Testimonials</p>
            <h2>What Our Clients Say</h2>
          </div>
          <p>Read what our satisfied customers have to say about our products and services</p>
          <div className="arrows" aria-hidden="true">
            <span>←</span>
            <span>→</span>
          </div>
        </div>
        <div className="testimonial-cards">
          {[
            ["Sarah Tumiwa", "I have been taking my car to AutoWorks for years and have always had a great experience. The staff is knowledgeable and friendly, and they always take the time to explain the repairs needed."],
            ["John Dolton", "I had an urgent issue with my car and was able to get an appointment at AutoWorks the same day. The team was able to diagnose the problem quickly and had my car back on the road in no time."],
          ].map(([name, text], index) => (
            <article className="testimonial-card" key={name}>
              <img
                src={`https://images.unsplash.com/photo-${index ? "1500648767791-00dcc994a43e" : "1494790108377-be9c29b29330"}?auto=format&fit=crop&w=160&q=80`}
                alt={`${name} portrait`}
              />
              <p>{text}</p>
              <h3>{name}</h3>
              <div aria-label="5 stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaAndAbout() {
  return (
    <>
      <section className="cta-band section-animate" id="contact">
        <div className="site-container">
          <div className="cta-card">
            <div className="cta-car" />
            <div className="cta-text">
              <h2>
                Ready to schedule <br /> an <span>appointment?</span>
              </h2>
              <p>Contact us today to book your next service.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="about-section section-animate">
        <div className="site-container about-grid">
          <div className="about-copy">
            <div className="section-heading">
              <p>About Us</p>
              <h2>Our Reputation Speaks for Itself</h2>
            </div>
            <p>
              AutoWorks is a family-owned and operated business that has been
              providing auto repair services to the community for over 20 years.
              We pride ourselves on our commitment to quality and customer
              satisfaction.
            </p>
            <Button className="red-button">
              Learn More <ArrowUpRight size={16} />
            </Button>
          </div>
          <div className="about-images">
            <img
              className="about-small"
              src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=650&q=80"
              alt="Car underbody inspection"
            />
            <img
              className="about-large"
              src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=850&q=80"
              alt="Technician inspecting car door"
            />
          </div>
        </div>
      </section>
      <section className="video-strip section-animate">
        <img
          src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=2200&q=90"
          alt="Red performance car drifting"
        />
        <button aria-label="Play video">▶</button>
        <div className="video-label">Get to Know Us<br />Even Closer</div>
      </section>
    </>
  );
}

function ProcessSection() {
  return (
    <section className="process-section section-animate">
      <div className="site-container">
        <div className="section-heading centered">
          <p>How It Works</p>
          <h2>Our Business Process</h2>
        </div>
        <div className="process-grid">
          {process.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="process-card" key={item.title}>
                <div className="process-icon">
                  <b>{index + 1}</b>
                  <Icon size={54} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AppointmentSection() {
  const checks = [
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

  return (
    <section id="appointment" className="appointment-section section-animate">
      <div className="site-container">
        <div className="section-heading centered">
          <p>Book An</p>
          <h2>Appointment Form</h2>
          <span>Schedule your next appointment with us using our easy-to-use online appointment form.</span>
        </div>
        <form className="appointment-form">
          <h3>Contact Info</h3>
          <div className="form-grid">
            {["Your Name", "Phone Number", "Email Address", "Date", "Time", "Location"].map((placeholder) => (
              <input key={placeholder} placeholder={placeholder} aria-label={placeholder} />
            ))}
          </div>
          <h3>Car Detail</h3>
          <div className="form-grid">
            {["Maker", "Model", "Year"].map((placeholder) => (
              <input key={placeholder} placeholder={placeholder} aria-label={placeholder} />
            ))}
          </div>
          <p>Select Services Needed</p>
          <div className="checkbox-grid">
            {checks.map((check, index) => (
              <label key={check}>
                <input type="checkbox" defaultChecked={index === 4 || index === 6} />
                {check}
              </label>
            ))}
          </div>
          <Button className="red-button">
            Make an Appointment <ArrowUpRight size={16} />
          </Button>
        </form>
        <div className="brand-row">
          {logoItems.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="blog-section section-animate">
      <div className="site-container">
        <div className="section-heading">
          <p>Our Blog</p>
          <h2>What’s New?</h2>
        </div>
        <div className="red-rule" />
        <div className="blog-grid">
          {posts.map((post) => (
            <article className="blog-card" key={post.title}>
              <img src={post.image} alt="" />
              <span>Latest Blog</span>
              <div>
                <p>{post.date}<b>{post.author}</b></p>
                <h3>{post.title}</h3>
                <small>{post.comments}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer section-animate">
      <div className="site-container footer-grid">
        <div>
          <Logo />
          <ul>
            <li><MapPin size={17} />1271 Gladstone Rd, Nassau, Bahamas</li>
            <li><Phone size={17} />+1 234-789-0876</li>
            <li><Mail size={17} />hello@autoworks.com</li>
            <li><Zap size={17} />www.autoworks.com</li>
          </ul>
        </div>
        <div>
          <h3>Opening Hours</h3>
          <p>Mon-Fri : 08.00 - 20.00</p>
          <p>Sat-Sun: 10.00 - 16.00</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          {["About Us", "Why with Us", "Our Services", "How It Works", "Pricing Plan", "Appointment", "Blog", "FAQ"].map((link) => (
            <a key={link} href="#">{link}</a>
          ))}
        </div>
        <div>
          <h3>Subscribe to Our Newsletter</h3>
          <p>Sign up for our newsletter to receive exclusive promotions, news, and tips straight to your inbox.</p>
          <input placeholder="Email Address" aria-label="Newsletter email" />
          <Button className="red-button">Submit <ArrowUpRight size={16} /></Button>
        </div>
      </div>
      <div className="site-container copyright">Copyright © 2024 AutoWorks. All rights reserved.</div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <AnimationLayer />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CtaAndAbout />
      <ProcessSection />
      <AppointmentSection />
      <BlogSection />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
