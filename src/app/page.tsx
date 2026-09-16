import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Rounds } from "@/components/Rounds";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Rounds />
      </main>
      <Footer />
    </>
  );
}
