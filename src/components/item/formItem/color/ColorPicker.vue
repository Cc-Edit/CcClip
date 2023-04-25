<template>
  <el-popover
      placement="bottom"
      :width="220"
      trigger="click"
  >
    <template #reference>
      <div class="h-8 flex flex-row items-center cursor-pointer">
        <span
            class="w-6 h-4 block mr-4 border border-gray-500"
            :style="{ backgroundColor: rgbaColor }"
        />
        <i class="not-italic">{{ rgbaColor }}</i>
      </div>
    </template>
    <template #default>
      <Sketch v-model="colors" :preset-colors="defaultColors" />
    </template>
  </el-popover>
</template>

<script setup lang="ts">
  import defaultColors from './colorSet';
  import { Sketch } from '@ckpack/vue-color';
  import { ref, computed, watch } from 'vue';
  const props = defineProps({
    modelValue: {
      type: Object,
      default() {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        };
      }
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
  const colors = ref({
    rgba: props.modelValue
  });
  const rgbaColor = computed(() => {
    const { r, g, b, a } = colors.value.rgba as {
      r: number,
      g: number,
      b: number,
      a: number
    } || {};
    return r !== undefined ? `rgba(${r},${g},${b},${a})` : '';
  });

  watch(colors, () => {
    modelValue.value = colors.value.rgba;
  });
</script>

<style scoped>

</style>