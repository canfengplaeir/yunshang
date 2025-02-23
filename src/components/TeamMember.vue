<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card bg-gradient-to-br from-base-200/50 to-transparent backdrop-blur-sm 
             shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]
             group">
    <figure class="px-4 pt-4">
      <img 
        :src="member.avatar" 
        class="rounded-full w-32 h-32 object-cover border-4 border-primary/50 
               group-hover:border-primary transition-colors duration-300
               transform group-hover:scale-105 transition-transform"
      />
    </figure>
    <div class="card-body items-center text-center">
      <h3 class="card-title text-2xl mb-2 bg-gradient-to-r from-primary to-secondary 
                 bg-clip-text text-transparent">
        {{ member.name }}
      </h3>
      <div class="badge badge-primary badge-outline">{{ member.role }}</div>
      <div class="flex flex-wrap gap-2 mt-4">
        <span 
          v-for="(skill, index) in member.skills"
          :key="index"
          class="badge badge-outline badge-secondary hover:bg-secondary/10 
                 transition-colors cursor-default"
        >
          {{ skill }}
        </span>
      </div>
      <div class="mt-4 flex gap-3">
        <a 
          v-if="member.github"
          :href="member.github"
          target="_blank"
          class="btn btn-circle btn-ghost btn-sm"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a 
          v-if="member.qq"
          :href="`tencent://message/?uin=${member.qq}`"
          class="btn btn-circle btn-ghost btn-sm"
        >
          <img src="/qq-logo.svg" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </div>
</template> 