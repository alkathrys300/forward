import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
  title: "المدونة | فُورْوَرْد",
  description:
    "مقالات من فريق فُورْوَرْد حول اختيار التخصص، الحياة الجامعية، والانتقال إلى سوق العمل.",
  openGraph: {
    title: "مدونة فُورْوَرْد",
    description:
      "مقالات من فريق فُورْوَرْد حول اختيار التخصص، الحياة الجامعية، والانتقال إلى سوق العمل.",
    url: "https://forwardmy.org/blog",
    locale: "ar_SA",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogHero />
        <BlogListClient />
      </main>
      <Footer />
    </>
  );
}
