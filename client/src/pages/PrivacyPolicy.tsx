/*
 * AUSnew Support Services — Privacy Policy Page
 * Design: Empowered Living — clean, legal-document style with brand colours
 * Compliant with: Privacy Act 1988 (Cth), Australian Privacy Principles (APPs),
 *                 NDIS Code of Conduct, NDIS Quality & Safeguards Commission,
 *                 ACCC guidelines, Australian Consumer Law
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { Shield, ChevronRight } from "lucide-react";

const EFFECTIVE_DATE = "29 March 2026";
const REVIEW_DATE = "29 March 2027";

const sections = [
  {
    id: "about",
    title: "1. About This Policy",
    content: `This Privacy Policy explains how AUSnew Support Services ("AUSnew", "we", "us", or "our") collects, holds, uses, and discloses personal information in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), the NDIS Act 2013, the NDIS Code of Conduct, and all applicable Australian Consumer Law requirements.

This policy applies to:
• NDIS participants and their families, guardians, and nominees
• Website visitors and enquiry submissions
• Support coordinators, plan managers, and allied health professionals
• Employees, contractors, and suppliers

By using our services, accessing our website, or providing personal information to us, you acknowledge that you have read and understood this Privacy Policy.`,
  },
  {
    id: "who-we-are",
    title: "2. Who We Are",
    content: `AUSnew Support Services is a registered NDIS provider (ABN: 31 620 493 941) delivering Specialist Disability Accommodation (SDA), Supported Independent Living (SIL), community access, assistance with daily life, day programs, and disability transport services across Australia.

Contact Details:
• Phone: (02) 9159 4976
• Email: info@ausnewsupports.com.au
• Website: ausnewsupports.com.au`,
  },
  {
    id: "information-collected",
    title: "3. Information We Collect",
    content: `We collect only the personal information necessary to provide our services and meet our legal obligations. This includes:

Identity & Contact Information: Full name, date of birth, residential and postal addresses, phone numbers, email addresses, and emergency contact details.

NDIS Information: NDIS participant number, plan details, funding type and categories, support coordinator and plan manager details, and NDIS goals.

Health & Disability Information: Disability type and details, care and support needs, mobility and accessibility requirements, medical history, allied health reports, and behaviour support plans.

Accommodation Preferences: Preferred location, shared or individual living preferences, accessibility requirements, urgency of need, and tenancy history.

Financial Information: Bank account details for invoicing purposes, Medicare and health fund details where relevant.

Technical & Website Data: IP address, browser type and version, device identifiers, pages visited, time spent on pages, and website analytics data.

Employment Information (for staff): Qualifications, Working With Children Check, NDIS Worker Screening Check, police check, references, and employment history.`,
  },
  {
    id: "how-collected",
    title: "4. How We Collect Information",
    content: `We collect personal information through the following means:

Directly from you: When you complete an enquiry form on our website, contact us by phone or email, apply for accommodation or support services, or attend an open home or event.

From authorised third parties: Support coordinators, plan managers, allied health professionals, the NDIA, and family members or guardians acting on your behalf.

Automatically via our website: Cookies, analytics tools (including Google Analytics), and social media lead forms (Facebook and Instagram Lead Ads). See Section 10 for more detail on cookies.

From public sources: Where permitted by law, we may collect information from publicly available sources.

We will always collect information by lawful and fair means, and where practicable, directly from the individual concerned.`,
  },
  {
    id: "how-used",
    title: "5. How We Use Your Information",
    content: `We use personal information for the following purposes:

• Delivering and managing NDIS support services, including accommodation, daily life assistance, community access, and day programs
• Matching participants with appropriate SDA properties and support arrangements
• NDIS administration, invoicing, and claims processing with the NDIA
• Responding to enquiries and following up on service requests
• Communicating with support coordinators, plan managers, and allied health professionals
• Ensuring the safety and wellbeing of participants and staff
• Complying with legal, regulatory, and NDIS Quality & Safeguards Commission obligations
• Conducting staff screening, training, and performance management
• Marketing our services to people who have consented to receive communications
• Improving our website, services, and participant outcomes

We will not use your personal information for any purpose that is incompatible with the reason it was collected, without your consent or as otherwise permitted by law.`,
  },
  {
    id: "sensitive-health",
    title: "6. Sensitive & Health Information",
    content: `As an NDIS provider, we regularly handle sensitive information, including health and disability-related information. This type of information is afforded a higher level of protection under the Privacy Act 1988 (Cth).

We will only collect, use, or disclose sensitive information:
• With your explicit consent (or the consent of your guardian or nominee)
• Where it is directly necessary for the provision of disability support services
• Where required or authorised by law, including the NDIS Act 2013 and the NDIS Code of Conduct

We protect sensitive information through restricted staff access (need-to-know basis), secure encrypted storage systems, mandatory staff training on privacy and confidentiality, and regular privacy audits.`,
  },
  {
    id: "marketing",
    title: "7. Marketing & Communications",
    content: `We may use your contact information to send you information about our services, news, and updates where you have provided consent. All marketing communications will include an unsubscribe option.

We use Meta Pixel, Custom Audiences, and Lead Ads on Facebook and Instagram to reach people who may benefit from our services. These tools operate in accordance with Meta's data policies and Australian privacy law.

You can opt out of marketing communications at any time by:
• Clicking the unsubscribe link in any email we send
• Emailing us at info@ausnewsupports.com.au
• Calling us on (02) 9159 4976

Opting out of marketing will not affect the delivery of your support services.`,
  },
  {
    id: "sharing",
    title: "8. Who We Share Information With",
    content: `We may disclose your personal information to the following parties, only where necessary and lawful:

• The National Disability Insurance Agency (NDIA) for plan administration and claims
• NDIS Quality & Safeguards Commission for compliance and incident reporting
• Support coordinators and plan managers involved in your care
• Allied health professionals and medical practitioners with your consent
• IT service providers and cloud storage providers who assist us in delivering our services
• Payment processors and financial institutions for invoicing
• Advertising platforms (Meta/Facebook, Google) for consented marketing activities
• Legal authorities, courts, or regulators where required by law

We do not sell, rent, or trade your personal information to any third party for commercial purposes. All third-party service providers are required to handle your information in accordance with Australian privacy law and our contractual obligations.`,
  },
  {
    id: "overseas",
    title: "9. Overseas Disclosure",
    content: `Some of our service providers are located overseas, including cloud computing and data storage providers. Your information may be disclosed to recipients in countries including the United States of America and Ireland (including Meta Platforms, Inc. and Google LLC).

Before disclosing information overseas, we take reasonable steps to ensure that overseas recipients handle your information in a manner consistent with the Australian Privacy Principles. By using our services, you consent to such overseas disclosures.

If you do not consent to overseas disclosure, please contact us at info@ausnewsupports.com.au and we will discuss alternative arrangements where possible.`,
  },
  {
    id: "cookies",
    title: "10. Cookies and Tracking",
    content: `Our website uses cookies and similar tracking technologies to improve your browsing experience, analyse website traffic, and deliver relevant advertising. The types of cookies we use include:

Essential Cookies: Required for the website to function correctly. These cannot be disabled.

Analytics Cookies: Used to understand how visitors interact with our website (e.g., Google Analytics). This data is aggregated and anonymised.

Marketing Cookies: Used to deliver relevant advertising on platforms such as Facebook and Instagram (via Meta Pixel).

You can manage your cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website. For more information on how to manage cookies, visit www.oaic.gov.au.`,
  },
  {
    id: "security",
    title: "11. Data Security",
    content: `We take the security of your personal information seriously and implement a range of technical and organisational safeguards, including:

• SSL/TLS encryption for all data transmitted through our website
• Multi-factor authentication (MFA) for staff access to systems containing personal information
• Secure, access-controlled cloud storage with regular backups
• Role-based access controls (staff access information on a need-to-know basis)
• Regular security audits and vulnerability assessments
• Mandatory staff training on privacy, confidentiality, and data security
• Data breach response procedures in accordance with the Notifiable Data Breaches (NDB) scheme

In the event of a data breach that is likely to result in serious harm, we will notify affected individuals and the Office of the Australian Information Commissioner (OAIC) as required under the Privacy Act 1988 (Cth).`,
  },
  {
    id: "retention",
    title: "12. Data Retention",
    content: `We retain personal information only for as long as necessary to fulfil the purpose for which it was collected, or as required by law. Our standard retention periods are:

| Information Type | Retention Period |
|---|---|
| Participant service records and files | 7 years after last service delivery |
| Financial and invoicing records | 7 years (as required by tax law) |
| Employee and contractor records | 7 years after employment ends |
| Enquiry and lead data | 2 years |
| Website analytics data | 26 months |
| Incident and complaint records | 7 years |

After the applicable retention period, personal information is securely destroyed or de-identified in accordance with our data destruction policy.`,
  },
  {
    id: "rights",
    title: "13. Your Rights",
    content: `Under the Privacy Act 1988 (Cth) and the Australian Privacy Principles, you have the following rights:

Right of Access: You may request access to the personal information we hold about you. We will respond within 30 days and may charge a reasonable fee for complex requests.

Right of Correction: If you believe information we hold is inaccurate, incomplete, or out of date, you may request that we correct it.

Right to Anonymity: Where lawful and practicable, you may interact with us anonymously or using a pseudonym.

Right to Withdraw Consent: You may withdraw consent for marketing or non-essential data processing at any time.

Right to Complain: You have the right to make a complaint about how we handle your personal information (see Section 15).

To exercise any of these rights, please contact us at info@ausnewsupports.com.au or call (02) 9159 4976.`,
  },
  {
    id: "children",
    title: "14. Children's Privacy",
    content: `We provide services to NDIS participants of all ages, including children and young people. When collecting personal information about a person under 18 years of age, we:

• Obtain consent from a parent, guardian, or legal nominee before collecting sensitive information
• Apply additional safeguards to protect the privacy and safety of children
• Limit access to children's records to authorised staff only
• Comply with all applicable child protection legislation in each state and territory

We do not knowingly collect personal information from children under 18 for marketing purposes without parental consent.`,
  },
  {
    id: "complaints",
    title: "15. Complaints",
    content: `If you believe we have breached your privacy rights or failed to comply with the Australian Privacy Principles, you have the right to make a complaint.

Step 1 — Contact Us Directly:
Please contact our Privacy Officer in the first instance:
• Email: info@ausnewsupports.com.au
• Phone: (02) 9159 4976
• Post: AUSnew Support Services, Sydney NSW

We will acknowledge your complaint within 5 business days and aim to resolve it within 30 days.

Step 2 — External Complaint Bodies:
If you are not satisfied with our response, you may escalate your complaint to:

• Office of the Australian Information Commissioner (OAIC): www.oaic.gov.au | 1300 363 992
• NDIS Quality & Safeguards Commission: www.ndiscommission.gov.au | 1800 035 544
• Australian Competition & Consumer Commission (ACCC): www.accc.gov.au | 1300 302 502`,
  },
  {
    id: "changes",
    title: "16. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal obligations, or regulatory requirements. When we make material changes, we will:

• Publish the updated policy on our website with a new effective date
• Notify existing participants and clients by email where the changes significantly affect them

We encourage you to review this policy periodically. Continued use of our services after any changes constitutes acceptance of the updated policy.

This policy was last reviewed on ${EFFECTIVE_DATE} and is scheduled for review by ${REVIEW_DATE}.`,
  },
  {
    id: "contact",
    title: "17. Contact Us",
    content: `For any privacy-related enquiries, requests, or complaints, please contact us:

AUSnew Support Services
ABN: 31 620 493 941
Phone: (02) 9159 4976
Email: info@ausnewsupports.com.au
Website: ausnewsupports.com.au

Our Privacy Officer is available Monday to Friday, 9:00am – 5:00pm AEST.`,
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero */}
      <section
        className="relative py-20"
        style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #0d2440 100%)', minHeight: '280px' }}
        aria-label="Privacy Policy hero"
      >
        <div className="container mx-auto px-4 max-w-5xl relative z-10 flex flex-col justify-center" style={{ minHeight: '240px' }}>
          <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Privacy Policy</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(43,191,207,0.2)', border: '1px solid rgba(43,191,207,0.3)' }}>
              <Shield className="w-6 h-6" style={{ color: '#2BBFCF' }} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Privacy Policy
            </h1>
          </div>
          <p className="text-base max-w-2xl" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            AUSnew Support Services is committed to protecting your privacy and handling your personal information responsibly in accordance with the <strong style={{ color: 'white' }}>Privacy Act 1988 (Cth)</strong>, the <strong style={{ color: 'white' }}>Australian Privacy Principles (APPs)</strong>, and the <strong style={{ color: 'white' }}>NDIS Code of Conduct</strong>.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(43,191,207,0.15)', color: '#2BBFCF', border: '1px solid rgba(43,191,207,0.3)', fontFamily: 'Poppins, sans-serif' }}>
              Effective: {EFFECTIVE_DATE}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#a8c5d8', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Poppins, sans-serif' }}>
              Next Review: {REVIEW_DATE}
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
            {/* Table of Contents — sticky sidebar */}
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
                      // Render table rows
                      if (para.includes('|---|')) {
                        const rows = para.split('\n').filter(r => r.trim() && !r.includes('|---|'));
                        return (
                          <div key={i} className="overflow-x-auto rounded-xl" style={{ border: '1px solid #e0f2f4' }}>
                            <table className="w-full text-sm">
                              <thead>
                                <tr style={{ background: '#f0f9fa' }}>
                                  {rows[0].split('|').filter(c => c.trim()).map((cell, ci) => (
                                    <th key={ci} className="px-4 py-3 text-left font-semibold"
                                      style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                                      {cell.trim()}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {rows.slice(1).map((row, ri) => (
                                  <tr key={ri} style={{ borderTop: '1px solid #e0f2f4' }}>
                                    {row.split('|').filter(c => c.trim()).map((cell, ci) => (
                                      <td key={ci} className="px-4 py-3 text-sm"
                                        style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                                        {cell.trim()}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      // Render bullet lists
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
                      // Render bold headings within paragraphs
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

              {/* Compliance badges */}
              <div className="mt-12 p-6 rounded-2xl" style={{ background: '#f0f9fa', border: '1px solid #e0f2f4' }}>
                <h3 className="text-sm font-bold mb-4" style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}>
                  Regulatory Compliance
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Privacy Act 1988 (Cth)",
                    "Australian Privacy Principles",
                    "NDIS Act 2013",
                    "NDIS Code of Conduct",
                    "NDIS Quality & Safeguards",
                    "Australian Consumer Law",
                    "Notifiable Data Breaches Scheme",
                  ].map((badge) => (
                    <span key={badge} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(43,191,207,0.1)', color: '#1B3A5C', border: '1px solid rgba(43,191,207,0.2)', fontFamily: 'Inter, sans-serif' }}>
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/terms-of-service"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                  style={{ color: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
                >
                  View Terms of Service <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                  style={{ color: '#1B3A5C', fontFamily: 'Poppins, sans-serif' }}
                >
                  Contact Our Privacy Officer <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
