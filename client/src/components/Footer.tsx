/*
 * AUSnew Support Services — Footer Component
 * Design: Empowered Living — deep navy background with teal accents
 */
import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Heart } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/logo_hd_3ec9b153.webp";

export default function Footer() {
  return (
    <footer style={{ background: '#1B3A5C', color: 'white' }} role="contentinfo">
      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src={LOGO_URL}
              alt="AUSnew Support Services"
              className="h-14 w-auto mb-5 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
              A registered NDIS provider delivering quality disability support services across Sydney and New South Wales. Empowering individuals to live the life they choose.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/ausnewhomecare/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow AUSnew on Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Follow AUSnew on Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://au.linkedin.com/company/ausnewsupportservices"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow AUSnew on LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-base font-bold mb-5" style={{ fontFamily: 'Poppins, sans-serif', color: '#2BBFCF' }}>
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Accommodation Services", href: "/accommodation-services" },
                { name: "Community Access", href: "/community-access" },
                { name: "Assistance with Daily Life", href: "/assistance-daily-life" },
                { name: "NDIS Pricing", href: "/ndis-pricing" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-[#2BBFCF]"
                    style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-base font-bold mb-5" style={{ fontFamily: 'Poppins, sans-serif', color: '#2BBFCF' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Blog & Resources", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "NDIS Website", href: "https://www.ndis.gov.au", external: true },
              ].map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-[#2BBFCF]"
                      style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.name} ↗
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:text-[#2BBFCF]"
                      style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-base font-bold mb-5" style={{ fontFamily: 'Poppins, sans-serif', color: '#2BBFCF' }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0291594976"
                  className="flex items-start gap-3 text-sm transition-colors hover:text-[#2BBFCF] group"
                  style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-[#2BBFCF]" style={{ color: '#2BBFCF' }} />
                  (02) 9159 4976
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@ausnewhomecare.com"
                  className="flex items-start gap-3 text-sm transition-colors hover:text-[#2BBFCF] group"
                  style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-[#2BBFCF]" style={{ color: '#2BBFCF' }} />
                  support@ausnewhomecare.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#2BBFCF' }} />
                  <span>Mount Druitt, Sydney NSW 2770, Australia</span>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block text-sm font-bold py-3 px-6 rounded-full transition-all hover:opacity-90"
                style={{ background: '#2BBFCF', color: 'white', fontFamily: 'Poppins, sans-serif' }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* NDIS Badge Bar */}
      <div style={{ background: 'rgba(0,0,0,0.2)' }} className="py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs" style={{ color: '#a8c5d8', fontFamily: 'Inter, sans-serif' }}>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
              NDIS Registered Provider
            </span>
            <span>•</span>
            <span>ABN: Ausnew Home Care Service Pty Ltd</span>
            <span>•</span>
            <span>Serving Sydney & NSW</span>
            <span>•</span>
            <span>24/7 Support Available</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ background: 'rgba(0,0,0,0.3)' }} className="py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: '#6b8fa3', fontFamily: 'Inter, sans-serif' }}>
            <p>© 2026 AUSnew Support Services. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for the disability community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
