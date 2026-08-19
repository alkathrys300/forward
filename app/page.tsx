import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedAnnouncement from "@/components/FeaturedAnnouncement";
import WhereAreYouNow from "@/components/WhereAreYouNow";
import AboutForward from "@/components/AboutForward";
import ProgramsPreview from "@/components/ProgramsPreview";
import WorkshopsSection from "@/components/WorkshopsSection";
import CommunitySection from "@/components/CommunitySection";
import CollaborationCTA from "@/components/CollaborationCTA";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedAnnouncement />
        <WhereAreYouNow />
        <AboutForward />
        <ProgramsPreview />
        <WorkshopsSection />
        <CommunitySection />
        <CollaborationCTA />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
