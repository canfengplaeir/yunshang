<script setup>
const services = [
  {
    title: 'Minecraft服务器',
    description: '提供专业的MC服务器开发、运维和管理服务',
    icon: '🎮',
    features: ['性能优化', '插件定制', '安全防护', '数据备份']
  },
  {
    title: '插件开发',
    description: '定制化的Minecraft插件开发，满足服务器特色需求',
    icon: '🛠️',
    features: ['功能定制', '性能优化', 'API集成', '技术支持']
  },
  {
    title: '技术支持',
    description: '7x24小时技术支持，确保服务器稳定运行',
    icon: '💻',
    features: ['实时监控', '故障排查', '性能优化', '安全加固']
  }
]
</script>

<style>
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.5s ease;
}

.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>

<template>
  <div class="py-12">
    <h2 class="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      我们的服务
    </h2>
    <p class="text-center text-base-content/60 mb-12 max-w-2xl mx-auto">
      提供专业的Minecraft服务器解决方案，从开发到运维的一站式服务
    </p>

    <Transition name="fade-right" appear>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <div 
          v-for="service in services" 
          :key="service.title" 
          class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm 
                 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
        >
          <div class="card-body">
            <div class="text-4xl mb-4 transform transition-transform group-hover:scale-110">
              {{ service.icon }}
            </div>
            <h3 class="card-title text-2xl">{{ service.title }}</h3>
            <p class="text-base-content/70">{{ service.description }}</p>
            <div class="mt-4 flex gap-2 flex-wrap">
              <span 
                v-for="(feature, index) in service.features" 
                :key="index"
                class="badge badge-outline"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 联系我们 -->
    <div class="mt-20 text-center">
      <h3 class="text-2xl font-bold mb-4">需要定制服务？</h3>
      <p class="text-base-content/70 mb-6">我们提供专业的定制开发服务，满足您的特殊需求</p>
      <a 
        href="mailto:contact@example.com" 
        class="btn btn-primary"
      >
        联系我们
      </a>
    </div>
  </div>
</template> 