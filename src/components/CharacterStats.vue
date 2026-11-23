<script setup lang="ts">
import type { CharacterStats } from '../types'

defineProps<{
  baseStats: CharacterStats
  bonuses: CharacterStats
  totalStats: CharacterStats
  totalWeight: number
  maxWeight: number
  isOverloaded: boolean
}>()
</script>

<template>
  <section class="stats-panel">
    <h2>Характеристики героя</h2>

    <div class="stat-row">
      <span>⚔️ Атака</span>
      <span>
        {{ baseStats.attack }}
        ({{ bonuses.attack >= 0 ? '+' : '' }}{{ bonuses.attack }})
        = <strong>{{ totalStats.attack }}</strong>
      </span>
    </div>

    <div class="stat-row">
      <span>🛡️ Захист</span>
      <span>
        {{ baseStats.defense }}
        ({{ bonuses.defense >= 0 ? '+' : '' }}{{ bonuses.defense }})
        = <strong>{{ totalStats.defense }}</strong>
      </span>
    </div>

    <div class="stat-row">
      <span>💨 Швидкість</span>
      <span>
        {{ baseStats.speed }}
        ({{ bonuses.speed >= 0 ? '+' : '' }}{{ bonuses.speed }})
        = <strong>{{ totalStats.speed }}</strong>
      </span>
    </div>

    <div class="weight-section">
      <h3>Вага спорядження</h3>

      <p :class="{ danger: isOverloaded }">
        {{ totalWeight }} / {{ maxWeight }} кг
      </p>

      <div class="weight-bar">
        <div
          class="weight-fill"
          :class="{ overloaded: isOverloaded }"
          :style="{ width: Math.min(totalWeight / maxWeight * 100, 100) + '%' }"
        ></div>
      </div>

      <p class="status" :class="{ danger: isOverloaded }">
        Статус: {{ isOverloaded ? 'Перевантажений' : 'Норма' }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.stats-panel {
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

.stat-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #38343c;
}

.stat-row strong {
  color: #e6bf70;
}

.weight-section {
  margin-top: 24px;
}

.weight-section h3 {
  font-size: 16px;
}

.weight-bar {
  height: 12px;
  background: #393944;
  border-radius: 8px;
  overflow: hidden;
}

.weight-fill {
  height: 100%;
  background: #d4ad62;
  transition: width 0.3s;
}

.weight-fill.overloaded {
  background: #e05252;
}

.danger {
  color: #ff6969;
  font-weight: bold;
}

.status {
  margin-bottom: 0;
}
</style>
