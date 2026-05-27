import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { ProblemSection } from "../components/sections/ProblemSection";
import { RealityCheckSection } from "../components/sections/RealityCheckSection";
import { PositioningSection } from "../components/sections/PositioningSection";
import { MiniTryoutSection } from "../components/sections/MiniTryoutSection";
import { ResultPreviewSection } from "../components/sections/ResultPreviewSection";
import { ValueSection } from "../components/sections/ValueSection";
import { TrustSection } from "../components/sections/TrustSection";
import { PricingSection } from "../components/sections/PricingSection";
import { NextStepSection } from "../components/sections/NextStepSection";
import { FinalPushSection } from "../components/sections/FinalPushSection";
import { WhatsAppSection } from "../components/sections/WhatsAppSection";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Flow: Hero → Problem → Reality Check → Positioning → Mini Tryout →
            Result Preview → Value → Trust → Pricing → Next Step → Final Push → WA */}
        <HeroSection />
        <ProblemSection />
        <RealityCheckSection />
        <PositioningSection />
        <MiniTryoutSection />
        <ResultPreviewSection />
        <ValueSection />
        <TrustSection />
        <PricingSection />
        <NextStepSection />
        <FinalPushSection />
        <WhatsAppSection />
      </main>

      <Footer />
    </div>
  );
}
