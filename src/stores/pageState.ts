import { ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';

export const usePageState = defineStore('pageState', () => {
  const pageTitle = ref('视频编辑（CcClip）');
  // 暗色模式
  const isDark = ref(localStorage.theme === 'dark');
  const isLoading = ref(localStorage.loadingPage === '1');
  const showSubMenu = ref(localStorage.showSubmenu !== '0');
  watchEffect(() => {
    console.log(`switch to ${isDark.value ? 'dark' : 'light'}`);
    localStorage.theme = isDark.value ? 'dark' : 'light';
    localStorage.loadingPage = isLoading.value ? '1' : '0';
    localStorage.showSubmenu = showSubMenu.value ? '1' : '0';
    document.documentElement.classList[isDark.value ? 'add' : 'remove']('dark');
  });

  // 属性宽度
  const attrWidth = ref(parseInt(localStorage.attrW || '320'));
  // 轨道高度
  const trackHeight = ref(parseInt(localStorage.trackH || '380'));
  watchEffect(() => {
    localStorage.attrW = attrWidth.value;
    localStorage.trackH = trackHeight.value;
  });

  return {
    showSubMenu,
    isLoading,
    pageTitle,
    isDark,
    attrWidth,
    trackHeight
  };
});
