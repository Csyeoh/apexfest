import bannerLogo from '../assets/bannerlogo.png'

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

        <img
          src={bannerLogo}
          alt="Supported by Universiti Sains Malaysia, Pusat Kreativiti & Inovasi, and Google Developer Group on Campus USM"
          className="select-none"
          style={{ height: '30px', opacity: 0.8 }}
          draggable="false"
        />

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
