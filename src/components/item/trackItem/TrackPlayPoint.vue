<template>
  <div
      class="z-30 w-px absolute -top-5 bottom-0 bg-gray-700 dark:bg-gray-100 transition-transform duration-75"
      :style="trackStyle"
  >
    <span class="playPoint block border-1 border-gray-600 bg-gray-600 h-3 w-2.5 dark:border-gray-100 dark:bg-gray-100 sticky top-0 right-0 left-0" />
  </div>
</template>

<script setup lang="ts">
  import { getGridPixel } from '@/utils/canvasUtil';
  import { computed } from 'vue';
  import { useTrackState } from '@/stores/trackState';
  import { usePlayerState } from '@/stores/playerState';
  const offsetLine = {
    left: 10
  };
  const trackStore = useTrackState();
  const playStore = usePlayerState();
  const trackStyle = computed(() => {
    return {
      left: `${offsetLine.left}px`,
      transform: `translate(${getGridPixel(trackStore.trackScale, playStore.playStartFrame)}px, 0px)`
    };
  });
</script>

<style scoped>
  .playPoint{
    transform: translateX(-50%);
  }
  .playPoint::after{
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 5px solid;
    position: absolute;
    top: 100%;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
  }
</style>