<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.querySelector('html').setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
  isDark.value = savedTheme === 'dark'
  document.querySelector('html').setAttribute('data-theme', savedTheme)
})

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches
      const theme = e.matches ? 'dark' : 'light'
      document.querySelector('html').setAttribute('data-theme', theme)
    }
  })
})
</script>

<template>
  <button 
    @click="toggleTheme"
    class="btn btn-ghost btn-circle"
    :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
  >
    <img 
      :src="isDark ? 'https://objectstorageapi.bja.sealos.run/g6rnmc1y-yunshang/glowstone.png' : 'https://objectstorageapi.bja.sealos.run/g6rnmc1y-yunshang/redstone_torch.png'"
      class="w-6 h-6"
      :class="{ 'animate-pulse': !isDark }"
    />
  </button>
</template> 