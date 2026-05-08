const fs = require('fs')
const path = require('path')

const equations = [
  { id: 'meteor_base', name: '陨石', description: '每15秒向对手发射2颗陨石', icon: 'Sparkles', category: 'meteor', level: 1, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'meteor_durability', name: '陨石耐久+40%', description: '陨石耐久+40%', icon: 'Shield', category: 'meteor', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'meteor_cooldown', name: '陨石发射间隔-2秒', description: '陨石发射间隔-2秒', icon: 'Timer', category: 'meteor', level: 2, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'meteor_count', name: '陨石数量+2', description: '陨石数量+2', icon: 'Layers', category: 'meteor', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'meteor_split', name: '陨石分裂', description: '陨石被摧毁后会分裂', icon: 'GitBranch', category: 'meteor', level: 3, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'meteor_row', name: '一排陨石', description: '发射一排陨石', icon: 'AlignHorizontalDistributeCenter', category: 'meteor', level: 3, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'meteor_comet', name: '灾难级彗星', description: '发射一个灾难级彗星', icon: 'Flame', category: 'meteor', level: 4, requiredCount: 1, newName: '', newIcon: '' },

  { id: 'laser_base', name: '激光', description: '每15秒向对手发射2道激光', icon: 'Zap', category: 'laser', level: 1, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'laser_damage', name: '激光伤害+50%', description: '激光伤害+50%', icon: 'Target', category: 'laser', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'laser_cooldown', name: '激光发射间隔-2秒', description: '激光发射间隔-2秒', icon: 'Clock', category: 'laser', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'laser_count', name: '激光数量+2', description: '激光数量+2', icon: 'Hash', category: 'laser', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'laser_length', name: '激光长度+25%', description: '激光长度+25%', icon: 'Minus', category: 'laser', level: 3, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'laser_speed', name: '激光移动速度+25%', description: '激光移动速度+25%', icon: 'Gauge', category: 'laser', level: 3, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'laser_ultimate', name: '贯通激光', description: '发射两段随机下落的贯通激光', icon: 'Crosshair', category: 'laser', level: 4, requiredCount: 1, newName: '', newIcon: '' },

  { id: 'missile_base', name: '导弹', description: '每20秒向对手发射2枚导弹', icon: 'Rocket', category: 'missile', level: 1, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'missile_cooldown', name: '导弹发射间隔-2秒', description: '导弹发射间隔-2秒', icon: 'TimerReset', category: 'missile', level: 2, requiredCount: 3, newName: '', newIcon: '' },
  { id: 'missile_count', name: '导弹数量+2', description: '导弹数量+2', icon: 'List', category: 'missile', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'missile_track', name: '追踪导弹', description: '导弹可追踪对手', icon: 'Navigation', category: 'missile', level: 3, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'missile_side', name: '横向导弹', description: '追加2行横向导弹', icon: 'ArrowRightLeft', category: 'missile', level: 3, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'missile_aim', name: '瞄准导弹', description: '发射4枚直接瞄准对手的导弹', icon: 'Target', category: 'missile', level: 4, requiredCount: 1, newName: '', newIcon: '' },

  { id: 'bullet_base', name: '弹幕', description: '每10秒向对手发射3条弹幕', icon: 'Star', category: 'bullet', level: 1, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'bullet_count', name: '弹幕数量+2', description: '弹幕数量+2', icon: 'Star', category: 'bullet', level: 2, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'bullet_speed', name: '弹幕移速-20%', description: '弹幕移速-20%', icon: 'Timer', category: 'bullet', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'bullet_face', name: '表情互动', description: '表情互动', icon: 'Smile', category: 'bullet', level: 3, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'bullet_ultimate', name: '前方高能预警', description: '发射席卷的「前方高能预警」弹幕', icon: 'AlertTriangle', category: 'bullet', level: 4, requiredCount: 1, newName: '', newIcon: '' },

  { id: 'cool_base', name: '爆弹冷却+20秒', description: '对手爆弹冷却+20秒', icon: 'Snowflake', category: 'cool', level: 1, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'heal_base', name: '生命恢复-33%', description: '对手生命值恢复效果-33%', icon: 'Heart', category: 'heal', level: 1, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'poison', name: '毒雾', description: '对手治疗道具间歇转为毒性粉尘，拾取每秒流失10%血量', icon: 'Skull', category: 'poison', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'enlarge_base', name: '放大战机', description: '5秒内使对手战机放大70%，冷却5秒', icon: 'Maximize2', category: 'enlarge', level: 1, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'berserk_time', name: '暴走时间-1秒', description: '对手暴走时间-1秒', icon: 'Zap', category: 'berserk', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'hp_enemy_base', name: '敌机血量+15%', description: '对手的普通敌机血量+15%', icon: 'Users', category: 'hp_enemy', level: 1, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'hp_boss', name: 'BOSS血量+15%', description: '对手的BOSS血量+15%', icon: 'Skull', category: 'hp_boss', level: 2, requiredCount: 3, newName: '', newIcon: '' },
  { id: 'inferno', name: '炼狱魔神', description: '将对手的BOSS替换为炼狱魔神', icon: 'Flame', category: 'inferno', level: 4, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'static_attack', name: '战机攻击-10%', description: '对手战机攻击-10%', icon: 'Swords', category: 'static', level: 2, requiredCount: 3, newName: '', newIcon: '' },
  { id: 'static_damage', name: '静止掉血', description: '对手静止不动时每秒流失10%的血量', icon: 'Snowflake', category: 'static', level: 4, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'engine_attack', name: '僚机攻击-10%', description: '对手僚机攻击-10%', icon: 'Plane', category: 'engine', level: 2, requiredCount: 3, newName: '', newIcon: '' },
  { id: 'move_damage', name: '移动掉血', description: '5秒内使对手移动期间每秒损失5%的血量，冷却5秒', icon: 'Activity', category: 'engine', level: 4, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'error_attack', name: '副武器攻击-10%', description: '对手副武器攻击-10%', icon: 'Crosshair', category: 'error', level: 2, requiredCount: 3, newName: '', newIcon: '' },
  { id: 'error_damage', name: '暴走掉血', description: '对手暴走时每秒流失7%血量', icon: 'Skull', category: 'error', level: 4, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'dark_assault', name: '暗黑突击', description: '对手每拾取5个暗黑水晶，生成1个小型暗黑突击', icon: 'Moon', category: 'dark', level: 3, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'dark_ultimate', name: '小型暗黑突击', description: '生成小型暗黑突击', icon: 'Ghost', category: 'dark', level: 4, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'alone_shield', name: '量子护盾-1秒', description: '对手量子护盾时间-1秒', icon: 'Shield', category: 'alone', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'alone_attack', name: '僚机攻击-10%', description: '对手僚机攻击-10%', icon: 'Plane', category: 'alone', level: 2, requiredCount: 3, newName: '', newIcon: '' },
  { id: 'alone_ultimate', name: '孤立无援', description: '孤立无援状态', icon: 'UserMinus', category: 'alone', level: 4, requiredCount: 1, newName: '', newIcon: '' },
  { id: 'magnetic_shield', name: '量子护盾-1秒', description: '对手量子护盾时间-1秒', icon: 'Shield', category: 'magnetic', level: 2, requiredCount: 2, newName: '', newIcon: '' },
  { id: 'magnetic_range', name: '拾取范围-70%', description: '对手拾取水晶的范围-70%', icon: 'Magnet', category: 'magnetic', level: 4, requiredCount: 1, newName: '', newIcon: '' }
]

const categories = [
  { id: 'meteor', name: '陨石-彗星流', count: 7 },
  { id: 'laser', name: '激光-生死流', count: 6 },
  { id: 'missile', name: '导弹-瞄准流', count: 6 },
  { id: 'bullet', name: '弹幕-高能流', count: 5 },
  { id: 'inferno', name: '炼狱-魔神流', count: 6 },
  { id: 'static', name: '静滞-打击流', count: 6 },
  { id: 'engine', name: '引擎-过载流', count: 6 },
  { id: 'error', name: '错误-进化流', count: 5 },
  { id: 'dark', name: '暗黑-突击流', count: 8 },
  { id: 'alone', name: '孤立-无援流', count: 7 },
  { id: 'magnetic', name: '磁力-干扰流', count: 5 }
]

function getCategoryName(categoryId) {
  const cat = categories.find(c => c.id === categoryId)
  return cat ? cat.name : categoryId
}

const header = [
  '序号',
  '方程ID',
  '当前名称（效果描述）',
  '新名称（待替换）',
  '当前Icon',
  '新Icon（待替换）',
  '所属流派',
  '等级',
  '所需次数',
  '效果描述'
].join(',')

const rows = equations.map((eq, index) => {
  return [
    index + 1,
    eq.id,
    `"${eq.name}"`,
    '',
    eq.icon,
    '',
    getCategoryName(eq.category),
    eq.level,
    eq.requiredCount,
    `"${eq.description}"`
  ].join(',')
})

const csvContent = [header, ...rows].join('\n')

const summaryHeader = '\n\n\n=== 流派统计 ===\n'
const summaryRows = categories.map((cat, index) => {
  return `${index + 1}. ${cat.name}: ${cat.count} 个方程`
}).join('\n')
const totalCount = `\n\n总计: ${equations.length} 个方程`

const fullContent = csvContent + summaryHeader + summaryRows + totalCount

const outputPath = path.join(__dirname, 'equations_list.csv')
fs.writeFileSync(outputPath, fullContent, 'utf8')

console.log('✅ Excel文件已生成!')
console.log(`📄 文件路径: ${outputPath}`)
console.log(`📊 方程总数: ${equations.length} 个`)
console.log(`\n📋 流派分布:`)
categories.forEach((cat, index) => {
  console.log(`   ${index + 1}. ${cat.name}: ${cat.count} 个`)
})
