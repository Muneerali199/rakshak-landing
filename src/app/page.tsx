import HomeClient from "@/components/HomeClient";
import LiveCodeDemo from "@/components/sections/LiveCodeDemo";
import ConfigShowcase from "@/components/sections/ConfigShowcase";

export default function Home() {
  return (
    <HomeClient
      liveDemo={<LiveCodeDemo />}
      configShowcase={<ConfigShowcase />}
    />
  );
}
