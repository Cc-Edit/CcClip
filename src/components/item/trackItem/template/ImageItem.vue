<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div class="flex items-center text-xs pl-2 overflow-hidden h-6 leading-6 bg-yellow-700 bg-opacity-70 text-gray-300">
      <img :src="trackItem.cover" class="w-4 h-4 inline-block mr-2 shrink-0" alt="">
      <span class="mr-4 shrink-0">{{ trackItem.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import trackCheckPlaying from './trackCheckPlaying';
  import { ImageTractItem } from '@/stores/trackState';
  import { PropType, watch, inject } from 'vue';
  import { usePlayerState } from '@/stores/playerState';
  import FFManager from '@/utils/ffmpegManager';
  const props = defineProps({
    trackItem: {
      type: Object as PropType<ImageTractItem>,
      default() {
        return {
          width: '0px',
          left: '0px'
        };
      }
    }
  });
  const store = usePlayerState();
  const ffmpeg = inject('ffmpeg') as FFManager;
  store.ingLoadingCount++;
  async function initImage() {
    const { name, source, format, width, height } = props.trackItem;
    if (name && source && ffmpeg.isLoaded.value) {
      const imageName = `${name}.${format}`;
      // 写文件
      await ffmpeg.writeFile(ffmpeg.pathConfig.resourcePath, imageName, source);
      // gif抽帧
      await ffmpeg.genFrame(name, format, {
        w: width,
        h: height
      });
      store.ingLoadingCount--;
    }
  }
  watch(() => {
    return props.trackItem.source && ffmpeg.isLoaded.value;
  }, initImage, {
    immediate: true,
    flush: 'post'
  });
  trackCheckPlaying(props);
</script>