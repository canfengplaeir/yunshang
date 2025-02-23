<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import MinecraftText from '../components/MinecraftText.vue'

const toast = useToast()
const features = ref([
  {
    title: '红石工程',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" /></svg>',
    desc: '全自动农场 | 工业级生产线 | TNT炮械系统 | 珍珠炮',
    color: 'from-blue-500/20 to-blue-600/10',
    iconBg: 'bg-blue-500/20'
  },
  {
    title: '生电科技',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>',
    desc: '实体压缩 | 堆叠限高 | 高效分类 | 区块加载器',
    color: 'from-green-500/20 to-green-600/10',
    iconBg: 'bg-green-500/20'
  },
  {
    title: '极限优化',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>',
    desc: '区块预加载 | 实体管控 | 多核分布式 | 内存优化',
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconBg: 'bg-yellow-500/20'
  }
])

// 服务器公告
const announcements = ref([
  {
    date: '2024-02-22',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" /></svg>',
    content: '服务器将于本周末进行例行维护，预计停机时间2小时，请各位玩家提前做好准备。'
  },
  {
    date: '2024-02-20',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" /></svg>',
    content: '春节活动圆满结束，感谢大家的积极参与！获奖名单将在近期公布。'
  }
])

// 快速操作按钮
const quickActions = ref([
  {
    title: '地图预览',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>',
    action: () => { /* ... */ }
  },
  {
    title: '游戏指南',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>',
    action: () => { /* ... */ }
  },
  {
    title: '商店系统',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>',
    action: () => { /* ... */ }
  },
  {
    title: '帮助中心',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>',
    action: () => { /* ... */ }
  }
])

// 默认服务器信息
const DEFAULT_SERVER_INFO = {
  players: '-',
  maxPlayers: '-',
  version: '未知',
  protocol: '-',
  motdRaw: {
    text: '服务器信息暂时无法获取'
  }
}

const serverStatus = ref({
  online: false,
  players: 0,
  maxPlayers: 0,
  version: '1.20.4',
  ip: 'especial.top',
  motd: '',
  ping: 0,
  protocol: 0,
  secureChat: false,
  icon: null,
  motdRaw: {
    text: ''
  },
  loading: true,
  error: null
})

const { copy, isSupported } = useClipboard()
const showCopied = ref(false)

const copyIP = async () => {
  if (isSupported) {
    await copy(serverStatus.value.ip)
    showCopied.value = true
    toast.success('服务器地址已复制到剪贴板！', {
      icon: '/mc_icon/command_block.png',
      timeout: 2000,
      position: 'top-right'
    })
    setTimeout(() => (showCopied.value = false), 2000)
  }
}

// 动画入场
const isVisible = ref(false)

// 重试配置
const MAX_RETRIES = 3
const RETRY_DELAY = 5000 // 5秒
const retryCount = ref(0)
const isRetrying = ref(false)
const retryCountdown = ref(0)

// 错误状态类型
const ERROR_TYPES = {
  OFFLINE: '服务器当前离线',
  NETWORK: '网络连接失败',
  API: 'API服务暂时不可用',
  UNKNOWN: '服务器状态查询失败'
}

// 获取错误提示信息和图标
const getErrorInfo = (error) => {
  if (error === ERROR_TYPES.OFFLINE) {
    return {
      icon: '/mc_icon/item/barrier.png',
      class: 'text-error',
      message: '服务器维护中，请稍后再试'
    }
  }
  if (error === ERROR_TYPES.NETWORK) {
    return {
      icon: '/mc_icon/block/redstone_torch_off.png',
      class: 'text-warning',
      message: '网络连接失败，请检查网络设置'
    }
  }
  return {
    icon: '/mc_icon/item/barrier.png',
    class: 'text-error',
    message: error
  }
}

// 获取服务器状态
const fetchServerStatus = async (retry = true) => {
  try {
    serverStatus.value.loading = true
    serverStatus.value.error = null

    const response = await fetch(`https://api.mcsrvstat.us/2/${serverStatus.value.ip}`)
    if (!response.ok) {
      throw new Error(ERROR_TYPES.API)
    }
    const data = await response.json()

    if (data.online) {
      serverStatus.value = {
        ...serverStatus.value,
        online: true,
        players: data.players.online,
        maxPlayers: data.players.max,
        version: data.version,
        motdRaw: {
          text: Array.isArray(data.motd.raw) ? data.motd.raw[0] : 'A Minecraft Server'
        },
        protocol: data.protocol,
        secureChat: data.eula_blocked === false,
        icon: data.icon,
        ping: data.debug?.ping === true ? 100 : 0,
        loading: false
      }
      retryCount.value = 0
      isRetrying.value = false
    } else {
      throw new Error(ERROR_TYPES.OFFLINE)
    }
  } catch (error) {
    console.error('服务器状态查询失败:', error)
    let errorMessage = ERROR_TYPES.UNKNOWN

    if (error.message === 'Failed to fetch') {
      errorMessage = ERROR_TYPES.NETWORK
    } else if (error.message === ERROR_TYPES.OFFLINE) {
      errorMessage = ERROR_TYPES.OFFLINE
    }

    serverStatus.value = {
      ...serverStatus.value,
      ...DEFAULT_SERVER_INFO,  // 使用默认信息
      error: errorMessage,
      online: false,
      loading: false
    }

    if (retry && retryCount.value < MAX_RETRIES) {
      retryCount.value++
      isRetrying.value = true
      retryCountdown.value = RETRY_DELAY / 1000

      const timer = setInterval(() => {
        retryCountdown.value--
        if (retryCountdown.value <= 0) {
          clearInterval(timer)
          isRetrying.value = false
          fetchServerStatus(true)
        }
      }, 1000)
    }
  }
}

// 手动刷新
const manualRefresh = async () => {
  retryCount.value = 0
  isRetrying.value = false
  await fetchServerStatus()
}

// 定时刷新服务器状态
let statusInterval
onMounted(() => {
  fetchServerStatus() // 首次获取
  statusInterval = setInterval(fetchServerStatus, 30000) // 每30秒更新一次
  isVisible.value = true
})

onUnmounted(() => {
  if (statusInterval) {
    clearInterval(statusInterval)
  }
})

// 服务器特性数据
const serverFeatures = ref([
  {
    title: '生存模式',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>',
    desc: '原版生存 | 经济系统 | 领地保护 | 随机传送',
    stats: '在线玩家: 50+',
    iconBg: 'bg-emerald-500/20'
  },
  {
    title: '创造模式',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>',
    desc: '无限创造 | 世界编辑 | 建筑展示 | 红石测试',
    stats: '作品数量: 1000+',
    iconBg: 'bg-blue-500/20'
  },
  {
    title: '小游戏',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.401.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>',
    desc: '起床战争 | 空岛战争 | 密室杀手 | 饥饿游戏',
    stats: '日均对局: 200+',
    iconBg: 'bg-yellow-500/20'
  }
])

// 服务器统计数据
const serverStats = ref([
  {
    title: '在线时长',
    value: '99.9%',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>',
    desc: '稳定运行'
  },
  {
    title: '注册玩家',
    value: '1000+',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>',
    desc: '活跃社区'
  },
  {
    title: '地图大小',
    value: '50GB+',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>',
    desc: '精彩世界'
  }
])

// 服务器规则
const serverRules = ref([
  {
    title: '禁止作弊',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>',
    desc: '严禁使用任何作弊客户端或模组'
  },
  {
    title: '友善交流',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>',
    desc: '保持友好的交流氛围'
  },
  {
    title: '保护环境',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" /></svg>',
    desc: '爱护服务器环境，不破坏他人建筑'
  }
])

// 服务器特色部分
const serverHighlights = ref([
  {
    title: '高性能服务器',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /></svg>',
    desc: '高配置服务器，流畅游戏体验',
    iconBg: 'bg-blue-500/20'
  },
  {
    title: '专业团队',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>',
    desc: '24小时在线维护，及时解决问题',
    iconBg: 'bg-green-500/20'
  },
  {
    title: '社区活动',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>',
    desc: '丰富的社区活动，结交新朋友',
    iconBg: 'bg-purple-500/20'
  }
])

// 服务器特色卡片部分
const serverCards = ref([
  {
    title: '活跃社区',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>',
    desc: '友好的玩家社区，精彩的社交互动'
  },
  {
    title: '稳定运行',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>',
    desc: '99.9%在线率，专业运维团队'
  },
  {
    title: '特色玩法',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.401.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>',
    desc: '独特的游戏玩法，丰富的游戏内容'
  }
])

// 玩家信息统计
const playerStats = ref([
  {
    title: '在线玩家',
    value: '128',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>',
    desc: '当前在线'
  },
  {
    title: '注册玩家',
    value: '3,642',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg>',
    desc: '总注册人数'
  },
  {
    title: '活跃玩家',
    value: '1,024',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>',
    desc: '月活跃用户'
  },
  {
    title: '游戏时长',
    value: '2,160h',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>',
    desc: '总游戏时长'
  }
])
</script>

<template>
  <div class="min-h-screen bg-base-100 relative">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
      <div class="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -bottom-48 -right-48 animate-float" style="animation-delay: -3s"></div>
    </div>

    <!-- 状态栏 -->
    <div class="relative bg-gradient-to-r from-primary to-secondary overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -inset-[10px] bg-gradient-to-r from-white/10 to-transparent rotate-12 transform-gpu blur-3xl opacity-50"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- 在线状态 -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- 在线状态指示器 -->
            <div class="relative flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
                :class="['w-6 h-6', serverStatus.online ? 'text-green-400 animate-pulse' : 'text-red-400']">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium">{{ serverStatus.online ? '在线' : '离线' }}</span>
                <div 
                  :class="[
                    'w-2 h-2 rounded-full',
                    serverStatus.online ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                  ]"
                ></div>
              </div>
            </div>

            <!-- 玩家数量 -->
            <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              <div class="flex items-center gap-1">
                <span class="text-sm font-medium">{{ serverStatus.players }}</span>
                <span class="text-sm text-white/50">/</span>
                <span class="text-sm text-white/70">{{ serverStatus.maxPlayers }}</span>
              </div>
            </div>

            <!-- 延迟显示 -->
            <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div class="flex items-center gap-1">
                <span class="text-sm font-medium">{{ serverStatus.ping }}</span>
                <span class="text-sm text-white/70">ms</span>
              </div>
            </div>

            <!-- 版本信息 -->
            <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z" />
              </svg>
              <span class="text-sm font-medium tracking-wide">{{ serverStatus.version }}</span>
            </div>

            <!-- 错误提示 -->
            <div 
              v-if="serverStatus.error" 
              class="flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-full animate-pulse"
              :class="getErrorInfo(serverStatus.error).class"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <span class="text-sm font-medium">{{ getErrorInfo(serverStatus.error).message }}</span>
            </div>

            <!-- 重试倒计时 -->
            <div 
              v-if="isRetrying" 
              class="text-yellow-200 flex items-center gap-2 bg-yellow-500/20 px-3 py-1.5 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 animate-spin">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span class="text-sm font-medium">{{ retryCountdown }}秒后重试...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务器信息卡片 -->
    <div class="container mx-auto px-4 py-12">
      <!-- 离线提示 -->
      <div 
        v-if="serverStatus.error" 
        class="alert mb-8 shadow-lg"
        :class="{
          'alert-warning': serverStatus.error === ERROR_TYPES.OFFLINE,
          'alert-error': serverStatus.error === ERROR_TYPES.NETWORK,
          'alert-info': serverStatus.error === ERROR_TYPES.API || serverStatus.error === ERROR_TYPES.UNKNOWN
        }"
      >
        <div class="flex items-center gap-3">
          <img 
            :src="serverStatus.error === ERROR_TYPES.OFFLINE 
              ? 'https://objectstorageapi.bja.sealos.run/g6rnmc1y-yunshang/maintenance.png'
              : 'https://objectstorageapi.bja.sealos.run/g6rnmc1y-yunshang/error.png'" 
            class="w-8 h-8" 
          />
          <div>
            <h3 class="font-bold">
              {{ serverStatus.error === ERROR_TYPES.OFFLINE ? '服务器维护中' : '连接失败' }}
            </h3>
            <div class="text-sm">{{ getErrorInfo(serverStatus.error).message }}</div>
          </div>
        </div>
      </div>

      <!-- 服务器统计 -->
      <div class="stats shadow w-full bg-gradient-to-r from-base-200/50 to-transparent backdrop-blur-sm mb-8">
        <div 
          v-for="stat in serverStats" 
          :key="stat.title"
          class="stat"
        >
          <div class="stat-figure text-primary">
            <div class="w-8 h-8 flex items-center justify-center" v-html="stat.icon"></div>
          </div>
          <div class="stat-title">{{ stat.title }}</div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-desc">{{ stat.desc }}</div>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- 玩家信息 -->
        <div class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              玩家信息
            </h2>
            <div class="stats stats-vertical shadow">
              <div class="stat">
                <div class="stat-title">在线玩家</div>
                <div 
                  class="stat-value"
                  :class="{ 'text-primary': serverStatus.online, 'text-base-content/50': !serverStatus.online }"
                >
                  {{ serverStatus.players }}
                </div>
                <div class="stat-desc">最大人数: {{ serverStatus.online ? serverStatus.maxPlayers : '-' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 服务器信息 -->
        <div class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              服务器信息
            </h2>
            <div class="stats stats-vertical shadow">
              <div class="stat">
                <div class="stat-title">版本</div>
                <div 
                  class="stat-value"
                  :class="{ 'text-secondary': serverStatus.online, 'text-base-content/50': !serverStatus.online }"
                >
                  {{ serverStatus.version }}
                </div>
                <div class="stat-desc">协议: {{ serverStatus.online ? serverStatus.protocol : '-' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- MOTD -->
        <div class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4 text-base-content">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
              服务器公告
            </h2>
            <div 
              v-if="!serverStatus.online" 
              class="text-base-content/70 italic"
            >
              服务器信息暂时无法获取
            </div>
            <MinecraftText 
              v-else
              :text="serverStatus.motdRaw.text" 
              class="text-lg [&_span]:!text-base-content [&_span]:!opacity-90"
            />
          </div>
        </div>
      </div>

      <!-- 游戏模式展示 -->
      <div class="mt-20">
        <h2 class="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          游戏模式
        </h2>
        <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          多样化的游戏玩法，满足不同玩家的需求
        </p>
        <div class="grid gap-8 md:grid-cols-3">
          <div 
            v-for="feature in serverFeatures" 
            :key="feature.title"
            class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm 
                   shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <div class="card-body text-center">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 rounded-xl flex items-center justify-center" :class="feature.iconBg">
                  <div class="w-12 h-12" v-html="feature.icon"></div>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
              <p class="text-base-content/70 mb-4">{{ feature.desc }}</p>
              <div class="text-sm font-medium text-primary">{{ feature.stats }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 服务器亮点展示 -->
      <div class="mt-20">
        <h2 class="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          服务器亮点
        </h2>
        <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          为玩家提供最优质的游戏体验
        </p>
        <div class="grid gap-8 md:grid-cols-3">
          <div 
            v-for="highlight in serverHighlights" 
            :key="highlight.title"
            class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm 
                   shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <div class="card-body text-center">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 rounded-xl flex items-center justify-center" :class="highlight.iconBg">
                  <div class="w-12 h-12" v-html="highlight.icon"></div>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2">{{ highlight.title }}</h3>
              <p class="text-base-content/70">{{ highlight.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 服务器特色 -->
      <div class="mt-20">
        <h2 class="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          服务器特色
        </h2>
        <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          独特的游戏体验，丰富的游戏内容
        </p>
        <div class="grid gap-8 md:grid-cols-3">
          <div 
            v-for="card in serverCards" 
            :key="card.title"
            class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm 
                   shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <div class="card-body text-center">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <div class="w-12 h-12" v-html="card.icon"></div>
                </div>
              </div>
              <h3 class="text-xl font-bold mb-2">{{ card.title }}</h3>
              <p class="text-base-content/70">{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 加入服务器指南 -->
      <div class="mt-20 text-center">
        <h2 class="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          如何加入服务器
        </h2>
        <div class="max-w-3xl mx-auto mt-8">
          <div class="steps steps-vertical lg:steps-horizontal">
            <div class="step step-primary">
              <div class="flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                <div>安装游戏客户端</div>
              </div>
            </div>
            <div class="step step-primary">
              <div class="flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
                <div>复制服务器地址</div>
              </div>
            </div>
            <div class="step step-primary">
              <div class="flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                <div>加入服务器开始游戏</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 服务器规则 -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          服务器规则
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="rule in serverRules" 
            :key="rule.title"
            class="card bg-base-200/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
          >
            <div class="card-body">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 text-primary" v-html="rule.icon"></div>
                <h3 class="card-title">{{ rule.title }}</h3>
              </div>
              <p class="text-base-content/70">{{ rule.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速加入 -->
      <div class="mt-12 text-center">
        <div class="inline-flex items-center gap-4 p-6 bg-base-200/50 backdrop-blur-sm rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
          <div>
            <h3 class="text-xl font-bold mb-2">准备好开始冒险了吗？</h3>
            <p class="text-base-content/70 mb-4">加入我们的服务器，开启你的 Minecraft 之旅！</p>
            <button 
              class="btn btn-primary gap-2"
              @click="copyIP"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {{ showCopied ? '已复制' : '复制服务器地址' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 服务器公告板 -->
      <div class="mt-20">
        <div class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4 flex items-center gap-2">
              <img src="https://objectstorageapi.bja.sealos.run/g6rnmc1y-yunshang/oak_sign.png" class="w-8 h-8" />
              最新公告
            </h2>
            <div class="space-y-4">
              <div class="bg-base-300/50 p-4 rounded-lg">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 text-accent flex items-center justify-center" v-html="announcements[0].icon"></div>
                  <span class="text-sm text-base-content/70">{{ announcements[0].date }}</span>
                </div>
                <p class="text-base-content/80">{{ announcements[0].content }}</p>
              </div>
              <div class="bg-base-300/50 p-4 rounded-lg">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-6 h-6 text-accent flex items-center justify-center" v-html="announcements[1].icon"></div>
                  <span class="text-sm text-base-content/70">{{ announcements[1].date }}</span>
                </div>
                <p class="text-base-content/80">{{ announcements[1].content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 添加 Minecraft 字体支持 */
@font-face {
  font-family: 'Minecraft';
  src: url('/fonts/Minecraft AE.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.font-minecraft {
  font-family: 'Minecraft', monospace;
  letter-spacing: 0.5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -1rem);
}

@keyframes ping {
  75%,
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* 新增渐变动画 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradient 6s ease infinite;
}

/* 添加卡片悬停效果 */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.stat {
  @apply transition-all duration-300;
}

.stat:hover {
  @apply transform -translate-y-1;
}

.stat-value {
  @apply font-minecraft;
}
</style>