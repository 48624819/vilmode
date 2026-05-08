<template>
  <div class="selector-root">
    <div class="panel-header">
      <div class="header-left">
        <div class="header-icon-wrapper">
          <BookMarked class="header-icon" />
        </div>
        <div class="header-text">
          <span class="header-title">方程库</span>
          <span class="header-subtitle">Equation Library</span>
        </div>
      </div>
      <div class="header-right">
        <div class="selection-badge">
          <span class="badge-label">已选</span>
          <span class="badge-value">{{ state.currentOptions.length }}</span>
          <span class="badge-separator">/</span>
          <span class="badge-max">3</span>
        </div>
      </div>
    </div>

    <div class="categories-grid">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="category-card"
        :style="getCategoryProgressStyle(cat.id)"
      >
        <div class="category-header" :style="{ '--accent': cat.color }">
          <div class="category-icon-bg" :style="{ background: cat.color + '12' }">
            <component :is="getIcon(cat.icon)" class="category-icon" :style="{ color: cat.color }" />
          </div>
          <span class="category-name">{{ cat.name }}</span>
          <div class="category-stats">
            <span class="stat-completed">{{ getCompletedCount(cat.id) }}</span>
            <span class="stat-total">/{{ getCategoryEquations(cat.id).length }}</span>
          </div>
        </div>

        <div class="equations-list">
          <div
            v-for="eq in getCategoryEquations(cat.id)"
            :key="eq.id"
            class="equation-item"
            :class="{
              'is-selected': isSelected(eq.id),
              'is-completed': isCompleted(eq.id)
            }"
            @click="toggleEquation(eq.id)"
          >
            <div class="eq-icon-wrapper">
              <component :is="getIcon(eq.icon)" class="eq-icon" />
            </div>
            <div class="eq-content">
              <span class="eq-name">{{ eq.name }}</span>
              <div class="eq-meta">
                <span class="eq-level">Lv.{{ eq.level }}</span>
                <span
                  class="eq-progress-text"
                  :class="{
                    'is-complete': getCount(eq.id) >= eq.requiredCount,
                    'is-partial': getCount(eq.id) > 0 && getCount(eq.id) < eq.requiredCount,
                    'is-empty': getCount(eq.id) === 0
                  }"
                >
                  <span class="progress-current">{{ getCount(eq.id) }}</span>
                  <span class="progress-separator">/</span>
                  <span class="progress-total">{{ eq.requiredCount }}</span>
                </span>
              </div>
            </div>
            <div class="eq-status">
              <CheckCircle v-if="isCompleted(eq.id)" class="status-icon status-completed" />
              <Circle v-else-if="isSelected(eq.id)" class="status-icon status-selected" />
              <Circle v-else class="status-icon status-default" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <div class="footer-main">
        <button class="btn btn-secondary" @click="clearSelection">
          <X class="btn-icon" />
          清空选择
        </button>
        <button
          class="btn btn-primary"
          :class="{ 'is-disabled': state.currentOptions.length === 0 }"
          @click="confirmSelection"
          :disabled="state.currentOptions.length === 0"
        >
          <Plus class="btn-icon" />
          确认添加 ({{ state.currentOptions.length }})
        </button>
      </div>
      <div class="footer-info">
        <Library class="info-icon" />
        <span>已掌握方程</span>
        <strong>{{ ownedEquationsList.length }}</strong>
        <span>种 / 共</span>
        <strong>{{ totalCount }}</strong>
        <span>个</span>
      </div>
    </div>

    <Transition name="toast">
      <div v-if="showToast" class="toast">
        <CheckCircle class="toast-icon" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { BookMarked, CheckCircle, Circle, X, Plus, Library } from 'lucide-vue-next'
import { useGameStore } from '../stores/gameStore'
import { categories, getEquationById, getCategoryEquations } from '../data/equations'
import * as icons from 'lucide-vue-next'

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

const getIcon = (iconName: string) => {
  return (icons as any)[iconName] || icons.HelpCircle
}

const isSelected = (eqId: string) => state.currentOptions.includes(eqId)
const isCompleted = (eqId: string) => isEquationOwned(eqId)
const getCount = (eqId: string) => getEquationCount(eqId)

const getCompletedCount = (catId: string) => {
  return getCategoryEquations(catId).filter(eq => isEquationOwned(eq.id)).length
}

const getCategoryProgressStyle = (catId: string) => {
  const cat = categories.find(c => c.id === catId)
  if (!cat) return {}

  const total = getCategoryEquations(catId).length
  const completed = getCompletedCount(catId)
  const percentage = total > 0 ? (completed / total) * 100 : 0

  if (percentage === 0) {
    return { background: 'var(--gray-50)' }
  } else if (percentage === 100) {
    return { background: '#10B981' }
  } else {
    return {
      background: `linear-gradient(to top, #D1FAE5 0%, #D1FAE5 ${percentage}%, white ${percentage}%, white 100%)`
    }
  }
}

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
  toastMessage.value = `✨ 已添加: ${names.join('、')}`
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2500)
}
</script>

<style scoped>
.selector-root {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--gray-100);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon-wrapper {
  width: 32px;
  height: 32px;
  background: var(--gradient-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-primary);
}

.header-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-900);
}

.header-subtitle {
  font-size: 11px;
  color: var(--gray-400);
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
}

.selection-badge {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 6px 12px;
  background: var(--primary-50);
  border: 1px solid var(--primary-200);
  border-radius: var(--radius-xl);
  font-weight: 600;
}

.badge-label {
  font-size: 12px;
  color: var(--primary-600);
}

.badge-value {
  font-size: 16px;
  color: var(--primary-700);
  font-weight: 800;
}

.badge-separator {
  font-size: 14px;
  color: var(--primary-400);
}

.badge-max {
  font-size: 14px;
  color: var(--primary-600);
}

.categories-grid {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
  margin-bottom: 12px;
  padding-right: 4px;
}

.category-card {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  transition: var(--transition-normal);
}

.category-card:hover {
  border-color: var(--gray-300);
  box-shadow: var(--shadow-md);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
  flex-shrink: 0;
}

.category-icon-bg {
  width: 26px;
  height: 26px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon {
  width: 14px;
  height: 14px;
}

.category-name {
  flex: 1;
  font-size: 13px;
  font-weight: 700;
  color: var(--gray-800);
  letter-spacing: 0.02em;
}

.category-stats {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-size: 11px;
}

.stat-completed {
  font-weight: 700;
  color: var(--success-600);
}

.stat-total {
  color: var(--gray-400);
}

.equations-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.equation-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  background: white;
  border: 1px solid transparent;
  user-select: none;
}

.equation-item:hover {
  background: var(--primary-50);
  border-color: var(--primary-200);
  transform: translateX(2px);
}

.equation-item.is-selected {
  background: var(--primary-50);
  border-color: var(--primary-300);
  box-shadow: 0 0 0 3px var(--primary-100);
}

.equation-item.is-completed {
  opacity: 0.6;
  pointer-events: none;
  background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
  border: 2px solid #86EFAC;
  position: relative;
}

.equation-item.is-completed::after {
  content: '✓ 已完成';
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 9px;
  font-weight: 700;
  color: #059669;
  background: #D1FAE5;
  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid #86EFAC;
}

.equation-item.is-completed .eq-name {
  color: #059669;
  text-decoration: line-through;
  text-decoration-color: #86EFAC;
}

.equation-item.is-completed .eq-icon-wrapper {
  background: #D1FAE5;
}

.equation-item.is-completed .eq-icon {
  color: #059669;
}

.eq-icon-wrapper {
  width: 24px;
  height: 24px;
  background: var(--gray-100);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.eq-icon {
  width: 12px;
  height: 12px;
  color: var(--gray-600);
}

.eq-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.eq-name {
  font-size: 12px;
  color: var(--gray-800);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.equation-item.is-selected .eq-name {
  color: var(--primary-700);
}

.eq-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.eq-level {
  font-size: 10px;
  font-weight: 700;
  color: white;
  background: var(--warning-500);
  padding: 2px 8px;
  border-radius: 10px;
}

.eq-progress-text {
  font-size: 11px;
  font-weight: 700;
  color: white;
  background: var(--primary-500);
  padding: 2px 8px;
  border-radius: 10px;
  min-width: 48px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  transition: all 0.3s ease;
}

.eq-progress-text.is-complete {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
}

.eq-progress-text.is-partial {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
  animation: pulse-warning 2s ease-in-out infinite;
}

.eq-progress-text.is-empty {
  background: var(--gray-400);
  box-shadow: none;
}

.progress-current {
  font-weight: 800;
  font-size: 12px;
}

.progress-separator {
  font-weight: 600;
  opacity: 0.8;
}

.progress-total {
  font-weight: 600;
  opacity: 0.95;
}

.is-partial .progress-current {
  color: #FEF3C7;
}

.is-partial .progress-total {
  color: #FDE68A;
}

@keyframes pulse-warning {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.eq-status {
  flex-shrink: 0;
}

.status-icon {
  width: 16px;
  height: 16px;
}

.status-default {
  color: var(--gray-300);
}

.status-selected {
  color: var(--primary-500);
  fill: var(--primary-500);
}

.status-completed {
  color: var(--success-500);
}

.panel-footer {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
  border-top: 2px solid var(--gray-100);
}

.footer-main {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.btn-secondary {
  background: white;
  color: var(--gray-600);
  border: 1px solid var(--gray-300);
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
  color: var(--gray-800);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-primary);
}

.btn-primary:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
}

.btn-primary.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.footer-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: var(--gray-500);
  font-weight: 500;
}

.info-icon {
  width: 16px;
  height: 16px;
  color: var(--primary-500);
}

.footer-info strong {
  color: var(--primary-700);
  font-weight: 700;
}

.toast {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background: var(--gradient-success);
  border-radius: var(--radius-md);
  color: white;
  font-size: 14px;
  font-weight: 600;
  box-shadow: var(--shadow-success);
  white-space: nowrap;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toast-icon {
  width: 18px;
  height: 18px;
}

.toast-enter-active { animation: toast-in 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-leave-active { animation: toast-out 0.25s ease-in; }

@keyframes toast-in {
  from { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.95); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}

@keyframes toast-out {
  from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  to   { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.95); }
}

@media (max-width: 768px) {
  .selector-root {
    padding: 16px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .footer-main {
    flex-direction: column;
  }
}
</style>
