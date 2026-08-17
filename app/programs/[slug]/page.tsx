import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramHero from "@/components/program/ProgramHero";
import ProgramObjectives from "@/components/program/ProgramObjectives";
import ProgramAudience from "@/components/program/ProgramAudience";
import ProgramFeatures from "@/components/program/ProgramFeatures";
import ProgramHowItWorks from "@/components/program/ProgramHowItWorks";
import ProgramClosingCTA from "@/components/program/ProgramClosingCTA";
import { programDetails, programOrder, type ProgramSlug } from "@/lib/programs";

export function generateStaticParams() {
  return programOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programDetails[slug as ProgramSlug];
  if (!program) return {};

  const title = `${program.title} | ${program.stage} — فُورْوَرْد`;
  const description = program.tagline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://forwardmy.org/programs/${program.slug}`,
      locale: "ar_SA",
      type: "website",
    },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programDetails[slug as ProgramSlug];
  if (!program) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ProgramHero program={program} />
        <ProgramObjectives program={program} />
        <ProgramAudience program={program} />
        <ProgramFeatures program={program} />
        <ProgramHowItWorks program={program} />
        <ProgramClosingCTA program={program} />
      </main>
      <Footer />
    </>
  );
}
