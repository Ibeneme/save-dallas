"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/vite.png";

const navLinks = [
  { label: "The Reality", num: "01", href: "#reality" },
  { label: "The Opportunity", num: "02", href: "#opportunity" },
  { label: "What's At Stake", num: "03", href: "#stake" },
  { label: "Take Action", num: "04", href: "#take-action" },
];

const TICKER_TEXT =
  "PUBLIC HEARING — YOUR VOICE MATTERS — REGISTER TO SPEAK TODAY — DALLAS RESIDENTS UNITE — ";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Smooth scroll helper (with header offset)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 90; // ticker + navbar height
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  // Handles both same-page scroll and cross-route navigation
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setIsMobileOpen(false);

    const id = href.slice(1);

    // Already on home → just scroll
    if (pathname === "/") {
      scrollToSection(id);
      return;
    }

    // On another route → go home with query param, then scroll after navigation
    router.push(`/?scrollTo=${id}`);
  };

  // After navigating from another page, scroll to the requested section
  useEffect(() => {
    if (pathname !== "/") return;

    const targetId = searchParams.get("scrollTo");
    if (!targetId) return;

    // Small delay so the home page has time to render
    const timer = setTimeout(() => {
      scrollToSection(targetId);
      // Clear the query param so refreshing doesn't re-scroll
      router.replace("/", { scroll: false });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, router]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .sd-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .sd-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .sd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        @keyframes sd-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .sd-marquee-track {
          display: flex;
          width: max-content;
          animation: sd-marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sd-marquee-track { animation: none; }
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="fixed inset-x-0 top-0 z-50">
        {/* Alert ticker */}
        <div className="overflow-hidden bg-[#031C4B] py-1.5">
          <div className="sd-marquee-track">
            <span className="sd-mono whitespace-nowrap px-4 text-[11px] font-medium tracking-[0.2em] text-white/70">
              {TICKER_TEXT.repeat(4)}
            </span>
            <span
              aria-hidden
              className="sd-mono whitespace-nowrap px-4 text-[11px] font-medium tracking-[0.2em] text-white/70"
            >
              {TICKER_TEXT.repeat(4)}
            </span>
          </div>
        </div>

        <header
          className={`relative overflow-visible border-b transition-all duration-300 ${
            isScrolled
              ? "border-[#031C4B]/10 bg-white/90 shadow-sm backdrop-blur-md"
              : "border-transparent bg-white/60 backdrop-blur-sm"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-6 sm:h-[70px]">
              {/* Logo */}
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileOpen(false);
                  if (pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    router.push("/");
                  }
                }}
                className="relative z-10 flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
              >
                <Image
                  src={logo}
                  alt="Save Dallas Logo"
                  className="-my-6 h-24 w-auto object-contain sm:-my-8 sm:h-32 rounded-b-[120px]"
                  priority
                />
                <div className="flex flex-col leading-none">
                  <span className="sd-display text-[15px] font-bold text-[#031C4B]">
                    Save Dallas
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden items-center gap-6 lg:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="sd-body group flex items-center gap-2 rounded text-[14px] font-medium text-[#031C4B]/70 transition-colors hover:text-[#031C4B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
                  >
                    <span className="sd-mono text-[10px] text-[#0F6DF9]">
                      {link.num}
                    </span>
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden items-center gap-3 lg:flex">
                <a
                  href="tel:2146703738"
                  className="sd-mono inline-flex items-center gap-2 rounded-full border border-[#094EA1]/25 px-4 py-2 text-[13px] font-medium text-[#094EA1] transition-colors hover:border-[#0F6DF9] hover:text-[#0F6DF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
                >
                  <Phone size={13} />
                  214-670-3738
                </a>
                {/* <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="sd-body group inline-flex items-center gap-1.5 rounded-full bg-[#031C4B] px-5 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-[#031C4B]/20 transition-colors hover:bg-[#0F6DF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
                >
                  Register to Speak
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link> */}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg text-[#031C4B] transition-colors hover:bg-[#031C4B]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] lg:hidden"
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Spacer */}
      <div className="h-[76px] sm:h-[86px]" aria-hidden />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-[#031C4B]/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[#031C4B] p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="sd-display text-lg font-semibold text-white">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9]"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.1 }}
                    className="sd-body flex items-center gap-3 rounded-lg px-3 py-3.5 text-lg font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <span className="sd-mono text-xs text-[#0F6DF9]">
                      {link.num}
                    </span>
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
                {/* <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="sd-body flex items-center justify-center gap-2 rounded-full bg-[#0F6DF9] px-5 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-colors hover:bg-white hover:text-[#031C4B]"
                >
                  Register to Speak
                  <ArrowUpRight size={16} />
                </Link> */}
                <a
                  href="tel:2146703738"
                  className="sd-mono flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Phone size={15} />
                  214-670-3738
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
