import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import MenuCard from './components/MenuCard'
import RestaurantDetails from './components/RestaurantDetails'
import QRPreview from './components/QRPreview'
import Footer from './components/Footer'
import { categories, menuItems } from './data/menuData'
import { categoryLabels, englishMenu } from './data/menuTranslations'

function App() {
  const [language, setLanguage] = useState('en')
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const isHindi = language === 'hi'

  useEffect(() => {
    document.documentElement.lang = language
    document.title = isHindi
      ? 'रोशन स्वीट्स | डिजिटल मेन्यू'
      : 'Roshan Sweets | Digital Menu'
  }, [isHindi, language])

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const localizedItems = useMemo(
    () =>
      menuItems.map((item) => {
        const englishItem = englishMenu[item.id]
        const localizedItem = isHindi ? item : { ...item, ...englishItem }

        return {
          ...localizedItem,
          searchText: [
            item.name,
            item.description,
            englishItem.name,
            englishItem.description,
          ]
            .join(' ')
            .toLowerCase(),
        }
      }),
    [isHindi],
  )

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return localizedItems.filter(
      (item) =>
        (query || item.category === activeCategory) &&
        (!query || item.searchText.includes(query)),
    )
  }, [activeCategory, localizedItems, searchTerm])

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'hi' : 'en'))
    setSearchTerm('')
  }

  return (
    <div className="site-shell min-h-screen text-zinc-900">
      <Header language={language} onToggleLanguage={toggleLanguage} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:pb-16">
        <section
          id="menu"
          className="menu-toolbar mb-6 scroll-mt-24 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-[0_20px_60px_rgba(124,45,18,0.08)] backdrop-blur-xl sm:p-6"
          aria-labelledby="menu-heading"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-orange-700">
                <span className="live-dot h-2 w-2 rounded-full bg-orange-600" />
                {isHindi ? 'ताज़ा और स्वादिष्ट' : 'Fresh & delicious'}
              </div>
              <h2
                id="menu-heading"
                className="language-heading text-3xl font-black tracking-[-0.04em] text-zinc-950 sm:text-4xl"
              >
                {isHindi ? 'रोशन स्वीट्स' : 'Roshan Sweets'}{' '}
                <span className="text-orange-600">
                  {isHindi ? 'मेन्यू' : 'Menu'}
                </span>
              </h2>
              <p className="mt-1 text-sm font-medium text-zinc-500">
                {isHindi
                  ? 'नाश्ता, नमकीन और मिठाई—सब एक ही जगह।'
                  : 'Snacks, namkeen and sweets—all in one place.'}
              </p>
            </div>

            <label className="search-box relative block w-full md:max-w-md">
              <span className="sr-only">
                {isHindi ? 'मेन्यू में खोजें' : 'Search the menu'}
              </span>
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={
                  isHindi
                    ? 'समोसा, नमकीन या मिठाई खोजें...'
                    : 'Search samosa, namkeen or sweets...'
                }
                className="w-full rounded-2xl border border-orange-200 bg-orange-50/60 py-4 pl-12 pr-4 text-sm font-semibold shadow-inner outline-none transition duration-300 placeholder:text-zinc-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </label>
          </div>

          <div className="hide-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category)
                  setSearchTerm('')
                  document
                    .getElementById('menu-items')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`category-button language-button shrink-0 rounded-full px-5 py-2.5 text-sm font-black transition duration-300 ${
                  activeCategory === category && !searchTerm
                    ? 'category-button-active bg-zinc-950 text-white shadow-lg shadow-zinc-300'
                    : 'border border-orange-200 bg-orange-50 text-orange-700 hover:-translate-y-0.5 hover:bg-orange-100'
                }`}
              >
                {categoryLabels[language][category]}
              </button>
            ))}
          </div>
        </section>

        <div className="dashboard-shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:rounded-[2.25rem] lg:border lg:border-white/80 lg:bg-white/45 lg:p-3 lg:shadow-[0_24px_80px_rgba(124,45,18,0.08)] lg:backdrop-blur-sm">
          <section
            id="menu-items"
            className="min-w-0 scroll-mt-24 lg:rounded-[1.75rem] lg:bg-white/75 lg:p-5"
          >
            <div className="dashboard-panel-heading sticky top-[84px] z-20 mb-4 flex items-center justify-between rounded-2xl border border-orange-100/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-xl lg:-mx-1 lg:-mt-1">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
                  {isHindi ? 'मेन्यू सूची' : 'Menu list'}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-500">
                  {filteredItems.length}{' '}
                  {isHindi
                    ? `आइटम ${searchTerm ? 'मिले' : `— ${categoryLabels.hi[activeCategory]}`}`
                    : `${filteredItems.length === 1 ? 'item' : 'items'} ${
                        searchTerm
                          ? 'found'
                          : `in ${categoryLabels.en[activeCategory]}`
                      }`}
                </p>
              </div>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="language-button rounded-full bg-zinc-950 px-4 py-2 text-xs font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  {isHindi ? 'खोज हटाएँ' : 'Clear search'}
                </button>
              )}
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredItems.map((item, index) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    index={index}
                    language={language}
                  />
                ))}
              </div>
            ) : (
              <div className="reveal-card rounded-[2rem] border border-dashed border-orange-300 bg-white px-6 py-16 text-center shadow-sm">
                <p className="text-5xl" aria-hidden="true">
                  🔎
                </p>
                <h3 className="mt-4 text-xl font-black">
                  {isHindi ? 'आइटम नहीं मिला' : 'Item not found'}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {isHindi
                    ? 'किसी दूसरे आइटम का नाम खोजकर देखें।'
                    : 'Try searching for another item.'}
                </p>
              </div>
            )}
          </section>

          <aside className="min-w-0 space-y-5 lg:sticky lg:top-[88px] lg:self-start lg:rounded-[1.75rem]">
            <RestaurantDetails language={language} />
            <QRPreview language={language} />
          </aside>
        </div>
      </main>

      <Footer language={language} />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={isHindi ? 'ऊपर जाएँ' : 'Back to top'}
        className={`scroll-top-button fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-2xl bg-zinc-950 text-xl font-black text-white shadow-2xl shadow-zinc-950/25 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 ${
          showScrollTop
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        ↑
      </button>
    </div>
  )
}

export default App
