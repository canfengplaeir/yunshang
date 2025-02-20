<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useClipboard } from '@vueuse/core'

const features = ref([
  { 
    title: '红石工程',
    icon: '⚙️',
    desc: '全自动农场 | 工业级生产线 | TNT炮械系统 | 珍珠炮',
    color: 'from-blue-500/20 to-blue-600/10',
    iconBg: 'bg-blue-500/20'
  },
  {
    title: '生电科技',
    icon: '🔌',
    desc: '实体压缩 | 堆叠限高 | 高效分类 | 区块加载器',
    color: 'from-green-500/20 to-green-600/10',
    iconBg: 'bg-green-500/20'
  },
  {
    title: '极限优化',
    icon: '🚀',
    desc: '区块预加载 | 实体管控 | 多核分布式 | 内存优化',
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconBg: 'bg-yellow-500/20'
  }
])

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

// 获取服务器状态
const fetchServerStatus = async (retry = true) => {
  try {
    serverStatus.value.loading = true
    serverStatus.value.error = null
    
    const response = await fetch(`/api/minecraft/server/${serverStatus.value.ip}`)
    const data = await response.json()
    
    if (data.status === 'online') {
      serverStatus.value = {
        ...serverStatus.value,
        online: true,
        players: data.players.online,
        maxPlayers: data.players.max,
        version: data.version.name,
        motdRaw: data.motd.raw || { text: 'A Minecraft Server' },
        protocol: data.version.protocol,
        secureChat: data.enforces_secure_chat,
        icon: data.icon,
        ping: Math.round(data.latency),
        loading: false
      }
      retryCount.value = 0 // 重置重试计数
      isRetrying.value = false
    } else {
      throw new Error('服务器离线')
    }
  } catch (error) {
    console.error('获取服务器状态失败:', error)
    serverStatus.value.error = error.message
    serverStatus.value.online = false
    
    // 重试逻辑
    if (retry && retryCount.value < MAX_RETRIES) {
      retryCount.value++
      isRetrying.value = true
      retryCountdown.value = RETRY_DELAY / 1000
      
      // 倒计时
      const countdownInterval = setInterval(() => {
        retryCountdown.value--
      }, 1000)
      
      // 延迟重试
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      clearInterval(countdownInterval)
      
      return fetchServerStatus(true)
    }
  } finally {
    serverStatus.value.loading = false
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
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- 状态栏 -->
    <div class="relative bg-gradient-to-r from-primary to-secondary overflow-hidden">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -inset-[10px] bg-gradient-to-r from-white/10 to-transparent rotate-12 transform-gpu blur-3xl"></div>
      </div>
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- 在线状态 -->
          <div class="flex items-center gap-3">
            <!-- 服务器图标 -->
            <div class="relative w-10 h-10">
              <img 
                v-if="serverStatus.icon" 
                :src="serverStatus.icon" 
                class="w-10 h-10 rounded-lg"
                alt="服务器图标"
              />
              <div v-else
                class="relative flex items-center justify-center w-10 h-10 rounded-full "
                :class="[
                  serverStatus.loading ? 'bg-yellow-500' : 
                  serverStatus.online ? 'bg-green-500' : 'bg-red-500'
                ]"
              >
                <span v-if="serverStatus.loading" class="animate-spin">⟳</span>
                <svg v-else class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <template v-if="serverStatus.online">
                    <!-- 在线图标 - 播放按钮样式 -->
                    <path d="M8 5v14l11-7z"/>
                  </template>
                  <template v-else>
                    <!-- 离线图标 - X符号 -->
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </template>
                </svg>
              </div>
            </div>

            <div>
              <!-- 状态信息 -->
              <h2 class="text-xl font-semibold text-white">
                <template v-if="serverStatus.loading">
                  获取状态中...
                  <template v-if="isRetrying">
                    (重试 {{ retryCount }}/{{ MAX_RETRIES }}, {{ retryCountdown }}s)
                  </template>
                </template>
                <template v-else-if="serverStatus.online">
                  {{ serverStatus.players }}/{{ serverStatus.maxPlayers }} 人在线
                </template>
                <template v-else>
                  {{ serverStatus.error || '服务器离线' }}
                  <button 
                    v-if="!isRetrying"
                    @click="manualRefresh"
                    class="ml-2 px-2 py-1 text-sm bg-white/10 hover:bg-white/20 rounded transition-colors"
                  >
                    重试
                  </button>
                </template>
              </h2>

              <!-- 服务器详细信息 -->
              <template v-if="serverStatus.online">
                <p class="text-sm text-white/90">
                  版本 {{ serverStatus.version }}
                  <span class="text-xs text-white/60">(协议: {{ serverStatus.protocol }})</span>
                  <span class="mx-2">·</span>
                  延迟 {{ serverStatus.ping }}ms
                  <span class="mx-2">·</span>
                  <span :class="serverStatus.secureChat ? 'text-green-300' : 'text-yellow-300'">
                    {{ serverStatus.secureChat ? '安全聊天已启用' : '安全聊天未启用' }}
                  </span>
                </p>

                <!-- MOTD 信息 -->
                <div class="text-sm text-white/80">
                  <p class="font-medium">服务器公告:</p>
                  <p class="text-white/70 whitespace-pre-wrap font-minecraft">
                    {{ serverStatus.motdRaw.text }}
                  </p>
                </div>
              </template>
            </div>

            <template v-if="!serverStatus.online && !serverStatus.loading">
              <p class="text-sm text-white/70">
                无法连接到服务器，请检查服务器地址或稍后重试
              </p>
            </template>
          </div>
          
          <!-- 右侧区域 -->
          <div class="flex items-center gap-4">                      
            <!-- IP地址 -->
            <div class="relative group flex-1 max-w-2xl">
              <div 
                class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg pr-2 transition-all hover:bg-white/20 cursor-pointer"
                @click="copyIP"
                :class="{ 'opacity-50 pointer-events-none': !serverStatus.online }"
              >
                <code class="flex-1 py-2 pl-4 text-white font-mono truncate">/connect {{ serverStatus.ip }}</code>
                <div class="flex items-center gap-2 text-white/80">
                  <span class="text-xs">
                    {{ serverStatus.online ? '点击复制' : '服务器离线' }}
                  </span>
                  <button class="p-2 hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <transition name="fade">
                <div v-if="showCopied" class="absolute top-full mt-2 right-0 bg-green-500 text-white px-3 py-1.5 rounded-md text-sm">
                  已复制到剪贴板
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容 -->
    <main class="container mx-auto px-4 py-8">
      <!-- 服务器状态卡片 -->
      <div class="card bg-gradient-to-br from-base-200 to-base-300 shadow-xl mb-12">
        <div class="card-body">
          <h2 class="card-title text-3xl mb-4">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              生电工程服务器
            </span>
          </h2>
          <div class="text-sm text-gray-400 mb-4">
            「红石矩阵」生电特化 | 长期存档 | 技术社区
          </div>
          <a
            href="https://qm.qq.com/q/4pcvaxdYpi"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline btn-sm w-fit hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 18l3.5 2 3.5-2H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.5zM12 13.5c1.375 0 2.5-1.125 2.5-2.5S13.375 8.5 12 8.5 9.5 9.625 9.5 11s1.125 2.5 2.5 2.5z"/>
            </svg>
            加入QQ交流群
          </a>
        </div>
      </div>

      <!-- 特色功能 -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
          生电核心功能
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="(feat, index) in features"
            :key="feat.title"
            class="relative p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
            :class="feat.color"
          >
            <div class="flex items-start gap-4">
              <div 
                class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                :class="feat.iconBg"
              >
                {{ feat.icon }}
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">{{ feat.title }}</h3>
                <p class="text-gray-300 text-sm leading-relaxed">
                  {{ feat.desc }}
                </p>
              </div>
            </div>
            <div 
              class="absolute inset-0 -z-10 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              :class="feat.color.replace('from', 'from-opacity-0').replace('to', 'to-opacity-0')"
            ></div>
          </div>
        </div>
      </section>

      <!-- 玩法对比 -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          技术规范
        </h2>
        <div class="grid lg:grid-cols-2 gap-4">
          <div 
            class="relative rounded-xl p-6 bg-gradient-to-br from-blue-500/10 to-transparent hover:shadow-lg transition-all duration-300"
          >
            <div class="absolute inset-0 rounded-xl bg-white/60 backdrop-blur-sm -z-10"></div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">🎯</div>
              <h3 class="text-xl font-semibold">红石规范</h3>
            </div>
            <ul class="space-y-2.5 text-gray-600 text-sm">
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                允许高频红石（需申报）
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                禁止恶意卡服装置
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                支持跨维度传输系统
              </li>
            </ul>
          </div>
          
          <div 
            class="relative rounded-xl p-6 bg-gradient-to-br from-orange-500/10 to-transparent hover:shadow-lg transition-all duration-300"
          >
            <div class="absolute inset-0 rounded-xl bg-white/60 backdrop-blur-sm -z-10"></div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">🏰</div>
              <h3 class="text-xl font-semibold">性能规范</h3>
            </div>
            <ul class="space-y-2.5 text-gray-600 text-sm">
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                单机上限 1000 实体
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                区块加载需申请权限
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                支持多线程运算
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 截图展示 -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-br from-secondary to-accent">
          工程案例
        </h2>
        <div 
          class="grid grid-cols-2 md:grid-cols-4 gap-3"
          :class="{ 'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible }"
          style="transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <div 
            v-for="n in 8"
            :key="n"
            class="aspect-square relative group overflow-hidden rounded-lg bg-base-200 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            :style="{ transitionDelay: `${n * 50}ms` }"
          >
            <img 
              :src="`/screenshots/${n}.jpg`"
              class="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
              alt="工程案例"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span class="text-white text-sm font-medium">案例 {{ n }} - {{ ['农场','分类','炮械','堆叠'][n%4] }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
/* 添加 Minecraft 字体支持 */
@font-face {
  font-family: 'Minecraft';
  src: url('/fonts/minecraft.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.font-minecraft {
  font-family: 'Minecraft', monospace;
  letter-spacing: 0.5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes ping {
  75%, 100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* 新增渐变动画 */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradient 6s ease infinite;
}
</style> 