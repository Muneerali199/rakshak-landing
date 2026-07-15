import { ReactNode } from "react";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThreatTicker from "@/components/sections/ThreatTicker";

const HeroCanvas = dynamic(() => import("@/components/sections/HeroCanvas"), {
  ssr: false,
});
const FeaturesGrid = dynamic(() => import("@/components/sections/FeaturesGrid"), {
  ssr: false,
});
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), {
  ssr: false,
});
const VulnerabilityTable = dynamic(
  () => import("@/components/sections/VulnerabilityTable"),
  { ssr: false }
);
const ArchitectureDiagram = dynamic(
  () => import("@/components/sections/ArchitectureDiagram"),
  { ssr: false }
);
const StatsBanner = dynamic(
  () => import("@/components/sections/StatsBanner"),
  { ssr: false }
);
const InstallCTA = dynamic(() => import("@/components/sections/InstallCTA"), {
  ssr: false,
});

interface HomeClientProps {
  liveDemo: ReactNode;
  configShowcase: ReactNode;
}

export default function HomeClient({ liveDemo, configShowcase }: HomeClientProps) {
  return (
    <SmoothScrollProvider>
      <div className="opacity-100">
        <Navbar />
        <main>
          <HeroCanvas />
          <ThreatTicker />
          <FeaturesGrid />
          <HowItWorks />
          {liveDemo}
          <VulnerabilityTable />
          <ArchitectureDiagram />
          <StatsBanner />
          {configShowcase}
          <InstallCTA />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
