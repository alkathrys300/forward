import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { getYouTubeId } from "@/lib/workshops";
import type { WorkshopItem } from "@/lib/workshops";

export default function WorkshopVideoEmbed({ item }: { item: WorkshopItem }) {
  if (!item.youtubeUrl) return null;
  const videoId = getYouTubeId(item.youtubeUrl);
  if (!videoId) return null;

  return (
    <section id="video" className="pb-16 sm:pb-20 scroll-mt-24">
      <Container>
        <Reveal className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_30px_60px_-24px_rgba(20,40,47,0.4)]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={item.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </Reveal>
      </Container>
    </section>
  );
}
