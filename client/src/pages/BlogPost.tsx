/*
 * AUSnew Support Services — Individual Blog Post Page
 * Renders a single article published via Arvow webhook
 * Updated: Includes enhanced image styling and fallback handling
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Tag, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useRef } from "react";

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
        // Find the next <ul> or <ol> sibling
        let sibling = el.nextElementSibling;
        if (el.tagName === 'STRONG' && el.parentElement?.tagName === 'P') {
          sibling = el.parentElement.nextElementSibling;
        }
        if (sibling && (sibling.tagName === 'UL' || sibling.tagName === 'OL')) {
          // Only wrap if not already wrapped
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
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && post.metaDescription) {
        metaDesc.setAttribute("content", post.metaDescription);
      }
    }
    return () => {
      document.title = "AUSnew Support Services | NDIS Provider Sydney";
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

      {/* Thumbnail — Enhanced with branded image styling */}
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

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </button>
          </Link>
        </div>
      </article>

      {/* CTA */}
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
              Contact Us Today <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
