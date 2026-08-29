"use client";

import { motion, type Variants } from "framer-motion";
import {
  Briefcase,
  Footprints,
  UtensilsCrossed,
  AlertTriangle,
  Building2,
  TrendingUp,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.6 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.75,
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.5 },
  },
};

const risks = [
  { icon: Briefcase, label: "Thousands of high-impact jobs" },
  { icon: Footprints, label: "Consistent downtown foot traffic" },
  { icon: UtensilsCrossed, label: "Sustained local restaurant patronage" },
];

export default function StakeSection() {
  return (
    <section
      id="stake"
      className="relative overflow-hidden bg-[#fff] py-28 sm:py-32"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .hero-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .hero-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .hero-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* Soft structural grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#031C4B 1px, transparent 1px), linear-gradient(90deg, #031C4B 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ghost numeral */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="hero-display pointer-events-none absolute -top-8 left-2 select-none font-bold leading-none text-[#031C4B]/[0.03] sm:left-8"
        style={{ fontSize: "clamp(10rem, 22vw, 18rem)" }}
      >
        03
      </motion.span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
        {/* Left: Narrative & Integrated Image Showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col justify-center"
        >
          <motion.span
            variants={itemVariants}
            className="hero-mono inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#094EA1]"
          >
            <span className="h-px w-10 bg-[#094EA1]/60" />
            03 — What&apos;s At Stake
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="hero-display mt-6 text-[2.3rem] font-bold leading-[1.08] tracking-tight text-[#031C4B] sm:text-4xl lg:text-[2.75rem]"
          >
            Protecting an Investment{" "}
            <span className="relative inline-block text-[#0F6DF9]">
              We&apos;ve Already Made.
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-[#0F6DF9]/25"
              />
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="hero-body mt-8 max-w-xl text-[1.05rem] leading-[1.7] text-[#031C4B]/75 sm:text-lg"
          >
            This shared public-private commitment has generated critical
            municipal tax revenue, energized local entrepreneurship, and
            sustained major downtown anchors. Remaining stagnant risks
            sacrificing the economic momentum we built together.
          </motion.p>

          {/* Professional Image Integration Container (Updated Image & Clean Styling) */}
          <motion.div
            variants={itemVariants}
            className="relative mt-8 overflow-hidden rounded-2xl border border-[#031C4B]/10"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#031C4B]/80 via-[#031C4B]/20 to-transparent" />
            <img
              src="https://images.unsplash.com/photo-1582181864990-061eb40977aa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Vibrant Downtown Cityscape and Commerce Hub"
              className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-md">
                  <Building2 size={16} className="text-white" />
                </span>
                <div>
                  <p className="hero-mono text-xs uppercase tracking-wider text-white/80">
                    Core Asset
                  </p>
                  <p className="hero-body text-sm font-semibold">
                    Downtown Metro Economic Corridor
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-blue-500/35 px-3 py-1 text-xs font-medium backdrop-blur-md">
                <TrendingUp size={12} /> High Yield Zone
              </span>
            </div>
          </motion.div>

          {/* Supporting Alert Callout */}
          <motion.div
            variants={itemVariants}
            className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-[#031C4B]/10 bg-white py-2.5 pl-2.5 pr-5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F6DF9]/10 text-[#0F6DF9]">
              <AlertTriangle size={13} />
            </span>
            <p className="hero-body text-sm font-medium text-[#031C4B]/70">
              Every dollar at risk is a vital capital resource already deployed.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: Investment Stat Card (Cleaned up, no progress bar) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.7rem] border border-[#031C4B]/10 bg-white">
            {/* Top accent bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
              className="h-1.5 w-full origin-left"
              style={{
                background: "linear-gradient(90deg, #0F6DF9, #031C4B)",
              }}
            />

            <div className="p-8 sm:p-10">
              <motion.div variants={rowVariants}>
                <p className="hero-mono text-[10px] uppercase tracking-[0.28em] text-[#031C4B]/40">
                  Total Downtown Investment
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <p className="hero-display text-[4.5rem] font-bold leading-none tracking-tight text-[#031C4B] sm:text-[5.25rem]">
                    $3<span className="text-[#0F6DF9]">B</span>
                  </p>
                  <span className="hero-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    Secured
                  </span>
                </div>

                <p className="hero-body mt-4 text-[15px] leading-relaxed text-[#031C4B]/60">
                  Committed collectively by municipal stakeholders and private
                  partners to revitalize the urban core surrounding major
                  commercial hubs.
                </p>
              </motion.div>

              {/* At-risk list items */}
              <motion.div
                variants={rowVariants}
                className="mt-8 border-t border-[#031C4B]/10 pt-7"
              >
                <span className="hero-mono inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[#0F6DF9]">
                  <AlertTriangle size={12} />
                  At Risk Without Continued Momentum
                </span>

                <div className="mt-5 space-y-3">
                  {risks.map(({ icon: Icon, label }, i) => (
                    <motion.div
                      key={i}
                      variants={rowVariants}
                      className="group flex items-center gap-4 rounded-xl border border-[#031C4B]/[0.06] bg-slate-50/50 px-4 py-3.5 transition-all duration-300 hover:border-[#0F6DF9]/30 hover:bg-white"
                    >
                      <motion.span
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.4 + i * 0.12,
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0F6DF9]/10 text-[#0F6DF9] transition-colors duration-300 group-hover:bg-[#0F6DF9] group-hover:text-white"
                      >
                        <Icon size={16} strokeWidth={2} />
                      </motion.span>
                      <p className="hero-body text-[15px] font-semibold text-[#031C4B]">
                        {label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
