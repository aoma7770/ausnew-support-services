/*
 * AUSnew Support Services — Navbar Component
 * Design: Empowered Living — sticky nav with teal/navy brand colors
 * Features: Responsive mobile menu, dropdown for services, CTA button
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663486953469/RCY8bKak2jsgago7J824hj/logo_hd_3ec9b153.webp";

const services = [
  { name: "Accommodation Services", href: "/accommodation-services" },
  { name: "Community Access", href: "/community-access" },
  { name: "Assistance with Daily Life", href: "/assistance-daily-life" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#", dropdown: services },
  { name: "NDIS Pricing", href: "/ndis-pricing" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-2"
          : "bg-white/95 backdrop-blur-sm py-3"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="AUSnew Support Services - Home">
            <img
              src={LOGO_URL}
              alt="AUSnew Support Services"
              className="h-12 md:h-14 w-auto object-contain"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#2BBFCF] transition-colors rounded-lg hover:bg-teal-50"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {link.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                      servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-[#2BBFCF] transition-colors border-b border-gray-50 last:border-0"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    location === link.href
                      ? "text-[#2BBFCF] bg-teal-50"
                      : "text-gray-700 hover:text-[#2BBFCF] hover:bg-teal-50"
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:0291594976"
              className="flex items-center gap-2 text-sm font-semibold text-[#1B3A5C] hover:text-[#2BBFCF] transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Phone className="w-4 h-4" />
              (02) 9159 4976
            </a>
            <Link
              href="/contact"
              className="btn-teal text-sm"
              style={{
                background: '#2BBFCF',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                padding: '0.6rem 1.4rem',
                borderRadius: '9999px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              Get Support Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="pt-4 space-y-1" aria-label="Mobile navigation">
            <a
              href="tel:0291594976"
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[#1B3A5C] bg-teal-50 rounded-xl mb-3"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Phone className="w-4 h-4 text-[#2BBFCF]" />
              (02) 9159 4976 — Call Us Now
            </a>
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name}>
                  <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
                    Our Services
                  </div>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-6 py-3 text-sm font-medium text-gray-700 hover:text-[#2BBFCF] hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:text-[#2BBFCF] hover:bg-teal-50 rounded-lg transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="pt-3">
              <Link
                href="/contact"
                className="block text-center py-3 px-6 rounded-full font-bold text-white text-sm"
                style={{ background: '#2BBFCF', fontFamily: 'Poppins, sans-serif' }}
              >
                Get Support Now
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
