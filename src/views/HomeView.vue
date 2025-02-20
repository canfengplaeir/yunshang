<script setup>
</script>

<style>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>

<template>
  <div class="hero min-h-[80vh]">
    <Transition name="fade-up" appear>
      <div class="hero-content text-center">
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold mb-8">云上工作室</h1>
          <p class="text-xl mb-8">
            专注于Minecraft服务器开发与开源项目维护，致力于为玩家提供优质的游戏体验
          </p>
          <div class="flex gap-4 justify-center">
            <router-link to="/services" class="btn btn-primary">了解我们的服务</router-link>
            <router-link to="/projects" class="btn btn-outline">查看开源项目</router-link>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template> 