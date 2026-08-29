"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sectionVideo = "/vote.mp4";



if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.7 },
  },
};

export default function StandUpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch (err) {
        console.warn("Autoplay blocked:", err);
      }
    };

    video.addEventListener("canplay", attemptPlay, { once: true });
    if (video.readyState >= 2) attemptPlay();

    const onInteract = () => {
      if (video.paused) attemptPlay();
    };
    window.addEventListener("touchstart", onInteract, {
      once: true,
      passive: true,
    });
    window.addEventListener("scroll", onInteract, {
      once: true,
      passive: true,
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#031C4B] sm:min-h-[80vh]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Public+Sans:wght@400;500&display=swap');
        .su-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .su-body { font-family: 'Public Sans', system-ui, sans-serif; }
      `}</style>

      {/* Parallax video background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[15%] -bottom-[15%] will-change-transform pointer-events-none"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          /* @ts-ignore */
          webkit-playsinline="true"
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          className="h-full w-full object-cover"
        >
          <source src={sectionVideo} type="video/mp4" />
        </video>
      </div>

      {/* Overlays for contrast */}
      <div className="absolute inset-0 z-[1] bg-[#000]/43" />
      <div className="absolute inset-0 z-[1] bg-[#000]/43" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="su-body mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-[#0F6DF9]"
        >
          Dallas Deserves Better
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="su-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]"
        >
          Stand Up, Dallas!
          <br />
          <span className="text-white/95">Save Our City&apos;s Future</span>
          <span className="text-[#0F6DF9]">.</span>
        </motion.h2>
      </motion.div>
    </section>
  );
}
