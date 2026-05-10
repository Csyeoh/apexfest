export default function Footer() {
  return (
    <footer
      className="py-6"
      style={{
        backgroundColor: 'rgba(11,14,23,0.8)',
        borderTop: '1px solid rgba(70,244,255,0.08)',
      }}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="font-mono"
          style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(215,253,255,0.3)' }}
        >
          GDGoC_USM // APEXFEST
        </p>

        <p
          className="font-mono"
          style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(215,253,255,0.3)' }}
        >
          © 2026 GDGoC USM
        </p>
      </div>
    </footer>
  )
}
