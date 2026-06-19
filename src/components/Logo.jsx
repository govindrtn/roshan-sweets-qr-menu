function Logo({ compact = false }) {
  return (
    <span
      className={`brand-logo ${compact ? 'brand-logo-compact' : ''}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="logo-bg" x1="10" y1="8" x2="54" y2="58">
            <stop stopColor="#FB923C" />
            <stop offset="0.52" stopColor="#F97316" />
            <stop offset="1" stopColor="#C2410C" />
          </linearGradient>
          <linearGradient id="logo-gold" x1="20" y1="16" x2="46" y2="49">
            <stop stopColor="#FEF3C7" />
            <stop offset="0.5" stopColor="#FDE68A" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
          </filter>
        </defs>

        <rect
          x="3"
          y="3"
          width="58"
          height="58"
          rx="18"
          fill="url(#logo-bg)"
          filter="url(#logo-shadow)"
        />
        <rect
          x="7"
          y="7"
          width="50"
          height="50"
          rx="15"
          stroke="#FDBA74"
          strokeOpacity="0.45"
        />

        <g className="logo-jalebi" stroke="url(#logo-gold)" strokeWidth="3">
          <path
            d="M17 20c0-5 8-7 12-3 5 5-1 12-6 9-4-2-2-8 2-8 6 0 7 9 2 12"
            strokeLinecap="round"
          />
        </g>

        <path
          className="logo-letter"
          d="M24 43V24h10.2c6 0 9.8 3.1 9.8 8 0 3.5-2.1 6.1-5.6 7.2L45 48h-7l-5.6-8H30v8h-6Zm6-9h4c2.5 0 4-1.1 4-3s-1.5-3-4-3h-4v6Z"
          fill="white"
        />

        <g className="logo-spark" fill="#FEF3C7">
          <path d="m48 13 1.2 3.2L52.5 17l-3.3 1.2L48 21.5l-1.2-3.3-3.3-1.2 3.3-.8L48 13Z" />
          <circle cx="53" cy="25" r="1.5" />
        </g>

        <path
          className="logo-smile"
          d="M19 50c7 5 19 5 26 0"
          stroke="#FED7AA"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

export default Logo
