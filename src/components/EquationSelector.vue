<template>
  <div class="selector-root">
    <div class="panel-header">
      <div class="header-left">
        <span class="header-title">方程选择</span>
        <span class="header-divider">|</span>
        <span class="header-hint">点击方程选中，确认后添加</span>
      </div>
      <span class="header-badge">{{ state.currentOptions.length }} / 3</span>
    </div>

    <div class="categories-grid">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="cat-card"
        :style="{ '--accent': cat.color, '--accent-bg': cat.color + '12' }"
      >
        <div class="cat-label" :style="{ color: cat.color }">
          {{ cat.name }}
        </div>
        <div class="cat-list">
          <div
            v-for="eq in getCategoryEquations(cat.id)"
            :key="eq.id"
            class="eq-row"
            :class="{ 'is-selected': isSelected(eq.id), 'is-done': isCompleted(eq.id) }"
            @click="toggleEquation(eq.id)"
          >
            <span class="eq-emoji">{{ getEmoji(eq.icon) }}</span>
            <span class="eq-name">{{ eq.name }}</span>
            <span class="eq-meta">
              <span class="eq-lv">Lv{{ eq.level }}</span>
              <span class="eq-progress">{{ getCount(eq.id) }}/{{ eq.requiredCount }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <div class="footer-actions">
        <button class="btn btn-outline" @click="clearSelection">清空选择</button>
        <button class="btn btn-primary" @click="confirmSelection">
          确认选择 ({{ state.currentOptions.length }})
        </button>
      </div>
      <div class="footer-stats">
        已获得方程 <strong>{{ ownedEquationsList.length }}</strong> 种 / <strong>{{ totalCount }}</strong> 个
      </div>
    </div>

    <Transition name="toast">
      <div v-if="showToast" class="toast">{{ toastMessage }}</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { categories, getEquationById, getCategoryEquations } from '../data/equations'

const {
  state,
  addEquation,
  setCurrentOptions,
  clearCurrentOptions,
  getEquationCount,
  isEquationOwned,
  ownedEquationsList
} = useGameStore()

const showToast = ref(false)
const toastMessage = ref('')

const totalCount = computed(() =>
  ownedEquationsList.value.reduce((sum, item) => sum + item.count, 0)
)

const emojiMap: Record<string, string> = {
  Sparkles: '🔮', Shield: '🛡', Timer: '⏱', Clock: '⏱', TimerReset: '⏱',
  Layers: '📚', List: '📚', Hash: '📚', GitBranch: '🌿',
  AlignHorizontalDistributeCenter: '📐', Flame: '🔥', Zap: '⚡',
  Target: '🎯', Gauge: '⚡', Minus: '📏', Crosshair: '🎯',
  Rocket: '🚀', Navigation: '🧭', ArrowRightLeft: '↔',
  Star: '⭐', Smile: '😊', AlertTriangle: '⚠',
  Snowflake: '❄', Heart: '💚', Skull: '💀',
  Maximize2: '📐', Users: '👥', Swords: '⚔',
  Plane: '✈', Activity: '📈', AlertCircle: '❌',
  Moon: '🌙', Ghost: '👻', UserMinus: '👻',
  Magnet: '🧲', HelpCircle: '❓'
}

const getEmoji = (iconName: string): string => emojiMap[iconName] || '❓'
const isSelected = (eqId: string) => state.currentOptions.includes(eqId)
const isCompleted = (eqId: string) => isEquationOwned(eqId)
const getCount = (eqId: string) => getEquationCount(eqId)

const toggleEquation = (eqId: string) => {
  if (isSelected(eqId)) {
    state.currentOptions = state.currentOptions.filter(id => id !== eqId)
  } else if (state.currentOptions.length < 3) {
    state.currentOptions.push(eqId)
  }
  setCurrentOptions([...state.currentOptions])
}

const clearSelection = () => clearCurrentOptions()

const confirmSelection = () => {
  if (state.currentOptions.length === 0) return
  const names = state.currentOptions.map(id => getEquationById(id)?.name || id)
  state.currentOptions.forEach(eqId => addEquation(eqId))
  clearCurrentOptions()
  toastMessage.value = `已添加: ${names.join('、')}`
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
}
</script>

<style scoped>
.selector-root {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px 20px 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
}

.header-divider {
  color: #d1d5db;
  font-size: 14px;
}

.header-hint {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 400;
}

.header-badge {
  font-size: 12px;
  font-weight: 700;
  color: #3b82f6;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 3px 14px;
  border-radius: 20px;
}

.categories-grid {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 16px;
  padding-right: 2px;
}

.cat-card {
  background: #fafbfc;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 10px 10px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.cat-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-bg);
}

.cat-label {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.cat-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.eq-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  background: transparent;
  border: 1px solid transparent;
  user-select: none;
}

.eq-row:hover {
  background: #f3f4f6;
}

.eq-row.is-selected {
  background: #eff6ff;
  border-color: #93c5fd;
}

.eq-row.is-done {
  opacity: 0.3;
  pointer-events: none;
}

.eq-emoji {
  font-size: 14px;
  flex-shrink: 0;
  line-height: 1;
  width: 20px;
  text-align: center;
}

.eq-name {
  flex: 1;
  font-size: 12px;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  line-height: 1.4;
  font-weight: 500;
}

.eq-row.is-selected .eq-name {
  color: #1e40af;
  font-weight: 600;
}

.eq-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.eq-lv {
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  background: #f3f4f6;
  padding: 1px 6px;
  border-radius: 4px;
}

.eq-progress {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  min-width: 26px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.eq-row.is-selected .eq-progress {
  color: #3b82f6;
}

.panel-footer {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid #f0f0f0;
}

.footer-actions {
  display: flex;
  gap: 10px;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-outline {
  background: #fff;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-outline:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #374151;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

.footer-stats {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  font-weight: 400;
}

.footer-stats strong {
  color: #6b7280;
  font-weight: 600;
}

.toast {
  position: absolute;
  bottom: 72px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 22px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
  white-space: nowrap;
  z-index: 100;
}

.toast-enter-active { animation: toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-leave-active { animation: toast-out 0.25s ease-in; }

@keyframes toast-in {
  from { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.95); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}

@keyframes toast-out {
  from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  to   { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.95); }
}
</style>
