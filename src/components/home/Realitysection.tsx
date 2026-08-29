"use client";

import { motion, type Variants } from "framer-motion";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

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
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.55 },
  },
};

const assessmentRows = [
  {
    icon: TrendingUp,
    label: "Maintenance cost",
    detail: "Rising every budget cycle",
    tone: "up" as const,
  },
  {
    icon: TrendingDown,
    label: "Operational efficiency",
    detail: "Falling further behind modern needs",
    tone: "down" as const,
  },
  {
    icon: Info,
    label: "Design significance",
    detail: "Doesn't pay salaries or create jobs",
    tone: "flat" as const,
  },
];

const BUILDING_IMAGE_URL =
  "https://static.wixstatic.com/media/0d45c3_0eef629df41d413fa0f5e3779a22ecf2~mv2.jpg/v1/fill/w_884,h_744,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0d45c3_0eef629df41d413fa0f5e3779a22ecf2~mv2.jpg";

export default function RealitySection() {
  return (
    <section
      id="reality"
      className="relative overflow-hidden bg-[#F7F8FA] py-28 sm:py-32"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .hero-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .hero-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .hero-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* Soft grid backdrop */}
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
        className="hero-display pointer-events-none absolute -top-8 right-2 select-none font-bold leading-none text-[#031C4B]/[0.04] sm:right-8"
        style={{ fontSize: "clamp(10rem, 22vw, 18rem)" }}
      >
        01
      </motion.span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        {/* Left: narrative */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={itemVariants}
            className="hero-mono inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#094EA1]"
          >
            <span className="h-px w-10 bg-[#094EA1]/60" />
            01 — The Reality
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="hero-display mt-6 text-[2.5rem] font-bold leading-[1.02] tracking-tight text-[#031C4B] sm:text-5xl lg:text-[3.4rem]"
          >
            City Hall Isn&apos;t Meeting{" "}
            <span className="relative inline-block text-[#0F6DF9]">
              Our Needs.
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
            Our current City Hall is aging, increasingly expensive to maintain,
            and fundamentally ill-suited for modern city operations. Continuing
            to spend millions on short-term patches for a failing facility is a
            misuse of public funds.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="hero-body mt-5 max-w-xl text-[1.05rem] leading-[1.7] text-[#031C4B]/75 sm:text-lg"
          >
            While some debate the architectural history of the building, design
            significance cannot pay employee salaries, create new jobs, or keep
            our local economy competitive. Dallas has outgrown this building,
            and it is time for a workspace that reflects our status as a
            top-tier city for business.
          </motion.p>
        </motion.div>

        {/* Right: facility assessment panel */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {/* Accent frame */}
          <div
            aria-hidden
            className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-[#0F6DF9]/40 via-[#094EA1]/20 to-transparent"
          />

          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#031C4B]">
            {/* Top accent bar — draws in */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
              className="h-1 w-full origin-left bg-gradient-to-r from-[#0F6DF9] via-[#094EA1] to-transparent"
            />

            {/* Building photo header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
              className="relative h-48 w-full overflow-hidden sm:h-56"
            >
              <img
                src={BUILDING_IMAGE_URL}
                alt="Aging municipal building exterior"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay so this reads as one continuous card with the panel below */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#031C4B] via-[#031C4B]/40 to-[#031C4B]/10"
              />
              <div aria-hidden className="absolute inset-0 bg-[#031C4B]/20" />
            </motion.div>

            <div className="p-7 sm:p-9">
              <motion.div
                variants={rowVariants}
                className="flex items-end justify-between gap-4"
              >
                <div>
                  <p className="hero-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                    Facility assessment
                  </p>
                  <p className="hero-display mt-2 text-2xl font-semibold tracking-tight text-white">
                    Current City Hall
                  </p>
                </div>
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="hero-mono hidden rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-wider text-white/50 sm:inline-flex"
                >
                  Status: Critical
                </motion.span>
              </motion.div>

              <div className="mt-9 space-y-0">
                {assessmentRows.map(
                  ({ icon: Icon, label, detail, tone }, i) => (
                    <motion.div
                      key={i}
                      variants={rowVariants}
                      className="group flex items-start gap-4 border-t border-white/[0.08] py-5 first:border-0 first:pt-0 last:pb-0"
                    >
                      <motion.span
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.35 + i * 0.12,
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          tone === "up"
                            ? "bg-[#0F6DF9]/15 text-[#0F6DF9]"
                            : tone === "down"
                            ? "bg-white/[0.06] text-white/50"
                            : "bg-[#094EA1]/25 text-[#7BA3D9]"
                        }`}
                      >
                        <Icon size={17} strokeWidth={2} />
                      </motion.span>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="hero-body text-[15px] font-semibold text-white">
                            {label}
                          </p>
                          {tone === "up" && (
                            <span className="hero-mono text-[10px] font-medium uppercase tracking-wider text-[#0F6DF9]">
                              ↑ Rising
                            </span>
                          )}
                          {tone === "down" && (
                            <span className="hero-mono text-[10px] font-medium uppercase tracking-wider text-white/40">
                              ↓ Declining
                            </span>
                          )}
                        </div>
                        <p className="hero-body mt-1 text-[13.5px] leading-snug text-white/50">
                          {detail}
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Blueprint corner mark */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pointer-events-none absolute -bottom-5 -right-4 h-20 w-20"
            style={{
              backgroundImage:
                "linear-gradient(#0F6DF9 1px, transparent 1px), linear-gradient(90deg, #0F6DF9 1px, transparent 1px)",
              backgroundSize: "10px 10px",
              maskImage:
                "radial-gradient(circle at bottom right, black, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(circle at bottom right, black, transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
