<template>
  <div class="flex-1 overflow-hidden relative" ref="playerContent" @click="cancelSelect">
    <span class="pl-2 inline-block w-full h-10 mb-2 leading-10 border-b dark:border-gray-600 border-gray-300">播放器</span>
    <Player :containerSize="containerSize" />
  </div>
</template>

<script setup lang="ts">
  import Player from '@/components/item/player/Player.vue';
  import { usePlayerState } from '@/stores/playerState';
  import { usePageState } from '@/stores/pageState';
  import { watch, ref, onMounted, reactive } from 'vue';
  import { useTrackState } from '@/stores/trackState';
  const pageStore = usePageState();
  const store = usePlayerState();
  const trackStore = useTrackState();
  const playerContent = ref();
  const containerSize = reactive({
    width: 0,
    height: 0
  });
  function cancelSelect(event: MouseEvent) {
    event.stopPropagation();
    trackStore.selectTrackItem.line = -1;
    trackStore.selectTrackItem.index = -1;
  }
  // 更新画布尺寸
  function updateContainerSize() {
    let { width: maxW, height: maxH } = playerContent.value.getBoundingClientRect();
    containerSize.width = maxW;
    containerSize.height = maxH;
  }
  onMounted(() => {
    updateContainerSize();
  });
  window.addEventListener('resize', updateContainerSize, false);
  watch(() => pageStore.trackHeight, () => {
    updateContainerSize();
  }, {
    flush: 'post'
  });
  watch([() => store.playerHeight, () => store.playerWidth], () => {
    updateContainerSize();
  }, {
    flush: 'post'
  });
</script>
