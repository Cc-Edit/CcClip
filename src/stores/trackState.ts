import { ref, watchEffect, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { checkTrackListOverlap } from '@/utils/storeUtil';
import { useTrackAttrState } from '@/stores/trackAttribute';

export type TrackType = 'video' | 'audio' | 'text' | 'image' | 'effect' | 'transition' | 'filter';
interface BaseTractItem {
  id: string,
  type: TrackType,
  name: string,
  start: number,
  end: number,
  frameCount: number,
  offsetL: number, // 音视频左侧裁切
  offsetR: number, // 音视频右侧裁切
}
export interface VideoTractItem extends BaseTractItem{
  time: number,
  format: string,
  source: string,
  cover: string,
  width: number,
  height: number,
  fps: number
}

export interface AudioTractItem extends BaseTractItem{
  time: number,
  format: string,
  source: string
  cover: string
}

export interface TextTractItem extends BaseTractItem{
  cover: string,
  templateId: number
}

export interface ImageTractItem extends BaseTractItem{
  source: string,
  format: string,
  width: number,
  height: number,
  sourceFrame: number,
  cover: string
}

export interface EffectTractItem extends BaseTractItem{
  templateId: number,
  cover: string
}

export interface TransitionTractItem extends BaseTractItem{
  templateId: number,
  cover: string
}

export interface FilterTractItem extends BaseTractItem{
  templateId: number,
  cover: string
}

export type TrackItem = VideoTractItem | AudioTractItem | TextTractItem | ImageTractItem | EffectTractItem | TransitionTractItem | FilterTractItem;
export interface TrackLineItem {
  type: TrackItem['type'],
  main?: boolean,
  list: TrackItem[]
}

export const useTrackState = defineStore('trackState', () => {
  const attrStore = useTrackAttrState();
  const dragData = reactive({ // 拖拽数据
    dataInfo: '',
    dragType: '',
    dragPoint: {
      x: 0,
      y: 0
    }
  });
  const moveTrackData = reactive({ // 行内移动
    lineIndex: -1,
    itemIndex: -1
  });
  // 轨道放大比例
  const trackScale = ref(parseInt(localStorage.trackS || '60'));
  const trackList = reactive<TrackLineItem[]>(localStorage.trackList ? JSON.parse(localStorage.trackList) : []);

  // 选中元素坐标
  const selectTrackItem = reactive({
    line: -1,
    index: -1
  });
  // 选中元素
  const selectResource = computed(() => {
    if (selectTrackItem.line === -1) {
      return null;
    }
    return trackList[selectTrackItem.line]?.list[selectTrackItem.index] || null;
  });
  // 删除元素
  function removeTrack(lineIndex: number, itemIndex: number, removeAttr = true) {
    const removeItem = trackList[lineIndex].list[itemIndex];
    trackList[lineIndex].list.splice(itemIndex, 1);
    if (trackList[lineIndex].list.length === 0 && !trackList[lineIndex].main) {
      trackList.splice(lineIndex, 1);
    }
    if (trackList.length === 1 && trackList[0].list.length === 0) {
      trackList.splice(0, 1);
    }
    removeAttr && attrStore.deleteTrack(removeItem.id);
  }
  // 复用已有行
  function insertExistingLine(item: TrackItem, insertLine: { line: number, index: number }) {
    trackList[insertLine.line].list.splice(insertLine.index, 0, item);
    selectTrackItem.line = insertLine.line;
    selectTrackItem.index = insertLine.index;
  }
  // 插入新行
  function insertNewLine(item: TrackItem) {
    const isVA = ['video', 'audio'].includes(item.type);
    trackList[isVA ? 'push' : 'unshift']({
      type: item.type,
      list: [item]
    });
    selectTrackItem.line = isVA ? trackList.length - 1 : 0;
    selectTrackItem.index = 0;
  }
  // 移动目标行
  function moveTargetLine(item: TrackItem, insertLine: { line: number, index: number }) {
    let { lineIndex: moveLineIndex = -1, itemIndex: moveIndex = -1 } = moveTrackData;
    trackList[insertLine.line].list.splice(insertLine.index, moveLineIndex === insertLine.line ? 1 : 0, item);
    if (moveLineIndex !== -1 && insertLine.line !== moveLineIndex) {
      if (trackList[moveLineIndex].list.length === 1 && insertLine.line > moveLineIndex) {
        insertLine.line--; // 如果在移除元素前面插入，选中元素列上移
      }
      removeTrack(moveLineIndex, moveIndex, false);
    }
    selectTrackItem.line = insertLine.line;
    selectTrackItem.index = moveLineIndex === -1 ? insertLine.index + 1 : insertLine.index;
  }
  // 目标行不可用，则移动到目标之后、之前
  function moveLine(item: TrackItem, targetLineIndex: number) {
    let { lineIndex: moveLineIndex = -1, itemIndex: moveIndex = -1 } = moveTrackData;
    trackList.splice(targetLineIndex, 0, {
      type: item.type,
      list: [item]
    });
    if (moveLineIndex !== -1 && moveIndex !== -1) { // 移动到新行，删除老数据
      if (targetLineIndex < moveLineIndex) {
        moveLineIndex++; // 如果在移除元素前面插入，则移除下标自增
      }
      if (trackList[moveLineIndex].list.length === 1 && targetLineIndex > moveLineIndex) {
        targetLineIndex--; // 如果在移除元素前面插入，选中元素列上移
      }
      removeTrack(moveLineIndex, moveIndex, false);
    }
    selectTrackItem.line = targetLineIndex;
    selectTrackItem.index = 0;
  }
  function selectTrackById(id: string) {
    console.log(id);
    trackList.forEach((item, index) => {
        item.list.forEach((trackItem, trackIndex) => {
          if (trackItem.id === id) {
            selectTrackItem.line = index;
            selectTrackItem.index = trackIndex;
          }
        });
    });
  }
  // 新增元素
  function addTrack(item: TrackItem, lineIndex = -1, insertBefore = true, index = 0) {
    const { type } = item;
    const isVA = ['video', 'audio'].includes(type);
    let { lineIndex: moveLineIndex = -1, itemIndex: moveIndex = -1 } = moveTrackData;
    // 插入main
    if (trackList.length === 0) {
      trackList.push({
        type: 'video',
        main: true,
        list: []
      });
    }

    let canInsertLines = []; // 可以承载新元素的行与下标
    // 找到最近的一个当前类型轨道, 使用 insertIndex 保持数组与实际顺序一致, 使用倒序从距离主轨道最近的轨道开始添加
    let startIndex = isVA ? 0 : trackList.length - 1;
    for (let i = startIndex; (isVA ? i < trackList.length : i > -1); isVA ? i++ : i--) {
      const lineData = trackList[i];
      const { hasOverlap, insertIndex } = checkTrackListOverlap(lineData.list, item, moveLineIndex === i ? moveIndex : -1);
      if (lineData.type === type && !hasOverlap) { // 存在可复用行
        canInsertLines.push({
          line: i,
          index: insertIndex
        });
      }
    }
    if (lineIndex !== -1) { // 指定行插入, 注意轨道渲染顺序 0 在最上方
      let targetLineIndex = insertBefore ? lineIndex : lineIndex + 1;
      let insertLine = canInsertLines.find(canInsItem => canInsItem.line === lineIndex);
      if (insertLine) { // 目标行可插入
        moveTargetLine(item, insertLine);
      } else {
        moveLine(item, targetLineIndex);
      }
    } else if (canInsertLines.length > 0) { // 左侧列表添加，可复用现有同类型行内空隙
      insertExistingLine(item, canInsertLines[0]);
    } else { // 开新行插入
      insertNewLine(item);
    }
    moveTrackData.lineIndex = -1;
    moveTrackData.itemIndex = -1;
    attrStore.initTrackAttr(item.id);
  }

  watchEffect(() => {
    localStorage.trackS = trackScale.value;
  });
  watchEffect(() => {
    localStorage.trackList = JSON.stringify(trackList);
  });
  return {
    moveTrackData,
    selectTrackItem,
    selectResource,
    trackScale,
    trackList,
    addTrack,
    selectTrackById,
    removeTrack,
    dragData
  };
});
