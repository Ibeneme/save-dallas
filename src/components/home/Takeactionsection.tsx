"use client";


import { motion, type Variants } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Monitor,
  Phone,
  Globe,
  ArrowRight,
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

const logisticsRows = [
  {
    icon: Calendar,
    label: "Date",
    detail: "Tuesday, September 2",
  },
  {
    icon: MapPin,
    label: "Location",
    detail: "Dallas City Hall, Council Chambers",
  },
  {
    icon: Clock,
    label: "Registration deadline",
    detail: "5:00 p.m., Monday, Sept. 1",
  },
];

const requiredInfo = [
  "Full name",
  "Residence address",
  "Daytime telephone number",
  "Choice of participation — in-person or videoconference",
  "Subject matter you wish to present",
];

export default function TakeActionSection() {
  return (
    <section
      id="take-action"
      className="relative overflow-hidden bg-[#031C4B] py-28 sm:py-32"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .hero-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .hero-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .hero-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* Soft grid backdrop, inverted for dark section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
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
        className="hero-display pointer-events-none absolute -top-8 right-2 select-none font-bold leading-none text-white/[0.035] sm:right-8"
        style={{ fontSize: "clamp(10rem, 22vw, 18rem)" }}
      >
        04
      </motion.span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl"
        >
          <motion.span
            variants={itemVariants}
            className="hero-mono inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#7BA3D9]"
          >
            <span className="h-px w-10 bg-[#7BA3D9]/60" />
            04 — Take Action
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="hero-display mt-6 text-[2.5rem] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Show Up on{" "}
            <span className="relative inline-block text-[#0F6DF9]">
              September 2.
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-[#0F6DF9]/40"
              />
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="hero-body mt-8 text-[1.05rem] leading-[1.7] text-white/70 sm:text-lg"
          >
            The City Council needs to know that the people of Dallas demand
            smart fiscal stewardship. You can participate in the upcoming
            meeting either in person at City Hall or virtually via
            videoconference.
          </motion.p>
        </motion.div>

        {/* Body: registration info + logistics card */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left: how to register */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3
              variants={itemVariants}
              className="hero-display text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]"
            >
              How to Register to Speak
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="hero-body mt-5 text-[1.02rem] leading-[1.7] text-white/70"
            >
              Your voice matters. Personal, specific testimonies from residents
              and business owners are the most powerful tools we have to change
              minds. Join us on September 2, share your story, and help us Save
              Dallas. To address the City Council, you must register in advance
              with the City Secretary.
            </motion.p>

            {/* Required information */}
            <motion.div variants={itemVariants} className="mt-9">
              <p className="hero-mono text-[10px] uppercase tracking-[0.28em] text-[#7BA3D9]">
                Required information
              </p>
              <ul className="mt-4 space-y-3">
                {requiredInfo.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={rowVariants}
                    className="hero-body flex items-start gap-3 text-[15px] leading-snug text-white/75"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F6DF9]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact methods */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <a
                href="#"
                className="hero-body inline-flex items-center justify-center gap-2 rounded-full bg-[#0F6DF9] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#0d5fd6]"
              >
                Register Online
                <ArrowRight size={16} strokeWidth={2.25} />
              </a>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <span className="hero-body inline-flex items-center gap-2 text-[14px] text-white/65">
                  <Phone size={15} className="text-[#7BA3D9]" />
                  214.670.3738
                </span>
                <span className="hero-body inline-flex items-center gap-2 text-[14px] text-white/65">
                  <MapPin size={15} className="text-[#7BA3D9]" />
                  1500 Marilla St., Room 5D
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: logistics card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative h-fit lg:sticky lg:top-24"
          >
            <div
              aria-hidden
              className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-[#0F6DF9]/40 via-[#094EA1]/20 to-transparent"
            />

            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#04214F]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
                className="h-1 w-full origin-left bg-gradient-to-r from-[#0F6DF9] via-[#094EA1] to-transparent"
              />

              <div className="p-7 sm:p-9">
                <motion.div
                  variants={rowVariants}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="hero-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                      Council meeting
                    </p>
                    <p className="hero-display mt-2 text-2xl font-semibold tracking-tight text-white">
                      Speak Up. Be Counted.
                    </p>
                  </div>
                  <span className="hero-mono hidden shrink-0 rounded-full border border-[#0F6DF9]/40 bg-[#0F6DF9]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#7BA3D9] sm:inline-block">
                    Public
                  </span>
                </motion.div>

                <div className="mt-9 space-y-0">
                  {logisticsRows.map(({ icon: Icon, label, detail }, i) => (
                    <motion.div
                      key={i}
                      variants={rowVariants}
                      className="flex items-start gap-4 border-t border-white/[0.08] py-5 first:border-0 first:pt-0 last:pb-0"
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
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F6DF9]/15 text-[#0F6DF9]"
                      >
                        <Icon size={17} strokeWidth={2} />
                      </motion.span>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="hero-mono text-[10px] uppercase tracking-wider text-white/40">
                          {label}
                        </p>
                        <p className="hero-body mt-1 text-[15px] font-semibold text-white">
                          {detail}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Participation options */}
                <motion.div
                  variants={rowVariants}
                  className="mt-2 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-6"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 transition-colors hover:border-[#0F6DF9]/30">
                    <Users size={15} className="text-[#7BA3D9]" />
                    <span className="hero-body text-[13px] font-medium text-white/80">
                      In person
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 transition-colors hover:border-[#0F6DF9]/30">
                    <Monitor size={15} className="text-[#7BA3D9]" />
                    <span className="hero-body text-[13px] font-medium text-white/80">
                      Videoconference
                    </span>
                  </div>
                </motion.div>

                {/* Website reference — small footer line inside the card */}
                <motion.div
                  variants={rowVariants}
                  className="mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-5"
                >
                  <Globe size={13} className="text-white/40" />
                  <span className="hero-body text-[12px] text-white/45">
                    dallascitycouncil.gov/meetings
                  </span>
                </motion.div>
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
      </div>
    </section>
  );
}
