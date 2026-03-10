import Link from "next/link";

export const LANDING_PAGES: { href: string; label: string; available: boolean }[] = [
  { href: "/ai-music-generator", label: "AI Music Generator", available: true },
  { href: "/text-to-music", label: "Text to Music", available: true },
  { href: "/ai-lyrics-generator", label: "AI Lyrics Generator", available: true },
  { href: "/ai-vocal-remover", label: "AI Vocal Remover", available: false },
  { href: "/ai-stem-splitter", label: "AI Stem Splitter", available: false },
  { href: "/ai-singing-voice", label: "AI Singing Voice Generator", available: false },
  { href: "/ai-song-cover", label: "AI Song Cover Generator", available: false },
  { href: "/ai-music-mastering", label: "AI Music Mastering", available: false },
  { href: "/ai-midi-editor", label: "AI MIDI Editor", available: false },
  { href: "/audio-to-midi", label: "AI Audio to MIDI", available: false },
  { href: "/key-bpm-finder", label: "Key & BPM Finder", available: false },
  { href: "/ai-music-video", label: "AI Music Video", available: false },
];

interface LandingNavProps {
  currentPath: string;
}

export function LandingNav({ currentPath }: LandingNavProps) {
  return (
    <nav className="flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50 w-full lg:w-52 xl:w-56 flex-shrink-0">
      <div className="p-3 lg:block">
        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-2 px-2 hidden lg:block">Tools</p>
        <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 lg:gap-0.5 lg:space-y-0 pb-2 lg:pb-0">
          {LANDING_PAGES.map(({ href, label, available }) => {
            const isActive = currentPath === href;
            const content = (
              <>
                <span className="truncate">{label}</span>
                {!available && <span className="text-[10px] text-slate-500 ml-1">(Soon)</span>}
              </>
            );
            return (
              <li key={href} className="flex-shrink-0 lg:flex-shrink">
                {available ? (
                  <Link
                    href={href}
                    className={`block rounded-lg px-3 py-2 text-sm transition whitespace-nowrap ${
                      isActive
                        ? "bg-violet-500/20 text-violet-300 font-medium"
                        : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                    }`}
                  >
                    {content}
                  </Link>
                ) : (
                  <span className="block rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed whitespace-nowrap" title="Coming soon">
                    {content}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
