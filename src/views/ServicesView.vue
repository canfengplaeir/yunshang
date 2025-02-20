<script setup>
const services = [
  {
    title: 'Minecraft服务器',
    description: '提供专业的MC服务器开发、运维和管理服务',
    icon: '🎮'
  },
  {
    title: '插件开发',
    description: '定制化的Minecraft插件开发，满足服务器特色需求',
    icon: '🛠️'
  },
  {
    title: '技术支持',
    description: '7x24小时技术支持，确保服务器稳定运行',
    icon: '💻'
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
    <h2 class="text-4xl font-bold text-center mb-12">我们的服务</h2>
    <Transition name="fade-right" appear>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        <div v-for="service in services" :key="service.title" 
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div class="card-body">
            <div class="text-4xl mb-4">{{ service.icon }}</div>
            <h3 class="card-title text-2xl">{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template> 