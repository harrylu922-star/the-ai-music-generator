const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'app', 'free-ai-lofi-generator', 'page.tsx');
let text = fs.readFileSync(filePath, 'utf8');

// Find block boundaries using regex that handles CRLF
const blockStart = text.indexOf('/** FAQ: plain text for JSON-LD;');
const blockEnd = text.indexOf('] as const;', blockStart) + '] as const;'.length;

if (blockStart === -1) {
  console.error('Could not find FAQ block start');
  process.exit(1);
}

const newFaq = [
  '/** FAQ: plain text for JSON-LD; display adds internal links via FAQAnswer */',
  'const FAQ_ITEMS = [',
  '  {',
  "    question: \"Is The AI Music Generator's lofi tool really free?\",",
  '    answer:',
  '      "The free tier lets you generate and preview lofi beats with no account required. There are limits: free tracks are shorter and export options are restricted. Paid plans unlock tracks up to 8 minutes and full commercial licensing. If you also need lyrics, try our AI Lyrics Generator - a separate free tool on the same platform.",',
  '  },',
  '  {',
  '    question: "Can I monetize AI-generated lofi music on YouTube in 2026?",',
  '    answer:',
  "      \"Yes, with a caveat. YouTube requires creators to disclose AI-generated content using the 'altered or synthetic content' label in upload settings. Tracks from this generator are royalty-free, so you won't get copyright claims from us. Apply the disclosure label and review our Content License for full terms.\",",
  '  },',
  '  {',
  '    question: "How does this lofi generator compare to other AI music tools?",',
  '    answer:',
  '      "Most AI music tools from 2025 and earlier generated short, repetitive loops with little rhythmic variation. The v6 model here is tuned for lofi output - it produces tracks with subtle chord movement, natural-sounding percussion, and slight imperfections that make lofi feel warm rather than mechanical. Tracks go up to 8 minutes, covering a full Pomodoro work session.",',
  '  },',
  '  {',
  '    question: "How can I tell if a piece of music is AI generated?",',
  '    answer:',
  '      "Earlier AI music often had telltale signs: very regular note timing, repetitive four-bar loops that never resolve, and an absence of natural room tone. Newer models are harder to identify. Our tracks are labeled as AI-generated in their metadata so you can disclose correctly on YouTube, Twitch, and other platforms that require it.",',
  '  },',
  '  {',
  '    question: "Can I use these lofi beats in commercial projects like games, ads, or podcasts?",',
  '    answer:',
  '      "Yes. Tracks come with a royalty-free license covering personal and commercial use - indie games, YouTube ads, podcast intros, TikTok, and more. The free tier has some restrictions; paid plans remove them. Check our AI Music Tools page and Content License for full terms before using tracks in high-stakes campaigns.",',
  '  },',
  '] as const;',
].join('\r\n');

text = text.slice(0, blockStart) + newFaq + text.slice(blockEnd);
fs.writeFileSync(filePath, text, 'utf8');
console.log('FAQ_ITEMS replaced successfully');
