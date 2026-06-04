/*
 * AUSnew Support Services — Individual Blog Post Page
 * Renders a single article published via Arvow webhook
 * Updated: Smart contextual CTA block — detects article topic and promotes relevant AUSnew service
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Tag, BookOpen, ArrowRight, Home, Users, Heart, Sun } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useRef } from "react";

// ─── Service CTA config ────────────────────────────────────────────────────────
type ServiceCTA = {
  label: string;
  tagline: string;
  description: string;
  servicePage: string;
  formUrl: string;
  formLabel: string;
  icon: React.ReactNode;
  accentColor: string;
  keywords: string[];
};

const SERVICE_CTAS: ServiceCTA[] = [
  {
    label: "Accommodation Services",
    tagline: "SDA & SIL Housing Across Australia",
    description:
      "AUSnew Support Services provides Specialist Disability Accommodation (SDA) and Supported Independent Living (SIL) across Australia. We have several properties available — our team can help match you with a suitable home that fits your NDIS plan and lifestyle.",
    servicePage: "/accommodation-services",
    formUrl: "https://abnab.wufoo.com/forms/x1cw6qtz11uk4s9/",
    formLabel: "Enquire About Accommodation",
    icon: <Home className="w-6 h-6" />,
    accentColor: "#2BBFCF",
    keywords: [
      "sda", "sil", "accommodation", "housing", "specialist disability accommodation",
      "supported independent living", "property", "residence", "dwelling", "home",
      "sta", "short term", "respite", "mta", "medium term",
    ],
  },
  {
    label: "Community Access",
    tagline: "Get Out, Connect & Participate",
    description:
      "AUSnew Support Services helps NDIS participants engage with their community — social outings, recreational activities, skill building, and more. Our support workers are passionate about helping you live the life you choose.",
    servicePage: "/community-access",
    formUrl: "https://www.ausnewsupports.com.au/community-access",
    formLabel: "Enquire About Community Access",
    icon: <Users className="w-6 h-6" />,
    accentColor: "#FF6B6B",
    keywords: [
      "community access", "social", "recreation", "outing", "participation",
      "community participation", "activities", "social skills", "inclusion",
      "community engagement",
    ],
  },
  {
    label: "Assistance with Daily Life",
    tagline: "Support for Everyday Living",
    description:
      "Our experienced support workers assist NDIS participants with daily tasks — personal care, meal preparation, household tasks, and building independence. We tailor support to your individual goals and NDIS plan.",
    servicePage: "/daily-life",
    formUrl: "https://www.ausnewsupports.com.au/contact",
    formLabel: "Enquire About Daily Life Support",
    icon: <Heart className="w-6 h-6" />,
    accentColor: "#1B3A5C",
    keywords: [
      "daily life", "daily living", "personal care", "household", "domestic",
      "meal", "cooking", "hygiene", "grooming", "independence", "adl",
      "assistance with daily", "core support",
    ],
  },
  {
    label: "Day Programs",
    tagline: "Structured Programs for Skill & Social Growth",
    description:
      "AUSnew Support Services runs structured day programs designed to build skills, confidence, and social connections. Our programs are tailored to individual needs and are available to NDIS participants across our service areas.",
    servicePage: "/day-programs",
    formUrl: "https://www.ausnewsupports.com.au/day-programs",
    formLabel: "Enquire About Day Programs",
    icon: <Sun className="w-6 h-6" />,
    accentColor: "#f59e0b",
    keywords: [
      "day program", "day service", "structured program", "group program",
      "skill development", "vocational", "life skills", "group activity",
    ],
  },
];

const DEFAULT_CTA: ServiceCTA = {
  label: "NDIS Support Services",
  tagline: "Quality Disability Care Across Australia",
  description:
    "AUSnew Support Services is a registered NDIS provider offering accommodation, community access, daily life support, and day programs. Our friendly team is ready to help you access the right supports for your goals.",
  servicePage: "/contact",
    formUrl: "https://www.ausnewsupports.com.au/contact",
    formLabel: "Get in Touch with Our Team",
  icon: <Heart className="w-6 h-6" />,
  accentColor: "#2BBFCF",
  keywords: [],
};

function detectServiceCTA(title: string, content: string, keywordSeed?: string | null): ServiceCTA {
  const haystack = [title, content, keywordSeed ?? ""].join(" ").toLowerCase();
  // Score each service by how many keywords match
  let bestScore = 0;
  let bestCTA: ServiceCTA = DEFAULT_CTA;
  for (const cta of SERVICE_CTAS) {
    const score = cta.keywords.filter(kw => haystack.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestCTA = cta;
    }
  }
  return bestCTA;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.bySlug.useQuery({ slug: slug ?? "" }, { enabled: !!slug });

  const contentRef = useRef<HTMLDivElement>(null);

  // Wrap "Key Takeaways" blocks with styled callout div
  useEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll('h2, h3, strong');
    headings.forEach((el) => {
      const text = (el.textContent || '').trim().toLowerCase();
      if (text.includes('key takeaway') || text.includes('key points') || text.includes('quick summary')) {
        let sibling = el.nextElementSibling;
        if (el.tagName === 'STRONG' && el.parentElement?.tagName === 'P') {
          sibling = el.parentElement.nextElementSibling;
        }
        if (sibling && (sibling.tagName === 'UL' || sibling.tagName === 'OL')) {
          if (!sibling.parentElement?.classList.contains('key-takeaways-callout')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'key-takeaways-callout';
            const heading = el.tagName === 'STRONG' ? el.parentElement! : el;
            heading.parentNode!.insertBefore(wrapper, heading);
            wrapper.appendChild(heading);
            wrapper.appendChild(sibling);
          }
        }
      }
    });
  }, [post]);

  // Set page title dynamically for SEO
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | AUSnew Support Services`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && post.metaDescription) {
        metaDesc.setAttribute("content", post.metaDescription);
      }
    }
    return () => {
      document.title = "AUSnew Support Services | Quality Disability Care";
    };
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-8" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
          <div className="h-64 bg-gray-200 rounded-2xl mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 bg-gray-200 rounded" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center py-24 px-4">
          <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: '#cbd5e1' }} />
          <h1 className="text-3xl font-black mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Article Not Found
          </h1>
          <p className="mb-6" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            This article may have been removed or the link is incorrect.
          </p>
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white"
              style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const cta = detectServiceCTA(post.title, post.content, post.keywordSeed);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)' }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs">{post.title}</span>
          </div>

          {post.keywordSeed && (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ background: 'rgba(43,191,207,0.2)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
              <Tag className="w-3 h-3" /> {post.keywordSeed}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>
      </section>

      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="max-w-3xl mx-auto px-4 -mt-8">
          <div className="blog-hero-image-container">
            <img
              src={post.thumbnail}
              alt={post.thumbnailAltText ?? post.title}
              className="blog-hero-image"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {post.metaDescription && (
          <p className="text-lg font-medium mb-8 pb-8 border-b border-gray-100" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            {post.metaDescription}
          </p>
        )}

        <div
          className="prose prose-lg max-w-none blog-content"
          style={{ fontFamily: 'Inter, sans-serif', color: '#334155', lineHeight: '1.8' }}
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── Smart Contextual CTA ── */}
        <div className="mt-14 rounded-3xl overflow-hidden" style={{ border: `2px solid ${cta.accentColor}22`, boxShadow: '0 8px 40px rgba(27,58,92,0.10)' }}>
          {/* Accent bar */}
          <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, #1B3A5C, ${cta.accentColor})` }} />
          <div className="p-8 md:p-10" style={{ background: 'linear-gradient(135deg, #f8fbff 0%, #f0f9fa 100%)' }}>
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                style={{ background: `linear-gradient(135deg, #1B3A5C, ${cta.accentColor})` }}>
                {cta.icon}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: cta.accentColor, fontFamily: 'Poppins, sans-serif' }}>
                  Also Considering Your Options?
                </p>
                <h3 className="text-xl font-black" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                  AUSnew Support Services — {cta.label}
                </h3>
                <p className="text-sm font-semibold mt-0.5" style={{ color: cta.accentColor, fontFamily: 'Inter, sans-serif' }}>
                  {cta.tagline}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-base mb-7 leading-relaxed" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
              {cta.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={cta.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, #1B3A5C, ${cta.accentColor})`, fontFamily: 'Poppins, sans-serif', boxShadow: `0 4px 20px ${cta.accentColor}44` }}>
                {cta.formLabel} <ArrowRight className="w-4 h-4" />
              </a>
              <Link href={cta.servicePage}>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                  style={{ border: `2px solid ${cta.accentColor}`, color: '#1B3A5C', background: 'white', fontFamily: 'Poppins, sans-serif' }}>
                  Learn More About {cta.label} <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-xs mt-5" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
              AUSnew Support Services is a registered NDIS provider. All supports are delivered in accordance with the NDIS Practice Standards.
            </p>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </button>
          </Link>
        </div>
      </article>

      {/* Bottom CTA band */}
      <section className="py-16 px-4 text-center" style={{ background: '#f0f9fa' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-3" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
            Ready to Get Started with NDIS Support?
          </h2>
          <p className="mb-6" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
            Our team is here to help you access the right supports for your needs.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
              Contact Us Today <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
