import { Suspense } from "react";
import RealitySection from "@/components/home/Realitysection";
import HeroSection from "../../components/home/Hero";
import OpportunitySection from "@/components/home/Opportunitysection";
import StakeSection from "@/components/home/Stakesection";
import TakeActionSection from "@/components/home/Takeactionsection";
import StandUpSection from "@/components/home/StandUpSection";

export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>
      <RealitySection />
      <OpportunitySection />
      <StakeSection />
      <TakeActionSection />
      <StandUpSection />
    </div>
  );
};

export default HomePage;