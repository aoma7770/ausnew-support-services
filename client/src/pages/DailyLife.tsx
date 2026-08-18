/*
 * AUSnew Support Services — Assistance with Daily Life Page
 * Design: Empowered Living — warm, caring, person-centred
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Heart, Phone, Utensils, ShowerHead, Pill, Home, Shirt, Clock } from "lucide-react";

const DAILY_LIFE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/openday_client_assist_c54c34e3.jpg";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const supports = [
  { icon: ShowerHead, title: "Personal Care", desc: "Bathing, grooming, dressing, and hygiene support delivered with dignity and respect." },
  { icon: Utensils, title: "Meal Preparation", desc: "Planning and preparing nutritious meals that meet your dietary needs and preferences." },
  { icon: Home, title: "Domestic Assistance", desc: "Cleaning, laundry, household tasks, and maintaining a safe, comfortable home environment." },
  { icon: Pill, title: "Medication Management", desc: "Assistance with medication reminders, administration, and coordination with healthcare providers." },
  { icon: Shirt, title: "Dressing & Grooming", desc: "Support with clothing selection, dressing, and personal presentation to boost confidence." },
  { icon: Clock, title: "Overnight Support", desc: "Awake overnight or sleepover support for participants who need assistance during night hours." },
];

export default function DailyLife() {
  const supportsSection = useScrollReveal(0.1);
  const infoSection = useScrollReveal(0.1);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ background: '#FF6B6B', minHeight: '420px' }}
        aria-label="Daily Life Assistance hero"
      >
        <div className="absolute inset-0">
          <img src={DAILY_LIFE_IMG} alt="Daily life assistance" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,58,92,0.95) 0%, rgba(255,107,107,0.7) 100%)' }} />
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Assistance with Daily Life</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'Poppins, sans-serif' }}>
            <Heart className="w-3.5 h-3.5" /> NDIS Daily Life Support
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Assistance with Daily Life
          </h1>
          <p className="text-lg max-w-2xl text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}>
            Personalised, dignified support for everyday activities. We help you maintain independence, comfort, and wellbeing in your own home.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-5" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                Support That Respects Your Independence
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Our Assistance with Daily Life services are designed to help you manage everyday tasks with confidence. Whether you need a little help or more intensive support, we tailor our services to your individual needs and goals.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Our trained support workers deliver care with compassion, professionalism, and a deep respect for your dignity and choices. We work with you — not for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ background: '#FF6B6B', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 25px rgba(255,107,107,0.3)' }}
                >
                  Get Support Now <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:0291594976"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{ background: '#1B3A5C', color: 'white', fontFamily: 'Poppins, sans-serif' }}
                >
                  <Phone className="w-4 h-4" /> Call Us
                </a>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(27,58,92,0.15)' }}>
              <img src={DAILY_LIFE_IMG} alt="Daily life support" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Supports Grid */}
      <section className="py-16" style={{ background: '#f0f9fa' }} ref={supportsSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-black mb-10 text-center" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            What We Help With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supports.map((support, i) => {
              const Icon = support.icon;
              return (
                <div
                  key={support.title}
                  className="p-6 rounded-2xl bg-white"
                  style={{
                    boxShadow: '0 4px 20px rgba(27,58,92,0.07)',
                    opacity: supportsSection.visible ? 1 : 0,
                    transform: supportsSection.visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(255,107,107,0.1)' }}>
                    <Icon className="w-6 h-6" style={{ color: '#FF6B6B' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                    {support.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                    {support.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NDIS Pricing */}
      <section className="py-12" style={{ background: '#1B3A5C' }} ref={infoSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              NDIS Pricing for Daily Life Support
            </h2>
            <p style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }} className="text-sm">
              2026–27 NDIS Pricing Schedule — national rates
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Weekday Daytime", rate: "$73.58/hr" },
              { label: "Weekday Evening", rate: "$81.07/hr" },
              { label: "Saturday", rate: "$103.54/hr" },
              { label: "Sunday", rate: "$133.50/hr" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xl font-black text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.rate}</div>
                <div className="text-xs" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/ndis-pricing" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
              style={{ color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              View Full Pricing Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Our Approach to Daily Life Support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: "🎯", title: "Goal-Focused", desc: "We align support with your NDIS goals and personal aspirations." },
              { emoji: "🤝", title: "Collaborative", desc: "We work with you, your family, and your support network." },
              { emoji: "💙", title: "Compassionate", desc: "Delivered with empathy, patience, and genuine care." },
              { emoji: "🔒", title: "Safe & Reliable", desc: "Fully trained, background-checked support workers." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl text-center"
                style={{ background: '#f0f9fa', border: '1px solid #e0f2f4' }}>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="text-base font-bold mb-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{item.title}</div>
                <div className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)' }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Let's Talk About Your Support Needs
          </h2>
          <p className="text-base mb-8" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Our team is ready to help you understand your options and create a support plan that works for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105"
              style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
            >
              Contact Us Today <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:0291594976"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '2px solid rgba(255,255,255,0.3)', fontFamily: 'Poppins, sans-serif' }}
            >
              <Phone className="w-5 h-5" /> (02) 9159 4976
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
