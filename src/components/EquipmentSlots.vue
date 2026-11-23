<script setup lang="ts">
import type { Equipment, SlotType } from '../types'

defineProps<{
  equipment: Equipment
}>()

const emit = defineEmits<{
  removeItem: [slot: SlotType]
}>()

const slots: { type: SlotType; name: string; icon: string }[] = [
  { type: 'helmet', name: 'Шолом', icon: '⛑️' },
  { type: 'armor', name: 'Броня', icon: '🛡️' },
  { type: 'weapon', name: 'Зброя', icon: '⚔️' },
  { type: 'boots', name: 'Чоботи', icon: '🥾' }
]
</script>

<template>
  <section class="equipment-panel">
    <h2>Екіпірування персонажа</h2>

    <div class="equipment-grid">
      <div
        v-for="slot in slots"
        :key="slot.type"
        class="equipment-slot"
        :class="{ filled: equipment[slot.type] }"
        @click="equipment[slot.type] && emit('removeItem', slot.type)"
      >
        <div class="slot-icon">{{ slot.icon }}</div>

        <h3>{{ slot.name }}</h3>

        <template v-if="equipment[slot.type]">
          <p class="item-name">
            {{ equipment[slot.type]?.name }}
          </p>

          <p class="item-info">
            Вага: {{ equipment[slot.type]?.weight }} кг
          </p>

          <span class="remove-hint">Натисніть, щоб зняти</span>
        </template>

        <template v-else>
          <p class="empty-text">Порожній слот</p>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.equipment-panel {
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

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 20px;
}

.equipment-slot {
  min-height: 155px;
  background: #252530;
  border: 2px dashed #55515a;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  transition: 0.2s;
}

.equipment-slot.filled {
  border: 2px solid #d4ad62;
  background: #302a27;
  cursor: pointer;
}

.equipment-slot.filled:hover {
  background: #40352a;
}

.slot-icon {
  font-size: 30px;
  opacity: 0.7;
}

h3 {
  color: #e6bf70;
  margin: 8px 0;
}

.item-name {
  font-weight: bold;
  margin: 8px 0;
}

.item-info {
  color: #bfb5a5;
  font-size: 13px;
}

.empty-text {
  color: #77737e;
  font-style: italic;
}

.remove-hint {
  display: block;
  color: #c5a363;
  font-size: 12px;
  margin-top: 10px;
}
</style>
