<template>
  <div class="progress-strip">
    <div
      v-for="cat in categoryProgress"
      :key="cat.id"
      class="progress-chip"
      :class="{ 'is-full': cat.isCompleted }"
      :style="{ '--accent': cat.color }"
    >
      <span class="chip-emoji">{{ getEmoji(cat.icon) }}</span>
      <span class="chip-name">{{ cat.name }}</span>
      <span class="chip-pct">{{ cat.percentage }}%</span>
      <div class="chip-bar">
        <div
          class="chip-fill"
          :style="{ width: cat.percentage + '%', background: cat.color }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'

const { categoryProgress } = useGameStore()

const emojiMap: Record<string, string> = {
  Sparkles: '🔮', Zap: '⚡', Rocket: '🚀', Star: '⭐',
  Flame: '🔥', Snowflake: '❄', Gauge: '⚡', AlertCircle: '❌',
  Moon: '🌙', UserMinus: '👻', Magnet: '🧲', HelpCircle: '❓'
}

const getEmoji = (iconName: string): string => emojiMap[iconName] || '❓'
</script>

<style scoped>
.progress-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.progress-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  font-size: 11px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.progress-chip.is-full {
  background: #ecfdf5;
  border-color: #a7f3d0;
}

.chip-emoji {
  font-size: 12px;
  line-height: 1;
}

.chip-name {
  color: #6b7280;
  font-weight: 500;
}

.chip-pct {
  color: #374151;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.chip-bar {
  width: 36px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.chip-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
