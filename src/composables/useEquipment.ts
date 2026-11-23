import { ref, computed, watch } from 'vue'
import type { Item, Equipment, CharacterStats, SlotType } from '../types'

const initialItems: Item[] = [
  { id: 1, name: 'Залізний шолом', slot: 'helmet', attack: 0, defense: 5, speed: -1, weight: 4 },
  { id: 2, name: 'Легкий шолом', slot: 'helmet', attack: 0, defense: 2, speed: 2, weight: 1 },
  { id: 3, name: 'Сталева броня', slot: 'armor', attack: 0, defense: 15, speed: -4, weight: 18 },
  { id: 4, name: 'Шкіряна броня', slot: 'armor', attack: 0, defense: 6, speed: 2, weight: 5 },
  { id: 5, name: 'Бойова сокира', slot: 'weapon', attack: 18, defense: 0, speed: -3, weight: 12 },
  { id: 6, name: 'Короткий меч', slot: 'weapon', attack: 10, defense: 0, speed: 1, weight: 4 },
  { id: 7, name: 'Важкі чоботи', slot: 'boots', attack: 0, defense: 7, speed: -2, weight: 8 },
  { id: 8, name: 'Легкі чоботи', slot: 'boots', attack: 0, defense: 2, speed: 3, weight: 2 }
]

const baseStats: CharacterStats = {
  attack: 15,
  defense: 10,
  speed: 10
}

const maxWeight = 40
const storageKey = 'rpg-equipment'

function emptyEquipment(): Equipment {
  return {
    helmet: null,
    armor: null,
    weapon: null,
    boots: null
  }
}

// Завантаження збереженого спорядження
function loadEquipment(): Equipment {
  const saved = localStorage.getItem(storageKey)
  const result = emptyEquipment()

  if (!saved) {
    return result
  }

  try {
    const savedItems = JSON.parse(saved)

    for (const item of initialItems) {
      if (savedItems[item.slot] === item.id) {
        result[item.slot] = item
      }
    }
  } catch {
    return emptyEquipment()
  }

  return result
}

const equipment = ref<Equipment>(loadEquipment())

const inventory = computed(() => {
  const equippedIds = Object.values(equipment.value)
    .filter(item => item !== null)
    .map(item => item.id)

  return initialItems.filter(item => !equippedIds.includes(item.id))
})

const bonuses = computed<CharacterStats>(() => {
  const result = { attack: 0, defense: 0, speed: 0 }

  for (const item of Object.values(equipment.value)) {
    if (item) {
      result.attack += item.attack
      result.defense += item.defense
      result.speed += item.speed
    }
  }

  return result
})

const totalWeight = computed(() => {
  return Object.values(equipment.value).reduce<number>((sum, item) => {
    return sum + (item?.weight ?? 0)
  }, 0)
})

const isOverloaded = computed(() => totalWeight.value > maxWeight)

const totalStats = computed<CharacterStats>(() => ({
  attack: baseStats.attack + bonuses.value.attack,
  defense: baseStats.defense + bonuses.value.defense,
  speed: isOverloaded.value ? 0 : baseStats.speed + bonuses.value.speed
}))

function equipItem(item: Item) {
  equipment.value[item.slot] = item
}

function removeItem(slot: SlotType) {
  equipment.value[slot] = null
}

function resetEquipment() {
  equipment.value = emptyEquipment()
}

// Збереження змін спорядження у браузері
watch(equipment, () => {
  const savedItems = {
    helmet: equipment.value.helmet?.id ?? null,
    armor: equipment.value.armor?.id ?? null,
    weapon: equipment.value.weapon?.id ?? null,
    boots: equipment.value.boots?.id ?? null
  }

  localStorage.setItem(storageKey, JSON.stringify(savedItems))
}, { deep: true })


export function useEquipment() {
  return {
    inventory,
    equipment,
    baseStats,
    bonuses,
    totalStats,
    totalWeight,
    maxWeight,
    isOverloaded,
    equipItem,
    removeItem,
    resetEquipment
  }
}
