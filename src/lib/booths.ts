export interface Booth {
  id: string
  name: string
  code: string
  event: 'techfest' | 'gamefest'
  order: number
  secret: string
}

export const booths: Booth[] = [
  // TechFest booths (B1-B5)
  {
    id: 'b1',
    name: 'Fullstack Development',
    code: 'B1',
    event: 'techfest',
    order: 1,
    secret: 'apexfest-b1-fullstack-2026',
  },
  {
    id: 'b2',
    name: 'Cloud Computing',
    code: 'B2',
    event: 'techfest',
    order: 2,
    secret: 'apexfest-b2-cloud-2026',
  },
  {
    id: 'b3',
    name: 'Generative AI',
    code: 'B3',
    event: 'techfest',
    order: 3,
    secret: 'apexfest-b3-genai-2026',
  },
  {
    id: 'b4',
    name: 'Machine Learning',
    code: 'B4',
    event: 'techfest',
    order: 4,
    secret: 'apexfest-b4-ml-2026',
  },
  {
    id: 'b5',
    name: 'Cybersecurity',
    code: 'B5',
    event: 'techfest',
    order: 5,
    secret: 'apexfest-b5-cyber-2026',
  },
  // GameFest booths
  {
    id: 'g1',
    name: 'Monkeytype',
    code: 'G1',
    event: 'gamefest',
    order: 6,
    secret: 'apexfest-g1-monkeytype-2026',
  },
  {
    id: 'g2',
    name: 'Chrome Dino',
    code: 'G2',
    event: 'gamefest',
    order: 7,
    secret: 'apexfest-g2-dino-2026',
  },
  {
    id: 'g3',
    name: 'Jackbox',
    code: 'G3',
    event: 'gamefest',
    order: 8,
    secret: 'apexfest-g3-jackbox-2026',
  },
]

export const techfestBooths = booths.filter((b) => b.event === 'techfest')
export const gamefestBooths = booths.filter((b) => b.event === 'gamefest')

export function getBoothById(id: string): Booth | undefined {
  return booths.find((b) => b.id === id)
}
