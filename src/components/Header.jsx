import Logo from './Logo'

function Header({ language, onToggleLanguage }) {
  const isHindi = language === 'hi'
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-amber-900/10 bg-[#f8f3e7]/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#menu" className="group flex min-w-0 items-center gap-3">
            <Logo compact />
            <span className="min-w-0">
              <span className="language-label block truncate font-serif text-base font-black leading-none text-emerald-950 sm:text-lg">
                {isHindi ? 'रोशन स्वीट्स' : 'Roshan Sweets'}
              </span>
              <span className="mt-1 hidden text-[9px] font-black uppercase tracking-[0.2em] text-amber-600 min-[390px]:block">
                {isHindi ? 'सन 1990 से' : 'Since 1990'}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('brand-story')}
              className="language-button hidden rounded-full px-4 py-2 text-xs font-bold text-emerald-950 transition hover:bg-amber-100 sm:block"
            >
              {isHindi ? 'हमारे बारे में' : 'About Us'}
            </button>
            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
              className="language-button rounded-full border border-emerald-900/15 bg-white/80 px-3 py-2.5 text-xs font-black text-emerald-950 transition duration-300 hover:border-amber-500 hover:bg-amber-50 sm:px-4"
            >
              {isHindi ? 'English' : 'हिंदी'}
            </button>
            <a
              href="tel:+919806323351"
              aria-label={isHindi ? 'कॉल करें' : 'Call now'}
              className="language-button rounded-full bg-emerald-900 px-3 py-2.5 text-xs font-black text-white shadow-lg shadow-emerald-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-600 sm:px-4"
            >
              <span className="sm:hidden">☎</span>
              <span className="hidden sm:inline">
                {isHindi ? 'कॉल करें' : 'Call Now'}
              </span>
            </a>
          </div>
        </div>
      </nav>
      <div className="h-[76px]" aria-hidden="true" />
    </>
  )
}

export default Header
