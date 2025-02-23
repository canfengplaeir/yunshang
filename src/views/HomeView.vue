<script setup>
const features = [
  {
    title: '红石工程',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>',
    desc: '全自动农场 | 工业级生产线 | TNT炮械系统 | 珍珠炮',
    color: 'from-blue-500/20 to-blue-600/10',
    iconBg: 'bg-blue-500/20'
  },
  {
    title: '生电科技',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" /></svg>',
    desc: '实体压缩 | 堆叠限高 | 高效分类 | 区块加载器',
    color: 'from-green-500/20 to-green-600/10',
    iconBg: 'bg-green-500/20'
  },
  {
    title: '开放世界',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" /></svg>',
    desc: '无边界探索 | 多样地形 | 稀有建筑 | 丰富资源',
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconBg: 'bg-yellow-500/20'
  }
]

const news = [
  {
    title: '服务器更新公告',
    date: '2024-03-20',
    desc: '新增多个红石机械设计，优化服务器性能...',
    link: '#'
  },
  {
    title: '社区活动预告',
    date: '2024-03-18',
    desc: '本周末将举办建筑比赛，优胜者可获得丰厚奖励...',
    link: '#'
  },
  {
    title: '插件开发进展',
    date: '2024-03-15',
    desc: '全新插件即将发布，带来更多游戏玩法...',
    link: '#'
  }
]
</script>

<style>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

/* 优化浮动动画 */
@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -20px) rotate(2deg);
  }
}

.animate-float {
  animation: float 10s ease-in-out infinite;
}
</style>

<template>
  <div class="min-h-[80vh] relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 -z-10">
      <div class="absolute w-96 h-96 bg-primary/20 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
      <div class="absolute w-96 h-96 bg-secondary/20 rounded-full blur-3xl -bottom-48 -right-48 animate-float" style="animation-delay: -3s"></div>
    </div>

    <!-- 英雄区域 -->
    <Transition name="fade-up" appear>
      <div class="container mx-auto px-4 py-20 text-center flex items-center justify-center min-h-[70vh]">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            云上工作室
          </h1>
          <p class="text-xl mb-12 text-base-content/80">
            专注于Minecraft服务器开发与开源项目维护，致力于为玩家提供优质的游戏体验
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <router-link 
              to="/services" 
              class="btn btn-primary btn-lg hover:scale-105 transition-transform gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z" />
              </svg>
              了解我们的服务
            </router-link>
            <router-link 
              to="/projects" 
              class="btn btn-outline btn-lg hover:scale-105 transition-transform gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              查看开源项目
            </router-link>
          </div>
          
          <!-- 特色数据 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            <div class="text-center">
              <div class="text-4xl font-bold text-primary mb-2">3+</div>
              <div class="text-base-content/60">团队成员</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-secondary mb-2">24/7</div>
              <div class="text-base-content/60">技术支持</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-accent mb-2">99.9%</div>
              <div class="text-base-content/60">服务器在线率</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-primary mb-2">10+</div>
              <div class="text-base-content/60">开源项目</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 各个区块的背景装饰 -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div class="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl top-0 right-0 animate-float"></div>
      </div>
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          特色功能
        </h2>
        <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          我们提供丰富的游戏内容和独特的游戏玩法，让您的游戏体验更加精彩
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="group p-6 rounded-2xl bg-gradient-to-br"
            :class="feature.color"
          >
            <div class="flex items-start">
              <div :class="['p-3 rounded-xl transition-colors group-hover:scale-110', feature.iconBg]">
                <div class="w-10 h-10" v-html="feature.icon"></div>
              </div>
            </div>
            <h3 class="text-xl font-bold mt-4 mb-2">{{ feature.title }}</h3>
            <p class="text-base-content/70">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 新闻动态 -->
    <section class="py-20 bg-base-200/50 backdrop-blur-sm relative overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div class="absolute w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl bottom-0 left-0 animate-float" style="animation-delay: -2s"></div>
      </div>
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          新闻动态
        </h2>
        <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          了解最新的服务器动态和社区活动
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="item in news" 
            :key="item.title"
            class="card bg-gradient-to-br from-base-100/50 to-transparent backdrop-blur-sm 
                   shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div class="card-body">
              <div class="text-sm text-base-content/60 mb-2">{{ item.date }}</div>
              <h3 class="card-title text-xl mb-2">{{ item.title }}</h3>
              <p class="text-base-content/70 mb-4">{{ item.desc }}</p>
              <div class="card-actions justify-end">
                <a :href="item.link" class="btn btn-ghost btn-sm">
                  阅读更多
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 加入我们 -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div class="absolute w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl top-1/2 -translate-y-1/2 right-0 animate-float" style="animation-delay: -4s"></div>
      </div>
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          加入我们的社区
        </h2>
        <p class="text-base-content/70 mb-8 max-w-2xl mx-auto">
          加入我们充满活力的Minecraft社区，与志同道合的玩家一起创造、探索和分享
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            class="btn btn-primary gap-2"
            @click="copyIP"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
            {{ showCopied ? '已复制' : '复制服务器地址' }}
          </button>
          <a 
            href="https://gitee.com/DevCL" 
            target="_blank"
            class="btn btn-outline gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
            访问GitHub
          </a>
        </div>
      </div>
    </section>
  </div>
</template> 