<template>
  <HeaderContainer />
  <div class="flex flex-1 overflow-hidden">
    <ResourcesContainer />
    <div class="flex flex-1 flex-col overflow-hidden">
      <div class="flex flex-1 flex-row flex-nowrapf">
        <CanvasPlayer />
        <AttributeContainer />
      </div>
      <TrackContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
  import AttributeContainer from '@/components/container/AttributeContainer.vue';
  import CanvasPlayer from '@/components/container/CanvasPlayer.vue';
  import HeaderContainer from '@/components/container/HeaderContainer.vue';
  import ResourcesContainer from '@/components/container/ResourcesContainer.vue';
  import TrackContainer from '@/components/container/TrackContainer.vue';
  import { initHotKey } from '@/utils/initHotKey';
  initHotKey();
</script>
