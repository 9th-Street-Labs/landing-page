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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Point />
        <Modes />
        <Mesh />
        <HardwareRemote />
        <Measured />
        <Specs />
        <Download />
      </main>
      <Footer />
    </>
  );
}
