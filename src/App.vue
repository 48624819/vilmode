<template>
  <div class="app-root">
    <header class="app-header">
      <div class="header-inner">
        <div class="header-brand">
          <span class="brand-icon">💀</span>
          <h1 class="brand-title">恶人模式 · 方程合成辅助</h1>
        </div>
        <div class="header-actions">
          <button class="act-btn" @click="handleNewGame">
            <RefreshCw class="act-icon" />
            新游戏
          </button>
          <button class="act-btn" @click="handleSave">
            <Save class="act-icon" />
            保存
          </button>
          <button class="act-btn" @click="handleLoad">
            <FolderOpen class="act-icon" />
            加载
          </button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <section class="section-progress">
        <ProgressPanel />
      </section>
      <section class="section-selector">
        <EquationSelector />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RefreshCw, Save, FolderOpen } from 'lucide-vue-next'
import { useGameStore } from './stores/gameStore'
import ProgressPanel from './components/ProgressPanel.vue'
import EquationSelector from './components/EquationSelector.vue'

const { newGame, saveGame, loadGame } = useGameStore()

const handleNewGame = () => {
  if (confirm('确定要开始新游戏吗？当前进度将被清空。')) newGame()
}
const handleSave = () => { saveGame(); alert('进度已保存！') }
const handleLoad = () => { loadGame(); alert('进度已加载！') }

onMounted(() => loadGame())
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.app-header {
  flex-shrink: 0;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  max-width: 100%;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  font-size: 20px;
  line-height: 1;
}

.brand-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: 0.3px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.act-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  color: #4b5563;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.act-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #1f2937;
}

.act-icon {
  width: 14px;
  height: 14px;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px 24px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  min-height: 0;
  overflow: hidden;
}

.section-progress {
  flex-shrink: 0;
}

.section-selector {
  flex: 1;
  min-height: 0;
}
</style>
