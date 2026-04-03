/*
 * AUSnew Support Services — Home Page
 * Design: Empowered Living — diagonal cuts, photography-forward, scroll animations
 * Colors: Navy #1B3A5C, Teal #2BBFCF, Coral #FF6B6B
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowRight, CheckCircle, Home as HomeIcon, Users, Heart, Star, ChevronRight, Phone, Award, Shield, Clock } from "lucide-react";

// CDN URLs
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/hero_banner-nNLePF7GeeoLT93j6drjKM.webp";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/community_access_real-fn62gg6s3X8R6yapfLBqjx.webp";
const DAILY_LIFE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/daily_life-L5UDybDMfYQF4FrksVwCuA.webp";
const ACCOMMODATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/accommodation_hero-ZqhR9LesyVP4JmnMrYNmgP.webp";
const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/team_hq_final_v2_9d417be0.png";
const HORSLEY_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/horsley_living_room_a02d578e.jpg";
const HORSLEY_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/horsley_open_plan_61f12aa9.jpg";
const HORSLEY_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/horsley_studio_best_fb4afb85.jpg"; // Horsley studio/bedroom — Image 19
const VAN_HARBOUR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/van_harbour_e462bb57.jpg";
const CLIENT_ASSIST = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/openday_client_assist_c54c34e3.jpg";

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

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const step = target / 60;
    const t = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(n)); }, 25);
    return () => clearInterval(t);
  }, [active, target]);
  return count;
}

const services = [
  {
    icon: HomeIcon,
    title: "Accommodation Services",
    description: "Quality SDA and SIL housing options across Australia. Purpose-built, accessible homes designed for comfort, independence, and community connection.",
    href: "/accommodation-services",
    img: ACCOMMODATION_IMG,
    color: "#1B3A5C",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Get out, connect, and thrive. We support you to participate in social activities, appointments, and community programs that matter to you.",
    href: "/community-access",
    img: VAN_HARBOUR,
    color: "#2BBFCF",
  },
  {
    icon: Heart,
    title: "Assistance with Daily Life",
    description: "Personalised support for everyday activities — from personal care and meal preparation to domestic assistance and medication management.",
    href: "/assistance-daily-life",
    img: CLIENT_ASSIST,
    color: "#FF6B6B",
  },
  {
    icon: Star,
    title: "Day Programs",
    description: "Structured, engaging day programs that build skills, foster social connections, and promote independence in a fun, supportive environment.",
    href: "/day-programs",
    img: COMMUNITY_IMG,
    color: "#2BBFCF",
  },
];
const stats = [
  { value: 100000, suffix: "+", label: "Hours of Person-Centred Support Delivered Annually", icon: Heart },
  { value: 24, suffix: "/7", label: "On-Call Support Available", icon: Clock },
  { value: 50, suffix: "+", label: "Communities Served", icon: Users },
  { value: 8, suffix: "+", label: "Years Serving Australians With Disability", icon: Award },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "NDIS Participant",
    text: "AUSnew has completely transformed my life. The support workers are so caring and professional. I finally feel like I have the independence I deserve.",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Parent of Participant",
    text: "Finding AUSnew was the best decision for our family. They truly understand our son's needs and go above and beyond every single day.",
    rating: 5,
  },
  {
    name: "Maria L.",
    role: "NDIS Participant",
    text: "The accommodation services are incredible — modern, accessible, and I feel safe and supported. The team genuinely cares about my wellbeing.",
    rating: 5,
  },
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const statsSection = useScrollReveal(0.2);
  const servicesSection = useScrollReveal(0.1);
  const aboutSection = useScrollReveal(0.1);
  const testimonialsSection = useScrollReveal(0.1);
  const gallerySection = useScrollReveal(0.1);

  const stat0 = useCountUp(stats[0].value, statsSection.visible);
  const stat1 = useCountUp(stats[1].value, statsSection.visible);
  const stat2 = useCountUp(stats[2].value, statsSection.visible);
  const stat3 = useCountUp(stats[3].value, statsSection.visible);
  const statValues = [stat0, stat1, stat2, stat3];

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-screen flex items-center pt-20"
        style={{ background: '#1B3A5C' }}
        aria-label="Hero section"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="AUSnew Support Services - disability support worker with participant"
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,58,92,0.95) 0%, rgba(27,58,92,0.7) 50%, rgba(43,191,207,0.3) 100%)' }} />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 py-16">
          <div className="max-w-3xl">
            {/* NDIS badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.4)', fontFamily: 'Poppins, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
              NDIS Registered Provider — Australia-Wide
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              Quality Disability Care{" "}
              <span style={{ color: '#2BBFCF' }}>Without Compromise</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl"
              style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
              AUSnew Support Services empowers people with disability to live the life they choose. We provide personalised NDIS support across accommodation, community access, daily living, and day programs.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: '#FF6B6B', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 30px rgba(255,107,107,0.4)' }}
              >
                Get Support Now <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:0291594976"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.3)', fontFamily: 'Poppins, sans-serif', backdropFilter: 'blur(10px)' }}
              >
                <Phone className="w-5 h-5" />
                (02) 9159 4976
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4">
              {["NDIS Registered", "24/7 Support", "Australia-Wide", "Person-Centred Care"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm"
                  style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#2BBFCF' }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 bg-white" aria-label="Key statistics" ref={statsSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl transition-all duration-500"
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e8f4f6',
                    opacity: statsSection.visible ? 1 : 0,
                    transform: statsSection.visible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'rgba(43,191,207,0.1)' }}>
                    <Icon className="w-6 h-6" style={{ color: '#2BBFCF' }} />
                  </div>
                  <div className="text-3xl md:text-4xl font-black mb-1"
                    style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                    {statValues[i]}{stat.suffix}
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section
        className="py-20"
        style={{ background: '#f0f9fa' }}
        aria-label="Our services"
        ref={servicesSection.ref}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              What We Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Our 4 Core Services
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Everything we do stems from four pillars of support — designed to empower you to live independently and fully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-2xl overflow-hidden group cursor-pointer"
                  style={{
                    background: 'white',
                    boxShadow: '0 4px 20px rgba(27,58,92,0.08)',
                    transition: 'all 0.4s ease',
                    opacity: servicesSection.visible ? 1 : 0,
                    transform: servicesSection.visible ? 'translateY(0)' : 'translateY(40px)',
                    transitionDelay: `${i * 0.15}s`,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 25px 60px rgba(27,58,92,0.18)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(27,58,92,0.08)'; }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 50%, ${service.color}dd 100%)` }} />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.9)' }}>
                      <Icon className="w-5 h-5" style={{ color: service.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                      style={{ color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105"
              style={{ background: '#1B3A5C', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 30px rgba(27,58,92,0.3)' }}
            >
              Start Your NDIS Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-20 bg-white" aria-label="About AUSnew" ref={aboutSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div
              className="relative"
              style={{
                opacity: aboutSection.visible ? 1 : 0,
                transform: aboutSection.visible ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'all 0.7s ease',
              }}
            >
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(27,58,92,0.2)' }}>
                <img
                  src={ABOUT_IMG}
                  alt="AUSnew Support Services team"
                  className="w-full h-80 md:h-[450px] object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 p-5 rounded-2xl shadow-xl"
                style={{ background: '#2BBFCF', color: 'white', maxWidth: '200px' }}>
                <div className="text-3xl font-black" style={{ fontFamily: 'Poppins, sans-serif' }}>2017</div>
                <div className="text-sm font-medium mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Proudly serving the disability community
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              style={{
                opacity: aboutSection.visible ? 1 : 0,
                transform: aboutSection.visible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 0.7s ease 0.2s',
              }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                About AUSnew
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                A Community Where Everyone Lives the Life They Choose
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Founded in 2017, AUSnew Support Services is a registered NDIS provider. We are passionate about delivering high-quality, person-centred support that empowers individuals and families affected by disability.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Our approach is built on integrity, respect, and empowerment. We partner with participants to understand their unique needs and create meaningful, lasting change in their lives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "🎯", title: "Person-Centred", desc: "Your goals, your choices, your life" },
                  { icon: "🤝", title: "Strength-Based", desc: "Focus on abilities, not limitations" },
                  { icon: "🏆", title: "NDIS Registered", desc: "Fully accredited and compliant" },
                  { icon: "💙", title: "Compassionate Care", desc: "Genuine care for every participant" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: '#f8fafc' }}>
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-sm font-bold" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{item.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
                style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
              >
                Learn About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROPERTY GALLERY SECTION ===== */}
      <section
        className="py-20"
        style={{ background: '#1B3A5C' }}
        aria-label="Our properties"
        ref={gallerySection.ref}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Our Properties
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Modern, Accessible Homes Across Australia
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Our purpose-built properties are designed for comfort, accessibility, and independence — available across Australia for eligible NDIS participants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[HORSLEY_1, HORSLEY_2, HORSLEY_3].map((img, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{
                  height: '280px',
                  opacity: gallerySection.visible ? 1 : 0,
                  transform: gallerySection.visible ? 'scale(1)' : 'scale(0.95)',
                  transition: `all 0.6s ease ${i * 0.15}s`,
                }}
              >
                <img
                  src={img}
                  alt={`AUSnew property ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-70"
                  style={{ background: 'linear-gradient(to top, rgba(27,58,92,0.7) 0%, transparent 60%)' }} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/accommodation-services#enquiry-form"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105"
              style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 30px rgba(43,191,207,0.3)' }}
            >
              Enquire About Accommodation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-20 bg-white" aria-label="Testimonials" ref={testimonialsSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              What People Say
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Stories of Empowerment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="p-7 rounded-2xl"
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e8f4f6',
                  opacity: testimonialsSection.visible ? 1 : 0,
                  transform: testimonialsSection.visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s ease ${i * 0.15}s`,
                }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                  "{t.text}"
                </p>
                <div>
                  <div className="text-sm font-bold" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#2BBFCF', fontFamily: 'Inter, sans-serif' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NDIS PRICING CTA ===== */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)' }}
        aria-label="NDIS pricing information"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Understand Your NDIS Pricing
              </h2>
              <p className="text-base" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
                Transparent pricing aligned with the 2025-26 NDIS Price Guide. No hidden fees.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/ndis-pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
                style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
              >
                View NDIS Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/#enquiry-form"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '2px solid rgba(255,255,255,0.3)', fontFamily: 'Poppins, sans-serif' }}
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ENQUIRY FORM SECTION ===== */}
      <section
        id="enquiry-form"
        className="py-20 relative overflow-hidden"
        style={{ background: '#f0f9fa' }}
        aria-label="Enquiry form"
      >
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Complete the form below to schedule a call and discuss your NDIS support options. Our friendly team will be in touch as soon as possible.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden" style={{ background: 'white', boxShadow: '0 20px 60px rgba(27,58,92,0.12)' }}>
            <div className="p-2">
              <iframe
                title="Support Services Enquiry"
                src="https://abnab.wufoo.com/embed/q1628kbm0ra99y1/"
                frameBorder={0}
                scrolling="yes"
                style={{ width: '100%', height: '620px', border: 'none', background: 'transparent' }}
                aria-label="Support services enquiry form"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
              Prefer to call? Reach us on{" "}
              <a href="tel:0291594976" className="font-semibold hover:underline" style={{ color: '#2BBFCF' }}>
                (02) 9159 4976
              </a>{" "}
              or email{" "}
              <a href="mailto:info@ausnewsupports.com.au" className="font-semibold hover:underline" style={{ color: '#2BBFCF' }}>
                info@ausnewsupports.com.au
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
