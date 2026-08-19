export type WorkshopKind = "ورشة" | "إعلان" | "مسابقة";

export type WorkshopItem = {
  kind: WorkshopKind;
  title: string;
  host: string;
  date: string;
  price: string;
  tone: string;
  imageUrl?: string;
  /** Full YouTube URL (watch/youtu.be/shorts). When set, the card shows
   * the video's real thumbnail as a poster and links out to it. */
  youtubeUrl?: string;
  /** When set, the card links to a dedicated /workshops/{slug} details
   * page instead of a YouTube video — used for courses/announcements
   * that need their own page with a registration form. */
  slug?: string;
  presenter?: string;
  presenterTitle?: string;
  presenterPhoto?: string;
  presenterBio?: string[];
  presenterLinkedIn?: string;
  presenterHighlights?: {
    icon: "vision" | "experience" | "skills" | "education";
    title: string;
    description: string;
  }[];
  description?: string;
  location?: string;
  agenda?: { title: string; description: string }[];
  /** Renders as a large full-width banner above the regular grid,
   * for the one or two most important active items. */
  featured?: boolean;
  /** Google Form (or similar) link. When set, the registration button
   * opens it inside the site's own modal via an iframe — the visitor
   * never leaves the page, but responses are still collected on your
   * Google Form as normal. Takes priority over the Web3Forms modal. */
  formUrl?: string;
};

// Accepts youtube.com/watch?v=, youtu.be/, youtube.com/shorts/, and
// youtube.com/embed/ URL shapes and returns the 11-char video id.
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

// Placeholder / example listings — swap these for real workshops and
// announcements before launch. Dates are intentionally left as "قريبًا"
// (soon) rather than invented specific dates.
export const workshopItems: WorkshopItem[] = [
  {
    kind: "مسابقة",
    title: "مناظرات اليمن",
    host: "فريق فُورْوَرْد",
    date: "مسجله",
    price: "مجاني",
    tone: "bg-teal text-cream-soft",
    youtubeUrl: "https://youtu.be/U_a5qcp0mro?si=Os8UZ9ohi071K75j",
  },
  {
    kind: "ورشة",
    title: "كيف تتميز في الجامعة ",
    host: "فريق فُورْوَرْد",
    date: "مسجلة",
    price: "مجاني",
    tone: "bg-teal text-cream-soft",
    youtubeUrl: "https://youtu.be/ZPi5cawU4yQ?si=V6bnZmUWiqNaCByI",
  },
  {
    kind: "ورشة",
    title: "استضافات التميز 01: تجربتي في الجامعة",
    host: "م. فيصل جواس",
    date: "مسجلة",
    price: "مجاني",
    tone: "bg-teal text-cream-soft",
    youtubeUrl: "https://youtu.be/wiCH0qYPD9I?si=wRQqjnSAFLlo4-kd",
  },
  {
    kind: "ورشة",
    title:
      "استضافات التميز 02: مهارات المستقبل — تطوير الذات من الحياة الجامعية إلى عالم الأعمال",
    host: "أ. بلال عبد الكريم",
    date: "مسجلة",
    price: "مجاني",
    tone: "bg-teal text-cream-soft",
    youtubeUrl: "https://youtu.be/KfT3nAL7HrE?si=tP_BCv3U1yigUh7u",
  },
  {
    kind: "ورشة",
    title:
      "استضافات التميز 03: المهارات الإدارية الأساسية — ما يحتاجه الطالب الجامعي",
    host: "أ. محمد الاغبري",
    date: "مسجلة",
    price: "مجاني",
    tone: "bg-teal text-cream-soft",
    youtubeUrl: "https://youtu.be/CSJRFHHN364?si=1O2ExtVNpcXB_lG9",
  },
  {
    kind: "ورشة",
    title: "دورة دليلك الشامل لاختيار تخصص الذكاء الاصطناعي",
    host: "م. محمد المحفدي",
    date: "مسجلة",
    price: "مجاني",
    tone: "bg-teal text-cream-soft",
    youtubeUrl: "https://youtu.be/7CYQEa_meTE?si=HwxmqYGqTdoChiV7",
  },
  {
    kind: "ورشة",
    title: "اقتباسات التميز by AI: تجربتي في الجامعة",
    host: "م. فيصل جواس",
    date: "مسجلة",
    price: "مجاني",
    tone: "bg-teal text-cream-soft",
    youtubeUrl: "https://youtu.be/sTCTPzigOwo?si=Sj1t5MfZJ27bCIwb",
  },
  {
    kind: "ورشة",
    title: "الطالب الذكي: الذكاء الاصطناعي رفيقك من المحاضرة إلى الوظيفة",
    host: "فريق فُورْوَرْد",
    date: "السبت، 29 أغسطس 2026 — 4:00 مساءً (توقيت اليمن) · 9:00 مساءً (توقيت ماليزيا)",
    price: "مجاني",
    tone: "bg-sun text-navy",
    imageUrl: "/images/ai-workshop-announcement.jpeg",
    slug: "ai-from-lecture-to-job",
    featured: true,
    location: "أونلاين عبر Zoom",
    presenter: "م. محمد المحفدي",
    presenterTitle:
      "استشاري تحول ذكي، بخبرة عملية في مجالات الذكاء الاصطناعي، الأتمتة، وتطوير الأعمال",
    presenterLinkedIn: "https://www.linkedin.com/in/mohalmah",
    presenterHighlights: [
      {
        icon: "vision",
        title: "رؤية المقدّم",
        description:
          "استشاري تحول ذكي، بخبرة عملية في مجالات الذكاء الاصطناعي، الأتمتة، وتطوير الأعمال.",
      },
      {
        icon: "experience",
        title: "الخبرة والمناصب",
        description:
          "مدير مشارك للتحول المؤسسي في Accenture، يقود فريقًا للتحول ويدير مبادرات تطوير وتحسين عالمية.",
      },
      {
        icon: "skills",
        title: "المهارات التقنية والعملية",
        description:
          "الذكاء الاصطناعي التوليدي وAgentic AI، تحليل البيانات بـPython وSQL، ومنهجيات Lean Six Sigma.",
      },
      {
        icon: "education",
        title: "التعليم",
        description:
          "ماجستير هندسة النظم من Arizona State University، وبكالوريوس الهندسة الكيميائية من Universiti Malaysia Pahang.",
      },
    ],
    presenterBio: [
      "م. محمد المحفدي، استشاري تحول ذكي ومتخصص في تطبيقات الذكاء الاصطناعي، والأتمتة، وتحسين العمليات، والتميز التشغيلي. يعمل حاليًا في Accenture بمنصب مدير مشارك للتحول المؤسسي (Business Transformation Associate Manager)، حيث يقود فريقًا للتحول ويدير مبادرات تطوير وتحسين تغطي مواقع عمل عالمية ومسارات تشغيلية متعددة.",
      "يمتلك محمد خبرة مهنية تمتد لأكثر من سبع سنوات في قيادة الفرق، وتحليل المشكلات، وإعادة هندسة العمليات، وتحويل التحديات التشغيلية إلى حلول ومبادرات عملية قابلة للتطبيق والقياس. وقد قاد تصميم وتطوير وإطلاق مجموعة من الحلول المعتمدة على الذكاء الاصطناعي التوليدي والـAgentic AI، إلى جانب مشاريع في تحليل البيانات، وأتمتة سير العمل، وتحسين الجودة والكفاءة وتجربة المستخدم.",
      "يجمع في عمله بين الرؤية الإدارية والخبرة التقنية؛ إذ يستخدم منهجيات Lean Six Sigma وأدوات تحليل البيانات مثل Python وSQL لتحديد جذور المشكلات، وقياس أثر الحلول، ودعم القرارات المبنية على البيانات. كما يمتلك خبرة في قيادة المبادرات متعددة الأطراف والتعاون مع فرق الأعمال والعمليات والتحليلات والمنتجات والتقنية ضمن بيئات عمل دولية.",
      "يحمل محمد درجة الماجستير في هندسة النظم من Arizona State University، ودرجة البكالوريوس في الهندسة الكيميائية من Universiti Malaysia Pahang، ويدرس حاليًا الدكتوراه في إدارة الأعمال (DBA) في INTI International University. كما يحمل شهادات مهنية في الذكاء الاصطناعي التوليدي، والـAgentic AI، والحوسبة السحابية، وإدارة المشاريع، وLean Six Sigma Black Belt.",
      "إلى جانب مسيرته المهنية، يهتم محمد ببناء المنتجات الرقمية والأدوات مفتوحة المصدر، ويعمل على مشاريع تجمع بين الذكاء الاصطناعي والتقنية واحتياجات الأعمال والمجتمع. ويسعى من خلال هذه الورشة إلى نقل خبرته العملية للطلاب ومساعدتهم على استخدام الذكاء الاصطناعي بطريقة مسؤولة وفعالة، وتحويل المعرفة والواجبات والمشاريع الجامعية إلى أعمال عملية تثبت مهاراتهم، وتدعم بناء هويتهم الرقمية وملفهم المهني، وتعزز استعدادهم للتدريب وسوق العمل.",
    ],
    description:
      "ورشة تطبيقية تأخذك في رحلة من المحاضرة إلى الوظيفة باستخدام أدوات الذكاء الاصطناعي، وتغطي: البحث، المشاريع، تطوير المهارات، التدريب (Internship)، وصولًا إلى الوظيفة. تعلّم بذكاء، وابدأ بكفاءة، واستعد للمستقبل.",
    agenda: [
      {
        title: "الذكاء الاصطناعي رفيقك في الدراسة",
        description:
          "استخدام الذكاء الاصطناعي لفهم المواد، وتبسيط المفاهيم، وتنظيم الدراسة، وتلخيص المعلومات، ومراجعة الأعمال بدلًا من استخدامه لنسخ الإجابات.",
      },
      {
        title: "من السؤال العادي إلى الاستخدام الاحترافي",
        description:
          "تعلّم كتابة طلبات واضحة، وتزويد الذكاء الاصطناعي بالسياق المناسب، وتقسيم المهام المعقدة إلى خطوات، ومراجعة النتائج وتحسينها.",
      },
      {
        title: "البحث الذكي والـAgentic AI",
        description:
          "الاستفادة من أدوات ووكلاء الذكاء الاصطناعي في تخطيط البحث، واكتشاف المصادر، وتنظيم المعلومات، ومقارنة النتائج والتحقق من دقتها.",
      },
      {
        title: "من الواجب الجامعي إلى مشروع عملي",
        description:
          "تحويل الواجبات والمشاريع الدراسية إلى مشاريع واقعية تُظهر قدرة الطالب على البحث، والتحليل، والإبداع، وحل المشكلات.",
      },
      {
        title: "بناء الهوية الرقمية والـPortfolio",
        description:
          "توثيق المشاريع وعرضها بصورة احترافية، وإبراز دور الطالب والمهارات التي اكتسبها، وبناء ملف رقمي يدعم فرصه في التدريب والتوظيف.",
      },
      {
        title: "الاستخدام المسؤول والموثوق",
        description:
          "التحقق من المعلومات والمصادر، والتعامل مع أخطاء الذكاء الاصطناعي، وحماية الخصوصية، وتجنب الانتحال، والإفصاح المسؤول عن استخدام أدوات الذكاء الاصطناعي.",
      },
      {
        title: "ورشة تطبيقية على حالتين عمليتين",
        description:
          "تطبيق مباشر لتحويل مهمة دراسية إلى مشروع قابل للإضافة إلى الـPortfolio، ومقارنة الاستخدام العادي للذكاء الاصطناعي بالاستخدام المنظم والمتقدم.",
      },
    ],
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScFUN6Q4nbt63onTX6bHGOFNL6FHnyQkniwfgB-V40Ry9s6PA/viewform?usp=preview",
  },
];

export function getWorkshopBySlug(slug: string): WorkshopItem | undefined {
  return workshopItems.find((item) => item.slug === slug);
}

// Google Forms requires an explicit ?embedded=true query param to render
// cleanly inside an iframe; other form providers are returned as-is.
export function getEmbeddableFormUrl(url: string): string {
  if (!url.includes("docs.google.com/forms")) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("embedded", "true");
    return parsed.toString();
  } catch {
    return url;
  }
}
