import RealitySection from "@/components/home/Realitysection";
import HeroSection from "../../components/home/Hero";
import OpportunitySection from "@/components/home/Opportunitysection";
import StakeSection from "@/components/home/Stakesection";
import TakeActionSection from "@/components/home/Takeactionsection";
import StandUpSection from "@/components/home/StandUpSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RealitySection />
      <OpportunitySection />
      <StakeSection />
      <TakeActionSection />
      <StandUpSection />
    </div>
  );
};

export default HomePage;
