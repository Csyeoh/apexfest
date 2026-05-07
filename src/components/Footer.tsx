export default function Footer() {
  return (
    <footer
      className="bg-surface py-5"
      style={{ borderTop: '1px solid rgba(0,220,192,0.15)' }}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left */}
        <p
          className="font-mono text-text-muted tracking-widest"
          style={{ fontSize: '10px' }}
        >
          GDGoC_USM // APEXFEST_2026
        </p>

        {/* Center — pulsing dot + status */}
        <div className="flex items-center gap-2" aria-label="System status: online">
          <span className="pulse-dot pulse-dot-cyan" aria-hidden="true" />
          <span
            className="font-mono text-text-muted tracking-widest"
            style={{ fontSize: '10px' }}
          >
            SYSTEM ONLINE
          </span>
        </div>

        {/* Right */}
        <p
          className="font-mono text-text-muted tracking-widest"
          style={{ fontSize: '10px' }}
        >
          © 2026 GDGoC USM
        </p>
      </div>
    </footer>
  )
}
