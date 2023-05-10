<template>
  <div ref="canvasContainer" class="sticky top-0 left-0 right-0 h-5 text-center leading-5 text-sm z-20">
    <canvas
        :style="canvasStyle"
        v-bind="canvasAttr"
        ref="timeLine"
        @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
  import { usePageState } from '@/stores/pageState';
  import { drawTimeLine, getSelectFrame } from '@/utils/canvasUtil';
  import type { UserConfig, CanvasConfig } from '@/utils/canvasUtil';
  import { ref, computed, onMounted, nextTick, watch, reactive, toRefs } from 'vue';
  const props = defineProps({
    start: { // 开始坐标
      type: Number,
      default: 0
    },
    step: { // 步进，与视频fps同步
      type: Number,
      default: 30
    },
    scale: { // 时间轴缩放比例
      type: Number,
      default: 0
    },
    focusPosition: { // 选中元素时在时间轴中高亮显示
      type: Object,
      default() {
        return {
          start: 0, // 起始帧数
          end: 0 // 结束帧数
        };
      }
    }
  });
  const emits = defineEmits({
    selectFrame(val: number) {
      return val !== null;
    }
  });
  /**
   * 初始化 Canvas
   * */
  const canvasContainer = ref();
  const timeLine = ref();
  let canvasContext = {} as CanvasRenderingContext2D;
  const { isDark, hideSubMenu } = toRefs(usePageState());
  const canvasConfigs = computed(() => ({
    bgColor: isDark.value ? '#374151' : '#E5E7EB', // 背景颜色
    ratio: window.devicePixelRatio || 1, // 设备像素比
    textSize: 12, // 字号
    textScale: 0.83, // 支持更小号字： 10 / 12
    lineWidth: 1, // 线宽
    // eslint-disable-next-line
    textBaseline: 'middle' as 'middle', // 文字对齐基线 (ts 中定义的textBaseLine是一个联合类型)
    // eslint-disable-next-line
    textAlign: 'center' as 'center', // 文字对齐方式
    longColor: isDark.value ? '#E5E7EB' : '#374151', // 长线段颜色
    shortColor: isDark.value ? '#9CA3AF' : '#6B7280', // 短线段颜色
    textColor: isDark.value ? '#E5E7EB' : '#374151', // 文字颜色
    subTextColor: isDark.value ? '#9CA3AF' : '#6B7280', // 小文字颜色
    focusColor: isDark.value ? '#6D28D9' : '#C4B5FD' // 选中元素区间
  }));
  const canvasAttr = reactive({
    width: 0,
    height: 0
  });
  const canvasStyle = computed(() => {
    return {
      width: `${canvasAttr.width / canvasConfigs.value.ratio}px`,
      height: `${canvasAttr.height / canvasConfigs.value.ratio}px`
    };
  });
  // 重绘线条
  function updateTimeLine() {
    drawTimeLine(canvasContext, { ...props } as UserConfig, { ...canvasAttr, ...canvasConfigs.value } as CanvasConfig);
  }
  // 设置 canvas 上下文环境
  function setCanvasContext() {
    canvasContext = timeLine.value.getContext('2d');
    canvasContext.font = `${canvasConfigs.value.textSize * canvasConfigs.value.ratio}px -apple-system, ".SFNSText-Regular", "SF UI Text", "PingFang SC", "Hiragino Sans GB", "Helvetica Neue", "WenQuanYi Zen Hei", "Microsoft YaHei", Arial, sans-serif`;
    canvasContext.lineWidth = canvasConfigs.value.lineWidth;
    canvasContext.textBaseline = canvasConfigs.value.textBaseline;
    canvasContext.textAlign = canvasConfigs.value.textAlign;
  }
  // 设置 canvas 大小
  function setCanvasRect() {
    const { width, height } = canvasContainer.value.getBoundingClientRect();
    canvasAttr.width = width * canvasConfigs.value.ratio;
    canvasAttr.height = height * canvasConfigs.value.ratio;
    nextTick(() => {
      setCanvasContext();
      updateTimeLine();
    });
  }
  function handleClick(event: MouseEvent) {
    const offset = event.offsetX;
    const frameIndex = getSelectFrame(props.start + offset, props.scale, props.step);
    emits('selectFrame', frameIndex);
  }
  onMounted(() => {
    setCanvasRect();
  });
  watch(canvasConfigs, updateTimeLine);
  watch(props, updateTimeLine);
  watch(hideSubMenu, () => {
    setTimeout(() => {
      setCanvasRect();
    }, 300);
  }, {
    flush: 'post'
  });
  window.addEventListener('resize', setCanvasRect, false);
</script>