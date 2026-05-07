import { reactive, computed } from 'vue';
import { equations, categories, getEquationById, getCategoryById } from '../data/equations';
export interface GameState {
 ownedEquations: Record<string, number>;
 currentOptions: string[];
}
interface Recommendation {
 equationId: string;
 score: number;
 reason: string;
 priority: number;
}
const state = reactive<GameState>({
 ownedEquations: {},
 currentOptions: []
});
export function useGameStore() {
 const ownedEquationsList = computed(() => {
 const list: {
 equationId: string;
 count: number;
 }[] = [];
 for (const [id, count] of Object.entries(state.ownedEquations)) {
 list.push({ equationId: id, count });
 }
 return list.sort((a, b) => {
 const eqA = getEquationById(a.equationId);
 const eqB = getEquationById(b.equationId);
 if (!eqA || !eqB)
 return 0;
 return eqA.level - eqB.level;
 });
 });
 const categoryProgress = computed(() => {
 const progress = [];
 for (const category of categories) {
 const categoryEqs = category.equations;
 let completed = 0;
 let total = 0;
 for (const eqId of categoryEqs) {
 const eq = getEquationById(eqId);
 if (!eq)
 continue;
 const owned = state.ownedEquations[eqId] || 0;
 const needed = eq.requiredCount;
 if (owned >= needed) {
 completed++;
 }
 total++;
 }
 progress.push({
 ...category,
 completed,
 total,
 percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
 isCompleted: completed >= total
 });
 }
 return progress.sort((a, b) => b.percentage - a.percentage);
 });
 const addEquation = (equationId: string) => {
 if (!state.ownedEquations[equationId]) {
 state.ownedEquations[equationId] = 0;
 }
 state.ownedEquations[equationId]++;
 };
 const removeEquation = (equationId: string) => {
 if (state.ownedEquations[equationId] && state.ownedEquations[equationId] > 0) {
 state.ownedEquations[equationId]--;
 if (state.ownedEquations[equationId] === 0) {
 delete state.ownedEquations[equationId];
 }
 }
 };
 const setCurrentOptions = (options: string[]) => {
 state.currentOptions = options;
 };
 const clearCurrentOptions = () => {
 state.currentOptions = [];
 };
 const newGame = () => {
 state.ownedEquations = {};
 state.currentOptions = [];
 };
 const saveGame = () => {
 const data = JSON.stringify(state);
 localStorage.setItem('gameEquationHelper', data);
 };
 const loadGame = () => {
 const data = localStorage.getItem('gameEquationHelper');
 if (data) {
 try {
 const saved = JSON.parse(data);
 state.ownedEquations = saved.ownedEquations || {};
 state.currentOptions = saved.currentOptions || [];
 }
 catch (e) {
 console.error('Failed to load game:', e);
 }
 }
 };
 const getRecommendations = (): Recommendation[] => {
  if (state.currentOptions.length === 0)
    return [];
  const recommendations: Recommendation[] = [];
  for (const optionId of state.currentOptions) {
    const eq = getEquationById(optionId);
    if (!eq)
      continue;
    let score = 0;
    let reason = '';
    let priority = 5;
    const owned = state.ownedEquations[optionId] || 0;
    if (owned >= eq.requiredCount) {
      reason = '已满足数量要求，不推荐';
      score = -100;
      priority = 5;
    }
    else {
      const neededForNext = eq.requiredCount - owned;
      if (neededForNext === 1) {
        const nextEqs = eq.nextEquations || [];
        if (nextEqs.length > 0) {
          let bestNext: { name: string; level: number } | null = null;
          for (const nextId of nextEqs) {
            const nextEq = getEquationById(nextId);
            if (nextEq && (!bestNext || nextEq.level > bestNext.level)) {
              bestNext = { name: nextEq.name, level: nextEq.level };
            }
          }
          if (bestNext) {
            if (bestNext.level === 4) {
              reason = `选择后可合成终极效果: ${bestNext.name}`;
              score = 100;
              priority = 1;
            }
            else if (bestNext.level === 3) {
              reason = `选择后可合成二阶方程: ${bestNext.name}`;
              score = 80;
              priority = 2;
            }
            else {
              reason = '即将完成该方程收集';
              score = 60;
              priority = 3;
            }
          }
          else {
            reason = '即将完成该方程收集';
            score = 50;
            priority = 3;
          }
        }
        else {
          reason = '即将完成该方程收集';
          score = 50;
          priority = 3;
        }
      }
      else {
        const cat = getCategoryById(eq.category);
        if (cat) {
          const catProgress = categoryProgress.value.find(p => p.id === cat.id);
          if (catProgress) {
            score = Math.round(catProgress.percentage * 0.5 + (eq.level === 1 ? 20 : 10));
            reason = `推进${cat.name}进度 (还需${neededForNext}个)`;
            priority = 3;
          }
        }
        if (eq.level === 1 && !state.ownedEquations[eq.id]) {
          score += 15;
          if (reason === '推进进度') {
            reason = '开启新流派基础';
          }
          priority = 4;
        }
      }
    }
    recommendations.push({
      equationId: optionId,
      score,
      reason,
      priority
    });
  }
  return recommendations.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return b.score - a.score;
  });
};
 const getEquationCount = (equationId: string): number => {
 return state.ownedEquations[equationId] || 0;
 };
 const isEquationOwned = (equationId: string, requiredCount?: number): boolean => {
 const owned = state.ownedEquations[equationId] || 0;
 const eq = getEquationById(equationId);
 const needed = requiredCount || eq?.requiredCount || 1;
 return owned >= needed;
 };
 return {
 state,
 ownedEquationsList,
 categoryProgress,
 addEquation,
 removeEquation,
 setCurrentOptions,
 clearCurrentOptions,
 newGame,
 saveGame,
 loadGame,
 getRecommendations,
 getEquationCount,
 isEquationOwned
 };
}
