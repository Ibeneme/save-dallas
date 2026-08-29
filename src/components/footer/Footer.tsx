"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/vite.png";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.5 },
  },
};

const navLinks = [
  { label: "The Reality", href: "#reality" },
  { label: "The Opportunity", href: "#opportunity" },
  { label: "What's At Stake", href: "#stake" },
  { label: "Take Action", href: "#take-action" },
];

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Register Online", href: "/contact" },
];

/* ─── Inline SVGs ─── */

function IconFacebook({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconTwitter({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function IconPhone({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMapPin({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconMail({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

const socialLinks = [
  { icon: IconFacebook, href: "#", label: "Facebook" },
  { icon: IconInstagram, href: "#", label: "Instagram" },
  { icon: IconTwitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 90;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();

    const id = href.slice(1);

    // Already on home → just scroll
    if (pathname === "/") {
      scrollToSection(id);
      return;
    }

    // On another route → go home with query param, then scroll
    // (Navbar already handles ?scrollTo= via useSearchParams)
    router.push(`/?scrollTo=${id}`);
  };

  return (
    <footer className="relative overflow-hidden bg-[#020F2E] pt-0 pb-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .hero-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .hero-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .hero-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* Soft grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl px-6 pt-16 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020F2E] via-[#020F2E]/85 to-[#020F2E]/30" />
          <img
            src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1600&auto=format&fit=crop"
            alt="Downtown Dallas skyline at dusk"
            className="h-56 w-full object-cover sm:h-64"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-start justify-center gap-5 px-8 sm:px-12">
            <p className="hero-mono text-[10px] uppercase tracking-[0.28em] text-[#7BA3D9]">
              The clock is ticking
            </p>
            <h3 className="hero-display max-w-md text-2xl font-bold leading-tight text-white sm:text-3xl">
              Ready to make your voice heard?
            </h3>
            <Link
              href="/contact"
              className="hero-body group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#031C4B] transition-colors hover:bg-white/90"
            >
              Register Online
              <ArrowRight
                size={15}
                strokeWidth={2.25}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto max-w-7xl px-6 pt-16 lg:px-8"
      >
        <Image
          src={logo}
          alt="Save Dallas Logo"
          className="-my-6 h-24 w-auto object-contain sm:-my-8 sm:h-32 rounded-b-[120px]"
          priority
        />
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          {/* Brand + mission */}
          <motion.div variants={itemVariants} className="max-w-sm">
            <p className="hero-display mt-[48px] text-xl font-bold tracking-tight text-white">
              Save Dallas
            </p>
            <p className="hero-body mt-4 text-[14.5px] leading-[1.7] text-white/55">
              A grassroots campaign for smart fiscal stewardship at City Hall.
              Join us in demanding a facility that works for Dallas today.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[#0F6DF9]/60 hover:text-[#0F6DF9]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Section links — smooth scroll / route to home */}
          <motion.div variants={itemVariants}>
            <p className="hero-mono text-[10px] uppercase tracking-[0.28em] text-[#7BA3D9]">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map(({ label, href }, i) => (
                <li key={i}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="hero-body text-[14.5px] text-white/65 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Page routes */}
          <motion.div variants={itemVariants}>
            <p className="hero-mono text-[10px] uppercase tracking-[0.28em] text-[#7BA3D9]">
              Pages
            </p>
            <ul className="mt-5 space-y-3">
              {pageLinks.map(({ label, href }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="hero-body text-[14.5px] text-white/65 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact / meeting info */}
          <motion.div variants={itemVariants}>
            <p className="hero-mono text-[10px] uppercase tracking-[0.28em] text-[#7BA3D9]">
              City Secretary
            </p>
            <ul className="mt-5 space-y-3">
              <li className="hero-body flex items-start gap-2.5 text-[14.5px] text-white/65">
                <span className="mt-0.5 shrink-0 text-white/40">
                  <IconPhone size={15} />
                </span>
                <a
                  href="tel:2146703738"
                  className="transition-colors hover:text-white"
                >
                  214-670-3738
                </a>
              </li>
              <li className="hero-body flex items-start gap-2.5 text-[14.5px] text-white/65">
                <span className="mt-0.5 shrink-0 text-white/40">
                  <IconMapPin size={15} />
                </span>
                1500 Marilla St., Room 5D, Dallas, TX
              </li>
              <li className="hero-body flex items-start gap-2.5 text-[14.5px] text-white/65">
                <span className="mt-0.5 shrink-0 text-white/40">
                  <IconMail size={15} />
                </span>
                <a
                  href="mailto:info@savedallas.org"
                  className="transition-colors hover:text-white"
                >
                  info@savedallas.org
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
        >
          <p className="hero-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
            © {new Date().getFullYear()} Save Dallas. All rights reserved.
          </p>
          <p className="hero-body text-[13px] text-white/35">
            Paid for by residents and business owners of Dallas.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
