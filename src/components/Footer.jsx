import Logo from './Logo'

function Footer({ language }) {
  const isHindi = language === 'hi'
  const portfolioUrl = 'https://govind-portfolio-five.vercel.app/'
  const instagramUrl =
    'https://www.instagram.com/maithilwebworks?igsh=bXhidDJsZDltZWd0&utm_source=qr'

  return (
    <footer className="relative overflow-hidden bg-zinc-950 px-4 py-10 text-center text-white">
      <div className="footer-glow absolute left-1/2 top-0 h-32 w-80 -translate-x-1/2 rounded-full bg-orange-500/15 blur-3xl" />
      <div className="footer-logo-wrap relative mx-auto mb-4 w-fit">
        <Logo footer />
      </div>
      <p className="language-label relative text-lg font-black">
        {isHindi ? 'रोशन' : 'Roshan'}{' '}
        <span className="text-orange-500">
          {isHindi ? 'स्वीट्स' : 'Sweets'}
        </span>
      </p>
      <p className="relative mt-1 text-xs text-zinc-400">
        {isHindi
          ? 'मेन रोड, सलामतपुर · जिला रायसेन, मध्य प्रदेश - 464651'
          : 'Main Road, Salamatpur · Dist. Raisen, Madhya Pradesh - 464651'}
      </p>
      <div className="relative mx-auto my-5 h-px max-w-44 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="relative flex flex-col items-center gap-2 text-xs font-semibold text-zinc-500">
        <p>
          {isHindi ? 'डेवलपर:' : 'Developer:'}{' '}
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noreferrer"
            className="font-black text-orange-400 underline decoration-orange-400/30 underline-offset-4 transition hover:text-orange-300"
          >
            Govind Maithil
          </a>
        </p>
        <p>
          {isHindi ? 'डेवलपर संपर्क:' : 'Developer Contact:'}{' '}
          <a
            href="tel:+918602443526"
            className="font-black text-orange-400 underline decoration-orange-400/30 underline-offset-4 transition hover:text-orange-300"
          >
            +91 86024 43526
          </a>
        </p>
        <p>
          {isHindi ? 'डिज़ाइन एवं डेवलपमेंट:' : 'Designed & Developed by'}{' '}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="font-black text-orange-400 underline decoration-orange-400/30 underline-offset-4 transition hover:text-orange-300"
          >
            Maithil Webworks
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
