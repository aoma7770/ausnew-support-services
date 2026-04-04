/*
 * AUSnew Support Services — Blog Page
 * Dynamically loads posts published via Arvow webhook
 */
import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { trpc } from "@/lib/trpc";

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

export default function Blog() {
  const postsSection = useScrollReveal(0.05);
  const { data: posts, isLoading } = trpc.blog.list.useQuery();

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
            Expert articles on NDIS, disability support, SDA accommodation, and living independently in Australia.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16" style={{ background: '#f0f9fa' }} ref={postsSection.ref}>
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Loading skeletons */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white animate-pulse" style={{ boxShadow: '0 4px 20px rgba(27,58,92,0.07)' }}>
                  <div className="h-44 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && (!posts || posts.length === 0) && (
            <div className="text-center py-24">
              <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: '#cbd5e1' }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#64748b', fontFamily: 'Poppins, sans-serif' }}>No articles yet</h2>
              <p style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                SEO articles published via Arvow will appear here automatically.
              </p>
            </div>
          )}

          {/* Featured post */}
          {!isLoading && posts && posts.length > 0 && (
            <>
              <Link href={`/blog/${posts[0].slug}`}>
                <div className="rounded-3xl overflow-hidden mb-12 cursor-pointer group" style={{ boxShadow: '0 20px 60px rgba(27,58,92,0.12)' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      {posts[0].thumbnail ? (
                        <img src={posts[0].thumbnail} alt={posts[0].thumbnailAltText ?? posts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1B3A5C, #2BBFCF)' }}>
                          <BookOpen className="w-16 h-16 text-white/30" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
                        style={{ background: '#2BBFCF', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                        Featured
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center" style={{ background: '#f8fafc' }}>
                      {posts[0].keywordSeed && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit"
                          style={{ background: 'rgba(43,191,207,0.1)', color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                          <Tag className="w-3 h-3" /> {posts[0].keywordSeed}
                        </div>
                      )}
                      <h2 className="text-2xl font-black mb-3 group-hover:text-[#2BBFCF] transition-colors" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                        {posts[0].title}
                      </h2>
                      {posts[0].metaDescription && (
                        <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                          {posts[0].metaDescription}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs mb-5" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(posts[0].publishedAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Remaining posts grid */}
              {posts.length > 1 && (
                <>
                  <h2 className="text-2xl font-black mb-8" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                    Latest Articles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {posts.slice(1).map((post, i) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <article
                          className="rounded-2xl overflow-hidden bg-white group cursor-pointer h-full flex flex-col"
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
                            {post.thumbnail ? (
                              <img src={post.thumbnail} alt={post.thumbnailAltText ?? post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1B3A5C, #2BBFCF)' }}>
                                <BookOpen className="w-10 h-10 text-white/30" />
                              </div>
                            )}
                            {post.keywordSeed && (
                              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                                style={{ background: '#1B3A5C', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                                {post.keywordSeed}
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-[#2BBFCF] transition-colors" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                              {post.title}
                            </h3>
                            {post.metaDescription && (
                              <p className="text-sm leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
                                {post.metaDescription}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-3 text-xs" style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(post.publishedAt).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: '#2BBFCF' }} />
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: '#1B3A5C' }}>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Need NDIS Support?
          </h2>
          <p className="text-base mb-6" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            Our team is ready to help you navigate your NDIS plan and find the right supports.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all hover:scale-105"
            style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
          >
            Get Support Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
