<script setup lang="ts">
import type { Item, Equipment } from '../types'

const props = defineProps<{
  inventory: Item[]
  equipment: Equipment
}>()

const emit = defineEmits<{
  equipItem: [item: Item]
}>()

const stats = [
  { key: 'attack', name: 'Атака' },
  { key: 'defense', name: 'Захист' },
  { key: 'speed', name: 'Швидкість' }
] as const

// Порівняння нового предмета з поточним спорядженням
function getDifference(item: Item, stat: 'attack' | 'defense' | 'speed'): number {
  const equippedItem = props.equipment[item.slot]
  return item[stat] - (equippedItem?.[stat] ?? 0)
}

function formatDifference(value: number): string {
  return value > 0 ? `+${value}` : String(value)
}
</script>

<template>
  <section class="inventory-panel">
    <h2>🎒 Рюкзак</h2>
    <p class="inventory-count">Доступно предметів: {{ inventory.length }}</p>

    <div class="inventory-grid">
      <button
        v-for="item in inventory"
        :key="item.id"
        type="button"
        class="inventory-item"
        @click="emit('equipItem', item)"
      >
        <strong>{{ item.name }}</strong>

        <span class="item-type">
          {{ item.slot }}
        </span>

        <span>⚔️ Атака: {{ item.attack }}</span>
        <span>🛡️ Захист: {{ item.defense }}</span>
        <span>💨 Швидкість: {{ item.speed }}</span>
        <span>⚖️ Вага: {{ item.weight }} кг</span>

        <span class="equip-hint">Натисніть, щоб одягнути</span>

        
        <span class="tooltip">
          <strong>Порівняння характеристик</strong>

          <span
            v-for="stat in stats"
            :key="stat.key"
            :class="{
              positive: getDifference(item, stat.key) > 0,
              negative: getDifference(item, stat.key) < 0
            }"
          >
            {{ stat.name }}:
            {{ formatDifference(getDifference(item, stat.key)) }}
          </span>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.inventory-panel {
  background: #1b1b24;
  border: 1px solid #a88746;
  border-radius: 12px;
  padding: 20px;
  color: #f5e8cc;
}

h2 {
  color: #e6bf70;
  margin-top: 0;
}

.inventory-count {
  color: #bfb5a5;
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 20px;
}

.inventory-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  padding: 15px;
  background: #252530;
  border: 1px solid #55515a;
  border-radius: 10px;
  color: #f5e8cc;
  text-align: left;
  font: inherit;
  cursor: pointer;
  transition: 0.2s;
}

.inventory-item:hover,
.inventory-item:focus-visible {
  border-color: #e6bf70;
  background: #302a27;
}

.inventory-item strong {
  color: #e6bf70;
}

.item-type {
  color: #aaa0a9;
  font-size: 12px;
  text-transform: uppercase;
}

.equip-hint {
  color: #d4ad62;
  font-size: 12px;
  margin-top: 8px;
}

.tooltip {
  display: none;
  position: absolute;
  z-index: 10;
  bottom: calc(100% + 8px);
  left: 0;
  width: 220px;
  max-width: 90vw;
  padding: 12px;
  background: #111119;
  border: 1px solid #d4ad62;
  border-radius: 8px;
  box-shadow: 0 8px 24px #0008;
  color: #f5e8cc;
  flex-direction: column;
  gap: 7px;
  pointer-events: none;
}

.inventory-item:hover .tooltip,
.inventory-item:focus-visible .tooltip {
  display: flex;
}

.positive {
  color: #66d69a;
}

.negative {
  color: #ff6969;
}

@media (max-width: 500px) {
  .inventory-grid {
    grid-template-columns: 1fr;
  }
}
</style>
