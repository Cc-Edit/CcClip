import { ref, toRefs, watch, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useTrackState } from './trackState';
import type { VideoTractItem, TrackItem } from './trackState';
import { useTrackAttrState } from '@/stores/trackAttribute';
import { debounce } from 'lodash-es';

export const usePlayerState = defineStore('playerState', () => {
  const trackStore = useTrackState();
  const attrStore = useTrackAttrState();
  const ingLoadingCount = ref(0);
  // 要播放的总帧数
  const playerConfig = reactive({
    frameCount: 0,
    playerWidth: 0,
    playerHeight: 0
  });
  const existVideo = ref(false);
  const audioPlayData = ref<TrackItem[]>([]); // 全局音频，因为存在音频混合，所以将所有音频混合成一个
  function mergeVideo() {
    let existV = false;
    const endList: number[] = [0];
    const vaList = <TrackItem[]>[];
    let playerWidth = 0; // 视频元素最大宽度
    let playerHeight = 0;// 视频元素最大高度
    let audioStart = -1; // 音频开始
    let audioEnd = -1; // 音频结束
    trackStore.trackList.forEach(trackLine => {
      let lineEnd = 0;
      trackLine.list.forEach(trackItem => {
        const silent = attrStore.trackAttrMap[trackItem.id]?.silent;
        if (trackLine.type === 'video') {
          if (playerHeight === 0 && playerWidth === 0) { // 取第一个视频宽高作为播放器宽高
            playerWidth = Math.max(playerWidth, (trackItem as VideoTractItem).width);
            playerHeight = Math.max(playerHeight, (trackItem as VideoTractItem).height);
          }
          existV = true;
        }
        if (!silent && (trackLine.type === 'video' || trackLine.type === 'audio')) {
          vaList.push(trackItem);
          audioStart = Math.min(trackItem.start, audioStart);
          audioEnd = Math.max(trackItem.end, audioEnd);
          lineEnd = Math.max(lineEnd, trackItem.end); // 根据起止位置求出总长度
        }
      });
      endList.push(lineEnd);
    });
    audioPlayData.value = vaList;
    playerConfig.frameCount = Math.max(...endList);
    playerConfig.playerWidth = playerWidth;
    playerConfig.playerHeight = playerHeight;
    existVideo.value = existV;
  }
  watch([() => trackStore.trackList, attrStore.trackAttrMap], debounce(() => mergeVideo(), 30), {
    immediate: true,
    deep: true
  });
  const playStartFrame = ref(0); // 当前播放帧
  const playAudioFrame = ref(0); // 音频播放帧
  const playTargetTrackMap = ref(new Map()); // 当前播放的元素集合
  const isPause = ref(true);

  return {
    isPause,
    playStartFrame,
    playAudioFrame,
    ingLoadingCount,
    playTargetTrackMap,
    audioPlayData,
    existVideo,
    ...toRefs(playerConfig)
  };
});
