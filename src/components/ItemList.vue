<template>
  <div
    class="flex flex-col transition-all duration-200 overflow-x-hidden border-r dark:border-gray-600 border-gray-300"
    :class="collapse ? 'w-0' : 'w-80'"
  >
    <div class="min-h-full w-80 flex flex-col overflow-hidden border-l dark:border-gray-600 border-gray-300">
      <div class="h-10 border-b dark:border-gray-600 border-gray-300">
        <span class="inline leading-10 pl-3 select-none">{{ title }}</span>
        <ElIcon :size="16" class="mr-3 mt-1 float-right cursor-pointer p-2 box-content" @click="switchCollapse">
          <Fold />
        </ElIcon>
      </div>
      <div class="overflow-auto flex-1 pb-10">
        <template v-for="(subData, index) of listData" :key="`${index}-${subData.type}`">
          <SubList :type="subData.type" :listData="subData" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Fold } from '@element-plus/icons-vue';
  import { computed, ref, watch } from 'vue';
  import SubList from '@/components/SubList.vue';
  import { getData } from '@/api/mock';
  import { useRequest } from 'vue-hooks-plus';
  const props = defineProps({
    activeKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    defaultCollapse: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits({
    collapseChange(newCollapse: boolean) {
      return newCollapse !== null;
    }
  });
  const { data: listData, refresh } = useRequest(() => getData(props.activeKey));
  watch(() => props.activeKey, () => {
    refresh();
  });

  const title = computed(() => props.title);
  const collapse = ref(props.defaultCollapse);
  function switchCollapse() {
    collapse.value = !collapse.value;
  }
  watch(collapse, newValue => {
    emit('collapseChange', newValue);
  });
  watch(() => props.defaultCollapse, newValue => {
    collapse.value = newValue;
  });
</script>