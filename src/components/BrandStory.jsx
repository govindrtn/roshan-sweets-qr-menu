import Logo from './Logo'

function BrandStory({ language }) {
  const isHindi = language === 'hi'

  return (
    <section
      id="brand-story"
      className="brand-story relative mt-12 scroll-mt-24 overflow-hidden rounded-[2.25rem] bg-[#07130f] px-5 py-10 text-white shadow-[0_30px_90px_rgba(6,78,59,0.2)] sm:px-8 lg:px-12 lg:py-14"
    >
      <div className="brand-sunburst" aria-hidden="true" />
      <div className="brand-glow brand-glow-left" aria-hidden="true" />
      <div className="brand-glow brand-glow-right" aria-hidden="true" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-amber-300">
            <span className="live-dot h-2 w-2 rounded-full bg-amber-400" />
            {isHindi
              ? 'सलामतपुर की अपनी मिठास'
              : "Salamatpur's own sweetness"}
          </div>
          <h2 className="language-heading max-w-3xl text-4xl font-black leading-[1.08] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            {isHindi ? 'हर खुशी में,' : 'Sweetness for'}
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              {isHindi ? 'रोशन सी मिठास।' : 'every celebration.'}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-zinc-300 sm:text-lg">
            {isHindi
              ? 'गरमा-गरम समोसा और कचौरी से लेकर प्रीमियम मिठाई और ताज़ा नमकीन तक—हर स्वाद भरोसे के साथ।'
              : 'From hot samosas and kachoris to premium sweets and fresh namkeen—trusted taste in every bite.'}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="language-button rounded-2xl bg-amber-500 px-5 py-3 text-sm font-black text-emerald-950 shadow-xl shadow-amber-950/30 transition hover:-translate-y-1 hover:bg-amber-400"
            >
              {isHindi ? 'मेन्यू पर जाएँ ↑' : 'Back to Menu ↑'}
            </a>
            <span className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-emerald-300">
              {isHindi ? '● ताज़ा और शुद्ध' : '● Fresh & Pure'}
            </span>
          </div>
        </div>

        <div className="brand-logo-stage relative mx-auto w-full max-w-md">
          <div className="brand-rays" aria-hidden="true" />
          <div className="brand-logo-card relative overflow-hidden rounded-[1.75rem] border border-amber-300/25 bg-[#f7f2e5] p-2 shadow-2xl shadow-black/30 sm:p-3">
            <Logo />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandStory
