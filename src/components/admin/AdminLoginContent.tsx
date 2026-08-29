"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { requestOtp, verifyOtp } from "@/app/actions/auth";
import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginContent() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRequestOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await requestOtp(formData);
      if (res.success && res.email) {
        setEmail(res.email);
        setStep("otp");
      } else {
        setError(res.error || "Something went wrong.");
      }
    });
  };

  const handleVerifyOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.append("email", email);

    startTransition(async () => {
      const res = await verifyOtp(formData);
      if (res.success) {
        router.push("/admin/registrations");
      } else {
        setError(res.error || "Verification failed.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] px-4 py-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        .hero-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
        .hero-body { font-family: 'Public Sans', system-ui, sans-serif; }
        .hero-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#031C4B]/10 bg-white">
        {/* Step indicator bar */}
        <div className="flex">
          <div
            className={`h-1 flex-1 transition-colors duration-300 ${
              step === "email" ? "bg-[#0F6DF9]" : "bg-[#0F6DF9]/30"
            }`}
          />
          <div
            className={`h-1 flex-1 transition-colors duration-300 ${
              step === "otp" ? "bg-[#031C4B]" : "bg-[#031C4B]/10"
            }`}
          />
        </div>

        <div className="p-8">
          {/* ─── EMAIL STEP ─── */}
          {step === "email" && (
            <>
              <div className="mb-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F6DF9]/10 text-[#0F6DF9]">
                  <Mail size={22} />
                </div>
                <span className="hero-mono inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#0F6DF9]">
                  <span className="h-px w-6 bg-[#0F6DF9]/60" /> Step 1 of 2
                </span>
                <h1 className="hero-display mt-2 text-2xl font-bold text-[#031C4B]">
                  Admin Sign In
                </h1>
                <p className="hero-body mt-1 text-sm text-[#031C4B]/60">
                  Enter your registered administrator email address.
                </p>
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="hero-mono mb-1.5 block text-[10px] uppercase tracking-wider text-[#031C4B]/50">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3.5 top-3 text-[#031C4B]/40"
                      size={17}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="contact@boringthinkers.com"
                      className="hero-body w-full rounded-xl border border-[#031C4B]/10 bg-[#F8FAFC] py-2.5 pl-10 pr-3.5 text-sm text-[#031C4B] outline-none transition-colors focus:border-[#0F6DF9] focus:bg-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="hero-body group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F6DF9] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#094EA1] disabled:opacity-50"
                >
                  {isPending ? "Sending OTP..." : "Continue with OTP"}
                  <ArrowRight size={16} />
                </button>
              </form>
            </>
          )}

          {/* ─── OTP STEP ─── */}
          {step === "otp" && (
            <>
              <div className="mb-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#031C4B]/10 text-[#031C4B]">
                  <ShieldCheck size={22} />
                </div>
                <span className="hero-mono inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#031C4B]">
                  <span className="h-px w-6 bg-[#031C4B]/40" /> Step 2 of 2
                </span>
                <h1 className="hero-display mt-2 text-2xl font-bold text-[#031C4B]">
                  Enter Security Code
                </h1>
                <p className="hero-body mt-1 text-sm text-[#031C4B]/60">
                  We&apos;ve sent a 6-digit code to{" "}
                  <span className="font-medium text-[#031C4B]">{email}</span>
                </p>
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="hero-mono mb-1.5 block text-[10px] uppercase tracking-wider text-[#031C4B]/50">
                    6-Digit OTP Code
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3.5 top-3.5 text-[#031C4B]/40"
                      size={17}
                    />
                    <input
                      type="text"
                      name="otp"
                      required
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="one-time-code"
                      placeholder="••••••"
                      className="hero-mono w-full rounded-xl border border-[#031C4B]/10 bg-[#F8FAFC] py-3 pl-10 pr-3.5 text-center text-xl tracking-[0.4em] text-[#031C4B] outline-none transition-colors focus:border-[#031C4B] focus:bg-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="hero-body group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#031C4B] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0F6DF9] disabled:opacity-50"
                >
                  {isPending ? "Verifying..." : "Verify & Sign In"}
                  <CheckCircle2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError("");
                  }}
                  className="hero-body w-full text-center text-xs text-[#031C4B]/50 transition-colors hover:text-[#031C4B]"
                >
                  ← Back to email entry
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
