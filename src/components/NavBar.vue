<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const links = [
  { name: '首页', path: '/' },
  { name: '我们的服务', path: '/services' },
  { name: '开源项目', path: '/projects' },
  { name: '团队成员', path: '/team' },
  { name: 'MC服务器', path: '/server' }
]

const route = useRoute()
const isMenuOpen = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

// 响应式检测屏幕尺寸
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 768
  if (isDesktop.value) isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const toggleMenu = () => {
  if (!isDesktop.value) {
    isMenuOpen.value = !isMenuOpen.value
  }
}

const closeMenu = () => {
  if (!isDesktop.value) {
    isMenuOpen.value = false
  }
}
</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.nav-link::after {
  @apply absolute bottom-0 left-1/2 h-[2px] bg-primary transform -translate-x-1/2;
  content: '';
  width: 0;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: calc(100% - 1rem);
}

.active-link::after {
  width: calc(100% - 1rem);
}

.hamburger span {
  @apply block w-6 h-[2px] bg-current transition-all duration-300;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-menu {
  max-height: 0;
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}

.mobile-menu.open {
  max-height: 100vh;
}

/* 桌面端导航样式 */
.desktop-nav {
  @apply hidden md:flex space-x-4;
}

.desktop-link {
  @apply relative px-4 py-2 text-lg font-medium transition-colors hover:text-primary;
}

/* 移动端导航样式 */
.mobile-nav {
  @apply md:hidden;
}

.mobile-menu {
  @apply absolute top-full left-0 right-0 bg-base-100 shadow-lg;
  max-height: 0;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.mobile-menu.open {
  max-height: 100vh;
}

.mobile-link {
  @apply block px-6 py-3 text-lg font-medium transition-colors hover:bg-base-200;
}
</style>

<template>
  <Transition name="fade-slide" appear>
    <nav class="navbar bg-base-100/80 backdrop-blur-sm shadow-lg px-4 sticky top-0 z-50">
      <div class="flex-1">
        <router-link 
          to="/" 
          class="btn btn-ghost text-xl hover:scale-105 transition-transform group"
          @click="closeMenu"
        >
          <img 
            src="/logo.jpg" 
            class="w-8 h-8 mr-2 transform transition-transform group-hover:rotate-12" 
          />
          <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            云上工作室
          </span>
        </router-link>
      </div>
      
      <!-- 桌面端导航 -->
      <div class="desktop-nav">
        <ThemeToggle class="mr-4" />
        <ul class="flex space-x-4">
          <li v-for="link in links" :key="link.path">
            <router-link 
              :to="link.path"
              class="desktop-link relative"
              :class="{ 
                'text-primary font-bold': route.path === link.path,
                'hover:text-primary/80': route.path !== link.path
              }"
            >
              {{ link.name }}
              <div 
                v-if="route.path === link.path"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all"
              ></div>
            </router-link>
          </li>
        </ul>
      </div>
      
      <!-- 移动端导航 -->
      <div class="mobile-nav">
        <ThemeToggle class="mr-2" />
        <button 
          class="hamburger p-2"
          :class="{ 'active': isMenuOpen }"
          @click="toggleMenu"
          aria-label="导航菜单"
        >
          <span class="block w-6 h-0.5 bg-current transition-transform"></span>
          <span class="block w-6 h-0.5 bg-current my-1.5 transition-opacity"></span>
          <span class="block w-6 h-0.5 bg-current transition-transform"></span>
        </button>
        
        <div class="mobile-menu" :class="{ 'open': isMenuOpen }">
          <ul class="py-2">
            <li v-for="link in links" :key="link.path">
              <router-link 
                :to="link.path"
                class="mobile-link"
                :class="{ 'bg-primary/10 text-primary': route.path === link.path }"
                @click="closeMenu"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </Transition>
</template> 