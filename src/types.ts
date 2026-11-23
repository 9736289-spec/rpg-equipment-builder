export type SlotType = 'helmet' | 'armor' | 'weapon' | 'boots'

export interface Item {
  id: number
  name: string
  slot: SlotType
  attack: number
  defense: number
  speed: number
  weight: number
}

export interface CharacterStats {
  attack: number
  defense: number
  speed: number
}

export type Equipment = Record<SlotType, Item | null>
