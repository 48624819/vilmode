<template>
  <div class="progress-container">
    <div class="progress-header">
      <div class="header-left">
        <TrendingUp class="header-icon" />
        <h2 class="header-title">学习进度</h2>
        <span class="header-subtitle">Learning Progress</span>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-value">{{ completedCount }}</span>
          <span class="stat-label">已完成</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ totalCount }}</span>
          <span class="stat-label">总分类</span>
        </div>
      </div>
    </div>

    <div class="progress-grid">
      <div
        v-for="cat in categoryProgress"
        :key="cat.id"
        class="progress-card"
        :class="{ 'is-completed': cat.isCompleted }"
        :style="{
          background: cat.percentage > 0
            ? `linear-gradient(to right, ${cat.isCompleted ? '#D1FAE5' : cat.color + '20'} 0%, ${cat.isCompleted ? '#D1FAE5' : cat.color + '20'} ${cat.percentage}%, white ${cat.percentage}%, white 100%)`
            : 'var(--gray-50)'
        }"
      >
        <div class="card-header">
          <div class="card-icon-wrapper" :style="{ background: cat.color + '15', color: cat.color }">
            <component :is="getIcon(cat.icon)" class="card-icon" />
          </div>
          <div class="card-info">
            <span class="card-name">{{ cat.name }}</span>
            <span class="card-percentage">{{ cat.percentage }}%</span>
          </div>
          <div v-if="cat.isCompleted" class="completed-badge">
            <CheckCircle class="badge-icon" />
            <span>已完成</span>
          </div>
        </div>

        <div class="progress-bar-wrapper">
          <div class="progress-bar-bg">
            <div
              class="progress-bar-fill"
              :style="{
                width: cat.percentage + '%',
                background: cat.isCompleted ? 'var(--gradient-success)' : cat.color
              }"
            ></div>
          </div>
        </div>

        <div class="card-footer">
          <span class="card-hint">{{ cat.isCompleted ? '🎉 恭喜完成！' : '继续努力' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, CheckCircle } from 'lucide-vue-next'
import { useGameStore } from '../stores/gameStore'
import * as icons from 'lucide-vue-next'

const { categoryProgress } = useGameStore()

const completedCount = computed(() =>
  categoryProgress.value.filter(cat => cat.isCompleted).length
)

const totalCount = computed(() => categoryProgress.value.length)

const getIcon = (iconName: string) => {
  return (icons as any)[iconName] || icons.HelpCircle
}
</script>

<style scoped>
.progress-container {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  box-shadow: var(--shadow-sm);
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--gray-100);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  width: 18px;
  height: 18px;
  color: var(--primary-500);
}

.header-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0;
}

.header-subtitle {
  font-size: 12px;
  color: var(--gray-400);
  font-weight: 500;
  margin-left: 8px;
  padding-left: 8px;
  border-left: 2px solid var(--gray-200);
}

.header-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--primary-600);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--gray-500);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--gray-200);
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.progress-card {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  transition: var(--transition-normal);
  cursor: default;
}

.progress-card:hover {
  border-color: var(--gray-300);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.progress-card.is-completed {
  background: var(--success-50);
  border-color: var(--success-100);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.card-icon-wrapper {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon {
  width: 14px;
  height: 14px;
}

.card-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.card-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-800);
}

.card-percentage {
  font-size: 14px;
  font-weight: 800;
  color: var(--primary-600);
}

.completed-badge {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  background: var(--gradient-success);
  color: white;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
  box-shadow: var(--shadow-success);
}

.badge-icon {
  width: 12px;
  height: 12px;
}

.progress-bar-wrapper {
  margin-bottom: 6px;
}

.progress-bar-bg {
  width: 100%;
  height: 6px;
  background: var(--gray-200);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-footer {
  text-align: center;
}

.card-hint {
  font-size: 11px;
  color: var(--gray-500);
  font-weight: 500;
}

@media (max-width: 768px) {
  .progress-container {
    padding: 16px;
  }

  .progress-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .progress-grid {
    grid-template-columns: 1fr;
  }
}
</style>
