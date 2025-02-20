<script setup>
const projects = [
  {
    name: 'WAN IP',
    description: '一个简单的WAN IP查询工具',
    github: 'https://gitee.com/canfeng_plaeir/wan_ip',
    tech: ['RUST', 'VUE', 'NODE.JS','Python'],
    stars: 0,
    forks: 0
  },
  // 更多项目...
]

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const handleHover = (e) => {
  const icon = e.currentTarget.querySelector('svg')
  icon.classList.add('animate-spin')
}

const handleLeave = (e) => {
  const icon = e.currentTarget.querySelector('svg')
  icon.classList.remove('animate-spin')
}
</script>

<style>
.scale-up-enter-active,
.scale-up-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.scale-up-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.scale-up-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

.scale-up-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transition-delay: calc(0.1s * var(--i));
}

.project-card {
  @apply relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-secondary/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100;
  animation: fadeInUp 0.8s ease-out both;
  transform-origin: center bottom;
}

.project-card::after {
  @apply absolute inset-0 rounded-xl pointer-events-none;
  content: '';
  z-index: -1;
  background: linear-gradient(
    45deg,
    theme('colors.primary') 0%,
    theme('colors.secondary') 50%,
    theme('colors.accent') 100%
  );
  background-size: 400% 400%;
  animation: gradientBorder 8s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card::before {
  @apply pointer-events-none;
}

.project-card:hover::after {
  opacity: 0.1;
}

.github-icon {
  @apply w-5 h-5 mr-2 transition-transform;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

<template>
  <div class="py-12">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
        <span class="inline-block animate-float">开</span>
        <span class="inline-block animate-float" style="animation-delay: 0.2s">源</span>
        <span class="inline-block animate-float" style="animation-delay: 0.4s">项</span>
        <span class="inline-block animate-float" style="animation-delay: 0.6s">目</span>
      </h2>
      <p class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
        我们致力于构建高质量的开源解决方案，推动技术社区发展
      </p>
    </div>

    <div class="px-4">
      <TransitionGroup 
        name="scale-up" 
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
      >
        <div 
          v-for="(project, index) in projects" 
          :key="project.name"
          class="card bg-base-100 shadow-xl project-card group h-full flex flex-col"
          :class="['animate-fade-in-up']"
          :style="{ 
            '--i': index,
            '--delay': index * 0.1 + 's',
            'animation-delay': 'calc(var(--delay) + 0.2s)'
          }"
        >
          <div class="card-body">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h3 class="text-2xl font-bold text-primary">{{ project.name }}</h3>
              <div class="flex items-center space-x-2">
                <span class="badge badge-success">MIT License</span>
              </div>
            </div>
            
            <p class="text-gray-600 mb-6 text-sm md:text-base">{{ project.description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-4 md:mb-6">
              <span v-for="tech in project.tech" :key="tech"
                class="badge badge-outline badge-primary hover:bg-primary/10 transition-colors text-xs md:text-sm">
                {{ tech }}
              </span>
            </div>
            
            <div class="flex items-center justify-between mt-auto">
              <div class="flex items-center text-sm text-gray-500">
                <span class="flex items-center mr-2 md:mr-4">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  {{ project.stars }}
                </span>
                <span class="flex items-center ml-2 md:ml-0">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"/>
                  </svg>
                  {{ project.forks }}
                </span>
              </div>
              <button 
                class="btn btn-primary btn-sm md:btn-md hover:-translate-y-0.5 transition-transform text-xs md:text-sm flex items-center gap-2"
                @mouseover="handleHover"
                @mouseout="handleLeave"
                @click="openLink(project.github)"
                style="position: relative; z-index: 10"
              >
                <svg 
                  class="w-5 h-5 transition-transform duration-300" 
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                查看源码
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template> 