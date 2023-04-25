<template>
  <template v-for="(attrItem, attrIndex) in attrData" :key="`${props.trackId}-${attrIndex}`">
    <component :is="attrItem.component" :index="attrIndex" :componentData="attrItem" v-bind="$attrs" />
  </template>
</template>

<script setup lang="ts">
  /**
   * 遍历递归FormItem
   * */
  const props = defineProps({
    attrData: {
      type: Array,
      default() {
        return [];
      }
    },
    trackId: {
      type: String,
      default: ''
    }
  });
</script>

<script lang="ts">
  export default {
    inheritAttrs: false
  };
</script>