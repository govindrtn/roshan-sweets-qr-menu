function Logo({ compact = false, footer = false }) {
  return (
    <span
      className={`brand-logo ${
        compact
          ? 'brand-logo-compact'
          : footer
            ? 'brand-logo-footer'
            : 'brand-logo-full'
      }`}
      aria-hidden="true"
    >
      <img
        src="/images/brand/roshan-sweets-logo.jpg"
        alt=""
        className="brand-logo-image h-full w-full object-cover"
      />
    </span>
  )
}

export default Logo
