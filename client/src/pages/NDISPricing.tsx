/*
 * AUSnew Support Services — NDIS Pricing Page
 * Design: Empowered Living — clear, transparent pricing tables
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, DollarSign, Info, CheckCircle, Phone } from "lucide-react";

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

type PricingCategory = {
  category: string;
  supportItemNumber: string;
  rates: { type: string; rate: string }[];
  disclaimer?: string;
};

const pricingData: PricingCategory[] = [
  {
    category: "Assistance with Daily Life",
    supportItemNumber: "01",
    rates: [
      { type: "Weekday Daytime", rate: "$70.23" },
      { type: "Weekday Evening", rate: "$77.38" },
      { type: "Weekday Night", rate: "$78.30" },
      { type: "Saturday", rate: "$98.83" },
      { type: "Sunday", rate: "$127.43" },
      { type: "Public Holiday", rate: "$155.95" },
    ],
  },
  {
    category: "Community Access",
    supportItemNumber: "04",
    rates: [
      { type: "Weekday Daytime", rate: "$70.23" },
      { type: "Weekday Evening", rate: "$77.38" },
      { type: "Weekday Night", rate: "$78.30" },
      { type: "Saturday", rate: "$98.83" },
      { type: "Sunday", rate: "$127.43" },
      { type: "Public Holiday", rate: "$155.95" },
    ],
  },
  {
    category: "Accommodation / Tenancy",
    supportItemNumber: "02",
    rates: [
      { type: "SDA (Improved Liveability)", rate: "From $37,000/yr *" },
      { type: "SDA (Fully Accessible)", rate: "From $44,000/yr *" },
      { type: "SDA (High Physical Support)", rate: "From $67,000/yr *" },
      { type: "SDA Respite", rate: "Individually quoted" },
      { type: "SIL (Supported Independent Living)", rate: "Individually quoted" },
      { type: "MTA (Medium Term Accommodation)", rate: "Up to $248.96/day" },
      { type: "STA / Respite", rate: "Up to $380.00/day" },
    ],
    disclaimer: "* SDA annual contributions are set by the NDIA based on your individual plan, design category, and location. Figures shown are indicative minimums. All SDA and SIL pricing is individually assessed and quoted — contact us for a personalised quote.",
  },
];

export default function NDISPricing() {
  const tableSection = useScrollReveal(0.1);
  const faqSection = useScrollReveal(0.1);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-24"
        style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)', minHeight: '380px' }}
        aria-label="NDIS Pricing hero"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">NDIS Pricing</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
            <DollarSign className="w-3.5 h-3.5" /> 2025-26 NDIS Price Guide
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            NDIS Pricing
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Transparent pricing aligned with the 2025-26 NDIS Price Guide. No hidden fees, no surprises — just honest, quality care.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Notice */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-start gap-3 p-5 rounded-2xl"
            style={{ background: 'rgba(43,191,207,0.08)', border: '1px solid rgba(43,191,207,0.2)' }}>
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2BBFCF' }} />
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                2025-26 NDIS Price Guide
              </p>
              <p className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                All prices shown are maximum rates as per the NDIS Pricing Arrangements and Price Limits (2025-26). Rates are per hour (hr) unless otherwise stated. Prices are inclusive of GST where applicable. Contact us for an individualised quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-12" style={{ background: '#f0f9fa' }} ref={tableSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Service Rates
          </h2>
          <div className="space-y-8">
            {pricingData.map((category, ci) => (
              <div
                key={category.category}
                className="rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 4px 20px rgba(27,58,92,0.08)',
                  opacity: tableSection.visible ? 1 : 0,
                  transform: tableSection.visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s ease ${ci * 0.15}s`,
                }}
              >
                {/* Category Header */}
                <div className="px-6 py-4 flex items-center gap-3"
                  style={{ background: '#1B3A5C' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: '#2BBFCF', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                    {category.supportItemNumber}
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {category.category}
                  </h3>
                </div>
                {/* Rates */}
                <div className="bg-white">
                  <div className="grid grid-cols-2 px-6 py-3 border-b"
                    style={{ background: '#f8fafc', borderColor: '#e8f4f6' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#64748b', fontFamily: 'Poppins, sans-serif' }}>Support Type</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-right" style={{ color: '#64748b', fontFamily: 'Poppins, sans-serif' }}>Rate</span>
                  </div>
                  {category.rates.map((rate) => (
                    <div
                      key={rate.type}
                      className="grid grid-cols-2 px-6 py-4 border-b last:border-0 transition-colors hover:bg-teal-50"
                      style={{ borderColor: '#f0f9fa' }}
                    >
                      <span className="text-sm font-medium" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>{rate.type}</span>
                      <span className="text-sm font-bold text-right" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{rate.rate}</span>
                    </div>
                  ))}
                </div>
                {category.disclaimer && (
                  <div className="px-6 py-4 flex items-start gap-2" style={{ background: '#fffbeb', borderTop: '1px solid #fde68a' }}>
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d97706' }} />
                    <p className="text-xs leading-relaxed" style={{ color: '#92400e', fontFamily: 'Inter, sans-serif' }}>{category.disclaimer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                What's Included in Our Rates
              </h2>
              <div className="space-y-3">
                {[
                  "Fully trained, experienced support workers",
                  "NDIS-compliant service delivery",
                  "Regular progress reporting and plan reviews",
                  "Coordination with your support coordinator",
                  "24/7 emergency support line",
                  "No lock-in contracts",
                  "Flexible scheduling to suit your needs",
                  "Travel time included within service area",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#2BBFCF' }} />
                    <span className="text-sm" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                How NDIS Funding Works
              </h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Get Your NDIS Plan", desc: "Work with the NDIA to get an approved NDIS plan with funding for the supports you need." },
                  { step: "2", title: "Choose AUSnew", desc: "Select AUSnew Support Services as your registered NDIS provider." },
                  { step: "3", title: "Create Your Support Plan", desc: "We'll work with you to create a personalised support plan aligned with your goals." },
                  { step: "4", title: "Receive Quality Support", desc: "Our team delivers your supports, and we handle all the NDIS billing and reporting." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 rounded-xl"
                    style={{ background: '#f0f9fa' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black text-white"
                      style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{item.title}</div>
                      <div className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: '#f0f9fa' }} ref={faqSection.ref}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Do I need to pay anything out of pocket?",
                a: "No. All our services are funded through your NDIS plan. There are no out-of-pocket costs for NDIS-registered participants receiving NDIS-funded supports.",
              },
              {
                q: "What if my NDIS plan doesn't have enough funding?",
                a: "We'll work with you and your support coordinator to make the most of your available funding. We can also help you prepare for your next plan review to request additional funding if needed.",
              },
              {
                q: "Can I change my support worker?",
                a: "Absolutely. We believe in participant choice and control. If you're not happy with your support worker, simply let us know and we'll arrange a change.",
              },
              {
                q: "Are your prices negotiable?",
                a: "Our prices are set in line with the NDIS Price Guide. However, we can discuss flexible arrangements and package options to maximise the value of your funding.",
              },
            ].map((faq, i) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-white"
                style={{
                  boxShadow: '0 2px 10px rgba(27,58,92,0.06)',
                  opacity: faqSection.visible ? 1 : 0,
                  transform: faqSection.visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.4s ease ${i * 0.1}s`,
                }}
              >
                <h3 className="text-base font-bold mb-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: '#1B3A5C' }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get a Personalised Quote
          </h2>
          <p className="text-base mb-8" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Every participant's needs are different. Contact us for a free, no-obligation quote tailored to your NDIS plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105"
              style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
            >
              Get a Free Quote <ArrowRight className="w-5 h-5" />
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
