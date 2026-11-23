<script setup lang="ts">
import CharacterStats from './components/CharacterStats.vue'
import EquipmentSlots from './components/EquipmentSlots.vue'
import InventoryGrid from './components/InventoryGrid.vue'
import { useEquipment } from './composables/useEquipment'

const {
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
} = useEquipment()
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>⚔️ RPG Equipment Builder</h1>
      <p>Тактичний конструктор спорядження персонажа</p>
    </header>

    <main class="app-layout">
      <CharacterStats
        :base-stats="baseStats"
        :bonuses="bonuses"
        :total-stats="totalStats"
        :total-weight="totalWeight"
        :max-weight="maxWeight"
        :is-overloaded="isOverloaded"
      />

      <EquipmentSlots
        :equipment="equipment"
        @remove-item="removeItem"
      />

      <InventoryGrid
        :inventory="inventory"
        :equipment="equipment"
        @equip-item="equipItem"
      />
    </main>

    <div class="reset-section">
      <button class="reset-button" @click="resetEquipment">
        Скинути білд
      </button>
    </div>

    <footer class="app-footer">
      Лабораторна робота №2 • Варіант 1
    </footer>
  </div>
</template>
