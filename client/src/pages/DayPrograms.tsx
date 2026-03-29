/**
 * AUSnew Support Services — Day Programs Page
 * Design: Empowered Living — diagonal cuts, photography-forward, scroll animations
 * Colors: Navy #1B3A5C, Teal #2BBFCF, Coral #FF6B6B
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle, Phone, Calendar, Users, Star,
  Music, Palette, BookOpen, Dumbbell, Utensils, TreePine,
  Heart, Clock, MapPin, ChevronRight
} from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/day_programs_hero-RwurXfJQXm9BMT3hDYF6D6.webp";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/community_access_real-fn62gg6s3X8R6yapfLBqjx.webp";

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

const programs = [
  {
    icon: Palette,
    title: "Arts & Creativity",
    description: "Painting, drawing, pottery, and craft activities that encourage self-expression and build fine motor skills in a relaxed, supportive environment.",
    color: "#FF6B6B",
  },
  {
    icon: Music,
    title: "Music & Performance",
    description: "Singing, drumming, and music appreciation sessions that boost confidence, communication, and emotional wellbeing.",
    color: "#2BBFCF",
  },
  {
    icon: Dumbbell,
    title: "Fitness & Wellbeing",
    description: "Gentle exercise classes, yoga, swimming, and sports activities adapted to all abilities to promote physical health and energy.",
    color: "#1B3A5C",
  },
  {
    icon: BookOpen,
    title: "Life Skills & Learning",
    description: "Practical workshops covering cooking, budgeting, digital literacy, and other everyday skills that build independence.",
    color: "#FF6B6B",
  },
  {
    icon: TreePine,
    title: "Outdoor & Nature",
    description: "Gardening, nature walks, park outings, and outdoor adventures that connect participants with the natural world.",
    color: "#2BBFCF",
  },
  {
    icon: Utensils,
    title: "Cooking & Nutrition",
    description: "Fun, hands-on cooking sessions where participants learn to prepare healthy meals, building confidence in the kitchen.",
    color: "#1B3A5C",
  },
  {
    icon: Users,
    title: "Social Groups",
    description: "Structured social activities, games, and group outings designed to build friendships and reduce social isolation.",
    color: "#FF6B6B",
  },
  {
    icon: Star,
    title: "Excursions & Events",
    description: "Regular community excursions to local attractions, events, and experiences that broaden horizons and create lasting memories.",
    color: "#2BBFCF",
  },
];

const benefits = [
  { icon: Heart, title: "Improved Wellbeing", desc: "Regular social engagement and meaningful activity significantly improve mental health and overall quality of life." },
  { icon: Users, title: "Social Connection", desc: "Build genuine friendships and a sense of belonging within a warm, inclusive community." },
  { icon: Star, title: "Skill Development", desc: "Structured programs designed to build practical life skills, creativity, and personal confidence." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Programs available across multiple days and times to fit your NDIS plan and personal schedule." },
  { icon: MapPin, title: "Accessible Locations", desc: "Programs held in accessible venues across Australia, with transport support available." },
  { icon: Calendar, title: "NDIS Funded", desc: "Day programs can be funded through your NDIS plan under Capacity Building or Core Supports." },
];

export default function DayPrograms() {
  const heroSection = useScrollReveal(0.1);
  const programsSection = useScrollReveal(0.1);
  const benefitsSection = useScrollReveal(0.1);
  const formSection = useScrollReveal(0.1);

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative min-h-[70vh] flex items-center pt-20"
        style={{ background: '#1B3A5C' }}
        aria-label="Day Programs hero"
      >
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="AUSnew Day Programs — participants in a creative activity session"
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,58,92,0.95) 0%, rgba(27,58,92,0.7) 50%, rgba(43,191,207,0.3) 100%)' }} />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.4)', fontFamily: 'Poppins, sans-serif' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
              NDIS Funded Day Programs — Australia-Wide
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              Day Programs That{" "}
              <span style={{ color: '#2BBFCF' }}>Inspire & Connect</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl"
              style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
              Our structured day programs offer meaningful activities, social connection, and skill-building opportunities — all in a safe, inclusive, and fun environment designed around your interests and goals.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: '#FF6B6B', fontFamily: 'Poppins, sans-serif', boxShadow: '0 8px 30px rgba(255,107,107,0.4)' }}
              >
                Enquire About Day Programs <ArrowRight className="w-5 h-5" />
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

            <div className="flex flex-wrap gap-4">
              {["NDIS Funded", "All Abilities Welcome", "Australia-Wide", "Person-Centred"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm"
                  style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#2BBFCF' }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section className="py-20 bg-white" ref={heroSection.ref} aria-label="About Day Programs">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div
              style={{
                opacity: heroSection.visible ? 1 : 0,
                transform: heroSection.visible ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'all 0.7s ease',
              }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                What Are Day Programs?
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                More Than Activities — A Community to Belong To
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                AUSnew Day Programs provide structured, engaging activities for adults with disability in a welcoming group setting. Our programs are designed to build skills, foster friendships, and support participants to live their best lives.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Whether you're interested in arts, fitness, cooking, music, or social outings — we have something for everyone. All programs are person-centred, meaning we work with you to tailor activities to your interests, goals, and NDIS plan.
              </p>
              <div className="space-y-3">
                {[
                  "Available Monday to Friday with flexible scheduling",
                  "Funded through NDIS Core Supports or Capacity Building",
                  "Qualified and trained support workers at all sessions",
                  "Transport assistance available for eligible participants",
                  "Safe, accessible, and inclusive environments",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#2BBFCF' }} />
                    <span className="text-sm" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative"
              style={{
                opacity: heroSection.visible ? 1 : 0,
                transform: heroSection.visible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 0.7s ease 0.2s',
              }}
            >
              <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(27,58,92,0.2)' }}>
                <img
                  src={COMMUNITY_IMG}
                  alt="AUSnew Day Programs participants"
                  className="w-full h-80 md:h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl shadow-xl"
                style={{ background: '#2BBFCF', color: 'white', maxWidth: '220px' }}>
                <div className="text-3xl font-black" style={{ fontFamily: 'Poppins, sans-serif' }}>8+</div>
                <div className="text-sm font-medium mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Program types tailored to your interests and goals
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS GRID ===== */}
      <section
        className="py-20"
        style={{ background: '#f0f9fa' }}
        aria-label="Our day programs"
        ref={programsSection.ref}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Program Types
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Something for Everyone
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
              Our diverse range of programs caters to all interests, abilities, and goals. Activities are adapted to ensure everyone can participate fully and meaningfully.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.title}
                  className="p-6 rounded-2xl group hover:shadow-xl transition-all duration-300"
                  style={{
                    background: 'white',
                    border: '1px solid #e8f4f6',
                    opacity: programsSection.visible ? 1 : 0,
                    transform: programsSection.visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.5s ease ${i * 0.08}s`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${program.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: program.color }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                    {program.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                    {program.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS SECTION ===== */}
      <section className="py-20 bg-white" aria-label="Benefits of Day Programs" ref={benefitsSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Why Day Programs?
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              The Benefits of Structured Day Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex items-start gap-5 p-6 rounded-2xl"
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e8f4f6',
                    opacity: benefitsSection.visible ? 1 : 0,
                    transform: benefitsSection.visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(43,191,207,0.1)' }}>
                    <Icon className="w-6 h-6" style={{ color: '#2BBFCF' }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== NDIS FUNDING INFO ===== */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)' }}
        aria-label="NDIS funding information"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                NDIS Funding
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                How Are Day Programs Funded Through NDIS?
              </h2>
              <p className="text-base mb-6" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
                Day programs can be funded through your NDIS plan under two main support categories, depending on your goals and plan type.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Core Supports", desc: "Assistance with Social, Economic & Community Participation (Category 4) — covers participation in day programs and social activities." },
                  { label: "Capacity Building", desc: "Increased Social & Community Participation (Category 9) — covers skill-building programs designed to increase your independence." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#2BBFCF' }} />
                    <div>
                      <div className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.label}</div>
                      <div className="text-xs" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Not sure if your NDIS plan covers day programs? Our team can help you understand your funding options.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#enquiry-form"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
                >
                  Get Free Advice <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:0291594976"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '2px solid rgba(255,255,255,0.3)', fontFamily: 'Poppins, sans-serif' }}
                >
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ENQUIRY FORM ===== */}
      <section
        id="enquiry-form"
        className="py-20"
        style={{ background: '#f0f9fa' }}
        aria-label="Day Programs enquiry form"
        ref={formSection.ref}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            style={{
              opacity: formSection.visible ? 1 : 0,
              transform: formSection.visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s ease',
            }}
          >
            <div className="text-center mb-10">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                Get Started
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                Enquire About Our Day Programs
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                Complete the form below to schedule a call and discuss your NDIS support options. Our friendly team will be in touch as soon as possible.
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden p-2" style={{ background: 'white', boxShadow: '0 20px 60px rgba(27,58,92,0.12)' }}>
              <iframe
                title="Day Programs Enquiry Form"
                src="https://abnab.wufoo.com/embed/q1628kbm0ra99y1/"
                allowTransparency={true}
                frameBorder={0}
                scrolling="yes"
                style={{ width: '100%', height: '600px', border: 'none', background: 'transparent' }}
                aria-label="Day programs enquiry form"
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                Prefer to call? Reach us on{" "}
                <a href="tel:0291594976" className="font-semibold hover:underline" style={{ color: '#2BBFCF' }}>
                  (02) 9159 4976
                </a>{" "}
                or email{" "}
                <a href="mailto:support@ausnesupports.com.au" className="font-semibold hover:underline" style={{ color: '#2BBFCF' }}>
                  support@ausnesupports.com.au
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="py-16 bg-white" aria-label="Other services">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Explore Our Other Services
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            AUSnew provides a full range of NDIS supports to help you live independently and thrive.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/accommodation-services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              Accommodation Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/community-access"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Community Access <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/assistance-daily-life"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background: '#FF6B6B', fontFamily: 'Poppins, sans-serif' }}>
              Assistance with Daily Life <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
