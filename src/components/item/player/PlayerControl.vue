<template>
  <div class="flex items-center justify-center absolute bottom-0 left-0 right-0 pl-4 pr-4 h-8 border-t dark:border-gray-600 border-gray-300">
    <div class="absolute left-4 h-full text-xs leading-8">
      <span class="text-blue-400 mr-1 w-20 inline-block">{{ playTime }}</span>/<span class="ml-2 w-20">{{ allTime }}</span>
    </div>
    <div class="m-auto flex items-center">
      <ElIcon :size="24" class="cursor-pointer box-content" :class="[disable ? 'cursor-not-allowed' : 'cursor-pointer']">
        <VideoPause v-show="!store.isPause" @click="pauseVideo" />
        <VideoPlay v-show="store.isPause" @click="startPlay" />
      </ElIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { VideoPlay, VideoPause } from '@element-plus/icons-vue';
  import { ref, computed, watch } from 'vue';
  import { formatPlayerTime } from '@/utils/common';
  import { usePlayerState } from '@/stores/playerState';
  const props = defineProps({
    disable: {
      type: Boolean,
      default: false
    }
  });
  const store = usePlayerState();
  const playTime = computed(() => {
    return formatPlayerTime(store.playStartFrame);
  });
  const allTime = computed(() => {
    return formatPlayerTime(store.frameCount);
  });
  let playTimer = ref();
  const timeStamp = 1000 / 30;
  // 视频暂停
  const pauseVideo = () => {
    if (props.disable) return;
    store.isPause = true;
    clearInterval(playTimer.value);
  };
  function startPlay() {
    if (props.disable) return;
    if (store.playStartFrame >= store.frameCount) {
      store.playStartFrame = 0;
    }
    store.isPause = false;
    clearInterval(playTimer.value);
    playTimer.value = setInterval(() => {
      store.playStartFrame++;
      if (store.playStartFrame === store.frameCount) {
        pauseVideo();
      }
    }, timeStamp);
  }
  watch(() => store.isPause, () => {
    if (store.isPause) {
      pauseVideo();
    } else {
      startPlay();
    }
  });
</script>

<style scoped>

</style>