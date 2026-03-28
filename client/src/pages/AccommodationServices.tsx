/*
 * AUSnew Support Services — Accommodation Services Page
 * Design: Empowered Living — photography-forward, Wufoo form embedded
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, MapPin, Phone, Home, Star, Users, Shield } from "lucide-react";

const ACCOMMODATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/accommodation_hero-ZqhR9LesyVP4JmnMrYNmgP.webp";
const STMARYS_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/stmarys_1_91f61127.jpg";
const STMARYS_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/stmarys_2_0b9cc898.jpg";
const STMARYS_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/stmarys_3_83eaffb2.jpg";
const STMARYS_4 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/stmarys_4_80025952.jpg";
const STMARYS_5 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/stmarys_5_67e38e3f.jpg";
const STMARYS_6 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/stmarys_6_b73dd6fc.jpg";

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

const features = [
  "SDA (Specialist Disability Accommodation) approved housing",
  "SIL (Supported Independent Living) options available",
  "Short Term Accommodation (STA) / Respite care",
  "Modern, purpose-built accessible homes",
  "Shared living (up to 5 participants) or solo options",
  "24-hour support available",
  "Properties available across Australia for eligible NDIS participants",
  "NDIS-funded accommodation pathways",
];

const propertyImages = [
  { src: STMARYS_1, alt: "AUSnew property - living room" },
  { src: STMARYS_2, alt: "AUSnew property - kitchen" },
  { src: STMARYS_3, alt: "AUSnew property - bedroom" },
  { src: STMARYS_4, alt: "AUSnew property - bathroom" },
  { src: STMARYS_5, alt: "AUSnew property - exterior" },
  { src: STMARYS_6, alt: "AUSnew property - dining area" },
];

export default function AccommodationServices() {
  const featuresSection = useScrollReveal(0.1);
  const gallerySection = useScrollReveal(0.1);
  const formSection = useScrollReveal(0.1);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-24 flex items-center"
        style={{ background: '#1B3A5C', minHeight: '420px' }}
        aria-label="Accommodation Services hero"
      >
        <div className="absolute inset-0">
          <img src={ACCOMMODATION_IMG} alt="Modern SDA accommodation" className="w-full h-full object-cover" style={{ opacity: 0.25 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,58,92,0.95) 0%, rgba(27,58,92,0.6) 100%)' }} />
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-[#2BBFCF] transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: '#2BBFCF' }}>Accommodation Services</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
            <Home className="w-3.5 h-3.5" /> NDIS Accommodation
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Accommodation Services
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Quality SDA and SIL housing across Australia. Modern, accessible homes where you can live with independence, comfort, and the right level of support.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* What is SDA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                What is SDA?
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                <strong>Specialist Disability Accommodation (SDA)</strong> is NDIA-approved housing for NDIS participants who require specialised housing solutions due to extreme functional impairment or very high support needs.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                SDA homes can be houses, apartments, units, or other building types. They are designed with accessibility features to support participants' daily living and allow their support workers to deliver care more effectively.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Often, SDA homes are shared between a maximum of 5 participants. There is also an option to live by yourself or with people without disabilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#enquiry-form"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ background: '#FF6B6B', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 25px rgba(255,107,107,0.3)' }}
                >
                  Enquire Now <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:0291594976"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{ background: '#1B3A5C', color: 'white', fontFamily: 'Poppins, sans-serif' }}
                >
                  <Phone className="w-4 h-4" /> Call Us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Home, title: "SDA Housing", desc: "Purpose-built accessible homes" },
                { icon: Users, title: "SIL Support", desc: "Supported Independent Living" },
                { icon: Star, title: "STA / Respite", desc: "Short term accommodation" },
                { icon: Shield, title: "24/7 Care", desc: "Round-the-clock support" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-5 rounded-2xl text-center"
                    style={{ background: '#f0f9fa', border: '1px solid #e0f2f4' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'rgba(43,191,207,0.15)' }}>
                      <Icon className="w-5 h-5" style={{ color: '#2BBFCF' }} />
                    </div>
                    <div className="text-sm font-bold mb-1" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{item.title}</div>
                    <div className="text-xs" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16" style={{ background: '#f0f9fa' }} ref={featuresSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-center" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            What Our Accommodation Services Include
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={feature}
                className="flex items-start gap-3 p-4 rounded-xl bg-white"
                style={{
                  opacity: featuresSection.visible ? 1 : 0,
                  transform: featuresSection.visible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.4s ease ${i * 0.07}s`,
                  boxShadow: '0 2px 10px rgba(27,58,92,0.06)',
                }}
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2BBFCF' }} />
                <span className="text-sm" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section className="py-16 bg-white" ref={gallerySection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Our Properties
          </h2>
          <p className="text-base text-center mb-10" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            Professional, accessible homes — Australia-Wide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {propertyImages.map((img, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  height: '220px',
                  opacity: gallerySection.visible ? 1 : 0,
                  transform: gallerySection.visible ? 'scale(1)' : 'scale(0.95)',
                  transition: `all 0.5s ease ${i * 0.1}s`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-12" style={{ background: '#1B3A5C' }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-black text-white text-center mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Our Property Locations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["St Marys, NSW", "Horsley Park, NSW", "Plumpton, NSW", "Moorebank, NSW"].map((loc) => (
              <div key={loc} className="flex items-center gap-2 p-4 rounded-xl text-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#2BBFCF' }} />
                <span className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wufoo Enquiry Form */}
      <section className="py-20 bg-white" id="enquiry-form" ref={formSection.ref} aria-label="Accommodation enquiry form">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Enquire Now
            </div>
            <h2 className="text-3xl font-black mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Accommodation Services Enquiry
            </h2>
            <p className="text-base" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Fill in the form below and our team will be in touch within 24 hours.
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
              {/* Wufoo Form Embed */}
              <iframe
                title="Accommodation Services Enquiry Form"
                src="https://abnab.wufoo.com/embed/x1cw6qtz11uk4s9/"
                allowTransparency={true}
                frameBorder={0}
                scrolling="yes"
                style={{ width: '100%', height: '544px', border: 'none', background: 'transparent' }}
                aria-label="Accommodation services enquiry form"
              />
            </div>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
            Prefer to call? <a href="tel:0291594976" className="font-semibold hover:underline" style={{ color: '#2BBFCF' }}>(02) 9159 4976</a> or email{" "}
            <a href="mailto:support@ausnewhomecare.com" className="font-semibold hover:underline" style={{ color: '#2BBFCF' }}>support@ausnewhomecare.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
