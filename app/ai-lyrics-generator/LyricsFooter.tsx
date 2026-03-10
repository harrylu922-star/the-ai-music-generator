import Link from "next/link";

const FOOTER_LINKS: { col: string; links: { label: string; href: string }[] }[] = [
  {
    col: "AI Lyrics & Music",
    links: [
      { label: "AI Lyrics Generator", href: "/ai-lyrics-generator" },
      { label: "AI Music Generator", href: "/ai-music-generator" },
      { label: "AI Song Writer", href: "/ai-lyrics-generator" },
      { label: "AI Rap Maker", href: "/ai-music-generator" },
      { label: "AI Song Lyrics Generator", href: "/ai-lyrics-generator" },
      { label: "Free AI Lyrics Generator", href: "/ai-lyrics-generator" },
    ],
  },
  {
    col: "AI Music Tools",
    links: [
      { label: "AI Vocal Remover", href: "/ai-music-generator" },
      { label: "AI Stem Splitter", href: "/ai-music-generator" },
      { label: "AI Singing Voice Generator", href: "/ai-music-generator" },
      { label: "AI Song Cover Generator", href: "/ai-music-generator" },
      { label: "AI Music Mastering", href: "/ai-music-generator" },
      { label: "AI MIDI Editor", href: "/ai-music-generator" },
    ],
  },
  {
    col: "Genres & Styles",
    links: [
      { label: "Phonk Music AI", href: "/ai-music-generator" },
      { label: "Lofi Music AI", href: "/ai-music-generator" },
      { label: "R&B Music Generator", href: "/ai-music-generator" },
      { label: "Hip Hop Beat Maker AI", href: "/ai-music-generator" },
      { label: "Pop Song Generator", href: "/ai-music-generator" },
      { label: "Country Song AI", href: "/ai-music-generator" },
    ],
  },
  {
    col: "Create & Edit",
    links: [
      { label: "Text to Music", href: "/text-to-music" },
      { label: "AI Audio to MIDI", href: "/ai-music-generator" },
      { label: "Key & BPM Finder", href: "/ai-music-generator" },
      { label: "AI Music Video", href: "/ai-music-generator" },
      { label: "AI Jingle Maker", href: "/ai-music-generator" },
      { label: "AI Karaoke Maker", href: "/ai-music-generator" },
    ],
  },
];

export function LyricsFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-10">
          {FOOTER_LINKS.map(({ col, links }) => (
            <div key={col}>
              <h3 className="text-sm font-semibold text-slate-100 mb-3">{col}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="underline underline-offset-2 hover:text-violet-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 text-sm text-slate-400">
          <span>© {new Date().getFullYear()} TheAIMusicGenerator.com. All rights reserved.</span>
          <Link href="/" className="flex items-center gap-2 text-slate-100 font-medium">
            <span className="text-violet-400">T</span>he<span className="text-violet-400">A</span>I<span className="text-violet-400">M</span>usic<span className="text-violet-400">G</span>enerator
          </Link>
        </div>
      </div>
    </footer>
  );
}
