// Most post titles here are Arabic, which has no native Latin form, so a
// plain "strip non a-z0-9" slugify would leave nothing. This transliterates
// common Arabic letters to Latin first so the auto-suggested slug is still
// readable (e.g. "دليلك الشامل" -> "dlylk-alshaml") instead of a bare
// timestamp. It's only ever a *suggestion* — the admin form leaves the
// slug field editable so a team member can rename it to anything.
const ARABIC_TO_LATIN: Record<string, string> = {
  "ا": "a", "أ": "a", "إ": "a", "آ": "a", "ء": "a", "ى": "a",
  "ب": "b", "ت": "t", "ث": "th", "ج": "j", "ح": "h", "خ": "kh",
  "د": "d", "ذ": "dh", "ر": "r", "ز": "z", "س": "s", "ش": "sh",
  "ص": "s", "ض": "d", "ط": "t", "ظ": "z", "ع": "a", "غ": "gh",
  "ف": "f", "ق": "q", "ك": "k", "ل": "l", "م": "m", "ن": "n",
  "ه": "h", "ة": "h", "و": "w", "ي": "y", "ئ": "y",
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
  "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

export function slugify(input: string): string {
  const transliterated = Array.from(input)
    .map((ch) => ARABIC_TO_LATIN[ch] ?? ch)
    .join("");

  const slug = transliterated
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip Arabic tashkeel / Latin diacritics
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  if (slug) return slug;

  // Title had no transliterable characters at all — fall back to a
  // timestamp-based slug so it's still unique and URL-safe.
  return `post-${Date.now()}`;
}
