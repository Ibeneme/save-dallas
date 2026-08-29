"use client";

import { useState, useTransition } from "react";
import { LogOut, X } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hero-body inline-flex items-center gap-2 rounded-xl border border-[#031C4B]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#031C4B] transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut size={16} />
        Sign Out
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#031C4B]/40 backdrop-blur-sm"
            onClick={() => !isPending && setOpen(false)}
          />

          <div className="relative w-full max-w-sm rounded-2xl border border-[#031C4B]/10 bg-white p-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="absolute right-4 top-4 rounded-lg p-1 text-[#031C4B]/40 transition-colors hover:bg-[#031C4B]/5 hover:text-[#031C4B] disabled:opacity-50"
            >
              <X size={18} />
            </button>

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <LogOut size={22} />
            </div>

            <h3 className="hero-display text-lg font-bold text-[#031C4B]">
              Sign out?
            </h3>
            <p className="hero-body mt-1.5 text-sm text-[#031C4B]/60">
              You&apos;ll need to verify your email again to access the admin
              portal.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="hero-body flex-1 rounded-xl border border-[#031C4B]/15 px-4 py-2.5 text-sm font-semibold text-[#031C4B] transition-colors hover:bg-[#F8FAFC] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
                className="hero-body flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? "Signing out..." : "Yes, sign out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
