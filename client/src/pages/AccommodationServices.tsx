/*
 * AUSnew Support Services — Accommodation Services Page
 * Redesigned: auto-rotating property carousel, no location details, centred lead form
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Home, ChevronLeft, ChevronRight, Send, Phone, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const CAROUSEL_IMAGES = [
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/horsley_living_room_a02d578e.jpg", alt: "Modern SDA property — spacious open living area" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/horsley_open_plan_61f12aa9.jpg", alt: "SDA property — open-plan living and dining" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/horsley_studio_best_fb4afb85.jpg", alt: "SDA property — accessible bedroom suite" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/abbotsbury_kitchen_de1bc7bf.jpg", alt: "SDA property — modern accessible kitchen" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/abbotsbury_bathroom_60246064.jpg", alt: "SDA property — luxury accessible bathroom" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/glenfield_kitchen_b66a263a.jpg", alt: "SDA property — bright kitchen and dining space" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/warragul_hallway_5573b7c2.jpg", alt: "SDA property — wide accessible hallway" },
  { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/warragul_bathroom_5f9c03f6.jpg", alt: "SDA property — modern accessible bathroom" },
];

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/warragul_exterior_0abf4107.jpg";

const FEATURES = [
  "SDA (Specialist Disability Accommodation) approved housing",
  "SIL (Supported Independent Living) options available",
  "Short Term Accommodation (STA) / Respite care",
  "Modern, purpose-built accessible homes",
  "Shared living or solo living options",
  "24-hour support available",
  "Properties available across Australia",
  "NDIS-funded accommodation pathways",
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function AccommodationServices() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", ndisNumber: "", supportType: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const featuresSection = useScrollReveal(0.1);
  const carouselSection = useScrollReveal(0.05);
  const formSection = useScrollReveal(0.05);

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => { setSubmitted(true); toast.success("Enquiry received! Our team will be in touch shortly."); },
    onError: () => { toast.error("Something went wrong. Please try again or call us directly."); },
  });

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => { setCurrent(c => (c + 1) % CAROUSEL_IMAGES.length); setIsTransitioning(false); }, 400);
    }, 4000);
  };

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const goTo = (idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => { setCurrent(idx); setIsTransitioning(false); }, 300);
    startTimer();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate({
      name: form.name, phone: form.phone, email: form.email,
      message: `Support type: ${form.supportType || "Not specified"}. NDIS: ${form.ndisNumber || "Not provided"}. ${form.message}`,
      sourcePage: "Accommodation Services",
      ndisNumber: form.ndisNumber,
      supportType: form.supportType,
    });
  };

  return (
    <div className="overflow-x-hidden pt-20">

      {/* Hero */}
      <section className="relative py-24 flex items-center" style={{ background: '#1B3A5C', minHeight: '420px' }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="AUSnew SDA property exterior" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,58,92,0.97) 0%, rgba(27,58,92,0.65) 100%)' }} />
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
          <p className="text-lg max-w-2xl mb-8" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Quality SDA and SIL housing across Australia. Modern, accessible homes where you can live with independence, comfort, and the right level of support.
          </p>
          <a href="#enquiry-form" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
            style={{ background: '#FF6B6B', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 25px rgba(255,107,107,0.35)' }}>
            Find Your Home <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white" ref={featuresSection.ref}>
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Quality Homes Across Australia
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-10" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            AUSnew Support Services has several properties available across Australia for eligible NDIS participants. Our homes are purpose-built, modern, and fully accessible — designed so you can live the life you choose.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto"
            style={{ opacity: featuresSection.visible ? 1 : 0, transform: featuresSection.visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: '#f0f9fa' }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2BBFCF' }} />
                <span className="text-sm font-medium" style={{ color: '#334155', fontFamily: 'Inter, sans-serif' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Carousel */}
      <section className="py-16" style={{ background: '#f8fafc' }} ref={carouselSection.ref}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              A Glimpse Inside Our Properties
            </h2>
            <p className="text-base" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Modern, accessible, and purpose-built — our homes are designed for comfort and independence.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden"
            style={{ height: '480px', boxShadow: '0 25px 60px rgba(27,58,92,0.18)', opacity: carouselSection.visible ? 1 : 0, transform: carouselSection.visible ? 'scale(1)' : 'scale(0.97)', transition: 'all 0.7s ease' }}>
            {CAROUSEL_IMAGES.map((img, i) => (
              <div key={i} className="absolute inset-0"
                style={{ opacity: i === current ? (isTransitioning ? 0 : 1) : 0, transition: 'opacity 0.4s ease', zIndex: i === current ? 1 : 0 }}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,58,92,0.4) 0%, transparent 50%)' }} />
              </div>
            ))}
            <button onClick={() => goTo((current - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full text-white transition-all hover:scale-110"
              style={{ background: 'rgba(27,58,92,0.7)', backdropFilter: 'blur(4px)' }} aria-label="Previous image">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => goTo((current + 1) % CAROUSEL_IMAGES.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full text-white transition-all hover:scale-110"
              style={{ background: 'rgba(27,58,92,0.7)', backdropFilter: 'blur(4px)' }} aria-label="Next image">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-center gap-2">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all"
                  style={{ width: i === current ? '24px' : '8px', height: '8px', background: i === current ? '#2BBFCF' : 'rgba(255,255,255,0.5)' }}
                  aria-label={`Go to image ${i + 1}`} />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm mb-4" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Interested in finding a suitable property? Fill in the enquiry form below and our team will be in touch.
            </p>
            <a href="#enquiry-form" className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white transition-all hover:scale-105 text-sm"
              style={{ background: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Enquire About Availability <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Lead Enquiry Form */}
      <section className="py-20 bg-white" id="enquiry-form" ref={formSection.ref}>
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.12)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Find Your Home
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Accommodation Enquiry
            </h2>
            <p className="text-base" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Tell us a little about yourself and what you're looking for. Our team will reach out to discuss suitable options across our properties Australia-wide.
            </p>
          </div>

          <div className="rounded-3xl p-8 md:p-10"
            style={{ boxShadow: '0 20px 60px rgba(27,58,92,0.12)', border: '1px solid #e0f2f4', background: 'white', opacity: formSection.visible ? 1 : 0, transform: formSection.visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease' }}>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(43,191,207,0.12)' }}>
                  <CheckCircle className="w-8 h-8" style={{ color: '#2BBFCF' }} />
                </div>
                <h3 className="text-2xl font-black mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>Enquiry Received!</h3>
                <p className="text-base mb-6" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                  Thank you for reaching out. A member of our team will contact you shortly to discuss suitable accommodation options.
                </p>
                <a href="tel:0291594976" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#2BBFCF' }}>
                  <Phone className="w-4 h-4" /> (02) 9159 4976
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>Full Name <span style={{ color: '#FF6B6B' }}>*</span></label>
                    <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1.5px solid #e2e8f0', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}
                      onFocus={e => (e.target.style.borderColor = '#2BBFCF')} onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>Phone Number <span style={{ color: '#FF6B6B' }}>*</span></label>
                    <input type="tel" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="04XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1.5px solid #e2e8f0', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}
                      onFocus={e => (e.target.style.borderColor = '#2BBFCF')} onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>Email Address <span style={{ color: '#FF6B6B' }}>*</span></label>
                  <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1.5px solid #e2e8f0', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}
                    onFocus={e => (e.target.style.borderColor = '#2BBFCF')} onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>NDIS Number <span className="font-normal text-xs" style={{ color: '#94a3b8' }}>(optional)</span></label>
                    <input type="text" value={form.ndisNumber} onChange={e => setForm(f => ({ ...f, ndisNumber: e.target.value }))} placeholder="43XXXXXXX"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1.5px solid #e2e8f0', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}
                      onFocus={e => (e.target.style.borderColor = '#2BBFCF')} onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>Accommodation Type</label>
                    <select value={form.supportType} onChange={e => setForm(f => ({ ...f, supportType: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none"
                      style={{ border: '1.5px solid #e2e8f0', fontFamily: 'Inter, sans-serif', color: form.supportType ? '#1e293b' : '#94a3b8', background: 'white' }}
                      onFocus={e => (e.target.style.borderColor = '#2BBFCF')} onBlur={e => (e.target.style.borderColor = '#e2e8f0')}>
                      <option value="">Select type...</option>
                      <option value="SDA">SDA — Specialist Disability Accommodation</option>
                      <option value="SIL">SIL — Supported Independent Living</option>
                      <option value="STA">STA — Short Term / Respite</option>
                      <option value="Not sure">Not sure — need guidance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>Tell Us About Your Needs</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Any additional details about your situation, support needs, or preferred location area..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ border: '1.5px solid #e2e8f0', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}
                    onFocus={e => (e.target.style.borderColor = '#2BBFCF')} onBlur={e => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
                <button type="submit" disabled={submitLead.isPending}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #2BBFCF 100%)', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 30px rgba(27,58,92,0.25)' }}>
                  {submitLead.isPending ? (
                    <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> Sending Enquiry...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Submit Accommodation Enquiry</>
                  )}
                </button>
                <p className="text-xs text-center" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                  Your information is kept strictly confidential and will only be used to assist with your accommodation enquiry.
                </p>
              </form>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a href="tel:0291594976" className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>
              <Phone className="w-4 h-4" style={{ color: '#2BBFCF' }} /> (02) 9159 4976
            </a>
            <span className="hidden sm:block w-px h-4" style={{ background: '#cbd5e1' }} />
            <a href="mailto:info@ausnewsupports.com.au" className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#1B3A5C', fontFamily: 'Inter, sans-serif' }}>
              <Mail className="w-4 h-4" style={{ color: '#2BBFCF' }} /> info@ausnewsupports.com.au
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
