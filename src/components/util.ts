export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export type HSVA = { h: number; s: number; v: number; a: number }
export type RGBA = { r: number; g: number; b: number; a: number }
export type Hex = string

function toHex(v: number) {
  const h = Math.round(v).toString(16)
  return ('00'.substring(0, 2 - h.length) + h).toUpperCase()
}

export function HSVAtoRGBA(hsva: HSVA): RGBA {
  const { h, s, v, a } = hsva
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  }
  const rgb = [f(5), f(3), f(1)].map((v) => Math.round(v * 255))
  return { r: rgb[0], g: rgb[1], b: rgb[2], a }
}

export function RGBAtoHex({ r, g, b, a }: RGBA): Hex {
  return `#${[toHex(r), toHex(g), toHex(b), a !== undefined ? toHex(Math.round(a * 255)) : ''].join(
    ''
  )}` as Hex
}
