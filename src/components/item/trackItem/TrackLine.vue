<template>
  <div
    class="mb-1 mt-1 relative ml-2"
    :class="[TrackHeightMap.get(lineType), isActive ? 'dark:bg-gray-700 bg-gray-100 bg-opacity-20' : '', isMain ? 'bg-blue-500 bg-opacity-20' : '']"
  >
    <template v-for="(item, index) of lineData" :key="item.id">
      <TrackItem
          :lineIndex="lineIndex"
          :itemIndex="index"
          :trackItem="item"
          draggable="true"
          @dragstart="dragLineHandler($event, 'start', lineIndex, index, item.type)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { TrackHeightMap } from '@/data/trackConfig';
  import { useTrackState } from '@/stores/trackState';
  import { computed } from 'vue';
  import TrackItem from '@/components/item/trackItem/TrackItem.vue';
  import { usePlayerState } from '@/stores/playerState';
  const props = defineProps({
    isMain: {
      type: Boolean,
      default: false
    },
    lineType: {
      type: String,
      default: ''
    },
    lineIndex: {
      type: Number,
      default: 0
    },
    lineData: {
      type: Array,
      default() {
        return [];
      }
    }
  });
  const playerStore = usePlayerState();
  const store = useTrackState();
  const isActive = computed(() => {
    return store.selectTrackItem.line === props.lineIndex;
  });
  function dragLineHandler(event: DragEvent, type: string, lineIndex: number, index: number, dragType: string) {
    if (type === 'start') {
      playerStore.isPause = true;
      store.dragData.dataInfo = JSON.stringify(store.trackList[lineIndex].list[index]);
      store.dragData.dragType = dragType;
      store.dragData.dragPoint.x = event.offsetX;
      store.dragData.dragPoint.y = event.offsetY;
      store.moveTrackData.lineIndex = lineIndex;
      store.moveTrackData.itemIndex = index;
      store.selectTrackItem.line = -1;
      store.selectTrackItem.index = 0;
    }
  }
</script>

<style scoped>
  .showLine-t::after{
    content: '';
    display: block;
    position: absolute;
    top: 1px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #FCD34D;
    z-index: 30;
  }
  .showLine-b::before{
    content: '';
    display: block;
    position: absolute;
    bottom: 1px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #FCD34D;
    z-index: 30;
  }
</style>