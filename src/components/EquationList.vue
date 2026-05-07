<template>
  <div class="list-bar">
    <div class="list-header">
      <Package class="list-header-icon" />
      <span class="list-header-text">已获得方程</span>
      <span class="list-header-count">{{ ownedEquationsList.length }} 种 / {{ totalCount }} 个</span>
    </div>
    
    <div v-if="ownedEquationsList.length === 0" class="list-empty">
      暂无已获得的方程
    </div>
    
    <div v-else class="list-items">
      <div 
        v-for="item in ownedEquationsList" 
        :key="item.equationId"
        class="list-chip"
      >
        <component :is="getIcon(item.equationId)" class="chip-item-icon" />
        <span class="chip-item-name">{{ getName(item.equationId) }}</span>
        <span class="chip-item-count">×{{ item.count }}</span>
        <button class="chip-btn chip-minus" @click="remove(item.equationId)">
          <Minus class="chip-btn-icon" />
        </button>
        <button class="chip-btn chip-plus" @click="add(item.equationId)">
          <Plus class="chip-btn-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Package, Minus, Plus } from 'lucide-vue-next'
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

const add = (eqId: string) => {
  addEquation(eqId)
}

const remove = (eqId: string) => {
  removeEquation(eqId)
}
</script>

<style scoped>
.list-bar {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 8px 14px;
  backdrop-filter: blur(10px);
}

.list-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.list-header-icon {
  width: 14px;
  height: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.list-header-text {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.list-header-count {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
}

.list-empty {
  text-align: center;
  padding: 8px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
}

.list-items {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.list-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  font-size: 11px;
  flex-shrink: 0;
}

.chip-item-icon {
  width: 12px;
  height: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.chip-item-name {
  color: #fff;
  font-weight: 500;
}

.chip-item-count {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  margin-right: 2px;
}

.chip-btn {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 0;
}

.chip-btn-icon {
  width: 10px;
  height: 10px;
}

.chip-minus {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
}

.chip-minus:hover {
  background: rgba(244, 67, 54, 0.3);
}

.chip-plus {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
}

.chip-plus:hover {
  background: rgba(76, 175, 80, 0.3);
}
</style>
