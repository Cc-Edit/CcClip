<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div class="flex shrink-0 items-center text-xs pl-2 overflow-hidden h-6 leading-6 bg-pink-600 bg-opacity-60 text-gray-200">
      <EffectsIcon class="inline-block mr-2 shrink-0" />
      <span class="mr-4 shrink-0">{{ props.trackItem.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import trackCheckPlaying from './trackCheckPlaying';
  import { EffectTractItem } from '@/stores/trackState';
  import { PropType } from 'vue';
  const props = defineProps({
    trackItem: {
      type: Object as PropType<EffectTractItem>,
      default() {
        return {
          width: '0px',
          left: '0px'
        };
      }
    }
  });
  trackCheckPlaying(props);
</script>