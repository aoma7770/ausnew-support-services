/*
 * AUSnew Support Services — Terms of Service Page
 * Design: Empowered Living — clean legal document style with brand colours
 * Compliant with: Australian Consumer Law, NDIS Act 2013, NDIS Code of Conduct
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { FileText, ChevronRight } from "lucide-react";

const EFFECTIVE_DATE = "29 March 2026";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the AUSnew Support Services website (ausnewsupports.com.au) or engaging our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our website or services.

These Terms apply to all visitors, enquiry submissions, NDIS participants, families, support coordinators, plan managers, and any other person who accesses or uses our services.

AUSnew Support Services reserves the right to update these Terms at any time. We will notify you of material changes by publishing the updated Terms on our website with a new effective date.`,
  },
  {
    id: "services",
    title: "2. Our Services",
    content: `AUSnew Support Services (ABN: 31 620 493 941) is a registered NDIS provider delivering the following services across Australia:

• Specialist Disability Accommodation (SDA)
• Supported Independent Living (SIL)
• Medium Term Accommodation (MTA)
• Short Term Accommodation (STA) / Respite
• Community Access and Social Participation
• Assistance with Daily Life
• Day Programs
• Disability Transport Services

All services are delivered in accordance with the NDIS Act 2013, the NDIS Code of Conduct, and the NDIS Practice Standards. Service delivery is governed by individual Service Agreements entered into between AUSnew Support Services and each participant.`,
  },
  {
    id: "service-agreements",
    title: "3. Service Agreements",
    content: `Before commencing support services, AUSnew Support Services will enter into a written Service Agreement with each NDIS participant (or their nominee or guardian). The Service Agreement will outline:

• The specific supports to be provided
• The agreed price for each support, consistent with the current NDIS Pricing Arrangements and Price Limits
• The schedule of supports and frequency of delivery
• Cancellation and notice requirements
• Participant rights and responsibilities
• How the participant can raise concerns or make a complaint

Service Agreements are reviewed regularly and updated in line with changes to the participant's NDIS plan or support needs.`,
  },
  {
    id: "ndis-pricing",
    title: "4. NDIS Pricing and Payments",
    content: `All pricing for NDIS-funded supports is consistent with the current NDIS Pricing Arrangements and Price Limits published by the NDIA. Prices are reviewed annually and updated when the NDIA releases a new Price Guide.

For agency-managed participants, we invoice the NDIA directly through the NDIS portal. For plan-managed participants, we invoice the participant's plan manager. For self-managed participants, we invoice the participant directly.

We do not charge above the NDIS Price Guide limits for any support. Additional charges (e.g., for cancellations or travel) will only be applied where permitted by the NDIS Pricing Arrangements and clearly disclosed in the Service Agreement.

Accommodation pricing (SDA, SIL, MTA) is individually assessed and quoted based on the participant's needs, NDIS plan, and property availability.`,
  },
  {
    id: "cancellations",
    title: "5. Cancellations and No-Shows",
    content: `We understand that circumstances change. Our cancellation policy is consistent with the NDIS Pricing Arrangements:

Short Notice Cancellations: A cancellation is considered "short notice" if made with less than 7 days' notice (or as specified in the Service Agreement). We may charge up to 100% of the agreed support price for short notice cancellations, consistent with NDIS rules.

No-Shows: If a participant is not present for a scheduled support without prior notice, we may charge the full support price.

Provider Cancellations: If AUSnew Support Services needs to cancel a scheduled support, we will provide as much notice as possible and work with you to reschedule.

We will always act reasonably and in the participant's best interests when applying cancellation charges.`,
  },
  {
    id: "participant-rights",
    title: "6. Participant Rights and Responsibilities",
    content: `As an NDIS participant receiving services from AUSnew Support Services, you have the right to:

• Be treated with dignity, respect, and courtesy at all times
• Receive services that are safe, competent, and of high quality
• Make decisions about your own life and the supports you receive
• Have your privacy and confidentiality protected
• Raise concerns or make a complaint without fear of retaliation
• Receive a written Service Agreement before services commence
• Access your personal information held by us

You are responsible for:

• Providing accurate and up-to-date information about your support needs
• Notifying us of any changes to your NDIS plan or circumstances
• Treating our staff with respect and courtesy
• Providing a safe environment for support workers to deliver services
• Complying with the terms of your Service Agreement`,
  },
  {
    id: "complaints",
    title: "7. Complaints and Feedback",
    content: `AUSnew Support Services is committed to resolving complaints fairly and promptly. If you have a concern or complaint:

Step 1: Contact us directly:
• Phone: (02) 9159 4976
• Email: info@ausnewsupports.com.au

We will acknowledge your complaint within 2 business days and aim to resolve it within 10 business days.

Step 2: If you are not satisfied with our response, you may contact:
• NDIS Quality & Safeguards Commission: 1800 035 544 | www.ndiscommission.gov.au
• NDIA: 1800 800 110 | www.ndis.gov.au
• Australian Competition & Consumer Commission (ACCC): 1300 302 502

You also have the right to seek independent advocacy support. Contact the Disability Advocacy Finder at www.disabilityadvocacyfinder.dss.gov.au.`,
  },
  {
    id: "website-use",
    title: "8. Website Use",
    content: `By using our website, you agree to use it only for lawful purposes and in a manner that does not infringe the rights of others. You must not:

• Use the website in any way that violates applicable laws or regulations
• Transmit any unsolicited or unauthorised advertising or promotional material
• Attempt to gain unauthorised access to any part of our website or systems
• Use automated tools to scrape, crawl, or extract data from our website
• Upload or transmit any content that is harmful, offensive, or defamatory

AUSnew Support Services reserves the right to restrict or terminate access to the website for any user who violates these Terms.`,
  },
  {
    id: "intellectual-property",
    title: "9. Intellectual Property",
    content: `All content on the AUSnew Support Services website, including text, images, logos, graphics, and design elements, is the property of AUSnew Support Services or its licensors and is protected by Australian copyright law.

You may not reproduce, distribute, modify, or create derivative works from any content on our website without our prior written consent. You may print or download content for your personal, non-commercial use only.

The AUSnew Support Services name and logo are registered trademarks. Unauthorised use of our trademarks is prohibited.`,
  },
  {
    id: "liability",
    title: "10. Limitation of Liability",
    content: `To the maximum extent permitted by Australian Consumer Law and other applicable legislation:

AUSnew Support Services provides its website and online content "as is" without warranties of any kind, express or implied. We do not warrant that the website will be error-free, uninterrupted, or free of viruses.

Our liability for any loss or damage arising from your use of our website or services is limited to the extent permitted by law. Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy that cannot be excluded under the Australian Consumer Law.

For NDIS services, our liability is governed by the relevant Service Agreement and applicable NDIS legislation.`,
  },
  {
    id: "privacy",
    title: "11. Privacy",
    content: `Your privacy is important to us. Our collection, use, and disclosure of personal information is governed by our Privacy Policy, which forms part of these Terms of Service.

By using our services, you consent to the collection and use of your personal information as described in our Privacy Policy.`,
  },
  {
    id: "governing-law",
    title: "12. Governing Law",
    content: `These Terms of Service are governed by the laws of New South Wales, Australia. Any disputes arising from these Terms or your use of our services will be subject to the exclusive jurisdiction of the courts of New South Wales.

These Terms are also subject to applicable Commonwealth legislation, including the NDIS Act 2013, the Privacy Act 1988 (Cth), and the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010 (Cth)).`,
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: `If you have any questions about these Terms of Service, please contact us:

AUSnew Support Services
ABN: 31 620 493 941
Phone: (02) 9159 4976
Email: info@ausnewsupports.com.au
Website: ausnewsupports.com.au

These Terms were last updated on ${EFFECTIVE_DATE}.`,
  },
];

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-20"
        style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)', minHeight: '260px' }}
        aria-label="Terms of Service hero"
      >
        <div className="container mx-auto px-4 max-w-5xl relative z-10 flex flex-col justify-center" style={{ minHeight: '220px' }}>
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Terms of Service</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(43,191,207,0.2)', border: '1px solid rgba(43,191,207,0.3)' }}>
              <FileText className="w-6 h-6" style={{ color: '#2BBFCF' }} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Terms of Service
            </h1>
          </div>
          <p className="text-base max-w-2xl" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            These Terms govern your use of the AUSnew Support Services website and our NDIS disability support services. Please read them carefully.
          </p>
          <div className="mt-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(43,191,207,0.15)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
              Effective: {EFFECTIVE_DATE}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Table of Contents */}
            <aside className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-28">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}>
                  Contents
                </h2>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-xs py-1.5 px-3 rounded-lg transition-all hover:text-[#2BBFCF] hover:bg-[#f0f9fa]"
                      style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <main className="lg:col-span-3 space-y-10">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-xl font-black mb-4 pb-3"
                    style={{
                      color: '#1B3A5C',
                      fontFamily: 'Poppins, sans-serif',
                      borderBottom: '2px solid #e0f2f4',
                    }}>
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.split('\n\n').map((para, i) => {
                      if (para.includes('\n•')) {
                        const [intro, ...bullets] = para.split('\n•');
                        return (
                          <div key={i}>
                            {intro.trim() && (
                              <p className="text-sm leading-relaxed mb-2" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                                {intro.trim()}
                              </p>
                            )}
                            <ul className="space-y-1.5 ml-2">
                              {bullets.map((b, bi) => (
                                <li key={bi} className="flex items-start gap-2 text-sm"
                                  style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                                  <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#2BBFCF' }} />
                                  {b.trim()}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      return (
                        <p key={i} className="text-sm leading-relaxed whitespace-pre-line"
                          style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Related links */}
              <div className="flex flex-wrap gap-4 pt-4 mt-8 border-t" style={{ borderColor: '#e0f2f4' }}>
                <Link
                  href="/privacy-policy"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                  style={{ color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
                >
                  View Privacy Policy <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                  style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}
                >
                  Contact Us <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
