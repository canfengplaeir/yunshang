<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card bg-base-100 shadow-xl transform transition hover:scale-105">
    <figure class="px-4 pt-4">
      <img 
        :src="member.avatar" 
        class="rounded-full w-32 h-32 object-cover border-4 border-primary"
      />
    </figure>
    <div class="card-body items-center text-center">
      <h3 class="card-title text-2xl mb-2">{{ member.name }}</h3>
      <div class="badge badge-primary">{{ member.role }}</div>
      <div class="flex flex-wrap gap-2 mt-4">
        <span 
          v-for="(skill, index) in member.skills"
          :key="index"
          class="badge badge-outline"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </div>
</template> 