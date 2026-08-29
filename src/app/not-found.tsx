import NotFoundContent from "@/components/not_found/NotFoundContent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}