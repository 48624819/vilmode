export interface Equation {
  id: string
  name: string
  description: string
  icon: string
  category: string
  level: number
  requiredCount: number
  dependencies: string[]
  nextEquations?: string[]
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  equations: string[]
  ultimateId: string
}

export const equations: Equation[] = [
  {
    id: 'meteor_base',
    name: '陨石',
    description: '每15秒向对手发射2颗陨石',
    icon: 'Sparkles',
    category: 'meteor',
    level: 1,
    requiredCount: 1,
    dependencies: [],
    nextEquations: ['meteor_durability', 'meteor_cooldown', 'meteor_count']
  },
  {
    id: 'meteor_durability',
    name: '陨石耐久+40%',
    description: '陨石耐久+40%',
    icon: 'Shield',
    category: 'meteor',
    level: 2,
    requiredCount: 2,
    dependencies: ['meteor_base'],
    nextEquations: ['meteor_split']
  },
  {
    id: 'meteor_cooldown',
    name: '陨石发射间隔-2秒',
    description: '陨石发射间隔-2秒',
    icon: 'Timer',
    category: 'meteor',
    level: 2,
    requiredCount: 1,
    dependencies: ['meteor_base']
  },
  {
    id: 'meteor_count',
    name: '陨石数量+2',
    description: '陨石数量+2',
    icon: 'Layers',
    category: 'meteor',
    level: 2,
    requiredCount: 2,
    dependencies: ['meteor_base'],
    nextEquations: ['meteor_row']
  },
  {
    id: 'meteor_split',
    name: '陨石分裂',
    description: '陨石被摧毁后会分裂',
    icon: 'GitBranch',
    category: 'meteor',
    level: 3,
    requiredCount: 1,
    dependencies: ['meteor_durability'],
    nextEquations: ['meteor_comet']
  },
  {
    id: 'meteor_row',
    name: '一排陨石',
    description: '发射一排陨石',
    icon: 'AlignHorizontalDistributeCenter',
    category: 'meteor',
    level: 3,
    requiredCount: 1,
    dependencies: ['meteor_cooldown', 'meteor_count'],
    nextEquations: ['meteor_comet']
  },
  {
    id: 'meteor_comet',
    name: '灾难级彗星',
    description: '发射一个灾难级彗星',
    icon: 'Flame',
    category: 'meteor',
    level: 4,
    requiredCount: 1,
    dependencies: ['meteor_split', 'meteor_row']
  },
  {
    id: 'laser_base',
    name: '激光',
    description: '每15秒向对手发射2道激光',
    icon: 'Zap',
    category: 'laser',
    level: 1,
    requiredCount: 1,
    dependencies: [],
    nextEquations: ['laser_damage', 'laser_cooldown', 'laser_count']
  },
  {
    id: 'laser_damage',
    name: '激光伤害+50%',
    description: '激光伤害+50%',
    icon: 'Target',
    category: 'laser',
    level: 2,
    requiredCount: 2,
    dependencies: ['laser_base']
  },
  {
    id: 'laser_cooldown',
    name: '激光发射间隔-2秒',
    description: '激光发射间隔-2秒',
    icon: 'Clock',
    category: 'laser',
    level: 2,
    requiredCount: 2,
    dependencies: ['laser_base'],
    nextEquations: ['laser_length', 'laser_speed']
  },
  {
    id: 'laser_count',
    name: '激光数量+2',
    description: '激光数量+2',
    icon: 'Hash',
    category: 'laser',
    level: 2,
    requiredCount: 2,
    dependencies: ['laser_base'],
    nextEquations: ['laser_speed']
  },
  {
    id: 'laser_length',
    name: '激光长度+25%',
    description: '激光长度+25%',
    icon: 'Minus',
    category: 'laser',
    level: 3,
    requiredCount: 2,
    dependencies: ['laser_damage', 'laser_cooldown'],
    nextEquations: ['laser_ultimate']
  },
  {
    id: 'laser_speed',
    name: '激光移动速度+25%',
    description: '激光移动速度+25%',
    icon: 'Gauge',
    category: 'laser',
    level: 3,
    requiredCount: 2,
    dependencies: ['laser_cooldown', 'laser_count'],
    nextEquations: ['laser_ultimate']
  },
  {
    id: 'laser_ultimate',
    name: '贯通激光',
    description: '发射两段随机下落的贯通激光',
    icon: 'Crosshair',
    category: 'laser',
    level: 4,
    requiredCount: 1,
    dependencies: ['laser_length', 'laser_speed']
  },
  {
    id: 'missile_base',
    name: '导弹',
    description: '每20秒向对手发射2枚导弹',
    icon: 'Rocket',
    category: 'missile',
    level: 1,
    requiredCount: 1,
    dependencies: [],
    nextEquations: ['missile_cooldown', 'missile_count']
  },
  {
    id: 'missile_cooldown',
    name: '导弹发射间隔-2秒',
    description: '导弹发射间隔-2秒',
    icon: 'TimerReset',
    category: 'missile',
    level: 2,
    requiredCount: 3,
    dependencies: ['missile_base'],
    nextEquations: ['missile_track']
  },
  {
    id: 'missile_count',
    name: '导弹数量+2',
    description: '导弹数量+2',
    icon: 'List',
    category: 'missile',
    level: 2,
    requiredCount: 2,
    dependencies: ['missile_base'],
    nextEquations: ['missile_side']
  },
  {
    id: 'missile_track',
    name: '追踪导弹',
    description: '导弹可追踪对手',
    icon: 'Navigation',
    category: 'missile',
    level: 3,
    requiredCount: 1,
    dependencies: ['missile_cooldown'],
    nextEquations: ['missile_aim']
  },
  {
    id: 'missile_side',
    name: '横向导弹',
    description: '追加2行横向导弹',
    icon: 'ArrowRightLeft',
    category: 'missile',
    level: 3,
    requiredCount: 2,
    dependencies: ['missile_count'],
    nextEquations: ['missile_aim']
  },
  {
    id: 'missile_aim',
    name: '瞄准导弹',
    description: '发射4枚直接瞄准对手的导弹',
    icon: 'Target',
    category: 'missile',
    level: 4,
    requiredCount: 1,
    dependencies: ['missile_track', 'missile_side']
  },
  {
    id: 'bullet_base',
    name: '弹幕',
    description: '每10秒向对手发射3条弹幕',
    icon: 'Star',
    category: 'bullet',
    level: 1,
    requiredCount: 1,
    dependencies: [],
    nextEquations: ['bullet_count', 'bullet_speed']
  },
  {
    id: 'bullet_count',
    name: '弹幕数量+2',
    description: '弹幕数量+2',
    icon: 'Star',
    category: 'bullet',
    level: 2,
    requiredCount: 1,
    dependencies: ['bullet_base']
  },
  {
    id: 'bullet_speed',
    name: '弹幕移速-20%',
    description: '弹幕移速-20%',
    icon: 'Timer',
    category: 'bullet',
    level: 2,
    requiredCount: 2,
    dependencies: ['bullet_base'],
    nextEquations: ['bullet_face']
  },
  {
    id: 'bullet_face',
    name: '表情互动',
    description: '表情互动',
    icon: 'Smile',
    category: 'bullet',
    level: 3,
    requiredCount: 1,
    dependencies: ['bullet_count', 'bullet_speed'],
    nextEquations: ['bullet_ultimate']
  },
  {
    id: 'bullet_ultimate',
    name: '前方高能预警',
    description: '发射席卷的「前方高能预警」弹幕',
    icon: 'AlertTriangle',
    category: 'bullet',
    level: 4,
    requiredCount: 1,
    dependencies: ['bullet_face']
  },
  {
    id: 'cool_base',
    name: '爆弹冷却+20秒',
    description: '对手爆弹冷却+20秒',
    icon: 'Snowflake',
    category: 'cool',
    level: 1,
    requiredCount: 1,
    dependencies: [],
    nextEquations: ['engine_attack', 'error_attack', 'alone_attack']
  },
  {
    id: 'heal_base',
    name: '生命恢复-33%',
    description: '对手生命值恢复效果-33%',
    icon: 'Heart',
    category: 'heal',
    level: 1,
    requiredCount: 2,
    dependencies: [],
    nextEquations: ['poison']
  },
  {
    id: 'poison',
    name: '毒雾',
    description: '对手治疗道具间歇转为毒性粉尘，拾取每秒流失10%血量',
    icon: 'Skull',
    category: 'poison',
    level: 2,
    requiredCount: 2,
    dependencies: ['heal_base'],
    nextEquations: ['static_damage', 'move_damage', 'error_damage']
  },
  {
    id: 'enlarge_base',
    name: '放大战机',
    description: '5秒内使对手战机放大70%，冷却5秒',
    icon: 'Maximize2',
    category: 'enlarge',
    level: 1,
    requiredCount: 1,
    dependencies: [],
    nextEquations: ['berserk_time', 'alone_shield']
  },
  {
    id: 'berserk_time',
    name: '暴走时间-1秒',
    description: '对手暴走时间-1秒',
    icon: 'Zap',
    category: 'berserk',
    level: 2,
    requiredCount: 2,
    dependencies: ['enlarge_base'],
    nextEquations: ['inferno', 'magnetic_range']
  },
  {
    id: 'hp_enemy_base',
    name: '敌机血量+15%',
    description: '对手的普通敌机血量+15%',
    icon: 'Users',
    category: 'hp_enemy',
    level: 1,
    requiredCount: 2,
    dependencies: [],
    nextEquations: ['hp_boss']
  },
  {
    id: 'hp_boss',
    name: 'BOSS血量+15%',
    description: '对手的BOSS血量+15%',
    icon: 'Skull',
    category: 'hp_boss',
    level: 2,
    requiredCount: 3,
    dependencies: ['meteor_base', 'hp_enemy_base'],
    nextEquations: ['inferno', 'dark_assault']
  },
  {
    id: 'inferno',
    name: '炼狱魔神',
    description: '将对手的BOSS替换为炼狱魔神',
    icon: 'Flame',
    category: 'inferno',
    level: 4,
    requiredCount: 1,
    dependencies: ['berserk_time', 'hp_boss']
  },
  {
    id: 'static_attack',
    name: '战机攻击-10%',
    description: '对手战机攻击-10%',
    icon: 'Swords',
    category: 'static',
    level: 2,
    requiredCount: 3,
    dependencies: ['bullet_base', 'cool_base'],
    nextEquations: ['static_damage']
  },
  {
    id: 'static_damage',
    name: '静止掉血',
    description: '对手静止不动时每秒流失10%的血量',
    icon: 'Snowflake',
    category: 'static',
    level: 4,
    requiredCount: 1,
    dependencies: ['static_attack', 'poison']
  },
  {
    id: 'engine_attack',
    name: '僚机攻击-10%',
    description: '对手僚机攻击-10%',
    icon: 'Plane',
    category: 'engine',
    level: 2,
    requiredCount: 3,
    dependencies: ['laser_base', 'cool_base'],
    nextEquations: ['move_damage', 'alone_ultimate']
  },
  {
    id: 'move_damage',
    name: '移动掉血',
    description: '5秒内使对手移动期间每秒损失5%的血量，冷却5秒',
    icon: 'Activity',
    category: 'engine',
    level: 4,
    requiredCount: 1,
    dependencies: ['engine_attack', 'poison']
  },
  {
    id: 'error_attack',
    name: '副武器攻击-10%',
    description: '对手副武器攻击-10%',
    icon: 'Crosshair',
    category: 'error',
    level: 2,
    requiredCount: 3,
    dependencies: ['cool_base'],
    nextEquations: ['error_damage']
  },
  {
    id: 'error_damage',
    name: '暴走掉血',
    description: '对手暴走时每秒流失7%血量',
    icon: 'Skull',
    category: 'error',
    level: 4,
    requiredCount: 1,
    dependencies: ['error_attack', 'poison']
  },
  {
    id: 'dark_assault',
    name: '暗黑突击',
    description: '对手每拾取5个暗黑水晶，生成1个小型暗黑突击',
    icon: 'Moon',
    category: 'dark',
    level: 3,
    requiredCount: 1,
    dependencies: ['laser_base', 'hp_boss'],
    nextEquations: ['dark_ultimate']
  },
  {
    id: 'dark_ultimate',
    name: '小型暗黑突击',
    description: '生成小型暗黑突击',
    icon: 'Ghost',
    category: 'dark',
    level: 4,
    requiredCount: 1,
    dependencies: ['dark_assault', 'bullet_base', 'missile_base']
  },
  {
    id: 'alone_shield',
    name: '量子护盾-1秒',
    description: '对手量子护盾时间-1秒',
    icon: 'Shield',
    category: 'alone',
    level: 2,
    requiredCount: 2,
    dependencies: ['enlarge_base', 'missile_base'],
    nextEquations: ['alone_ultimate']
  },
  {
    id: 'alone_attack',
    name: '僚机攻击-10%',
    description: '对手僚机攻击-10%',
    icon: 'Plane',
    category: 'alone',
    level: 2,
    requiredCount: 3,
    dependencies: ['laser_base', 'cool_base'],
    nextEquations: ['alone_ultimate']
  },
  {
    id: 'alone_ultimate',
    name: '孤立无援',
    description: '孤立无援状态',
    icon: 'UserMinus',
    category: 'alone',
    level: 4,
    requiredCount: 1,
    dependencies: ['alone_shield', 'alone_attack']
  },
  {
    id: 'magnetic_shield',
    name: '量子护盾-1秒',
    description: '对手量子护盾时间-1秒',
    icon: 'Shield',
    category: 'magnetic',
    level: 2,
    requiredCount: 2,
    dependencies: ['missile_base'],
    nextEquations: ['magnetic_range']
  },
  {
    id: 'magnetic_range',
    name: '拾取范围-70%',
    description: '对手拾取水晶的范围-70%',
    icon: 'Magnet',
    category: 'magnetic',
    level: 4,
    requiredCount: 1,
    dependencies: ['berserk_time', 'magnetic_shield']
  }
]

export const categories: Category[] = [
  {
    id: 'meteor',
    name: '陨石-彗星流',
    icon: 'Sparkles',
    color: '#f5a623',
    equations: ['meteor_base', 'meteor_durability', 'meteor_cooldown', 'meteor_count', 'meteor_split', 'meteor_row', 'meteor_comet'],
    ultimateId: 'meteor_comet'
  },
  {
    id: 'laser',
    name: '激光-生死流',
    icon: 'Zap',
    color: '#00d4ff',
    equations: ['laser_base', 'laser_damage', 'laser_cooldown', 'laser_length', 'laser_speed', 'laser_ultimate'],
    ultimateId: 'laser_ultimate'
  },
  {
    id: 'missile',
    name: '导弹-瞄准流',
    icon: 'Rocket',
    color: '#4caf50',
    equations: ['missile_base', 'missile_cooldown', 'missile_count', 'missile_track', 'missile_side', 'missile_aim'],
    ultimateId: 'missile_aim'
  },
  {
    id: 'bullet',
    name: '弹幕-高能流',
    icon: 'Star',
    color: '#e91e63',
    equations: ['bullet_base', 'bullet_count', 'bullet_speed', 'bullet_face', 'bullet_ultimate'],
    ultimateId: 'bullet_ultimate'
  },
  {
    id: 'inferno',
    name: '炼狱-魔神流',
    icon: 'Flame',
    color: '#ff5722',
    equations: ['enlarge_base', 'berserk_time', 'hp_enemy_base', 'hp_boss', 'meteor_base', 'inferno'],
    ultimateId: 'inferno'
  },
  {
    id: 'static',
    name: '静滞-打击流',
    icon: 'Snowflake',
    color: '#9c27b0',
    equations: ['bullet_base', 'cool_base', 'heal_base', 'static_attack', 'poison', 'static_damage'],
    ultimateId: 'static_damage'
  },
  {
    id: 'engine',
    name: '引擎-过载流',
    icon: 'Gauge',
    color: '#00bcd4',
    equations: ['laser_base', 'cool_base', 'heal_base', 'engine_attack', 'poison', 'move_damage'],
    ultimateId: 'move_damage'
  },
  {
    id: 'error',
    name: '错误-进化流',
    icon: 'AlertCircle',
    color: '#f44336',
    equations: ['cool_base', 'heal_base', 'error_attack', 'poison', 'error_damage'],
    ultimateId: 'error_damage'
  },
  {
    id: 'dark',
    name: '暗黑-突击流',
    icon: 'Moon',
    color: '#795548',
    equations: ['meteor_base', 'hp_enemy_base', 'hp_boss', 'laser_base', 'dark_assault', 'bullet_base', 'missile_base', 'dark_ultimate'],
    ultimateId: 'dark_ultimate'
  },
  {
    id: 'alone',
    name: '孤立-无援流',
    icon: 'UserMinus',
    color: '#607d8b',
    equations: ['enlarge_base', 'missile_base', 'alone_shield', 'laser_base', 'cool_base', 'alone_attack', 'alone_ultimate'],
    ultimateId: 'alone_ultimate'
  },
  {
    id: 'magnetic',
    name: '磁力-干扰流',
    icon: 'Magnet',
    color: '#ffc107',
    equations: ['enlarge_base', 'berserk_time', 'missile_base', 'magnetic_shield', 'magnetic_range'],
    ultimateId: 'magnetic_range'
  }
]

export function getEquationById(id: string): Equation | undefined {
  return equations.find(eq => eq.id === id)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id)
}

export function getAllEquationIds(): string[] {
  return equations.map(eq => eq.id)
}

export function getCategoryEquations(categoryId: string): Equation[] {
  const category = getCategoryById(categoryId)
  if (!category) return []
  return category.equations.map(id => getEquationById(id)).filter(Boolean) as Equation[]
}
