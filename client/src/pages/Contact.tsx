/*
 * AUSnew Support Services — Contact Page
 * Design: Empowered Living — clean contact form with Wufoo embed
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

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

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "(02) 9159 4976",
    href: "tel:0291594976",
    color: "#2BBFCF",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@ausnewhomecare.com",
    href: "mailto:support@ausnewhomecare.com",
    color: "#1B3A5C",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Mount Druitt, Sydney NSW 2770",
    href: "https://maps.google.com/?q=Mount+Druitt+NSW+2770",
    color: "#FF6B6B",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon–Fri: 9am–5pm | Support: 24/7",
    href: null,
    color: "#2BBFCF",
  },
];

export default function Contact() {
  const formSection = useScrollReveal(0.1);
  const infoSection = useScrollReveal(0.1);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-20"
        style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)', minHeight: '320px' }}
        aria-label="Contact hero"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
            <MessageCircle className="w-3.5 h-3.5" /> Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Contact Us
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            We're here to help. Whether you have questions about our services, need to discuss your NDIS plan, or want to get started — reach out today.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white" ref={infoSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e8f4f6',
                    opacity: infoSection.visible ? 1 : 0,
                    transform: infoSection.visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.4s ease ${i * 0.1}s`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${item.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div className="text-sm font-bold mb-1" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{item.title}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm transition-colors hover:underline"
                      style={{ color: item.color, fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{item.value}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Form + Info */}
      <section className="py-16" style={{ background: '#f0f9fa' }} ref={formSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div
              className="lg:col-span-3"
              style={{
                opacity: formSection.visible ? 1 : 0,
                transform: formSection.visible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.6s ease',
              }}
            >
              <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                Disability Support Services Enquiry
              </h2>
              <p className="text-sm" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Fill in the form and our support team will get back to you within 24 hours.
              </p>
              </div>

              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  boxShadow: '0 20px 60px rgba(27,58,92,0.1)',
                  border: '1px solid #e0f2f4',
                  background: 'white',
                }}
              >
                <div className="p-2">
                  {/* Wufoo Disability Support Services Form */}
                  <iframe
                    title="Disability Support Services Enquiry"
                    src="https://abnab.wufoo.com/embed/q1628kbm0ra99y1/"
                    allowTransparency={true}
                    frameBorder={0}
                    scrolling="yes"
                    style={{ width: '100%', height: '600px', border: 'none', background: 'transparent' }}
                    aria-label="Disability support services enquiry form"
                  />
                </div>
              </div>
            </div>

            {/* Side Info */}
            <div
              className="lg:col-span-2 space-y-6"
              style={{
                opacity: formSection.visible ? 1 : 0,
                transform: formSection.visible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.6s ease 0.2s',
              }}
            >
              {/* Quick Links */}
              <div className="p-6 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(27,58,92,0.07)' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                  Enquire About Our Services
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Accommodation Services", href: "/accommodation-services#enquiry-form", color: "#1B3A5C" },
                    { name: "Community Access", href: "/community-access", color: "#2BBFCF" },
                    { name: "Assistance with Daily Life", href: "/assistance-daily-life", color: "#FF6B6B" },
                    { name: "NDIS Pricing", href: "/ndis-pricing", color: "#1B3A5C" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                      style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-sm font-medium" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Emergency */}
              <div className="p-6 rounded-2xl"
                style={{ background: '#1B3A5C', color: 'white' }}>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Need Urgent Support?
                </h3>
                <p className="text-sm mb-4" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
                  Our support line is available 24 hours a day, 7 days a week for urgent matters.
                </p>
                <a
                  href="tel:0291594976"
                  className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif', display: 'inline-flex' }}
                >
                  <Phone className="w-4 h-4" />
                  Call (02) 9159 4976
                </a>
              </div>

              {/* Social */}
              <div className="p-6 rounded-2xl bg-white" style={{ boxShadow: '0 4px 20px rgba(27,58,92,0.07)' }}>
                <h3 className="text-base font-bold mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/ausnewhomecare/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                    style={{ background: '#1877F2', color: 'white', fontFamily: 'Poppins, sans-serif' }}
                  >
                    Facebook
                  </a>
                  <a
                    href="https://au.linkedin.com/company/ausnewsupportservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                    style={{ background: '#0A66C2', color: 'white', fontFamily: 'Poppins, sans-serif' }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
