import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostClient from "@/components/blog/BlogPostClient";

// This single static page serves every post at /blog/<slug>/ — see the
// comment at the top of components/blog/BlogPostClient.tsx and the
// public/_redirects rule for how the pretty per-post URL gets here.
// Because content is fetched client-side after the page loads, this
// generic metadata (not the post's own title/description/cover image)
// is what search engines and link previews see — a real tradeoff of
// keeping the site a static export instead of adding a server. See
// BLOG_SETUP.md for the full explanation.
export const metadata: Metadata = {
  title: "المدونة | فُورْوَرْد",
  description: "مقالات من فريق فُورْوَرْد حول اختيار التخصص، الحياة الجامعية، والانتقال إلى سوق العمل.",
};

export default function BlogPostPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogPostClient />
      </main>
      <Footer />
    </>
  );
}
