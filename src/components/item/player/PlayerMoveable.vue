<template>
  <div
      ref="moveContainer"
      class="absolute left-0 right-0 top-0 bottom-0 m-auto"
      :style="{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`
        }"
  >
    <div
        v-for="(item, index) in targetList"
        :key="item.id"
        :data-eleId="item.id"
        :style="{
          zIndex: index,
          left: `${item.l}px`,
          top: `${item.t}px`,
          width: `${item.w}px`,
          height: `${item.h}px`,
          transform: `scale(${item.scale}, ${item.scale})`
        }"
        class="move-target absolute"
        @click.stop="selectItem(item.id)"
        @mousedown="mousedown"
    />
    <Moveable
        ref="moveable"
        v-bind="draggableOptions"
        @drag="onDrag"
        @scale="onScale"
    />
  </div>
</template>

<script setup lang="ts">
  import { defaultMoveOptions } from '@/data/constant';
  import Moveable from 'vue3-moveable';
  import { computedItemShowArea, isVideo } from '@/utils/common';
  import { ref, nextTick, reactive, computed, watch } from 'vue';
  import { usePlayerState } from '@/stores/playerState';
  import { useTrackAttrState } from '@/stores/trackAttribute';
  import { useTrackState } from '@/stores/trackState';
  const props = defineProps({
    canvasSize: {
      type: Object,
      default() {
        return {
          width: 0,
          height: 0
        };
      }
    }
  });
  const store = usePlayerState();
  const trackStore = useTrackState();
  const attrStore = useTrackAttrState();
  const moveContainer = ref();
  const moveable = ref();
  const moveTarget = ref();
  const targetList = computed(() => {
    if (store.playerHeight === 0 && store.playerWidth === 0) {
      return [];
    }
    const { width, height } = props.canvasSize;
    const videoTargets:Array<{ id: string, l: number, t: number, w: number, h:number, scale:number }> = [];
    const targets:Array<{ id: string, l: number, t: number, w: number, h:number, scale:number }> = [];
    store.playTargetTrackMap.forEach((trackItem, id) => {
      if (!attrStore.trackAttrMap[id]) return;
      let { left = 0, top = 0, scale = 100 } = attrStore.trackAttrMap[id];
      let { drawL, drawT, diffW, diffH, defaultH, defaultW } = computedItemShowArea(trackItem, { width, height }, attrStore.trackAttrMap[id]);
      if (left === 0 && top === 0 && scale === 100) { // 初次渲染
        drawL = diffW / 2;
        drawT = trackItem.type === 'text' ? (diffH - 100) : (diffH / 2);
        attrStore.trackAttrMap[id].top = drawT;
        attrStore.trackAttrMap[id].left = drawL;
        left = drawL;
        top = drawT;
      }
      if (isVideo(trackItem.type)) {
        videoTargets.push({
          id,
          scale: scale / 100,
          l: left,
          t: top,
          w: defaultW,
          h: defaultH
        });
      } else if (['image', 'text'].includes(trackItem.type)) {
        targets.unshift({
          id,
          scale: scale / 100,
          l: left,
          t: top,
          w: defaultW,
          h: defaultH
        });
      }
    });
    return [...videoTargets, ...targets];
  });
  const draggableOptions = reactive({
    target: moveTarget,
    className: 'cc-move',
    container: moveContainer.value,
    ...defaultMoveOptions
  });
  function selectItem(eleid: string) {
    store.isPause = true;
    trackStore.selectTrackById(eleid);
  }
  function onDrag(params: Record<string, any>) {
    let { target, left, top } = params;
    const { eleid } = target.dataset;
    left = Math.floor(left);
    top = Math.floor(top);
    attrStore.setTrackAttr(eleid, {
      left,
      top
    });
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
  }
  function onScale(params: Record<string, any>) {
    let { target, scale } = params;
    const { eleid } = target.dataset;
    const newScale = Math.max(Math.round(scale[0] * 100), 1);
    attrStore.setTrackAttr(eleid, {
      scale: newScale
    });
    target.style.transform = `scale(${newScale / 100}, ${newScale / 100})`;
  }
  function mousedown(event: MouseEvent) {
    event.stopPropagation();
    store.isPause = true;
    moveTarget.value = event.currentTarget;
    nextTick(() => {
      moveable.value.dragStart(event);
    });
  }
  watch([trackStore.selectTrackItem, targetList], () => {
    if (moveContainer.value && trackStore.selectTrackItem.line !== -1 && trackStore.selectTrackItem.index !== -1) {
      const targetTrack = trackStore.trackList[trackStore.selectTrackItem.line].list[trackStore.selectTrackItem.index];
      if (targetTrack && targetList.value.find(item => item.id === targetTrack.id)) {
        moveTarget.value = moveContainer.value.querySelector(`.move-target[data-eleid='${targetTrack.id}']`);
      } else {
        moveTarget.value = null;
      }
    } else {
      moveTarget.value = null;
    }
  }, { immediate: true, flush: 'post' });
</script>

<style>
  body .cc-move .moveable-control{
    @apply border w-3 h-3 border-yellow-400 bg-gray-50 -ml-1.5 -mt-1.5;
  }
  body .cc-move .moveable-line{
    @apply bg-yellow-400 w-px;
  }
</style>