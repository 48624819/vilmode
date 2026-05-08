<template>
  <div class="app-root">
    <header class="app-header">
      <div class="header-inner">
        <div class="header-brand">
          <div class="brand-logo">
            <GraduationCap class="logo-icon" />
          </div>
          <div class="brand-text">
            <h1 class="brand-title">恶人模式助手</h1>
          <span class="brand-subtitle">Villain Mode Helper</span>
          </div>
        </div>
        <div class="header-actions">
          <button class="act-btn act-btn-primary" @click="handleNewGame">
            <RefreshCw class="act-icon" />
            <span>新游戏</span>
          </button>
          <button class="act-btn" @click="handleSave">
            <Save class="act-icon" />
            <span>保存进度</span>
          </button>
          <button class="act-btn" @click="handleLoad">
            <FolderOpen class="act-icon" />
            <span>加载进度</span>
          </button>
        </div>
      </div>
    </header>

    <main class="app-main">
      <section class="section-selector">
        <EquationSelector />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RefreshCw, Save, FolderOpen, GraduationCap } from 'lucide-vue-next'
import { useGameStore } from './stores/gameStore'
import EquationSelector from './components/EquationSelector.vue'

const { newGame, saveGame, loadGame } = useGameStore()

const handleNewGame = () => {
  if (confirm('确定要开始新的恶人模式吗？当前进度将被清空。')) newGame()
}
const handleSave = () => { saveGame(); alert('游戏进度已保存！') }
const handleLoad = () => { loadGame(); alert('游戏进度已加载！') }

onMounted(() => loadGame())
</script>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--gradient-bg);
}

.app-header {
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--gray-200);
  padding: 0 24px;
  box-shadow: var(--shadow-sm);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo {
  width: 36px;
  height: 36px;
  background: var(--gradient-primary);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-primary);
}

.logo-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-900);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 11px;
  font-weight: 500;
  color: var(--gray-400);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.act-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  color: var(--gray-600);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-fast);
  white-space: nowrap;
}

.act-btn:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
  color: var(--gray-800);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.act-btn-primary {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
  box-shadow: var(--shadow-primary);
}

.act-btn-primary:hover {
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
}

.act-icon {
  width: 16px;
  height: 16px;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px 24px;
  width: 100%;
  min-height: 0;
}

.section-selector {
  flex: 1;
  min-height: 0;
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }

  .header-inner {
    height: 56px;
  }

  .brand-subtitle {
    display: none;
  }

  .header-actions {
    gap: 6px;
  }

  .act-btn span {
    display: none;
  }

  .act-btn {
    padding: 9px 12px;
  }

  .app-main {
    padding: 16px;
    gap: 16px;
  }
}
</style>
