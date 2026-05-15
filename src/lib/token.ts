const PERIOD = 30 // seconds

async function hmacSha1(keyBytes: Uint8Array, messageBytes: Uint8Array): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes as Uint8Array<ArrayBuffer>,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, messageBytes as Uint8Array<ArrayBuffer>)
  return new Uint8Array(sig)
}

export async function generateToken(secret: string, time?: number): Promise<string> {
  const t = Math.floor((time ?? Date.now() / 1000) / PERIOD)
  const timeBytes = new Uint8Array(8)
  new DataView(timeBytes.buffer).setUint32(4, t, false)

  const hmac = await hmacSha1(new TextEncoder().encode(secret), timeBytes)

  // Dynamic truncation (TOTP RFC 6238)
  const offset = hmac[hmac.length - 1] & 0x0f
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)

  return (code % 1_000_000).toString().padStart(6, '0')
}

export async function validateToken(
  secret: string,
  token: string,
  tolerance = 1,
): Promise<boolean> {
  const now = Date.now() / 1000
  for (let offset = -tolerance; offset <= tolerance; offset++) {
    const t = Math.floor(now / PERIOD) + offset
    const candidate = await generateToken(secret, t * PERIOD)
    if (candidate === token) return true
  }
  return false
}

export function getTokenRemainingSeconds(): number {
  return PERIOD - (Math.floor(Date.now() / 1000) % PERIOD)
}

export interface BoothQrPayload {
  booth: string
  token: string
  ts: number
}

export function encodeBoothQr(boothId: string, token: string): string {
  const payload: BoothQrPayload = {
    booth: boothId,
    token,
    ts: Math.floor(Date.now() / 1000),
  }
  return JSON.stringify(payload)
}

export function parseBoothQr(raw: string): BoothQrPayload | null {
  try {
    const data = JSON.parse(raw)
    if (typeof data.booth === 'string' && typeof data.token === 'string' && typeof data.ts === 'number') {
      return data as BoothQrPayload
    }
    return null
  } catch {
    return null
  }
}

// --- URL-based QR encoding (for camera / Google Lens scanning) ---

export function encodeBoothQrUrl(boothId: string, token: string, origin: string): string {
  const ts = Math.floor(Date.now() / 1000)
  return `${origin}/collect/${boothId}?token=${token}&ts=${ts}`
}

export function parseBoothQrFromUrl(searchParams: URLSearchParams, boothId: string): BoothQrPayload | null {
  const token = searchParams.get('token')
  const tsStr = searchParams.get('ts')
  if (!token || !tsStr) return null
  const ts = Number(tsStr)
  if (isNaN(ts)) return null
  return { booth: boothId, token, ts }
}

// Max age of QR payload in seconds — reject if older than one full period
const MAX_QR_AGE = PERIOD

export async function validateBoothQr(payload: BoothQrPayload, secret: string): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000)
  // Reject if QR is too old
  if (now - payload.ts > MAX_QR_AGE) return false
  // Validate token against current period only (tighter window)
  return validateToken(secret, payload.token, 0)
}
