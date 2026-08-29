import { Suspense } from "react";
import RegisterFormSection from "@/components/contact/contact";
import StandUpSection from "@/components/home/StandUpSection";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <RegisterFormSection />
      </Suspense>
      <StandUpSection />
    </div>
  );
};

export default Page;