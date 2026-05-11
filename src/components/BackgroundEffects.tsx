import { memo } from 'react'

function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: '500px',
          height: '500px',
          top: '-10%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(255,0,127,0.04), transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: '400px',
          height: '400px',
          bottom: '10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(0,180,216,0.04), transparent 70%)',
        }}
      />
    </div>
  )
}

export default memo(BackgroundEffects)
