"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, MapPin } from "lucide-react";

export default function NotFoundContent() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .nf-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .nf-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .nf-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#F4F8FF] px-6 py-24">
        {/* Ambient blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#0F6DF9]/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[360px] w-[360px] rounded-full bg-[#094EA1]/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="nf-mono mb-6 inline-flex items-center gap-2 rounded-full border border-[#094EA1]/20 bg-white px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-[#094EA1]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F6DF9]" />
            Error 404
          </motion.p>

          {/* Big number */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="nf-display text-[7rem] font-bold leading-none tracking-tight text-[#031C4B] sm:text-[9rem]"
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="nf-display mt-4 text-2xl font-bold text-[#031C4B] sm:text-3xl"
          >
            This page got lost downtown.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="nf-body mx-auto mt-4 max-w-md text-base leading-relaxed text-[#031C4B]/65 sm:text-lg"
          >
            The page you’re looking for doesn’t exist — or maybe it moved. Let’s
            get you back to the fight for Dallas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="nf-body group inline-flex items-center gap-2 rounded-full bg-[#031C4B] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#0F6DF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
            >
              <Home size={16} />
              Back to Home
            </Link>

            <Link
              href="/contact"
              className="nf-body inline-flex items-center gap-2 rounded-full border border-[#094EA1]/25 px-6 py-3.5 text-[15px] font-semibold text-[#094EA1] transition-colors hover:border-[#0F6DF9] hover:text-[#0F6DF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
            >
              Register to Speak
              <ArrowLeft size={15} className="rotate-180" />
            </Link>
          </motion.div>

          {/* Small location hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="nf-mono mt-12 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#031C4B]/40"
          >
            <MapPin size={12} />
            Dallas, TX · Sept. 2 Vote
          </motion.p>
        </div>
      </section>
    </>
  );
}
