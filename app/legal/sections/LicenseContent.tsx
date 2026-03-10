import Link from "next/link";

export function LicenseContent() {
  return (
    <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
      <p className="text-slate-300">
        Last revised: March 10, 2025
      </p>
      <p>
        This Content License describes the rights you have in music, lyrics, and other content you generate using The AI Music Generator (“themusicgenerator.com”, “we”, “us”, “our”) (the “Services”). For the avoidance of doubt, this License is part of and subject to our <Link href="/terms" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Terms of Service</Link> and <Link href="/privacy" className="text-violet-200 underline underline-offset-2 hover:text-violet-100">Privacy Policy</Link>.
      </p>

      <h3 className="text-slate-200 font-semibold pt-2">1. OWNERSHIP OF GENERATED CONTENT</h3>
      <p>
        You retain ownership of the content you create using our Services (“Your Output”). We do not claim any ownership rights in your prompts, inputs, or in the music, lyrics, or other outputs generated for you based on your use of the Services. To the extent we acquire any rights in Your Output, we assign to you all right, title and interest in and to such content.
      </p>

      <h3 className="text-slate-200 font-semibold pt-2">2. ROYALTY-FREE USE</h3>
      <p>
        Subject to your compliance with our Terms of Service, you may use Your Output on a <strong className="text-slate-300">royalty-free</strong> basis. You are not required to pay us or any third party ongoing royalties or license fees for the use of music or other content you generate through the Services, within the scope of the rights granted herein.
      </p>

      <h3 className="text-slate-200 font-semibold pt-2">3. COMMERCIAL AND PERSONAL USE</h3>
      <p>
        You may use Your Output for both <strong className="text-slate-300">personal and commercial</strong> purposes, including but not limited to:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Videos (e.g. YouTube, social media, films, advertisements)</li>
        <li>Podcasts and streaming content</li>
        <li>Games, apps, and software</li>
        <li>Music releases, albums, and singles</li>
        <li>Background music, intros, outros, and jingles</li>
        <li>Any other use that does not violate our Terms of Service or applicable law</li>
      </ul>
      <p>
        You do not need additional permission from us for these uses, provided you comply with these terms and our Terms of Service.
      </p>

      <h3 className="text-slate-200 font-semibold pt-2">4. LICENSE YOU GRANT TO US</h3>
      <p>
        In order to operate and improve the Services, you grant us a royalty-free, worldwide license to use, host, store, reproduce, display, and process Your Output and the inputs you provide, solely as necessary to provide, improve, and promote the Services. This includes making content available to third-party service providers who assist us in operating the Services. We do not use Your Output for our own commercial purposes (e.g. selling or licensing your music to others) except as needed to run the Services or as you explicitly allow (e.g. if you choose to make content public on our platform).
      </p>

      <h3 className="text-slate-200 font-semibold pt-2">5. SIMILAR OUTPUT BY OTHERS</h3>
      <p>
        Because our Services use generative AI, other users may generate output that is similar or identical to Your Output if they use similar prompts or inputs. We do not guarantee uniqueness. You should consider whether you need additional protections (e.g. trademark, additional licensing) for your particular use case.
      </p>

      <h3 className="text-slate-200 font-semibold pt-2">6. NO WARRANTY AS TO RIGHTS OF THIRD PARTIES</h3>
      <p>
        We do not warrant that Your Output will not infringe any third party’s intellectual property or other rights. You are responsible for ensuring your use of Your Output does not violate any third-party rights or applicable law. For high-stakes commercial use, you may wish to seek legal advice.
      </p>

      <h3 className="text-slate-200 font-semibold pt-2">7. CHANGES TO THIS LICENSE</h3>
      <p>
        We may update this Content License from time to time. The “Last Revised” date at the top will be updated when we do. Material changes may be communicated via the Services or by email. Your continued use of the Services after changes become effective constitutes acceptance of the updated License. For content already generated, the license terms in effect at the time of generation will continue to apply to that content to the extent we have committed to such treatment; otherwise the current terms apply.
      </p>

      <h3 className="text-slate-200 font-semibold pt-2">8. CONTACT</h3>
      <p>
        For questions about this Content License or your rights to generated content, contact us at support@themusicgenerator.com.
      </p>
    </div>
  );
}
