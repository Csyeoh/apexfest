export default function Footer() {
  return (
    <footer
      className="py-6"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(26,26,46,0.06)',
      }}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="font-mono"
          style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(26,26,46,0.3)' }}
        >
          GDGoC_USM // APEXFEST
        </p>

        <p
          className="font-mono"
          style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(26,26,46,0.3)' }}
        >
          &copy; 2026 GDGoC USM
        </p>
      </div>
    </footer>
  )
}
