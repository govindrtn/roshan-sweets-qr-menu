function MenuCard({ item, index, language }) {
  return (
    <article
      className="menu-card group relative flex min-h-32 items-stretch gap-3 overflow-hidden rounded-2xl border border-orange-100/80 bg-white p-3 shadow-[0_10px_30px_rgba(124,45,18,0.05)] transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_18px_40px_rgba(234,88,12,0.14)]"
      style={{ '--delay': `${Math.min(index, 10) * 45}ms` }}
    >
      <div className="card-sheen pointer-events-none absolute inset-0" />
      <div className="absolute inset-y-0 left-0 z-10 w-1 scale-y-0 bg-gradient-to-b from-orange-400 to-orange-600 transition duration-300 group-hover:scale-y-100" />

      <figure className="food-photo relative h-auto min-h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-orange-50 sm:w-32">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <span
          className="absolute bottom-2 right-2 grid h-5 w-5 place-items-center rounded-md bg-white/95 shadow-md"
          title={language === 'hi' ? 'शुद्ध शाकाहारी' : 'Pure vegetarian'}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
        </span>
      </figure>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col py-1">
        <h3 className="language-label font-black leading-5 text-zinc-900 transition group-hover:text-orange-700 sm:text-base">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-3 text-[11px] leading-4 text-zinc-500 sm:text-xs">
          {item.description}
        </p>
        <p className="price-chip mt-auto w-fit rounded-lg bg-zinc-950 px-2.5 py-1 text-xs font-black text-white transition group-hover:bg-orange-600">
          {item.price}
        </p>
      </div>
    </article>
  )
}

export default MenuCard
