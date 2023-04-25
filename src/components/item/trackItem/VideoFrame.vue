<template>
  <div ref="frameContainer" class="absolute top-0 left-0 right-0 h-full">
    <canvas
        v-bind="canvasAttr"
        ref="canvas"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, toRefs, onMounted, nextTick, watch, reactive, inject } from 'vue';
  import FFManager from '@/utils/ffmpegManager';
  import { VideoTractItem } from '@/stores/trackState';
  import type { PropType } from 'vue';
  const props = defineProps({
    trackItem: {
      type: Object as PropType<VideoTractItem>,
      default() {
        return {
          showWidth: '0px',
          showLeft: '0px'
        };
      }
    },
    type: {
      type: String,
      default: 'video'
    },
    drawState: {
      type: Boolean,
      default: false
    }
  });

  const ffmpeg = inject('ffmpeg') as FFManager;
  /**
   * 初始化 Canvas
   * */
  const frameContainer = ref();
  const canvas = ref();
  let canvasContext = {} as CanvasRenderingContext2D;
  const canvasAttr = reactive({
    width: 0,
    height: 0
  });
  const drawSize = reactive({
    width: 0,
    height: 0,
    frameCount: 0,
    maxFrame: 1
  });
  /**
   * @param imageBitmap 图像数据
   * @param start 开始位置
   * @param margin 图像间距
   * */
  function drawBitmap(imageBitmap: ImageBitmap, drawIndex = 0, margin = 0) {
    const { width: containerWidth } = canvasAttr;
    const { width, height, maxFrame } = drawSize;
    const { width: imageW, height: imageH } = props.trackItem;
    if (drawIndex === maxFrame - 1) { // 最后一张顶头渲染
      canvasContext.drawImage(imageBitmap, 0, 0, imageW, imageH, containerWidth - width, 0, width, height);
    } else {
      canvasContext.drawImage(imageBitmap, 0, 0, imageW, imageH, drawIndex * (width + margin), 0, width, height);
    }
  }
  // 绘制图像
  function drawImage() {
    if (props.trackItem.name && props.drawState && ffmpeg.isLoaded.value) {
      const { width: containerWidth, height: containerHeight } = canvasAttr;
      const { maxFrame, width, frameCount } = drawSize;
      const frameStep = Math.max(maxFrame - 1, 1); // 帧间距数，最小为1帧
      const renderSpace = Math.max(Math.floor(frameCount / frameStep), 1); // 间隔多少帧渲染一次
      let overFrame = Math.floor(frameCount - 1 - renderSpace * frameStep); // 不能整除时溢出帧数
      let offset = Math.max(containerWidth - Math.floor(maxFrame * width), 0); // 不够撑满canvas宽度的情况
      let marginSpace = Math.max(Math.round((offset / frameStep)), 0); // 帧数不够填满容器时的间距
      let frameIndex = props.trackItem.offsetL + 1; // 开始下标
      for (let i = 0; i < maxFrame; i++) {
        const blobFrame = ffmpeg.getFrame(props.trackItem.name, frameIndex);
        ((index, margin) => {
          createImageBitmap(blobFrame).then(imageBitmap => {
            drawBitmap(imageBitmap, index, margin);
          });
        })(i, marginSpace);
        frameIndex = Math.min(frameIndex + renderSpace, frameCount);
        if (overFrame > 0) {
          frameIndex += 1;
          overFrame--;
        }
      }
    }
  }
  // 设置 canvas 上下文环境
  function setCanvasContext() {
    canvasContext = canvas.value.getContext('2d');
  }
  // 设置 canvas 大小
  function setCanvasRect() {
    const { start, end, width: frameW, height: frameH } = props.trackItem;
    const showFrameCount = end - start;
    const { width, height } = frameContainer.value.getBoundingClientRect();
    canvasAttr.width = width;
    canvasAttr.height = height;
    const scaleW = Math.ceil(frameW / (frameH / height));
    drawSize.height = height;
    drawSize.width = scaleW;
    drawSize.frameCount = showFrameCount;
    drawSize.maxFrame = Math.min(Math.ceil(width / scaleW), showFrameCount);
    drawImage();
  }
  onMounted(() => {
    setCanvasContext();
  });
  watch(props, () => {
    nextTick(setCanvasRect);
  }, { immediate: true, flush: 'post' });
</script>