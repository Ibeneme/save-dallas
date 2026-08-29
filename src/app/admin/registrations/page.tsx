import { getRegistrationsData } from "@/app/actions/admin";
import { Users, Monitor, UserCheck } from "lucide-react";
import LogoutButton from "@/components/buttons/LogoutButton"; // adjust path if needed

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage() {
  const { registrations, stats } = await getRegistrationsData();

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-12 sm:px-6 lg:px-8">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
                .hero-display { font-family: 'Space Grotesk', system-ui, sans-serif; }
                .hero-body { font-family: 'Public Sans', system-ui, sans-serif; }
                .hero-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
            `}</style>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="hero-mono inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#0F6DF9]">
              <span className="h-px w-6 bg-[#0F6DF9]/60" />
              Admin Portal
            </span>
            <h1 className="hero-display mt-2 text-3xl font-bold tracking-tight text-[#031C4B] sm:text-4xl">
              Speaker Submissions
            </h1>
          </div>
          <LogoutButton />
        </div>

        {/* Stat Cards Grid */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl border border-[#031C4B]/10 bg-[#031C4B] p-6 text-white">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#0F6DF9] to-transparent" />
            <div className="flex items-center justify-between">
              <span className="hero-mono text-xs uppercase tracking-wider text-white/50">
                Total Registrations
              </span>
              <Users className="text-[#0F6DF9]" size={20} />
            </div>
            <p className="hero-display mt-4 text-4xl font-bold">
              {stats.total}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#031C4B]/10 bg-white p-6">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#0F6DF9] to-transparent" />
            <div className="flex items-center justify-between">
              <span className="hero-mono text-xs uppercase tracking-wider text-[#031C4B]/50">
                In-Person Speakers
              </span>
              <UserCheck className="text-[#0F6DF9]" size={20} />
            </div>
            <p className="hero-display mt-4 text-4xl font-bold text-[#031C4B]">
              {stats.inPersonCount}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#031C4B]/10 bg-white p-6">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#094EA1] to-transparent" />
            <div className="flex items-center justify-between">
              <span className="hero-mono text-xs uppercase tracking-wider text-[#031C4B]/50">
                Videoconference
              </span>
              <Monitor className="text-[#094EA1]" size={20} />
            </div>
            <p className="hero-display mt-4 text-4xl font-bold text-[#031C4B]">
              {stats.videoCount}
            </p>
          </div>
        </div>

        {/* Submissions Table (Now Full Width) */}
        <div className="overflow-hidden rounded-2xl border border-[#031C4B]/10 bg-white">
          <div className="flex items-center justify-between border-b border-[#031C4B]/10 p-6">
            <h2 className="hero-display text-lg font-semibold text-[#031C4B]">
              Registered Submissions
            </h2>
            <span className="hero-mono text-xs text-[#031C4B]/50">
              {registrations.length} Total records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="hero-mono border-b border-[#031C4B]/10 bg-[#F8FAFC] text-[11px] uppercase tracking-wider text-[#031C4B]/50">
                  <th className="px-6 py-4">Speaker</th>
                  <th className="px-6 py-4">Participation</th>
                  <th className="px-6 py-4">Subject Matter</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#031C4B]/5 text-sm">
                {registrations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="hero-body py-12 text-center text-[#031C4B]/40"
                    >
                      No registrations found yet.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr
                      key={reg._id}
                      className="transition-colors hover:bg-[#F8FAFC]/60"
                    >
                      <td className="px-6 py-5">
                        <p className="hero-body font-semibold text-[#031C4B]">
                          {reg.fullName}
                        </p>
                        <p className="hero-body mt-0.5 text-xs text-[#0F6DF9]">
                          {reg.email}
                        </p>
                        <p className="hero-body mt-0.5 text-xs text-[#031C4B]/40">
                          {reg.phone}
                        </p>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <span
                          className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider mt-1 ${
                            reg.participation === "in-person"
                              ? "bg-[#0F6DF9]/10 text-[#0F6DF9]"
                              : "bg-[#094EA1]/10 text-[#094EA1]"
                          }`}
                        >
                          {reg.participation}
                        </span>
                      </td>
                      <td className="max-w-xl px-6 py-5 align-top">
                        <p className="hero-body line-clamp-3 text-sm text-[#031C4B]/75 leading-relaxed mt-1">
                          {reg.subject}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-right align-top">
                        <span className="hero-mono text-xs text-[#031C4B]/50 mt-1.5 inline-block">
                          {reg.createdAt
                            ? new Date(reg.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
