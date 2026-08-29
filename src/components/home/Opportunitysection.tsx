"use client";

import { motion, type Variants } from "framer-motion";
import {
  Wallet,
  Building2,
  KeyRound,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.6 },
  },
};

const wins = [
  {
    icon: Wallet,
    accent: "#0F6DF9",
    title: "Balances the Budget",
    description:
      "Proceeds from the sale generate immediate financial resources to help close the city's budget deficit.",
    stat: "$0M",
    statLabel: "Est. net proceeds",
  },
  {
    icon: Building2,
    accent: "#094EA1",
    title: "Upgrades the Workforce",
    description:
      "City employees move out of a deteriorating building and into a modern, functional, efficient workspace in Downtown Dallas.",
    stat: "0+",
    statLabel: "Employees relocated",
  },
  {
    icon: KeyRound,
    accent: "#031C4B",
    title: "Unlocks Prime Land",
    description:
      "The vacated property can be repurposed to create new economic, retail, or entertainment options that complement our existing downtown hub.",
    stat: "0 acres",
    statLabel: "Site made available",
  },
];

// Custom skyline illustration — kept as a small decorative accent badge on the
// hero photo instead of the primary visual, so the palette continuity carries
// over even though the main hero image is now a photograph.
function CityIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8F1FF" />
          <stop offset="100%" stopColor="#F4F8FF" />
        </linearGradient>
        <linearGradient id="tower1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F6DF9" />
          <stop offset="100%" stopColor="#094EA1" />
        </linearGradient>
        <linearGradient id="tower2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#094EA1" />
          <stop offset="100%" stopColor="#031C4B" />
        </linearGradient>
      </defs>

      <rect width="480" height="420" fill="url(#sky)" rx="28" />

      {/* ground line */}
      <rect
        x="0"
        y="360"
        width="480"
        height="60"
        fill="#031C4B"
        fillOpacity="0.06"
      />

      {/* back row, muted */}
      <rect
        x="40"
        y="220"
        width="46"
        height="140"
        rx="4"
        fill="#031C4B"
        fillOpacity="0.12"
      />
      <rect
        x="96"
        y="180"
        width="38"
        height="180"
        rx="4"
        fill="#031C4B"
        fillOpacity="0.1"
      />
      <rect
        x="360"
        y="200"
        width="42"
        height="160"
        rx="4"
        fill="#031C4B"
        fillOpacity="0.1"
      />
      <rect
        x="412"
        y="240"
        width="34"
        height="120"
        rx="4"
        fill="#031C4B"
        fillOpacity="0.12"
      />

      {/* hero building — City Hall stand-in, inverted-pyramid nod to Dallas City Hall */}
      <g id="hero-tower">
        <path
          d="M170 360 L170 200 Q170 190 180 190 L300 190 Q310 190 310 200 L330 360 Z"
          fill="url(#tower2)"
        />
        {/* window grid */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={190 + col * 18}
              y={215 + row * 26}
              width="10"
              height="14"
              rx="1.5"
              fill="#F4F8FF"
              fillOpacity={0.25 + (row % 2) * 0.1}
            />
          ))
        )}
      </g>

      {/* secondary tower */}
      <rect x="220" y="120" width="56" height="90" rx="4" fill="url(#tower1)" />
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <rect
            key={`s-${row}-${col}`}
            x={230 + col * 16}
            y={132 + row * 22}
            width="8"
            height="12"
            rx="1.5"
            fill="#F4F8FF"
            fillOpacity="0.3"
          />
        ))
      )}

      {/* foreground low buildings */}
      <rect
        x="120"
        y="300"
        width="60"
        height="60"
        rx="4"
        fill="#0F6DF9"
        fillOpacity="0.9"
      />
      <rect
        x="300"
        y="290"
        width="70"
        height="70"
        rx="4"
        fill="#094EA1"
        fillOpacity="0.85"
      />

      {/* plaza dots — subtle texture, no shadow */}
      {Array.from({ length: 10 }).map((_, i) => (
        <circle
          key={i}
          cx={60 + i * 38}
          cy={392}
          r="2.5"
          fill="#031C4B"
          fillOpacity="0.15"
        />
      ))}
    </svg>
  );
}

export default function OpportunitySection() {
  return (
    <section
      id="opportunity"
      className="relative overflow-hidden bg-[#F4F8FF] py-24 sm:py-28"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .hero-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .hero-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .hero-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* faint dot-grid backdrop for texture instead of shadow-driven depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#031C4B22 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero: copy + photo, two columns on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          <div>
            <motion.span
              variants={itemVariants}
              className="hero-mono inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[#094EA1]"
            >
              <span className="h-px w-8 bg-[#094EA1]/50" />
              The Opportunity
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="hero-display mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-[#031C4B] sm:text-5xl lg:text-[3.25rem]"
            >
              A <span className="text-[#0F6DF9]">Win-Win-Win</span> for Our
              Community
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="hero-body mt-6 max-w-lg text-base leading-relaxed text-[#031C4B]/70 sm:text-lg"
            >
              Selling the current City Hall property offers a clear path forward
              that benefits everyone — the city's finances, its workforce, and
              the future of downtown.
            </motion.p>

            <motion.a
              variants={itemVariants}
              href="#plan"
              className="hero-body group mt-8 inline-flex items-center gap-2 rounded-full border border-[#031C4B]/15 bg-white px-5 py-3 text-sm font-semibold text-[#031C4B] transition-colors duration-300 hover:border-[#0F6DF9]/40 hover:bg-[#0F6DF9]/5"
            >
              See the full relocation plan
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>

          {/* Hero photograph — real building shot, subtle float, with the
              skyline illustration tucked in as a small floating accent badge
              instead of carrying the whole visual */}
          <motion.div
            variants={itemVariants}
            className="relative mx-auto aspect-[8/7] w-full max-w-md"
          >
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-[2rem] border border-[#031C4B]/10"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#031C4B]/75 via-[#031C4B]/10 to-transparent" />
              <CityIllustration />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Single unified panel, divided by hairlines, color-coded by accent */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-[#031C4B]/10 bg-white  sm:grid sm:grid-cols-3"
        >
          {wins.map(
            (
              { icon: Icon, accent, title, description, stat, statLabel },
              i
            ) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={[
                  "group relative flex flex-col gap-4 p-8 sm:p-9",
                  i !== 0
                    ? "border-t border-[#031C4B]/10 sm:border-t-0 sm:border-l"
                    : "",
                  "sm:border-[#031C4B]/10",
                ].join(" ")}
              >
                {/* Accent bar instead of a drop shadow — reads as a status/category strip */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ backgroundColor: accent }}
                />

                <div className="flex items-center justify-between">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{ backgroundColor: `${accent}14`, color: accent }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </span>

                  <div className="text-right">
                    <div
                      className="hero-display text-xl font-bold leading-none"
                      style={{ color: accent }}
                    >
                      {stat}
                    </div>
                    <div className="hero-mono mt-1 text-[9px] uppercase tracking-[0.15em] text-[#031C4B]/40">
                      {statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="hero-display text-lg font-semibold text-[#031C4B] sm:text-xl">
                  {title}
                </h3>
                <p className="hero-body text-sm leading-relaxed text-[#031C4B]/65 sm:text-[15px]">
                  {description}
                </p>
              </motion.div>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-[#031C4B]/10"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#031C4B]/70 via-[#031C4B]/10 to-transparent" />
          <img
            src="https://images.unsplash.com/photo-1567393122810-64beb18b098d?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Downtown Dallas skyline, the future home of relocated city offices"
            className="h-96 w-full object-cover sm:h-110"
          />
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-md">
                <Building2 size={16} className="text-white" />
              </span>
              <div>
                <p className="hero-mono text-[10px] uppercase tracking-wider text-white/75">
                Modern Offices
                </p>
                <p className="hero-body text-sm font-semibold">
                  Modern Offices, Downtown Dallas
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
