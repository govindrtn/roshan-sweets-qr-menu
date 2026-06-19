function MenuCard({ item, index, language }) {
  const emoji = item.emoji || getFoodEmoji(item.name)

  return (
    <article
      className="menu-card group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-orange-100/80 bg-white p-3.5 shadow-[0_10px_30px_rgba(124,45,18,0.05)] transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_18px_40px_rgba(234,88,12,0.14)] sm:p-4"
      style={{ '--delay': `${Math.min(index, 10) * 45}ms` }}
    >
      <div className="card-sheen pointer-events-none absolute inset-0" />
      <div className="absolute inset-y-0 left-0 w-1 scale-y-0 bg-gradient-to-b from-orange-400 to-orange-600 transition duration-300 group-hover:scale-y-100" />

      <div className="food-icon relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 text-2xl shadow-inner transition duration-300 group-hover:rotate-3 group-hover:scale-110">
        <span className="food-emoji" aria-hidden="true">
          {emoji}
        </span>
        <span
          className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded bg-white shadow-sm"
          title={language === 'hi' ? 'शुद्ध शाकाहारी' : 'Pure vegetarian'}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="language-label font-black leading-5 text-zinc-900 transition group-hover:text-orange-700 sm:text-base">
            {item.name}
          </h3>
        </div>
        <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-zinc-500 sm:text-xs">
          {item.description}
        </p>
        <p className="price-chip mt-2 inline-flex rounded-lg bg-zinc-950 px-2.5 py-1 text-xs font-black text-white transition group-hover:bg-orange-600">
          {item.price}
        </p>
      </div>
    </article>
  )
}

function getFoodEmoji(name) {
  const food = name.toLowerCase()

  if (food.includes('poha') || food.includes('upma')) return '🥣'
  if (food.includes('samosa')) return '🥟'
  if (food.includes('kachori') || food.includes('puri')) return '🫓'
  if (food.includes('jalebi')) return '🥨'
  if (food.includes('pav')) return '🍞'
  if (food.includes('vada') || food.includes('bonda')) return '🟠'
  if (food.includes('chaat') || food.includes('bhel')) return '🥗'
  if (food.includes('sabudana')) return '🥜'
  if (food.includes('bhaji')) return '🧅'

  return '🍽️'
}

export default MenuCard
