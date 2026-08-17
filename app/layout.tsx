import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const siteUrl = "https://forwardmy.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "فُورْوَرْد | اصنع خطوتك القادمة",
  description:
    "فُورْوَرْد مؤسسة تعليمية تساعدك على فهم مرحلتك، اكتشاف فرصك، وبناء خطواتك القادمة بوضوح — من اختيار التخصص إلى ما بعد التخرج.",
  openGraph: {
    title: "فُورْوَرْد | اصنع خطوتك القادمة",
    description:
      "منظومة تعليمية وتنموية ترافق الطالب في أهم مراحل رحلته التعليمية، من اختيار التخصص إلى بداية المسار المهني.",
    url: siteUrl,
    siteName: "فُورْوَرْد",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فُورْوَرْد | اصنع خطوتك القادمة",
    description:
      "منظومة تعليمية وتنموية ترافق الطالب في أهم مراحل رحلته التعليمية.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={plexArabic.variable}>
      <body className="font-arabic bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
