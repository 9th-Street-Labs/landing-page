import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Point } from "@/components/sections/Point";
import { Modes } from "@/components/sections/Modes";
import { Mesh } from "@/components/sections/Mesh";
import { HardwareRemote } from "@/components/sections/HardwareRemote";
import { Measured } from "@/components/sections/Measured";
import { Specs } from "@/components/sections/Specs";
import { Download } from "@/components/sections/Download";

/* The marketing page ignores the global theme toggle: sections live in fixed
   dark/light bands (superheat.xyz-style). data-theme on a band re-resolves
   every token underneath it, so sections adapt without changes. */
function Band({
  theme,
  children,
}: {
  theme: "dark" | "light";
  children: React.ReactNode;
}) {
  return (
    <div data-theme={theme} className="bg-background text-foreground">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Band theme="dark">
          <Hero />
        </Band>
        <Band theme="light">
          <Point />
          <Modes />
        </Band>
        <Band theme="dark">
          <Mesh />
          <HardwareRemote />
        </Band>
        <Band theme="light">
          <Measured />
        </Band>
        <Band theme="dark">
          <Specs />
          <Download />
        </Band>
      </main>
      <Footer />
    </>
  );
}
