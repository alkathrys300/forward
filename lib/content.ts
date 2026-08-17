export const COMMUNITY_URL =
  "https://chat.whatsapp.com/HH7b99iZkI0LABuCPp58Vf?s=cl&p=i&ilr=2";

// Get a free access key at https://web3forms.com — enter your email,
// they send you a key instantly, no account/dashboard needed. Paste it
// below to switch all site forms (workshop registration, collaboration)
// from "coming soon" to live.
export const WEB3FORMS_ACCESS_KEY = "";

export type JourneyStage = {
  order: string;
  key: "takhassus" | "tahayoub" | "tamayouz" | "mawaraa";
  stage: string;
  title: string;
  audience: string;
  description: string;
  featured?: boolean;
};

export const journeyStages: JourneyStage[] = [
  {
    order: "01",
    key: "takhassus",
    stage: "تخصّص",
    title: "اكتشف اتجاهك",
    audience: "لطلاب المرحلة الثانوية",
    description:
      "يساعد طلاب ما قبل الجامعة على فهم أنفسهم وخياراتهم واتخاذ قرار التخصص بوعي أكبر.",
  },
  {
    order: "02",
    key: "tahayoub",
    stage: "تأهّب",
    title: "استعد للجامعة",
    audience: "لطلاب بداية الجامعة",
    description:
      "يجهّز الطلاب قبل بداية الجامعة فعليًا من خلال مواد تأسيسية ومهارات مرتبطة بتخصصاتهم.",
  },
  {
    order: "03",
    key: "tamayouz",
    stage: "تميّز",
    title: "اصنع تجربتك الجامعية",
    audience: "لطلاب الجامعة",
    description:
      "يساعد الطالب على الاستفادة من سنوات الجامعة أكاديميًا، مهاريًا، قياديًا، ومهنيًا.",
    featured: true,
  },
  {
    order: "04",
    key: "mawaraa",
    stage: "ما وراء الجامعة",
    title: "استعد لما بعد التخرج",
    audience: "لطلاب السنوات الأخيرة والخريجين",
    description:
      "يدعم طلاب السنوات الأخيرة وحديثي التخرج في الانتقال من الجامعة إلى سوق العمل بثقة.",
  },
];
