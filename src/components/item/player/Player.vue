<template>
  <div class="p-2 absolute top-12 bottom-10 left-2 right-2 overflow-visible">
    <canvas ref="playerCanvas" class="absolute left-0 right-0 top-0 bottom-0 m-auto bg-gray-900" />
    <div v-show="store.frameCount === 0 || !store.existVideo" class="absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center">
      <ElIcon :size="144" class="box-content opacity-50" :style="{ color: '#FDE68A' }">
        <VideoCameraFilled />
      </ElIcon>
    </div>
    <Loading v-show="showLoading.value" class="justify-center pl-0 bg-opacity-0" />
    <PlayerMoveable :canvasSize="player.canvasSize" />
  </div>
  <PlayerControl :disable="showLoading.value" />
  <audio ref="audio" src="" />
</template>

<script setup lang="ts">
  import PlayerMoveable from '@/components/item/player/PlayerMoveable.vue';
  import PlayerControl from '@/components/item/player/PlayerControl.vue';
  import { VideoCameraFilled } from '@element-plus/icons-vue';
  import Loading from '@/components/Loading.vue';
  import { ref, inject, computed } from 'vue';
  import FFManager from '@/utils/ffmpegManager';
  import { usePlayerState } from '@/stores/playerState';
  import { audioSetup } from '@/components/item/player/initAudio';
  import { CanvasPlayer } from '@/components/item/player/canvasDraw';
  const props = defineProps({
    containerSize: { // 容器大小
      type: Object,
      default() {
        return {
          width: 0,
          height: 0
        };
      }
    }
  });
  const ffmpeg = inject('ffmpeg') as FFManager;
  const store = usePlayerState();
  const playerCanvas = ref();
  const player = new CanvasPlayer({
    player: playerCanvas,
    ffmpeg,
    containerSize: props.containerSize
  });
  const { audio, audioLoading } = audioSetup(player.loading); // audio在视频抽帧结束后才能获取到视频音轨
  const showLoading = computed(() => {
    return player.loading && audioLoading;
  });
</script>