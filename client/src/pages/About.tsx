/*
 * AUSnew Support Services — About Page
 * Design: Empowered Living — team-focused, values-driven
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Heart, Shield, Users, Star, Phone } from "lucide-react";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/team_group-R2Dqsi6CPrEg6KoPbowcjQ.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/hero_banner-nNLePF7GeeoLT93j6drjKM.webp";

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

const values = [
  { icon: Heart, title: "Compassion", desc: "We genuinely care about every person we support. Empathy and kindness are at the heart of everything we do.", color: "#FF6B6B" },
  { icon: Shield, title: "Integrity", desc: "We operate with transparency, honesty, and accountability in all our interactions and service delivery.", color: "#2BBFCF" },
  { icon: Users, title: "Empowerment", desc: "We believe in the capacity of every person to live a full and meaningful life. We support, never take over.", color: "#1B3A5C" },
  { icon: Star, title: "Excellence", desc: "We hold ourselves to the highest standards of care, continuously improving to deliver the best outcomes.", color: "#FF6B6B" },
];

export default function About() {
  const valuesSection = useScrollReveal(0.1);
  const teamSection = useScrollReveal(0.1);
  const timelineSection = useScrollReveal(0.1);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ background: '#1B3A5C', minHeight: '420px' }}
        aria-label="About AUSnew hero"
      >
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="AUSnew team" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,58,92,0.95) 0%, rgba(43,191,207,0.3) 100%)' }} />
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            About AUSnew Support Services
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            A passionate team of disability support professionals dedicated to empowering people with disability to live the life they choose.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(27,58,92,0.2)' }}>
                <img src={ABOUT_IMG} alt="AUSnew Support Services team" className="w-full h-80 md:h-[450px] object-cover" />
              </div>
              <div className="absolute -bottom-5 -right-5 p-5 rounded-2xl shadow-xl"
                style={{ background: '#2BBFCF', color: 'white' }}>
                <div className="text-3xl font-black" style={{ fontFamily: 'Poppins, sans-serif' }}>2017</div>
                <div className="text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Proudly serving Australia</div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                Our Story
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                AUSnew Support Services was founded in 2017 with a simple but powerful mission: to provide high-quality, person-centred disability support that truly makes a difference in people's lives.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                We are a registered NDIS provider serving participants across Australia. Our team of dedicated support workers, coordinators, and management staff share a common passion — empowering people with disability to live independently and with dignity.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Over the years, we have grown from a small team to a trusted provider supporting hundreds of participants. But our core values have never changed: compassion, integrity, empowerment, and excellence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "10,000+", label: "Hours of Support" },
                  { value: "7+", label: "Years Experience" },
                  { value: "50+", label: "Support Workers" },
                  { value: "4", label: "Core Services" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl text-center"
                    style={{ background: '#f0f9fa' }}>
                    <div className="text-2xl font-black mb-1" style={{ color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>{stat.value}</div>
                    <div className="text-xs" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16" style={{ background: '#f0f9fa' }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl"
              style={{ background: '#1B3A5C', color: 'white' }}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-black mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Our Mission</h3>
              <p className="text-base leading-relaxed" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
                To deliver exceptional, person-centred disability support services that empower individuals to achieve their goals, live independently, and participate fully in their communities.
              </p>
            </div>
            <div className="p-8 rounded-3xl"
              style={{ background: '#2BBFCF', color: 'white' }}>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-black mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Our Vision</h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, sans-serif' }}>
                A community where every person with disability has the opportunity, support, and freedom to live the life they choose — with dignity, independence, and joy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white" ref={valuesSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-black mb-10 text-center" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e8f4f6',
                    opacity: valuesSection.visible ? 1 : 0,
                    transform: valuesSection.visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${value.color}15` }}>
                    <Icon className="w-7 h-7" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{value.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NDIS Registration */}
      <section className="py-12" style={{ background: '#1B3A5C' }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Registered NDIS Provider
              </h2>
              <p style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }} className="text-sm max-w-xl">
                AUSnew Support Services is a registered NDIS provider, meeting all NDIS Quality and Safeguards Commission requirements. You can trust us to deliver safe, high-quality, and compliant support services.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {["NDIS Registered", "Quality & Safeguards Compliant", "Working With Children Check", "Police Check Verified"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-black mb-5" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Ready to Work With Us?
          </h2>
          <p className="text-base mb-8" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            Join hundreds of participants who trust AUSnew Support Services to help them live their best life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105"
              style={{ background: '#FF6B6B', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 25px rgba(255,107,107,0.3)' }}
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:0291594976"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{ background: '#1B3A5C', color: 'white', fontFamily: 'Poppins, sans-serif' }}
            >
              <Phone className="w-5 h-5" /> (02) 9159 4976
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
