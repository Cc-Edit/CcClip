<template>
  <div class="pl-4 pb-1 pr-10 w-full h-10 border-b dark:border-gray-600 border-gray-300">
    <div
      class="float-left h-9 w-32 flex flex-row flex-nowrap items-center justify-around"
    >
      <div v-for="item of icons" :key="item.title" @click="handlerIcon(item)">
        <el-tooltip
          :disabled="item.disable"
          class="bg-gray-400"
          :effect="store.isDark ? 'dark' : 'light'"
          :content="item.title"
          placement="bottom-start"
        >
          <component
            :is="item.icon"
            class="focus:outline-0"
            :class="item.disable ? 'cursor-not-allowed text-gray-400' : ''"
          />
        </el-tooltip>
      </div>
    </div>
    <div class="float-right flex w-52 h-9 justify-center items-center">
      <SubIcon :style="svgStyle" class="cursor-pointer mr-4" @click="changeScale(-10)" />
      <el-slider v-model="modelValue" v-bind="sliderProps" />
      <AddIcon :style="svgStyle" class="cursor-pointer ml-4" @click="changeScale(10)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { usePageState } from '@/stores/pageState';
  import { useTrackState } from '@/stores/trackState';
  import { usePlayerState } from '@/stores/playerState';
  import { getId } from '@/utils/common';
  import { ref, reactive, computed } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 30
    }
  });
  const emit = defineEmits({
    'update:modelValue': val => {
      return val !== null;
    }
  });
  const modelValue = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    }
  });
  const store = usePageState();
  const trackStore = useTrackState();
  const playerStore = usePlayerState();
  const statePoint = computed(() => store._stepInfo.statePoint);
  const stateLength = computed(() => store._stepInfo.stateLength);
  const svgStyle = ref({
    fontSize: '1.75rem',
    padding: '0.25rem',
    boxSizing: 'content-box'
  });
  const sliderProps = reactive({
    showTooltip: false,
    size: 'small',
    step: 10,
    max: 100,
    min: 0
  });
  function changeScale(val: number) {
    let newVal = modelValue.value + val;
    if (newVal > sliderProps.max) newVal = sliderProps.max;
    if (newVal < sliderProps.min) newVal = sliderProps.min;
    modelValue.value = newVal;
  }
  const icons = computed(() => [
    {
      title: '撤销',
      disable: stateLength.value === 0 || statePoint.value === 0,
      icon: 'UndoIcon'
    },
    {
      title: '前进',
      disable: statePoint.value === stateLength.value,
      icon: 'RedoIcon'
    },
    {
      title: '分割',
      disable: trackStore.selectTrackItem.line === -1 && trackStore.selectTrackItem.index === -1,
      icon: 'SplitIcon'
    },
    {
      title: '删除',
      disable: trackStore.selectTrackItem.line === -1 && trackStore.selectTrackItem.index === -1,
      icon: 'DeleteIcon'
    }
  ]);

  function handlerIcon(item: Record<string, any>) {
    const { icon: type, disable } = item;
    if (disable) {
      return;
    }
    if (type === 'DeleteIcon') {
      if (trackStore.selectTrackItem.line !== -1 && trackStore.selectTrackItem.index !== -1) {
        trackStore.removeTrack(trackStore.selectTrackItem.line, trackStore.selectTrackItem.index);
        trackStore.selectTrackItem.line = -1;
        trackStore.selectTrackItem.index = -1;
      }
    } else if (type === 'UndoIcon') {
      store._undo();
    } else if (type === 'RedoIcon') {
      store._redo();
    } else if (type === 'SplitIcon') {
      // 判断分割时间是否在视频内
      let splitTime = playerStore.playStartFrame;
      let active = trackStore.trackList[trackStore.selectTrackItem.line].list[trackStore.selectTrackItem.index];

      if (splitTime > active.start && splitTime < active.end && active.type === 'video') {
        let copy = JSON.parse(JSON.stringify(active));

        active.end = splitTime;
        active.offsetR = active.frameCount - active.end;

        copy.start = splitTime;
        copy.offsetL = splitTime - 1;

        copy.id = getId();
        trackStore.addTrack(copy, trackStore.selectTrackItem.line, false, 0);
      }
    }
  }
</script>