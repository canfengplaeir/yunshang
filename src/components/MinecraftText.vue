<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const colorMap = {
  '0': 'text-black',
  '1': 'text-blue-900',
  '2': 'text-green-600',
  '3': 'text-cyan-600',
  '4': 'text-red-600',
  '5': 'text-purple-600',
  '6': 'text-yellow-600',
  '7': 'text-gray-300',
  '8': 'text-gray-600',
  '9': 'text-blue-400',
  'a': 'text-lime-400',
  'b': 'text-cyan-400',
  'c': 'text-red-400',
  'd': 'text-pink-400',
  'e': 'text-yellow-300',
  'f': 'text-white'
}

const formatMap = {
  'l': 'font-bold',
  'n': 'underline',
  'o': 'italic',
  'm': 'line-through',
  'k': 'animate-pulse'
}

const parsedText = computed(() => {
  const parts = props.text.split('§')
  return parts.map((part, index) => {
    if (index === 0) {
      return { text: part, color: 'text-white', format: '' }
    }
    const code = part.charAt(0).toLowerCase()
    const text = part.slice(1)
    
    if (code === 'r') {
      return { text, color: 'text-white', format: '' }
    }
    
    return {
      text,
      color: colorMap[code] || 'text-white',
      format: formatMap[code] || ''
    }
  })
})
</script>

<template>
  <span class="font-minecraft">
    <template v-for="(part, index) in parsedText" :key="index">
      <span :class="[part.color, part.format]">{{ part.text }}</span>
    </template>
  </span>
</template> 