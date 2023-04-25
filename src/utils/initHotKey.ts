import { useTrackState } from '@/stores/trackState';
const store = useTrackState();
export const initHotKey = () => {
    // 注册全局事件
    window.onkeydown = (event: KeyboardEvent) => {
      const { composed, ctrlKey, key, type } = event;
      switch (key) {
          case 'Backspace':
              // 删除操作
              if (store.selectTrackItem.line !== -1 && store.selectTrackItem.index !== -1) {
                  store.removeTrack(store.selectTrackItem.line, store.selectTrackItem.index);
                  store.selectTrackItem.line = -1;
                  store.selectTrackItem.index = -1;
              }
              break;
          case 'Enter':
              break;
          default:
              break;
      }
    };
};