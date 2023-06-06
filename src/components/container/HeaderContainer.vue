<template>
  <header class="h-12 w-full flex flex-nowrap flex-row items-center justify-center border-b dark:border-gray-600 border-gray-300">
    <div class="flex w-1/3 pl-2 items-center">
      <div class="w20">
        <img class="h-8" :src="logoImage" alt="">
      </div>
      <span class="text-xs select-none ml-4">自动保存：2023-02-10 00:51</span>
    </div>
    <h2 class="align-middle w-1/5 text-center flex-1 select-none text-sm">
      {{ store.pageTitle }}
    </h2>
    <div class="flex w-1/3 flex-row-reverse pr-10 items-center">
      <Export />
      <el-switch
        class="mr-10"
        size="large"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        :inline-prompt="inner"
        v-model="store.isDark"
        :style="switchClass"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
  import Export from '@/components/Export.vue';
  import logoImage from '@/assets/ccLogo.png';
  import { ref, computed } from 'vue';
  import { Download, Sunny, Moon } from '@element-plus/icons-vue';
  import { usePageState } from '@/stores/pageState';
  const store = usePageState();
  const inner = ref(true);
  const switchClass = computed(() => ({
    '--el-switch-border-color': store.isDark ? '#4B5563' : '#D1D5DB',
    '--el-color-white': store.isDark ? '#F3F4F6' : '#374151'
  }));
</script>
