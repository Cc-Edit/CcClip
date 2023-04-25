<template>
  <div class="flex h-full overflow-hidden relative">
    <MenuList :activeIndex="defaultActiveIndex" @activeChange="activeHandler" />
    <ItemList
      :activeKey="state.activeItem.key"
      :defaultCollapse="store.showSubMenu"
      :title="state.activeItem.title"
      @collapseChange="changeCollapse"
    />
    <div class="absolute top-1/2 left-8" v-show="store.showSubMenu">
      <ElIcon :size="16" class="cursor-pointer p-2 box-content" @click="switchCollapse">
        <Expand />
      </ElIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Expand } from '@element-plus/icons-vue';
  import MenuList from '@/components/MenuList.vue';
  import ItemList from '@/components/ItemList.vue';
  import { menuData } from '@/data/baseMenu';
  import { ref, reactive, nextTick } from 'vue';
  import { usePageState } from '@/stores/pageState';
  const store = usePageState();
  const defaultActiveIndex = ref(0);
  let state = reactive({
    activeItem: menuData[defaultActiveIndex.value]
  });
  function activeHandler(activeItem: any) {
    state.activeItem = reactive(activeItem);
  }
  function switchCollapse() {
    nextTick(() => {
      store.showSubMenu = !store.showSubMenu;
    });
  }
  function changeCollapse(newCollpase: boolean) {
    nextTick(() => {
      store.showSubMenu = newCollpase;
    });
  }
</script>
