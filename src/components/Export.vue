<template>
  <ElButton color="#626aef" disabled>
    <ElIcon :size="size" :color="color" class="mr-1">
      <Download />
    </ElIcon>
    导出
  </ElButton>
  <canvas id="canvas-worker" width="400" height="200" ref="canvasOff" />
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Download } from '@element-plus/icons-vue';
  const size = ref(14);
  const color = '#fff';
  const canvasOff = ref();
  onMounted(() => {
    const worker = new Worker('/worker.js');
    const offscreen = canvasOff.value.transferControlToOffscreen();
    worker.postMessage({ msg: 'start', origin: `${window.location.origin}/`, canvas: offscreen }, [offscreen]);
  });
</script>