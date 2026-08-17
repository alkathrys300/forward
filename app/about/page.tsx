import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import WhyForward from "@/components/about/WhyForward";
import ForwardJourney from "@/components/about/ForwardJourney";
import FounderSection from "@/components/about/FounderSection";
import BeliefsManifesto from "@/components/about/BeliefsManifesto";
import AboutFinalCTA from "@/components/about/AboutFinalCTA";

export const metadata: Metadata = {
  title: "عن فُورْوَرْد | فُورْوَرْد",
  description:
    "كل رحلة تبدأ بسؤال. تعرف على فُورْوَرْد، ولماذا وُجدت لتساعدك على اكتشاف طريقك التعليمي والمهني خطوة بخطوة.",
  openGraph: {
    title: "عن فُورْوَرْد",
    description:
      "كل رحلة تبدأ بسؤال. تعرف على فُورْوَرْد، ولماذا وُجدت لتساعدك على اكتشاف طريقك.",
    url: "https://forwardmy.org/about",
    locale: "ar_SA",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutIntro />
        <WhyForward />
        <ForwardJourney />
        <FounderSection />
        <BeliefsManifesto />
        <AboutFinalCTA />
      </main>
      <Footer />
    </>
  );
}
