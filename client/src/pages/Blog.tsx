/*
 * AUSnew Support Services — Blog Page
 * Design: Empowered Living — clean, readable blog layout
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";

const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/community_access-akaNJq2n7GsWugNyec3gQZ.webp";
const DAILY_LIFE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/daily_life-L5UDybDMfYQF4FrksVwCuA.webp";
const ACCOMMODATION_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/accommodation_hero-ZqhR9LesyVP4JmnMrYNmgP.webp";
const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/ndis_about-5588JiupuU7m9jyMGZdGPV.webp";

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

const posts = [
  {
    title: "Understanding the 2025-26 NDIS Price Guide: What You Need to Know",
    excerpt: "The NDIS has released its 2025-26 Price Guide with updated rates for support services. Here's a breakdown of the key changes and what they mean for participants and providers.",
    category: "NDIS Updates",
    date: "March 15, 2026",
    readTime: "5 min read",
    img: ACCOMMODATION_IMG,
    color: "#1B3A5C",
  },
  {
    title: "How Community Access Support Can Transform Your Social Life",
    excerpt: "Isolation is one of the biggest challenges faced by people with disability. Discover how community access support can open doors to new friendships, activities, and opportunities.",
    category: "Community Access",
    date: "February 28, 2026",
    readTime: "4 min read",
    img: COMMUNITY_IMG,
    color: "#2BBFCF",
  },
  {
    title: "What is SDA? A Complete Guide to Specialist Disability Accommodation",
    excerpt: "SDA (Specialist Disability Accommodation) can be a game-changer for eligible NDIS participants. Learn what SDA is, who qualifies, and how to access it through your NDIS plan.",
    category: "Accommodation",
    date: "February 10, 2026",
    readTime: "7 min read",
    img: ABOUT_IMG,
    color: "#FF6B6B",
  },
  {
    title: "5 Tips for Getting the Most Out of Your NDIS Plan",
    excerpt: "Making the most of your NDIS funding can feel overwhelming. Our support coordinators share their top tips for maximising your plan and achieving your goals.",
    category: "NDIS Tips",
    date: "January 22, 2026",
    readTime: "6 min read",
    img: DAILY_LIFE_IMG,
    color: "#2BBFCF",
  },
  {
    title: "Person-Centred Care: What It Means and Why It Matters",
    excerpt: "Person-centred care is more than a buzzword — it's the foundation of quality disability support. Learn what it means in practice and how AUSnew puts it into action every day.",
    category: "Our Approach",
    date: "January 8, 2026",
    readTime: "4 min read",
    img: COMMUNITY_IMG,
    color: "#1B3A5C",
  },
  {
    title: "Preparing for Your NDIS Plan Review: A Step-by-Step Guide",
    excerpt: "Your NDIS plan review is an important opportunity to update your supports and funding. Here's how to prepare effectively and advocate for the support you need.",
    category: "NDIS Tips",
    date: "December 15, 2025",
    readTime: "8 min read",
    img: ACCOMMODATION_IMG,
    color: "#FF6B6B",
  },
];

export default function Blog() {
  const postsSection = useScrollReveal(0.05);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-20"
        style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)', minHeight: '320px' }}
        aria-label="Blog hero"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
            <BookOpen className="w-3.5 h-3.5" /> Resources & News
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Blog & Resources
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Helpful guides, NDIS updates, and insights to help you navigate the disability support system and live your best life.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(27,58,92,0.12)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img src={posts[0].img} alt={posts[0].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(27,58,92,0.3))' }} />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: '#2BBFCF', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center" style={{ background: '#f8fafc' }}>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                  {posts[0].category}
                </div>
                <h2 className="text-2xl font-black mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                  {posts[0].title}
                </h2>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs mb-5" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{posts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{posts[0].readTime}</span>
                </div>
                <button
                  className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                  style={{ color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
                  onClick={() => {}}
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12" style={{ background: '#f0f9fa' }} ref={postsSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-black mb-8" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.slice(1).map((post, i) => (
              <article
                key={post.title}
                className="rounded-2xl overflow-hidden bg-white group cursor-pointer"
                style={{
                  boxShadow: '0 4px 20px rgba(27,58,92,0.07)',
                  transition: 'all 0.4s ease',
                  opacity: postsSection.visible ? 1 : 0,
                  transform: postsSection.visible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(27,58,92,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(27,58,92,0.07)'; }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: post.color, color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                    {post.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold mb-2 line-clamp-2" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: '#2BBFCF' }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16" style={{ background: '#1B3A5C' }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stay Informed About NDIS Updates
          </h2>
          <p className="text-base mb-6" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Get the latest NDIS news, tips, and resources delivered to your inbox.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105"
            style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
          >
            Subscribe to Updates <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
