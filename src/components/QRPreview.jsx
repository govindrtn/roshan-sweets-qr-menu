import { QRCodeSVG } from 'qrcode.react'

function QRPreview({ language }) {
  const isHindi = language === 'hi'
  const menuUrl = 'https://roshan-sweets-menu.vercel.app'

  return (
    <section className="reveal-card qr-card relative overflow-hidden rounded-[2rem] border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-5 text-center shadow-[0_20px_50px_rgba(234,88,12,0.1)]">
      <div className="qr-glow absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-300/40 blur-3xl" />
      <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
        {isHindi ? 'डिजिटल मेन्यू' : 'Digital menu'}
      </p>
      <h2 className="language-heading relative mt-1 text-xl font-black">
        {isHindi ? 'स्कैन करें, मेन्यू देखें' : 'Scan to view the menu'}
      </h2>
      <p className="relative mt-2 text-sm leading-6 text-zinc-500">
        {isHindi
          ? 'इस एक QR कोड से रोशन स्वीट्स का पूरा मेन्यू खुलेगा।'
          : 'This single QR code opens the complete Roshan Sweets menu.'}
      </p>

      <div className="qr-frame relative mx-auto my-5 w-fit rounded-2xl bg-white p-3 shadow-xl shadow-orange-200/60">
        <span className="qr-scan-line pointer-events-none absolute inset-x-3 top-3 z-10 h-0.5 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <QRCodeSVG
          value={menuUrl}
          size={165}
          level="M"
          marginSize={1}
          fgColor="#18181b"
        />
      </div>

      <p className="relative rounded-xl bg-white/70 px-4 py-3 text-sm font-bold text-zinc-700">
        {isHindi
          ? 'एक दुकान · एक QR कोड · पूरा मेन्यू'
          : 'One shop · One QR code · Complete menu'}
      </p>
    </section>
  )
}

export default QRPreview
