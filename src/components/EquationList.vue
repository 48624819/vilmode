<template>
  <div class="equation-list-container">
    <div class="list-header">
      <div class="header-left">
        <div class="header-icon-bg">
          <Award class="header-icon" />
        </div>
        <div class="header-text">
          <span class="header-title">已掌握方程</span>
          <span class="header-subtitle">Mastered Equations</span>
        </div>
      </div>
      <div class="header-stats">
        <span class="stat-number">{{ ownedEquationsList.length }}</span>
        <span class="stat-unit">种</span>
        <span class="stat-separator">·</span>
        <span class="stat-number">{{ totalCount }}</span>
        <span class="stat-unit">个</span>
      </div>
    </div>

    <div v-if="ownedEquationsList.length === 0" class="empty-state">
      <div class="empty-icon-wrapper">
        <BookOpen class="empty-icon" />
      </div>
      <h3 class="empty-title">开始你的学习之旅</h3>
      <p class="empty-description">
        还没有掌握任何方程，快去方程学习库选择并学习吧！
      </p>
      <div class="empty-hint">
        <Lightbulb class="hint-icon" />
        <span>提示：点击上方"确认添加"按钮来掌握新方程</span>
      </div>
    </div>

    <div v-else class="equations-grid">
      <div
        v-for="item in ownedEquationsList"
        :key="item.equationId"
        class="equation-card"
      >
        <div class="card-main">
          <div class="icon-wrapper" :style="{ background: getIconColor(item.equationId) + '12' }">
            <component :is="getIcon(item.equationId)" class="eq-icon" :style="{ color: getIconColor(item.equationId) }" />
          </div>
          <div class="card-content">
            <span class="eq-name">{{ getName(item.equationId) }}</span>
            <span class="eq-id">{{ item.equationId }}</span>
          </div>
          <div class="count-badge">
            <span class="count-value">×{{ item.count }}</span>
          </div>
        </div>

        <div class="card-actions">
          <button
            class="action-btn action-remove"
            @click="remove(item.equationId)"
            :title="'减少 ' + getName(item.equationId)"
          >
            <Minus class="action-icon" />
          </button>
          <button
            class="action-btn action-add"
            @click="add(item.equationId)"
            :title="'增加 ' + getName(item.equationId)"
          >
            <Plus class="action-icon" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="ownedEquationsList.length > 0" class="list-footer">
      <TrendingUp class="footer-icon" />
      <span>继续加油！你已经掌握了 {{ ownedEquationsList.length }} 种方程</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Award, BookOpen, Lightbulb, Minus, Plus, TrendingUp } from 'lucide-vue-next'
import { useGameStore } from '../stores/gameStore'
import { getEquationById } from '../data/equations'
import * as icons from 'lucide-vue-next'

const { ownedEquationsList, addEquation, removeEquation } = useGameStore()

const totalCount = computed(() => {
  return ownedEquationsList.value.reduce((sum, item) => sum + item.count, 0)
})

const getIcon = (eqId: string) => {
  const eq = getEquationById(eqId)
  return (icons as any)[eq?.icon] || icons.HelpCircle
}

const getName = (eqId: string) => {
  const eq = getEquationById(eqId)
  return eq?.name || eqId
}

const getIconColor = (eqId: string): string => {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]
  const index = eqId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

const add = (eqId: string) => {
  addEquation(eqId)
}

const remove = (eqId: string) => {
  removeEquation(eqId)
}
</script>

<style scoped>
.equation-list-container {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 2px solid var(--gray-100);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon-bg {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
}

.header-icon {
  width: 18px;
  height: 18px;
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

.header-stats {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.stat-number {
  font-size: 20px;
  font-weight: 800;
  color: var(--primary-600);
}

.stat-unit {
  font-size: 12px;
  color: var(--gray-500);
  font-weight: 500;
}

.stat-separator {
  font-size: 16px;
  color: var(--gray-300);
  margin: 0 4px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon-wrapper {
  width: 72px;
  height: 72px;
  background: var(--gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.empty-icon {
  width: 32px;
  height: 32px;
  color: var(--gray-400);
}

.empty-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-800);
  margin: 0 0 8px;
}

.empty-description {
  font-size: 14px;
  color: var(--gray-500);
  line-height: 1.6;
  margin-bottom: 20px;
}

.empty-hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--warning-50);
  border: 1px solid #FEF3C7;
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: #92400E;
  font-weight: 500;
}

.hint-icon {
  width: 16px;
  height: 16px;
  color: var(--warning-500);
  flex-shrink: 0;
}

.equations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 14px;
}

.equation-card {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 12px;
  transition: var(--transition-fast);
}

.equation-card:hover {
  border-color: var(--gray-300);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.card-main {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.eq-icon {
  width: 16px;
  height: 16px;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.eq-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-800);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eq-id {
  font-size: 10px;
  color: var(--gray-400);
  font-family: monospace;
}

.count-badge {
  flex-shrink: 0;
  padding: 4px 10px;
  background: var(--primary-50);
  border: 1px solid var(--primary-200);
  border-radius: var(--radius-xl);
}

.count-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-700);
}

.card-actions {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}

.action-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  padding: 0;
}

.action-icon {
  width: 14px;
  height: 14px;
}

.action-remove {
  background: #FEF2F2;
  color: #DC2626;
}

.action-remove:hover {
  background: #FEE2E2;
  transform: scale(1.05);
}

.action-add {
  background: var(--success-50);
  color: var(--success-600);
}

.action-add:hover {
  background: var(--success-100);
  transform: scale(1.05);
}

.list-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-top: 14px;
  border-top: 2px solid var(--gray-100);
  font-size: 13px;
  color: var(--gray-600);
  font-weight: 500;
}

.footer-icon {
  width: 16px;
  height: 16px;
  color: var(--success-500);
}

@media (max-width: 768px) {
  .equations-grid {
    grid-template-columns: 1fr;
  }

  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
