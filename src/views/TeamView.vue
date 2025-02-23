<script setup>
import { useMemberStore } from '../stores/members'
import TeamMember from '../components/TeamMember.vue'

const memberStore = useMemberStore()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.member-enter-active {
  transition: all 0.5s ease;
  transition-delay: calc(0.1s * var(--i));
}

.member-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>

<template>
  <div class="py-12">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
        团队成员
      </h2>
      <p class="text-base-content/70 max-w-2xl mx-auto px-4">
        我们是一群热爱技术、追求卓越的开发者，致力于为玩家提供最好的游戏体验
      </p>
    </div>

    <TransitionGroup 
      tag="div" 
      class="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
    >
      <TeamMember 
        v-for="(member, index) in memberStore.members"
        :key="member.id"
        :member="member"
        :style="{ '--i': index }"
      />
    </TransitionGroup>

    <!-- 加入我们 -->
    <div class="mt-20 text-center">
      <div class="max-w-2xl mx-auto px-4">
        <h3 class="text-2xl font-bold mb-4">加入我们</h3>
        <p class="text-base-content/70 mb-6">
          如果你也热爱Minecraft开发，欢迎加入我们的团队
        </p>
        <a 
          href="mailto:join@example.com" 
          class="btn btn-primary btn-lg gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          申请加入
        </a>
      </div>
    </div>
  </div>
</template> 