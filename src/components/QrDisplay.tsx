import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

interface QrDisplayProps {
  data: string
  size?: number
}

export default function QrDisplay({ data, size = 200 }: QrDisplayProps) {
  const [dataUrl, setDataUrl] = useState('')

  useEffect(() => {
    if (!data) return
    let cancelled = false
    QRCode.toDataURL(data, {
      width: size,
      margin: 2,
      color: {
        dark: '#1a1a2e',
        light: '#ffffff',
      },
    }).then((url) => {
      if (!cancelled) setDataUrl(url)
    })
    return () => { cancelled = true }
  }, [data, size])

  if (!dataUrl) return null

  return (
    <div
      className="inline-block p-3"
      style={{
        border: '1px solid rgba(26,26,46,0.08)',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
      }}
    >
      <img src={dataUrl} alt="QR Code" width={size} height={size} />
    </div>
  )
}
