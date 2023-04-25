<template>
  <div
      class="absolute left-0 right-0 top-0 bottom-0 border z-20"
      :class="{ 'dark:border-gray-100 border-gray-600': isActive }"
      v-show="isActive"
  >
    <div
        class="cursor-c-resize flex flex-col justify-center absolute bottom-0 -top-px -bottom-px -left-2 text-center rounded-tl rounded-bl w-2 dark:bg-gray-100 bg-gray-600 dark:text-gray-800 text-gray-100"
        ref="handlerLeft"
        @mousedown="mouseDownHandler($event, 'left')"
    >
      <span>|</span>
    </div>
    <div
        class="cursor-c-resize flex flex-col justify-center absolute bottom-0 -top-px -bottom-px -right-2 text-center rounded-tr rounded-br w-2 dark:bg-gray-100 bg-gray-600 dark:text-gray-800 text-gray-100"
        ref="handlerRight"
        @mousedown="mouseDownHandler($event, 'right')"
    >
      <span>|</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTrackState } from '@/stores/trackState';
  import { usePlayerState } from '@/stores/playerState';
  import type { TrackItem } from '@/stores/trackState';
  import { computed, toRefs } from 'vue';
  import { getGridPixel } from '@/utils/canvasUtil';

  const props = defineProps({
    isActive: {
      type: Boolean,
      default: false
    },
    lineIndex: {
      type: Number,
      default: 0
    },
    itemIndex: {
      type: Number,
      default: 0
    }
  });
  const store = useTrackState();
  const playerStore = usePlayerState();
  const targetTrack = computed(() => {
    return store.trackList[props.lineIndex].list[props.itemIndex];
  });

  // 定位数据缓存
  let positionLeft = 0;
  // 手柄可操作的属性配置
  let handlerData = {
    isVA: false,
    start: 0,
    end: 0,
    offsetR: 0,
    offsetL: 0,
    minStart: 0,
    maxStart: 0,
    minEnd: 0,
    maxEnd: 0
  };
  let enableMove = false;
  const frameWidth = computed(() => getGridPixel(store.trackScale, 1));
  function initLimits(lineData: TrackItem[], trackItem: TrackItem) {
    const beforeTrack = props.itemIndex > 0 ? lineData[props.itemIndex - 1] : null;
    const afterTrack = props.itemIndex < lineData.length ? lineData[props.itemIndex + 1] : null;
    const isVA = ['video', 'audio'].includes(trackItem.type);
    const limitData = {
      isVA,
      start: trackItem.start,
      end: trackItem.end,
      offsetR: trackItem.offsetR,
      offsetL: trackItem.offsetL,
      minStart: beforeTrack ? beforeTrack.end : 0, // 可以调节的最小start
      maxStart: trackItem.end - 1, // 最少要保留一帧数据
      minEnd: trackItem.start + 1,
      maxEnd: afterTrack ? afterTrack.start : (30 * 60 * 60) // 最长一小时
    };
    if (isVA) { // 音视频结尾受资源大小限制
      const rightMaxWidth = (trackItem.frameCount - limitData.offsetL); // 右侧最大宽度
      const leftMaxWidth = (trackItem.frameCount - limitData.offsetR);// 左侧最大宽度
      limitData.maxEnd = afterTrack ? (Math.min(afterTrack.start, limitData.start + rightMaxWidth)) : Math.min(rightMaxWidth + limitData.start, (30 * 60 * 60));
      limitData.minStart = beforeTrack ? (Math.max(beforeTrack.end, limitData.end - leftMaxWidth)) : Math.max(limitData.end - leftMaxWidth, 0);
    }
    Object.assign(handlerData, {
      ...limitData
    });
  }
  function setTrackFrameData(frameCount: number, handleType: string) {
    const { isVA, start: originStart, end: originEnd, offsetR, offsetL, minStart, maxStart, minEnd, maxEnd } = handlerData;
    const originWidth = originEnd - originStart;
    const leftMaxWidth = offsetL + originWidth;
    const rightMaxWidth = offsetR + originWidth;
    if (handleType === 'left') { // 操作左侧手柄
      let newStart = originStart + frameCount;
      if (newStart > maxStart) newStart = maxStart;
      if (newStart < minStart) newStart = minStart;
      let diffStart = newStart - originStart;
      if (isVA) { // 音视频的手柄操作限制在资源长度内，向内则视为资源裁切，裁切部分为 offset
        if (originEnd - newStart > leftMaxWidth) { // 音视频存在长度限制，手柄向内则截取， 向外展开截取，但是不能超过总长度
          newStart = originEnd - leftMaxWidth;
          diffStart = newStart - originStart;
        }
        store.trackList[props.lineIndex].list[props.itemIndex].offsetL = Math.max(offsetL + diffStart, 0);
      } else { // 其他资源操作无限制
        store.trackList[props.lineIndex].list[props.itemIndex].frameCount = originEnd - newStart;
      }
      store.trackList[props.lineIndex].list[props.itemIndex].start = newStart;
    } else { // 右侧手柄
      let newEnd = originEnd + frameCount;
      if (newEnd > maxEnd) newEnd = maxEnd;
      if (newEnd < minEnd) newEnd = minEnd;
      if (isVA) { // 音视频的手柄操作限制在资源长度内，向内则视为资源裁切，裁切部分为 offset
        if (newEnd - originStart > rightMaxWidth) { // 音视频存在长度限制，手柄向内则截取， 向外展开截取，但是不能超过总长度
          newEnd = originStart + rightMaxWidth;
        }
        const diffEnd = newEnd - originEnd;
        store.trackList[props.lineIndex].list[props.itemIndex].offsetR = Math.max(offsetR - diffEnd, 0);
      } else { // 其他资源操作无限制
        store.trackList[props.lineIndex].list[props.itemIndex].frameCount = newEnd - originStart;
      }
      store.trackList[props.lineIndex].list[props.itemIndex].end = newEnd;
    }
  }

  function mouseDownHandler(event: MouseEvent, type: string) {
    event.preventDefault();
    event.stopPropagation();
    playerStore.isPause = true;
    const { pageX: startX } = event;
    positionLeft = startX;
    enableMove = true;
    initLimits(store.trackList[props.lineIndex]?.list || [], targetTrack.value);

    document.onmousemove = documentEvent => {
      if (!enableMove) return;
      const { pageX } = documentEvent;
      const moveWidth = positionLeft - pageX;
      const frameCount = -Math.round(moveWidth / frameWidth.value);
      setTrackFrameData(frameCount, type);
    };

    document.onmouseup = () => {
      enableMove = false;
      document.onmouseup = null;
      document.onmousemove = null;
    };
  }
</script>

<style scoped>

</style>