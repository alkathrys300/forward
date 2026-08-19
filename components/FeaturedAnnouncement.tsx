import Container from "./Container";
import Reveal from "./Reveal";
import FeaturedWorkshopCard from "./FeaturedWorkshopCard";
import { workshopItems } from "@/lib/workshops";

export default function FeaturedAnnouncement() {
  const featuredItems = workshopItems.filter((item) => item.featured);
  if (featuredItems.length === 0) return null;

  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        {featuredItems.map((item) => (
          <Reveal key={item.title}>
            <FeaturedWorkshopCard item={item} />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
