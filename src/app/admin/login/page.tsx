import AdminLoginContent from "@/components/admin/AdminLoginContent";
import { Suspense } from "react";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] text-[#031C4B]">
          Loading...
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
