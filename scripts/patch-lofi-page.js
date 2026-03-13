const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'free-ai-lofi-generator', 'page.tsx');
let text = fs.readFileSync(filePath, 'utf8');

// --- 1. FAQ h2: "FAQ" → descriptive ---
text = text.replace(
  '<h2 className="text-3xl font-semibold text-slate-100 mb-6">FAQ</h2>',
  '<h2 className="text-3xl font-semibold text-slate-100 mb-6">Common questions about AI lofi generation</h2>'
);

// --- 2. Comparison section h2 + description paragraph ---
// Replace the paragraph with "best ai music generation tools 2025 stuff"
const oldCompPara = /<p className="text-slate-200 text-base leading-relaxed">\s*A lot of <strong>best ai music generation tools 2025<\/strong>[\s\S]*?<\/p>/;
const newCompPara = `<p className="text-slate-200 text-base leading-relaxed">
                  Before 2026, most <strong>AI music generators</strong> had two common problems: output that sounded repetitive after a few bars, and licenses that were unclear about commercial use. The <strong>v6 model</strong> used here addresses both - it was trained to produce more varied lofi progressions, and the <strong>royalty-free license</strong> is documented plainly. More tools: <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link>.
                </p>`;
text = text.replace(oldCompPara, newCompPara);

// --- 3. SEO content section: replace the two problematic keyword-stuffed paragraphs ---
const oldSeoPara1 = /<p>\s*An <strong>ai lofi music generator free<\/strong>[\s\S]*?<\/p>\s*<p>\s*<strong>Can ai generated music be monetized on youtube<\/strong>[\s\S]*?<\/p>/;
const newSeoPara = `<p>
                    This tool is an <strong>AI lofi music generator</strong> that generates original, <strong>royalty-free lofi beats</strong> from a short text prompt. It is free to try, with no login required for the first few tracks. If you use lofi music for study sessions, background streams, or YouTube videos, the generated tracks are cleared for <strong>commercial use</strong> once you check the license terms for your plan.
                  </p>
                  <p>
                    A common concern is whether <strong>AI-generated music can be monetized on YouTube</strong>. The short answer is yes, as long as you follow YouTube's AI content disclosure requirements. We provide guidance on how to label AI music correctly: <Link href="/resources/youtube-ai-music-labeling-2026" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">YouTube AI labeling 2026</Link>.
                  </p>`;
text = text.replace(oldSeoPara1, newSeoPara);

// --- 4. SEO content last paragraph: fix awkward phrasing ---
const oldSeoLast = /<p>\s*Beyond the <strong>best ai music generation tools of 2025<\/strong>[\s\S]*?<\/p>/;
const newSeoLast = `<p>
                Lofi music sits at the intersection of hip-hop rhythm, jazz harmony, and ambient texture. It is typically 60-90 BPM, built around warm vinyl-like tones and simple, repeating chord progressions - which makes it ideal for long background listening. The <strong>lofi music generator</strong> here handles that full range. For longer tracks, instrumental variations, and full export options, the main <Link href="/ai-music-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Generator</Link>, <Link href="/ai-lyrics-generator" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Lyrics Generator</Link>, and <Link href="/ai-music-tools" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">AI Music Tools</Link> give more control.
              </p>`;
text = text.replace(oldSeoLast, newSeoLast);

// --- 5. "About this lofi tool" h2 → more specific ---
text = text.replace(
  '<h2 className="text-xl font-semibold text-slate-100">About this lofi tool</h2>',
  '<h2 className="text-xl font-semibold text-slate-100">What is lofi music and how does this generator work?</h2>'
);

// --- 6. Intro paragraph in SEO section ---
text = text.replace(
  'In short: you describe a mood, get a beat. Free to try; royalty-free to use. Up to 8 minutes in the full generator.',
  'Describe a mood - coffee shop, rain on window, late-night study - and the generator produces a lofi track. No account needed for the free tier; royalty-free for personal and commercial use. Full generator supports tracks up to 8 minutes.'
);

// --- 7. Alt text improvements ---
text = text.replace(
  'alt="Generator in use"',
  'alt="AI lofi music generator interface showing a beat being created"'
);
text = text.replace(
  'alt="Music ideas and beats"',
  'alt="Lofi beat ideas - coffee shop, rain, and late-night study prompts"'
);
text = text.replace(
  'alt="Describe your idea"',
  'alt="Describe the mood or scene for your lofi beat"'
);
text = text.replace(
  'alt="Track is composed"',
  'alt="AI composing a lofi hip-hop track from your description"'
);
text = text.replace(
  'alt="Download"',
  'alt="Preview and export your lofi beat"'
);
text = text.replace(
  'alt="Loops for study and chill"',
  'alt="Lofi loops for study sessions and chill background music"'
);
text = text.replace(
  'alt="Creators and streams"',
  'alt="Content creators using AI lofi music for YouTube and live streams"'
);

// --- 8. Social proof: make numbers more specific ---
text = text.replace(
  '<p className="text-2xl sm:text-3xl font-semibold text-slate-100">1M+</p>\n                <p className="text-sm text-slate-400">Lofi beats generated</p>',
  '<p className="text-2xl sm:text-3xl font-semibold text-slate-100">1M+</p>\n                <p className="text-sm text-slate-400">Lofi beats generated to date</p>'
);
text = text.replace(
  '<p className="text-2xl sm:text-3xl font-semibold text-slate-100">Trusted by</p>\n                <p className="text-sm text-slate-400">YouTubers & creators</p>',
  '<p className="text-2xl sm:text-3xl font-semibold text-slate-100">Study · Stream · Post</p>\n                <p className="text-sm text-slate-400">The three main use cases</p>'
);

// --- 9. Feature card: "Warm, natural sound" body text fix ---
const oldWarmText = 'The current model is tuned for lofi and chill\u2014less sterile than older tools. Good for focus and background.';
const newWarmText = 'Tuned for lofi and chill - less sterile than earlier loop generators. Works for focus sessions, stream backgrounds, and podcast intros.';
text = text.replace(oldWarmText, newWarmText);

// Also handle potential mojibake version of em-dash
const oldWarmTextMojibake = /The current model is tuned for lofi and chill.{1,4}less sterile than older tools\. Good for focus and background\./;
text = text.replace(oldWarmTextMojibake, newWarmText);

// --- 10. Feature card: "Royalty-free" body text fix ---
const oldRoyaltyText = /Tracks are cleared for <Link href="\/license"[^>]*>commercial use<\/Link>\. Personal or paid projects.{1,4}details in the license\./;
const newRoyaltyText = `Tracks are cleared for <Link href="/license" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">commercial use</Link>. Personal projects, YouTube, and paid work are all covered - see the license for plan-specific limits.`;
text = text.replace(oldRoyaltyText, newRoyaltyText);

// --- 11. Comparison section last paragraph: fix "Same engine—more control" ---
const oldSameEngine = /Same engine.{1,4}more control and export options there\./;
text = text.replace(oldSameEngine, 'Same engine - more control and export options there.');

fs.writeFileSync(filePath, text, 'utf8');
console.log('Patch applied successfully');
