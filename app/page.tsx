import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RequirementBuilder from "@/components/RequirementBuilder";
import {
  BuilderIntro,
  TrustBar,
  Process,
  VideoShowcase,
  Services,
  Benefits,
  Testimonials,
  FinalCTA,
  Footer,
} from "@/components/Sections";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Centerpiece — interactive requirement builder */}
      <section className="px-4 pb-20 pt-4 sm:pb-28">
        <BuilderIntro />
        <RequirementBuilder />
      </section>

      <TrustBar />
      <Process />
      <VideoShowcase />
      <Services />
      <Benefits />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
