import Logo from './Logo'

function Header({ language, onToggleLanguage }) {
  const isHindi = language === 'hi'
  const mapUrl = 'https://maps.app.goo.gl/AWTdWXMGpWGMWieJ7?g_st=ic'
  const featuredItems = isHindi
    ? [
        ['🥟', 'समोसा', 'गरमा-गरम'],
        ['🥜', 'नमकीन', 'ताज़ा और कुरकुरी'],
        ['◆', 'काजू कतली', 'प्रीमियम मिठाई'],
        ['🟠', 'मोतीचूर लड्डू', 'सबकी पसंद'],
      ]
    : [
        ['🥟', 'Samosa', 'Hot & fresh'],
        ['🥜', 'Namkeen', 'Fresh & crispy'],
        ['◆', 'Kaju Katli', 'Premium sweet'],
        ['🟠', 'Motichoor Laddu', 'Festive favourite'],
      ]

  return (
    <header className="relative overflow-hidden bg-zinc-950 text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="group flex items-center gap-3">
            <Logo compact />
            <span>
              <span className="language-label block text-sm font-black leading-none sm:text-base">
                {isHindi ? 'रोशन स्वीट्स' : 'Roshan Sweets'}
              </span>
              <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400 min-[390px]:block">
                {isHindi
                  ? 'मिठाई · नमकीन · नाश्ता'
                  : 'Sweets · Namkeen · Snacks'}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href="#menu"
              className="language-button hidden rounded-full px-4 py-2 text-xs font-bold text-zinc-300 transition hover:bg-white/10 hover:text-white sm:block"
            >
              {isHindi ? 'मेन्यू देखें' : 'View Menu'}
            </a>
            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label={
                isHindi ? 'Switch to English' : 'हिंदी में बदलें'
              }
              className="language-button rounded-full border border-white/15 bg-white/10 px-3 py-2.5 text-xs font-black text-white transition duration-300 hover:border-orange-400/50 hover:bg-white/15 sm:px-4"
            >
              {isHindi ? 'English' : 'हिंदी'}
            </button>
            <a
              href="tel:+918962626069"
              aria-label={isHindi ? 'कॉल करें' : 'Call now'}
              className="language-button rounded-full bg-orange-500 px-3 py-2.5 text-xs font-black text-white shadow-lg shadow-orange-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400 sm:px-4"
            >
              <span className="sm:hidden">☎</span>
              <span className="hidden sm:inline">
                {isHindi ? 'कॉल करें' : 'Call Now'}
              </span>
            </a>
          </div>
        </div>
      </nav>

      <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div className="hero-copy">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-orange-300">
              <span className="live-dot h-2 w-2 rounded-full bg-orange-400" />
              {isHindi ? 'सलामतपुर की अपनी मिठास' : "Salamatpur's Own Sweetness"}
            </div>
            <h1 className="language-heading max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {isHindi ? 'हर खुशी में,' : 'Sweetness for'}
              <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                {isHindi ? 'रोशन सी मिठास।' : 'every celebration.'}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-zinc-300 sm:text-lg">
              {isHindi
                ? 'गरमा-गरम समोसा और कचौरी से लेकर प्रीमियम मिठाई और ताज़ा नमकीन तक—हर स्वाद भरोसे के साथ।'
                : 'From hot samosas and kachoris to premium sweets and fresh namkeen—trusted taste in every bite.'}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#menu"
                className="language-button group inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 text-sm font-black text-white shadow-xl shadow-orange-950/40 transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
              >
                {isHindi ? 'मेन्यू देखें' : 'Explore Menu'}
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <span className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-emerald-300">
                {isHindi ? '● ताज़ा और शुद्ध' : '● Fresh & Pure'}
              </span>
            </div>
          </div>

          <div className="food-showcase grid grid-cols-2 gap-3 sm:gap-4">
            {featuredItems.map(([emoji, name, note], index) => (
              <div
                key={name}
                className="food-float rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md sm:p-5"
                style={{ '--float-delay': `${index * 0.3}s` }}
              >
                <span className="text-3xl sm:text-4xl" aria-hidden="true">
                  {emoji}
                </span>
                <p className="mt-3 text-sm font-black sm:text-base">{name}</p>
                <p className="mt-0.5 text-[11px] font-medium text-zinc-400">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
          <InfoItem icon="location" label={isHindi ? 'पता' : 'Location'}>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-orange-300"
            >
              {isHindi ? 'मेन रोड, सलामतपुर' : 'Main Road, Salamatpur'}
            </a>
          </InfoItem>
          <InfoItem icon="phone" label={isHindi ? 'मोबाइल' : 'Mobile'}>
            <a href="tel:+918962626069" className="hover:text-orange-300">
              +91 89626 26069
            </a>
          </InfoItem>
          <InfoItem icon="owner" label={isHindi ? 'संचालक' : 'Owner'}>
            {isHindi ? 'अंकित अग्रवाल' : 'Ankit Agrawal'}
          </InfoItem>
        </div>
      </div>
    </header>
  )
}

function InfoItem({ icon, label, children }) {
  const paths = {
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    owner: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  }

  return (
    <div className="info-chip flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:bg-white/10">
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-orange-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {paths[icon]}
      </svg>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          {label}
        </p>
        <div className="mt-0.5 font-semibold text-zinc-200">{children}</div>
      </div>
    </div>
  )
}

export default Header
