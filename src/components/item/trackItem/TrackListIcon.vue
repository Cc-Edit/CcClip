<template>
  <div ref="iconList" class="relative w-12 flex h-full flex-col items-center justify-start overflow-y-hidden overflow-x-scroll border-r dark:border-gray-600 border-gray-300">
    <span class="w-full h-5 sticky top-0 left-0 right-0 z-20 dark:bg-gray-800 bg-gray-50" />
    <div class="absolute pt-10 pb-5 min-w-full flex flex-col justify-center min-h-full overflow-x-hidden left-0 right-0">
      <template v-for="(lineData, lineIndex) of listData" :key="lineIndex">
        <div
            class="z-10 flex justify-center items-center w-12 text-center mb-1 mt-1"
            :class="[TrackHeightMap.get(lineData.type), lineData.main ? 'bg-blue-500 bg-opacity-20' : '']"
            :title="lineData.main ? '主轨道' : ''"
        >
          <component :is="componentMap.get(lineData.type)" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import VideoIcon from '@/components/icons/VideoIcon.vue';
  import AudioIcon from '@/components/icons/AudioIcon.vue';
  import TextIcon from '@/components/icons/TextIcon.vue';
  import ImageIcon from '@/components/icons/ImageIcon.vue';
  import EffectsIcon from '@/components/icons/EffectsIcon.vue';
  import TransitionIcon from '@/components/icons/TransitionIcon.vue';
  import FilterIcon from '@/components/icons/FilterIcon.vue';
  import { TrackHeightMap } from '@/data/trackConfig';
  const props = defineProps({
    listData: {
      type: Array,
      default() {
        return [];
      }
    },
    offsetTop: {
      type: Number,
      default: 0
    }
  });
  const componentMap = new Map([
    ['video', VideoIcon],
    ['audio', AudioIcon],
    ['text', TextIcon],
    ['image', ImageIcon],
    ['effect', EffectsIcon],
    ['transition', TransitionIcon],
    ['filter', FilterIcon]
  ]);
  const iconList = ref();
  watch(() => props.offsetTop, () => {
    iconList.value.scrollTop = props.offsetTop;
  });
</script>