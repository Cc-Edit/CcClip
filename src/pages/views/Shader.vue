<template>
  <div class="h-full w-full flex flex-col flex-wrap items-start justify-start pt-10 ">
    <div class="flex flex-row justify-center items-start">
      <canvas ref="canvas" :width="canvasSize.width" :height="canvasSize.height" class="border border-solid border-amber-500" />
      <div class="flex flex-col justify-start items-start bg-gray-400 px-10 py-4 ml-4">
        <h3 class="text-gray-50 text-2xl font-bold mb-10">参数控制 shader</h3>
        <div class="w-100 flex flex-row mb-6">
          <span class="w-80 text-gray-50"> 着色器倒影强度: </span>
          <span class="w-10 mr-4 text-gray-50"> {{ shaderParams.reflection }} </span>
          <ElSlider :min="0" :max="1" :step="0.01" v-model="shaderParams.reflection" />
        </div>
        <div class="w-100 flex flex-row mb-6">
          <span class="w-80 text-gray-50"> 第二屏深度: </span>
          <span class="w-10 mr-4 text-gray-50"> {{ shaderParams.depth }} </span>
          <ElSlider :min="1" :max="20" :step="0.1" v-model="shaderParams.depth" />
        </div>
        <div class="w-100 flex flex-row mb-6">
          <span class="w-80 text-gray-50"> 翻页效果强度: </span>
          <span class="w-10 mr-4 text-gray-50"> {{ shaderParams.perspective }} </span>
          <ElSlider :min="0" :max="1" :step="0.01" v-model="shaderParams.perspective" />
        </div>
        <div class="w-100 flex flex-row mb-6">
          <span class="w-80 text-gray-50"> 动画时长: </span>
          <span class="w-10 mr-4 text-gray-50"> {{ duration }} </span>
          <ElSlider :min="100" :max="6000" :step="100" v-model="duration" />
        </div>
      </div>
    </div>
    <div class="flex flex-row">
      <div class="text-gray-50" />
    </div>
    <div class="hidden">
      <img ref="fromEle" :style="{ width: &quot;1024px&quot;, height: &quot;768px&quot; }" :onload="imageLoad" :src="fromImage" alt="">
      <img ref="toEle" :style="{ width: &quot;1024px&quot;, height: &quot;768px&quot; }" :onload="imageLoad" :src="toImage" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
  // @ts-ignore
  import transitions from 'gl-transitions';
  // @ts-ignore
  import createTransition from 'gl-transition';
  // @ts-ignore
  import createTexture from 'gl-texture2d';

  import { ref, reactive, onMounted, watchEffect, watch } from 'vue';
  import fromImage from '@/assets/from.png';
  import toImage from '@/assets/to.png';
  const imageCount = ref(0);
  const canvasSize = reactive({
    width: 1024,
    height: 768
  });
  const canvas = ref();
  const context = ref();
  const fromTexture = ref();
  const toTexture = ref();
  const fromEle = ref();
  const toEle = ref();

  const duration = ref(2000); // 持续时间
  const shaderParams = reactive({ // 着色器参数
    reflection: 0.4, // 着色器倒影
    perspective: 0.4, // 翻页效果
    depth: 3 // 着色器深度
  });

  function imageLoad() {
    imageCount.value++;
  }

  watchEffect(() => {
    if (context.value && toTexture.value && fromTexture.value) {
      const transition = createTransition(context.value, transitions.find((t: { name: string; }) => t.name === 'doorway'));
      // animates forever!
      const loop = (t: number) => {
        requestAnimationFrame(loop);
        transition.draw(t / duration.value % 1, fromTexture.value, toTexture.value, canvasSize.width, canvasSize.height, shaderParams);
      };
      requestAnimationFrame(loop);
    }
  });

  function initWebGl() {
    const gl = canvas.value.getContext('webgl') || canvas.value.getContext('experimental-webgl');
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 4, 4, -1]), // see a-big-triangle
      gl.STATIC_DRAW
    );
    gl.viewport(0, 0, canvasSize.width, canvasSize.height);
    const from = createTexture(gl, fromEle.value);
    from.minFilter = gl.LINEAR;
    from.magFilter = gl.LINEAR;

    const to = createTexture(gl, toEle.value);
    to.minFilter = gl.LINEAR;
    to.magFilter = gl.LINEAR;
    context.value = gl;
    fromTexture.value = from;
    toTexture.value = to;
  }

  watchEffect(() => {
    if (imageCount.value === 2) {
      initWebGl();
    }
  });
</script>
