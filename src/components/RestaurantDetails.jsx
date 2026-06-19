const details = {
  en: [
    { label: 'Owners', value: 'Ravi Agrawal / Anoop Agrawal' },
    { label: 'Shop', value: 'Roshan Sweets' },
    { label: 'Mobile 1', value: '+91 98063 23351' },
    { label: 'Mobile 2', value: '+91 96305 29400' },
    { label: 'District', value: 'Raisen, Madhya Pradesh' },
    { label: 'PIN Code', value: '464651' },
  ],
  hi: [
    { label: 'संचालक', value: 'रवि अग्रवाल / अनूप अग्रवाल' },
    { label: 'प्रतिष्ठान', value: 'रोशन स्वीट्स' },
    { label: 'मोबाइल 1', value: '+91 98063 23351' },
    { label: 'मोबाइल 2', value: '+91 96305 29400' },
    { label: 'जिला', value: 'रायसेन, मध्य प्रदेश' },
    { label: 'पिन कोड', value: '464651' },
  ],
}

function RestaurantDetails({ language }) {
  const isHindi = language === 'hi'
  const mapUrl = 'https://maps.app.goo.gl/AWTdWXMGpWGMWieJ7?g_st=ic'

  return (
    <section
      id="details"
      className="reveal-card scroll-mt-24 overflow-hidden rounded-[2rem] bg-zinc-950 p-5 text-white shadow-[0_20px_50px_rgba(24,24,27,0.18)]"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
            {isHindi ? 'हमारे बारे में' : 'About us'}
          </p>
          <h2 className="language-heading mt-1 text-2xl font-black">
            {isHindi ? 'रोशन स्वीट्स' : 'Roshan Sweets'}
          </h2>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500 text-xs font-black shadow-lg shadow-orange-950/40">
          {isHindi ? 'नमस्ते' : 'Hello'}
        </span>
      </div>

      <p className="text-sm leading-6 text-zinc-400">
        {isHindi
          ? 'सलामतपुर में ताज़ा नाश्ता, कुरकुरी नमकीन और प्रीमियम मिठाई का भरोसेमंद नाम।'
          : 'A trusted name in Salamatpur for fresh snacks, crispy namkeen and premium sweets.'}
      </p>

      <dl className="mt-5 divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4">
        {details[language].map((detail) => (
          <div
            key={detail.label}
            className="detail-row flex items-start justify-between gap-4 py-3"
          >
            <dt className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              {detail.label}
            </dt>
            <dd className="text-right text-sm font-black text-zinc-100">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>

      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="group mt-4 block rounded-xl border border-white/[0.08] bg-white/[0.05] p-3 transition duration-300 hover:border-orange-400/30 hover:bg-white/[0.08]"
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
          {isHindi ? 'पूरा पता' : 'Full address'}
        </p>
        <p className="mt-1 text-sm font-semibold leading-6 text-zinc-200">
          {isHindi
            ? 'रोशन स्वीट्स, मेन रोड, सलामतपुर, जिला रायसेन, मध्य प्रदेश - 464651'
            : 'Roshan Sweets, Main Road, Salamatpur, Dist. Raisen, Madhya Pradesh - 464651'}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-orange-400 transition group-hover:text-orange-300">
          <span className="map-pin" aria-hidden="true">
            📍
          </span>
          {isHindi ? 'Google Maps पर दिशा देखें' : 'Get directions on Google Maps'}
          <span
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </p>
      </a>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <a
          href="tel:+919806323351"
          className="language-button flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 py-3 text-xs font-black text-white shadow-lg shadow-orange-950/40 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400"
        >
          <span aria-hidden="true">☎</span> +91 98063 23351
        </a>
        <a
          href="tel:+919630529400"
          className="language-button flex items-center justify-center gap-2 rounded-xl border border-orange-400/30 bg-white/10 px-3 py-3 text-xs font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
        >
          <span aria-hidden="true">☎</span> +91 96305 29400
        </a>
      </div>
    </section>
  )
}

export default RestaurantDetails
