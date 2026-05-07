export default function StatusBar() {
  return (
    <div
      className="bg-bg px-6 py-2 flex items-center gap-3"
      style={{ borderTop: '1px solid rgba(0,220,192,0.1)' }}
      role="status"
      aria-label="System status bar"
    >
      <span className="pulse-dot pulse-dot-amber" aria-hidden="true" />
      <span
        className="font-mono text-text-muted tracking-widest"
        style={{ fontSize: '11px' }}
      >
        SYS::APEXFEST_2026 — ONLINE
      </span>
    </div>
  )
}
