"use client";

import { useState, useTransition } from "react";
import { motion, type Variants } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Users,
  Monitor,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { submitRegistration } from "@/app/actions/register";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.5 },
  },
};

export default function RegisterFormSection() {
  const [participation, setParticipation] = useState<"in-person" | "video">(
    "in-person"
  );
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("participation", participation);

    startTransition(async () => {
      const result = await submitRegistration(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        alert(
          result.error || "Failed to submit registration. Please try again."
        );
      }
    });
  };

  return (
    <section
      id="register-form"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
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
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#0F6DF9 1px, transparent 1px), linear-gradient(90deg, #0F6DF9 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="hero-mono inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#0F6DF9]"
          >
            <span className="h-px w-8 bg-[#0F6DF9]/50" /> Register to Speak{" "}
            <span className="h-px w-8 bg-[#0F6DF9]/50" />
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="hero-display mt-4 text-3xl font-bold tracking-tight text-[#031C4B] sm:text-4xl"
          >
            Reserve Your Time to Speak
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="hero-body mt-4 text-[15px] leading-relaxed text-[#031C4B]/65"
          >
            Fill out the form below before 5:00 p.m., Monday, Sept. 1 to address
            the City Council on September 2.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.7rem] border border-[#0F6DF9]/15 bg-white">
            <div className="h-1 w-full bg-gradient-to-r from-[#0F6DF9] via-[#094EA1] to-transparent" />
            <div className="p-7 sm:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0F6DF9]/10 text-[#0F6DF9]">
                    <CheckCircle2 size={28} />
                  </span>
                  <p className="hero-display text-xl font-semibold text-[#031C4B]">
                    You&apos;re registered.
                  </p>
                  <p className="hero-body max-w-sm text-[14px] leading-relaxed text-[#031C4B]/60">
                    We&apos;ll follow up with confirmation details ahead of the
                    September 2 meeting. Thank you for making your voice heard.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Full name */}
                  <div>
                    <label
                      htmlFor="full-name"
                      className="hero-mono mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#031C4B]/50"
                    >
                      <User size={13} className="text-[#0F6DF9]" /> Full name
                    </label>
                    <input
                      id="full-name"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Jane Rivera"
                      className="hero-body w-full rounded-xl border border-[#031C4B]/10 bg-[#F8FAFC] px-4 py-3 text-[15px] text-[#031C4B] placeholder:text-[#031C4B]/30 outline-none transition-colors focus:border-[#0F6DF9]/60 focus:bg-white"
                    />
                  </div>

                  {/* Email address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="hero-mono mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#031C4B]/50"
                    >
                      <Mail size={13} className="text-[#0F6DF9]" /> Email
                      address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane.rivera@example.com"
                      className="hero-body w-full rounded-xl border border-[#031C4B]/10 bg-[#F8FAFC] px-4 py-3 text-[15px] text-[#031C4B] placeholder:text-[#031C4B]/30 outline-none transition-colors focus:border-[#0F6DF9]/60 focus:bg-white"
                    />
                  </div>

                  {/* Residence address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="hero-mono mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#031C4B]/50"
                    >
                      <MapPin size={13} className="text-[#0F6DF9]" /> Residence
                      address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      placeholder="123 Main St, Dallas, TX"
                      className="hero-body w-full rounded-xl border border-[#031C4B]/10 bg-[#F8FAFC] px-4 py-3 text-[15px] text-[#031C4B] placeholder:text-[#031C4B]/30 outline-none transition-colors focus:border-[#0F6DF9]/60 focus:bg-white"
                    />
                  </div>

                  {/* Daytime phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="hero-mono mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#031C4B]/50"
                    >
                      <Phone size={13} className="text-[#0F6DF9]" /> Daytime
                      telephone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(214) 555-0148"
                      className="hero-body w-full rounded-xl border border-[#031C4B]/10 bg-[#F8FAFC] px-4 py-3 text-[15px] text-[#031C4B] placeholder:text-[#031C4B]/30 outline-none transition-colors focus:border-[#0F6DF9]/60 focus:bg-white"
                    />
                  </div>

                  {/* Choice of participation */}
                  <div>
                    <label className="hero-mono mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#031C4B]/50">
                      <Users size={13} className="text-[#0F6DF9]" /> Choice of
                      participation
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setParticipation("in-person")}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[14px] font-medium transition-colors ${
                          participation === "in-person"
                            ? "border-[#0F6DF9] bg-[#0F6DF9]/10 text-[#031C4B]"
                            : "border-[#031C4B]/10 bg-[#F8FAFC] text-[#031C4B]/60 hover:border-[#0F6DF9]/40"
                        }`}
                      >
                        <Users size={15} /> In person
                      </button>
                      <button
                        type="button"
                        onClick={() => setParticipation("video")}
                        className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[14px] font-medium transition-colors ${
                          participation === "video"
                            ? "border-[#0F6DF9] bg-[#0F6DF9]/10 text-[#031C4B]"
                            : "border-[#031C4B]/10 bg-[#F8FAFC] text-[#031C4B]/60 hover:border-[#0F6DF9]/40"
                        }`}
                      >
                        <Monitor size={15} /> Videoconference
                      </button>
                    </div>
                  </div>

                  {/* Subject matter */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="hero-mono mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#031C4B]/50"
                    >
                      <MessageSquare size={13} className="text-[#0F6DF9]" />{" "}
                      Subject matter you wish to present
                    </label>
                    <textarea
                      id="subject"
                      name="subject"
                      required
                      rows={4}
                      placeholder="Briefly describe what you plan to speak about..."
                      className="hero-body w-full resize-none rounded-xl border border-[#031C4B]/10 bg-[#F8FAFC] px-4 py-3 text-[15px] text-[#031C4B] placeholder:text-[#031C4B]/30 outline-none transition-colors focus:border-[#0F6DF9]/60 focus:bg-white"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="hero-body group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F6DF9] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#094EA1] disabled:opacity-55"
                  >
                    {isPending ? "Submitting..." : "Register Online"}
                    <ArrowRight
                      size={16}
                      strokeWidth={2.25}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                  <p className="hero-body text-center text-[12px] text-[#031C4B]/40">
                    Registration closes 5:00 p.m., Monday, Sept. 1.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
