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
  <Transition name="fade" appear>
    <div class="py-12">
      <h2 class="text-4xl font-bold text-center mb-12">团队成员</h2>
      <TransitionGroup 
        tag="div" 
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
      >
        <TeamMember 
          v-for="(member, index) in memberStore.members"
          :key="member.id"
          :member="member"
          :style="{ '--i': index }"
        />
      </TransitionGroup>
    </div>
  </Transition>
</template> 