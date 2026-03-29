/*
 * AUSnew Support Services — Community Access Page
 * Design: Empowered Living — vibrant, community-focused
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Users, MapPin, Music, Heart, Bike, Coffee, Phone } from "lucide-react";

const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/van_harbour_e462bb57.jpg";

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

const activities = [
  { icon: Users, title: "Social Activities", desc: "Hobbies, recreation, sports, arts, and community programs like gardening or volunteering." },
  { icon: MapPin, title: "Transport Assistance", desc: "We'll help you get from A to B on public transport, safely and comfortably." },
  { icon: Coffee, title: "Appointments", desc: "Getting you to and from medical, school, or job appointments on time." },
  { icon: Music, title: "Arts & Culture", desc: "Explore creative pursuits, attend events, and engage with local cultural activities." },
  { icon: Bike, title: "Recreation & Leisure", desc: "Sports, fitness activities, and recreational programs tailored to your interests." },
  { icon: Heart, title: "Community Programs", desc: "Volunteering, community gardening, and programs that build meaningful connections." },
];

const benefits = [
  "Increased independence and confidence",
  "Meaningful social connections and friendships",
  "Improved mental health and wellbeing",
  "Skill development and personal growth",
  "Greater community participation and inclusion",
  "Support to try new activities and experiences",
];

export default function CommunityAccess() {
  const activitiesSection = useScrollReveal(0.1);
  const benefitsSection = useScrollReveal(0.1);
  const formSection = useScrollReveal(0.1);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ background: '#2BBFCF', minHeight: '420px' }}
        aria-label="Community Access hero"
      >
        <div className="absolute inset-0">
          <img src={COMMUNITY_IMG} alt="Community access activities" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(43,191,207,0.95) 0%, rgba(27,58,92,0.8) 100%)' }} />
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Community Access</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'Poppins, sans-serif' }}>
            <Users className="w-3.5 h-3.5" /> NDIS Community Access
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Community Access
          </h1>
          <p className="text-lg max-w-2xl text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}>
            Getting out and engaging with friends and the community is just as important as enjoying your home environment. We'll help ensure you lead a life that's active and meaningful.
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
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-5" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Live an Active, Connected Life
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Our Community Access support helps you participate in social, recreational, and community activities. Whether it's attending a local sports club, visiting friends, or exploring new hobbies — we're here to make it happen.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Our experienced support workers accompany you and provide the assistance you need to get out into your community and engage with life on your terms.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16" style={{ background: '#f0f9fa' }} ref={activitiesSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-black mb-10 text-center" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            What We Support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.title}
                  className="p-6 rounded-2xl bg-white"
                  style={{
                    boxShadow: '0 4px 20px rgba(27,58,92,0.07)',
                    opacity: activitiesSection.visible ? 1 : 0,
                    transform: activitiesSection.visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(43,191,207,0.1)' }}>
                    <Icon className="w-6 h-6" style={{ color: '#2BBFCF' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                    {activity.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                    {activity.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white" ref={benefitsSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                Benefits of Community Access Support
              </h2>
              <div className="space-y-3">
                {benefits.map((benefit, i) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                    style={{
                      opacity: benefitsSection.visible ? 1 : 0,
                      transform: benefitsSection.visible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.4s ease ${i * 0.08}s`,
                    }}
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#2BBFCF' }} />
                    <span className="text-sm" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(27,58,92,0.15)' }}>
              <img src={COMMUNITY_IMG} alt="Community access activities" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* NDIS Pricing Info */}
      <section className="py-12" style={{ background: '#1B3A5C' }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              NDIS Pricing for Community Access
            </h2>
            <p style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }} className="text-sm">
              2025-26 NDIS Price Guide rates
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Weekday Daytime", rate: "$70.23/hr" },
              { label: "Weekday Evening", rate: "$77.38/hr" },
              { label: "Saturday", rate: "$98.83/hr" },
              { label: "Sunday", rate: "$127.43/hr" },
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

      {/* Wufoo Enquiry Form */}
      <section className="py-20 bg-white" id="enquiry-form" ref={formSection.ref} aria-label="Community Access enquiry form">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Enquire Now
            </div>
            <h2 className="text-3xl font-black mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Community Access Enquiry
            </h2>
            <p className="text-base" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Complete the form below to schedule a call and discuss your NDIS support options. Our friendly team will be in touch as soon as possible.
            </p>
          </div>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              boxShadow: '0 20px 60px rgba(27,58,92,0.12)',
              border: '1px solid #e0f2f4',
              opacity: formSection.visible ? 1 : 0,
              transform: formSection.visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease',
            }}
          >
            <div className="p-2" style={{ background: '#f0f9fa' }}>
              {/* Wufoo Disability Support Services Form */}
              <iframe
                title="Community Access Enquiry Form"
                src="https://abnab.wufoo.com/embed/q1628kbm0ra99y1/"
                allowTransparency={true}
                frameBorder={0}
                scrolling="yes"
                style={{ width: '100%', height: '543px', border: 'none', background: 'transparent' }}
                aria-label="Community access enquiry form"
              />
            </div>
          </div>
          <p className="text-center text-sm mt-6" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
            Prefer to call? <a href="tel:0291594976" className="font-semibold hover:underline" style={{ color: '#2BBFCF' }}>(02) 9159 4976</a> or email{" "}
            <a href="mailto:support@ausnesupports.com.au" className="font-semibold hover:underline" style={{ color: '#2BBFCF' }}>support@ausnesupports.com.au</a>
          </p>
        </div>
      </section>
    </div>
  );
}
