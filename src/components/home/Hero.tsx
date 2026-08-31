"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import {
  Phone,
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Landmark,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const heroVideo = "/vote.mp4";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Palette (only the three supplied brand colors, plus neutrals):
 *  --ink    #031C4B  deep navy   → headline type, dark surfaces
 *  --blue   #094EA1  council blue → primary actions, icon fills, borders
 *  --signal #0F6DF9  signal blue → accents, active states, the agenda number
 */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.65 },
  },
};

// Calendar strip for the floating "Time To Act" card — Mon (deadline) and
// Tue (vote day) are the two days that matter this week.
const weekStrip = [
  { d: "S", h: 18, tone: "bg-white/15" },
  { d: "M", h: 34, tone: "bg-white/15" },
  { d: "T", h: 58, tone: "bg-[#0F6DF9]", label: "Deadline" },
  { d: "W", h: 44, tone: "bg-[#094EA1]", label: "Vote" },
  { d: "T", h: 22, tone: "bg-white/15" },
  { d: "F", h: 16, tone: "bg-white/15" },
  { d: "S", h: 12, tone: "bg-white/10" },
];

const docketRows = [
  // {
  //   icon: Calendar,
  //   text: "Speak in person or register to join virtually",
  // },
  {
    icon: MapPin,
    text: "1500 Marilla St., Room 5D — Dallas City Hall",
  },
  // {
  //   icon: Users,
  //   text: "Written comments accepted through Mon., Sept. 1",
  // },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = true;
    videoElement.defaultMuted = true;
    videoElement.playsInline = true;
    videoElement.setAttribute("muted", "true");
    videoElement.setAttribute("playsinline", "true");
    videoElement.setAttribute("webkit-playsinline", "true");
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const attemptPlay = async () => {
      try {
        videoElement.muted = true;
        await videoElement.play();
      } catch (error) {
        console.warn("iOS Autoplay blocked, waiting for interaction:", error);
      }
    };

    videoElement.addEventListener("canplay", attemptPlay, { once: true });
    if (videoElement.readyState >= 2) {
      attemptPlay();
    }

    const handleUserInteraction = () => {
      if (videoElement.paused) {
        attemptPlay();
      }
    };

    window.addEventListener("touchstart", handleUserInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("scroll", handleUserInteraction, {
      once: true,
      passive: true,
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && videoElement.paused) {
        attemptPlay();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;
      gsap.fromTo(
        bgRef.current,
        { yPercent: -6 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F8FF] py-20 sm:py-24 lg:py-28"
    >
      {/* Fonts + one-off keyframe, scoped to this hero */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .hero-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .hero-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .hero-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        @keyframes hero-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.82); }
        }
        .hero-pulse-dot { animation: hero-pulse 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-pulse-dot { animation: none; }
        }
      `}</style>

      {/* Ambient wash behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#0F6DF9]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#094EA1]/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
        {/* ---------------- Left: message + CTAs ---------------- */}
        <div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants}>
              <span className="hero-mono inline-flex items-center gap-2 rounded-full border border-[#094EA1]/20 bg-white px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-[#094EA1]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="hero-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#0F6DF9]" />
                </span>
                Tue, Sept. 2
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="hero-display mt-7 text-[2.75rem] font-bold leading-[0.98] tracking-tight text-[#031C4B] sm:text-6xl lg:text-[4.25rem]"
            >
              {/* Stand Up,
              <br /> */}
              <span className="inline-flex flex-wrap items-center gap-3">
                Save Dallas!
                <span className="flex -space-x-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#F4F8FF] bg-[#031C4B] text-white sm:h-12 sm:w-12">
                    <Landmark size={18} />
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#F4F8FF] bg-[#094EA1] text-white sm:h-12 sm:w-12">
                    <Users size={18} />
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#F4F8FF] bg-[#0F6DF9] text-white sm:h-12 sm:w-12">
                    <MapPin size={18} />
                  </span>
                </span>
              </span>
              <br />
              {/* Save Our <span className="text-[#0F6DF9]">Future.</span> */}
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              variants={itemVariants}
              className="hero-body mt-7 max-w-xl text-base leading-relaxed text-[#031C4B]/70 sm:text-lg"
            >
              The Dallas City Council is about to make one of the most critical
              decisions in our city's history: keep pouring taxpayer dollars
              into an aging, deteriorating City Hall, or sell the property to
              secure a brighter economic future.
            </motion.p>
            {/* <motion.p
              variants={itemVariants}
              className="hero-body mt-4 max-w-xl text-base leading-relaxed text-[#031C4B]/70 sm:text-lg"
            >
              Urge the Council to choose people over property — and protect our
              local economy, municipal budget, downtown workforce, and future
              entertainment options.
            </motion.p> */}

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              {/*  <a
              //   href="#take-action"
              //   className="hero-body group inline-flex items-center gap-2 rounded-full bg-[#031C4B] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#0F6DF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
              // >
              //   Register to Speak
              //   <ArrowRight
              //     size={16}
              //     className="transition-transform duration-200 group-hover:translate-x-1"
              //   />
              // </a>

              <a
                href="#reality"
                className="hero-body text-[15px] font-semibold text-[#031C4B] underline decoration-[#094EA1]/50 decoration-2 underline-offset-4 transition-colors hover:text-[#094EA1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
              >
                Read the Full Brief
              </a> 

              <a
                href="tel:2146703738"
                className="hero-mono inline-flex items-center gap-2 rounded-full border border-[#094EA1]/25 px-5 py-3 text-sm font-medium text-[#094EA1] transition-colors hover:border-[#0F6DF9] hover:text-[#0F6DF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
              >
                <Phone size={15} />
                214.670.3738
              </a>*/}
              <a
                href="tel:2146703738"
                className="hero-mono inline-flex items-center gap-2 rounded-full border border-[#094EA1]/25 px-5 py-3 text-sm font-medium text-[#094EA1] transition-colors hover:border-[#0F6DF9] hover:text-[#0F6DF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6DF9] focus-visible:ring-offset-2"
              >
                <Phone size={15} />
                214.670.3738
              </a>
            </motion.div>
          </motion.div>

          {/* Trust line */}
          {/* <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 border-t border-[#031C4B]/10 pt-8"
          >
            <motion.p
              variants={itemVariants}
              className="hero-body max-w-lg text-lg leading-relaxed text-[#031C4B]"
            >
              Join{" "}
              <span className="hero-display font-semibold text-[#094EA1]">
                1,200+
              </span>{" "}
              <span className="mx-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0F6DF9]/15 align-middle text-[#0F6DF9]">
                <Users size={13} />
              </span>{" "}
              Dallas residents pushing the Council to choose people over
              property, before the{" "}
              <span className="hero-display font-semibold text-[#031C4B]">
                Sept. 2
              </span>{" "}
              vote
              <span className="mx-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#094EA1]/15 align-middle text-[#094EA1]">
                <Calendar size={13} />
              </span>
              .
            </motion.p>
          </motion.div> */}
        </div>

        {/* ---------------- Right: visual ---------------- */}
        <div>
          <div className="relative mx-auto h-[320px] w-full max-w-md sm:h-[400px] lg:h-[320px]">
            {/* Soft gradient field behind the pyramid */}
            <div
              ref={bgRef}
              aria-hidden
              className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#0F6DF9]/20 via-[#094EA1]/10 to-transparent"
            />

            {/* Video, clipped into Dallas City Hall's leaning, inverted-pyramid profile */}
            <div
              className="absolute inset-y-2 left-[5%] right-[5%] overflow-hidden bg-[#031C4B] rounded-[32px]"
             // style={{ clipPath: "polygon(6% 0%, 94% 0%, 80% 100%, 20% 100%)" }}
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                disablePictureInPicture
                disableRemotePlayback
                className="h-full w-full object-cover"
              >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#031C4B]/50 via-transparent to-transparent" />
            </div>

            {/* City Hall mark, top-left */}
            <div className="absolute left-2 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#031C4B] text-white sm:h-16 sm:w-16">
              <Landmark size={26} />
            </div>

            {/* Vertical agenda number, right edge — hidden on small screens to avoid crowding */}
            {/* <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] sm:flex sm:items-center sm:gap-3">
              <span className="hero-display text-4xl font-bold leading-none text-[#0F6DF9] lg:text-5xl">
                Dallas
              </span>
              <span className="hero-mono text-[10px] uppercase tracking-[0.3em] text-[#031C4B]/50">
                Council Agenda
              </span>
            </div> */}

            {/* Blueprint grid, bottom-right corner */}
            <div
              aria-hidden
              className="absolute -bottom-6 -right-4 h-28 w-28 opacity-70 sm:h-32 sm:w-32"
              style={{
                backgroundImage:
                  "linear-gradient(#094EA1 1px, transparent 1px), linear-gradient(90deg, #094EA1 1px, transparent 1px)",
                backgroundSize: "12px 12px",
                maskImage:
                  "radial-gradient(circle at bottom right, black, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at bottom right, black, transparent 75%)",
                opacity: 0.25,
              }}
            />

            {/* Floating "Time To Act" docket card */}
            <div className="absolute -bottom-8 left-[-8%] w-[210px] rounded-2xl bg-[#031C4B] p-5 sm:w-[230px]">
              <p className="hero-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                Time to act
              </p>
              <p className="hero-display mt-1 text-lg font-semibold text-white">
                This Week
              </p>
              <div className="mt-4 flex h-16 items-end justify-between gap-1.5">
                {weekStrip.map((day, i) => (
                  <div
                    key={i}
                    className="flex flex-1 flex-col items-center gap-1.5"
                  >
                    <div
                      className={`w-full rounded-full ${day.tone}`}
                      style={{ height: `${day.h}px` }}
                    />
                    <span className="hero-mono text-[9px] text-white/40">
                      {day.d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detail rows below the visual */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 divide-y divide-[#031C4B]/10 sm:mt-10"
          >
            {docketRows.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#094EA1]/10 text-[#094EA1]">
                    <Icon size={16} />
                  </span>
                  <span className="hero-body text-sm text-[#031C4B]/80 sm:text-[15px]">
                    {text}
                  </span>
                </div>
                <ArrowRight size={15} className="shrink-0 text-[#031C4B]/25" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
