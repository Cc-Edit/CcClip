<template>
  <div
      class="relative w-full flex flex-row pr-1 border border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-600"
      draggable="true"
      @dragstart="dragStart"
  >
    <img class="w-20 h-20 rounded" :src="data.cover">
    <div class="flex-1 flex flex-col">
      <p class="max-h-10 overflow-clip text-sm flex-1 pl-3 mt-2">{{ data.name }}</p>
      <span class="text-sm h-5 pl-3 mt-1"> {{ formatTime(data.time).str }} </span>
    </div>
    <div class="absolute w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-200">
      <div class="cursor-pointer rounded w-20 h-20 bg-gray-900 opacity-70 flex justify-center items-center">
        <ElIcon size="36" color="#fff">
          <VideoPlay />
        </ElIcon>
      </div>
      <div
          class="absolute bottom-2 right-2 bg-blue-500 rounded-full w-6 h-6"
          @click="addTrack"
      >
        <ElIcon :size="16" color="#fff" class="cursor-pointer p-1 box-content">
          <Plus />
        </ElIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Plus, VideoPlay } from '@element-plus/icons-vue';
  import type { AudioTractItem } from '@/stores/trackState';
  import { formatTime } from '@/utils/common';
  import { formatTrackItemData } from '@/utils/storeUtil';
  import { useTrackState } from '@/stores/trackState';
  import { usePlayerState } from '@/stores/playerState';
  const props = defineProps({
    data: {
      type: Object,
      default() {
        return {} as AudioTractItem;
      }
    },
    type: {
      type: String,
      default: ''
    }
  });
  const store = useTrackState();
  const playerStore = usePlayerState();
  function dragStart(event: DragEvent) {
    event.stopPropagation();
    const dragInfo = {
      type: props.type,
      ...props.data
    };
    playerStore.isPause = true;
    store.dragData.dataInfo = JSON.stringify(dragInfo);
    store.dragData.dragType = props.type;
    store.dragData.dragPoint.x = event.offsetX;
    store.dragData.dragPoint.y = event.offsetY;
    store.selectTrackItem.line = -1;
    store.selectTrackItem.index = -1;
  }
  function addTrack(event: MouseEvent) {
    playerStore.isPause = true;
    event.stopPropagation();
    const dragInfo = {
      type: props.type,
      ...props.data
    };
    store.addTrack(formatTrackItemData(dragInfo, playerStore.playStartFrame));
  }
</script>