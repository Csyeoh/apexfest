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
        dark: '#d7fdff',
        light: '#0f0f1a',
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
        border: '1px solid rgba(70,244,255,0.2)',
        backgroundColor: '#0f0f1a',
      }}
    >
      <img src={dataUrl} alt="QR Code" width={size} height={size} />
    </div>
  )
}
