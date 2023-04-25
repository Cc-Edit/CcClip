import { watch, watchPostEffect, ref, reactive, inject, toRaw } from 'vue';
import type { Ref } from 'vue';
import { usePlayerState } from '@/stores/playerState';
import type FFManager from '@/utils/ffmpegManager';
import { useTrackAttrState } from '@/stores/trackAttribute';
import { debounce } from 'lodash-es';

export function audioSetup(ffmLoading: Ref<boolean>) {
    const ffmpeg = inject('ffmpeg') as FFManager;
    const audio = ref();
    const audioLoading = ref(true);
    const audioInfo = reactive({
        start: -1,
        end: -1
    });
    const store = usePlayerState();
    const attrStore = useTrackAttrState();
    function setTime(playStartFrame: number) {
        const audioTime = Math.max((playStartFrame - audioInfo.start) / 30, 0);
        audio.value.currentTime = audioTime;
    }
    const getAudio = debounce(async() => {
        const { start, end, audioUrl } = await ffmpeg.getAudio(store.audioPlayData, toRaw(attrStore.trackAttrMap));
        audioInfo.start = start;
        audioInfo.end = end;
        audio.value.src = audioUrl;
        setTime(store.playStartFrame);
    }, 100);
    // 音频初始化
    async function initAudio() {
        audioLoading.value = true;
        if (ffmpeg.isLoaded.value && store.ingLoadingCount === 0 && !ffmLoading.value) {
            if (store.audioPlayData.length > 0) {
                getAudio();
            } else {
                audio.value.src = '';
            }
            audioLoading.value = false;
        }
    }
    watchPostEffect(initAudio);
    watch(() => store.isPause, () => {
        if (store.isPause) {
            audio.value.pause();
        } else {
            audio.value.play();
        }
    });
    // 播放跳转时间
    watch(() => store.playAudioFrame, () => {
        setTime(store.playAudioFrame);
    });
    return {
        audio,
        audioLoading
    };
}