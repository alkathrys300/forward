// A small, dependency-free Markdown -> HTML renderer for blog post
// content. Deliberately not a full CommonMark implementation — it
// covers the subset the admin editor's toolbar produces (headings,
// bold, italic, links, images, lists, blockquotes, paragraphs), which
// keeps the static site from needing a new npm dependency just to
// render posts. Mirrored in blog-cms/public/admin/index.html for the
// editor's live preview — keep the two in sync if you change this.
//
// All plain text is HTML-escaped before any tag is generated, so raw
// HTML/script pasted into a post's content is rendered as inert text,
// not executed — important since this renders untrusted-ish content
// (anyone with the shared admin password) directly into the page.

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text: string): string {
  let t = escapeHtml(text);
  // Images before links: `![alt](url)` would otherwise be partially
  // matched by the link pattern and lose its leading "!".
  t = t.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_m, alt: string, url: string) => `<img src="${url}" alt="${alt}" loading="lazy" />`
  );
  t = t.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_m, label: string, url: string) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
  );
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  return t;
}

export function markdownToHtml(source: string): string {
  const normalized = (source || "").replace(/\r\n/g, "\n").trim();
  if (!normalized) return "";

  const blocks = normalized.split(/\n{2,}/);

  return blocks
    .map((block) => {
      const lines = block.split("\n");

      const headingMatch = lines.length === 1 && lines[0].match(/^(#{1,3})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        return `<h${level}>${renderInline(headingMatch[2])}</h${level}>`;
      }

      if (lines.every((l) => /^>\s?/.test(l))) {
        const content = lines.map((l) => l.replace(/^>\s?/, "")).join("\n");
        return `<blockquote>${renderInline(content).replace(/\n/g, "<br />")}</blockquote>`;
      }

      if (lines.every((l) => /^[-*]\s+/.test(l))) {
        const items = lines.map((l) => `<li>${renderInline(l.replace(/^[-*]\s+/, ""))}</li>`).join("");
        return `<ul>${items}</ul>`;
      }

      if (lines.every((l) => /^\d+\.\s+/.test(l))) {
        const items = lines.map((l) => `<li>${renderInline(l.replace(/^\d+\.\s+/, ""))}</li>`).join("");
        return `<ol>${items}</ol>`;
      }

      return `<p>${lines.map(renderInline).join("<br />")}</p>`;
    })
    .join("\n");
}
