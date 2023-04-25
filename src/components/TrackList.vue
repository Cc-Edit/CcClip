<template>
  <div class="trackList flex flex-1 flex-row w-full overflow-x-hidden overflow-y-auto relative">
    <TrackListIcon :listData="showTrackList" :offsetTop="startY" />
    <div
        class="flex-1 overflow-x-scroll overflow-y-auto flex-col shrink-0 grow relative"
        ref="trackList"
        @scroll="handleScroll"
        @wheel="handleWheel"
        @click="setSelectTract($event, -1, -1)"
    >
      <TimeLine
        :start="startX"
        :scale="trackScale"
        :step="defaultFps"
        :focusPosition="store.selectResource"
        @selectFrame="handlerSelectFrame"
      />
      <div
        class="absolute top-5 flex shrink-0 grow min-w-full"
        :style="{ 'min-height': 'calc(100% - 20px)' }"
        ref="trackListContainer"
        @dragover="trackListOverHandler($event, 'over')"
        @drop="addTrack"
      >
        <template v-if="showTrackList.length === 0">
          <div class="flex justify-center items-center h-24 m-auto w-2/3 dark:bg-gray-500 bg-gray-200  rounded-md text-sm border-dashed border-2 dark:border-gray-500 border-gray-200 hover:dark:border-blue-300 hover:border-blue-400">
            <VideoIcon class="text-xl mr-4" />
            将素材拖拽到这里，开始编辑你的大作吧~
          </div>
        </template>
        <div
            v-else
            class="z-10 pt-5 pb-5 min-w-full flex shrink-0 grow flex-col justify-center min-h-full"
            :style="{ width: `${trackStyle.width}px` }"
        >
          <template v-for="(lineData, lineIndex) of showTrackList" :key="lineIndex">
            <TrackLine
              :style="{
                'margin-left': `${offsetLine.left}px`
              }"
              :class="[dropLineIndex === lineIndex ? (insertBefore ? 'showLine-t' : 'showLine-b') : '']"
              :lineType="lineData.type"
              :isActive="store.selectTrackItem.line === lineIndex"
              :lineIndex="lineIndex"
              :isMain="lineData.main"
              :lineData="lineData.list"
              @dragover="dragLineHandler($event, 'over', lineIndex, lineData.type)"
            />
          </template>
        </div>
        <TrackPlayPoint v-show="showTrackList.length !== 0" />
        <div
            v-show="showTrackList.length !== 0 && dropItemLeft !== 0"
            class="z-30 w-px absolute -top-5 bottom-0 bg-yellow-300 dark:bg-yellow-300"
            :style="{ left: `${dropItemLeft}px` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import VideoIcon from '@/components/icons/VideoIcon.vue';
  import TimeLine from '@/components/item/trackItem/TimeLine.vue';
  import TrackLine from '@/components/item/trackItem/TrackLine.vue';
  import TrackListIcon from '@/components/item/trackItem/TrackListIcon.vue';
  import TrackPlayPoint from '@/components/item/trackItem/TrackPlayPoint.vue';
  import { getGridPixel, getSelectFrame } from '@/utils/canvasUtil';
  import { formatTrackItemData } from '@/utils/storeUtil';
  import { ref, computed } from 'vue';
  import { useTrackState } from '@/stores/trackState';
  import { usePlayerState } from '@/stores/playerState';
  import type { VideoTractItem } from '@/stores/trackState';
  import { debounce } from 'lodash-es';
  import { formatTime, isVideo } from '@/utils/common';
  const store = useTrackState();
  const playerStore = usePlayerState();
  const trackList = ref();
  const trackListContainer = ref();
  const offsetLine = {
    left: 10, // 容器 margin, 为了显示拖拽手柄
    right: 200
  };
  const startX = ref(0 - offsetLine.left); // 与容器padding对齐
  const startY = ref(0); // 左侧icons对齐
  const trackScale = computed(() => store.trackScale);
  const trackStyle = computed(() => {
    return {
      width: getGridPixel(trackScale.value, playerStore.frameCount) + offsetLine.right
    };
  });
  const defaultFps = ref(30); // 帧率
  const dropLineIndex = ref(-1); // 目标行
  const dropItemLeft = ref(0); // 目标left值
  const insertBefore = ref(true); // 之前插入还是之后插入
  const isVaDragElement = computed(() => {
    return ['video', 'audio'].includes(store.dragData.dragType);
  }); // 是否是音视频节点
  const dragPoint = computed(() => store.dragData.dragPoint);
  let mainIndex = ref(0); // main 行下标

  const showTrackList = computed(() => {
    return store.trackList.map((line, lineIndex) => {
      line.main && (mainIndex.value = lineIndex);
      const newList = line.list.map(item => {
        const { time } = item as VideoTractItem;
        return {
          ...item,
          showWidth: `${getGridPixel(trackScale.value, item.end - item.start)}px`,
          showLeft: `${getGridPixel(trackScale.value, item.start)}px`,
          time: isVideo(line.type) ? `${formatTime(time || 0).str}` : ''
        };
      });
      return {
        ...line,
        list: newList
      };
    });
  });
  function setSelectTract(event:Event, line: number, index: number) {
    event.preventDefault();
    event.stopPropagation();
    store.selectTrackItem.line = line;
    store.selectTrackItem.index = index;
  }
  function handlerSelectFrame(frame: number) {
    const playFrame = frame - 1;
    const startFrane = playFrame < 0 ? 0 : playFrame > playerStore.frameCount ? playerStore.frameCount : playFrame;
    playerStore.playStartFrame = startFrane;
    playerStore.playAudioFrame = startFrane;
  }
  let maxDelta = 0;

  const setScale = debounce(() => {
    store.trackScale -= maxDelta > 0 ? 10 : -10;
    maxDelta = 0;
  }, 100);

  const handleWheel = (event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      maxDelta || (maxDelta = event.deltaY);
      setScale();
    }
  };
  function handleScroll() {
    const { scrollLeft, scrollTop } = trackList.value;
    startX.value = scrollLeft - offsetLine.left;
    startY.value = scrollTop;
  }
  function setDropLineLeft(event: DragEvent) {
    const trackListElement = trackListContainer.value as HTMLDivElement;
    const { left } = trackListElement.getBoundingClientRect();
    const { clientX } = event;
    const { x: offsetX } = dragPoint.value;
    const itemLeft = clientX - left - offsetX;
    dropItemLeft.value = itemLeft < 0 ? 0 : itemLeft;
  }
  function dragLineHandler(event: DragEvent, type: string, lineIndex: number, lineType: string) {
    let dropLineI = -1;
    if (type === 'over') {
      if (isVaDragElement.value) {
        dropLineI = (lineIndex > mainIndex.value ? lineIndex : mainIndex.value);
      } else {
        dropLineI = (lineIndex < mainIndex.value ? lineIndex : mainIndex.value);
      }
      if (dropLineI === mainIndex.value) {
        insertBefore.value = !isVaDragElement.value;
      } else {
        const dropLine = event.currentTarget as HTMLDivElement;
        const { clientHeight } = dropLine;
        const { top } = dropLine.getBoundingClientRect();
        const { clientY } = event;
        insertBefore.value = clientY - top < clientHeight / 2;
      }
      dropLineIndex.value = dropLineI;
      setDropLineLeft(event);
    }
  }
  function trackListOverHandler(event: DragEvent, type = 'leave') {
    event.preventDefault();
    event.stopPropagation();
    setDropLineLeft(event);
  }
  function addTrack(event: DragEvent) {
    let dragInfo = JSON.parse(store.dragData.dataInfo || '');
    if (dragInfo) {
      const startFrame = getSelectFrame(dropItemLeft.value, trackScale.value, defaultFps.value);
      store.addTrack(formatTrackItemData(dragInfo, startFrame > 0 ? startFrame - 1 : 0), dropLineIndex.value, insertBefore.value, startFrame - 1);
    }
    dropLineIndex.value = -1;
    dropItemLeft.value = 0;
  }
</script>