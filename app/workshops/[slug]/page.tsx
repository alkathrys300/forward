import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkshopDetailHero from "@/components/workshop/WorkshopDetailHero";
import WorkshopDetailBody from "@/components/workshop/WorkshopDetailBody";
import WorkshopAgenda from "@/components/workshop/WorkshopAgenda";
import WorkshopPresenter from "@/components/workshop/WorkshopPresenter";
import { workshopItems, getWorkshopBySlug } from "@/lib/workshops";

export function generateStaticParams() {
  return workshopItems
    .filter((item) => item.slug)
    .map((item) => ({ slug: item.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkshopBySlug(slug);
  if (!item) return {};

  return {
    title: `${item.title} — فُورْوَرْد`,
    description: item.description || item.title,
  };
}

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkshopBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <Navbar />
      <main>
        <WorkshopDetailHero item={item} />
        <WorkshopDetailBody item={item} />
        <WorkshopAgenda item={item} />
        <WorkshopPresenter item={item} />
      </main>
      <Footer />
    </>
  );
}
