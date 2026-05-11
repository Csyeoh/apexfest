import { memo } from 'react'

function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Linear grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26,26,46,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,26,46,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Static soft pink orb — top right */}
      <div
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          top: '-15%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(255,0,127,0.06), transparent 70%)',
        }}
      />

      {/* Static soft blue orb — bottom left */}
      <div
        className="absolute rounded-full"
        style={{
          width: '500px',
          height: '500px',
          bottom: '5%',
          left: '-8%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.06), transparent 70%)',
        }}
      />

      {/* Static soft purple orb — center */}
      <div
        className="absolute rounded-full"
        style={{
          width: '700px',
          height: '700px',
          top: '40%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(190,107,255,0.04), transparent 70%)',
        }}
      />
    </div>
  )
}

export default memo(BackgroundEffects)
