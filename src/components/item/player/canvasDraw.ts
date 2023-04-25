import { usePlayerState } from '@/stores/playerState';
import { useTrackAttrState } from '@/stores/trackAttribute';
import type FFManager from '@/utils/ffmpegManager';
import { computedItemShowArea, isVideo } from '@/utils/common';
import { watch, ref, reactive, onMounted } from 'vue';
import { throttle } from 'lodash-es';
import type { Ref } from 'vue';
export class CanvasPlayer {
    player: Ref<HTMLCanvasElement>; // 播放器
    playerContext: CanvasRenderingContext2D | null = null;
    renderContext: CanvasRenderingContext2D | null = null;
    renderPlayer: HTMLCanvasElement = document.createElement('canvas'); // 预渲染播放器
    playerStore: Record<string, any>;
    attrStore: Record<string, any>;
    containerSize: Record<string, any>;
    ffmpeg: FFManager;
    loading = ref(true);
    canvasSize = reactive({
        width: 0,
        height: 0
    });
    textOptions = {
        // eslint-disable-next-line
        textBaseline: 'middle' as 'middle',
        // eslint-disable-next-line
        textAlign: 'center' as 'center',
        bgColor: '#111827'
    };
    constructor(options: Record<string, any>) {
        this.ffmpeg = options.ffmpeg;
        this.player = options.player;
        this.containerSize = options.containerSize;
        this.playerStore = usePlayerState();
        this.attrStore = useTrackAttrState();
        this.initWatch();
    }
    async initPlayer() {
        this.loading.value = true;
        if (this.ffmpeg.isLoaded.value && this.playerStore.ingLoadingCount === 0) {
            this.drawCanvas();
            this.loading.value = false;
        }
    }
    initContent() {
        this.playerContext = this.player.value.getContext('2d');
        this.renderContext = this.renderPlayer.getContext('2d');
        if (this.renderContext) {
            this.renderContext.font = this.getFont();
            this.renderContext.textBaseline = this.textOptions.textBaseline;
            this.renderContext.textAlign = this.textOptions.textAlign;
        }
    }
    getFont(size = 14) {
        return `${size}px -apple-system, ".SFNSText-Regular", "SF UI Text", "PingFang SC", "Hiragino Sans GB", "Helvetica Neue", "WenQuanYi Zen Hei", "Microsoft YaHei", Arial, sans-serif`;
    }
    initWatch() {
        onMounted(() => {
            this.initContent();
        });
        // 属性变化后重新渲染
        watch([this.attrStore.trackAttrMap, () => this.playerStore.playTargetTrackMap, () => this.canvasSize], throttle(async() => this.drawCanvas(), 30), { deep: true });
        // 容器大小变化
        watch([this.containerSize, () => this.playerStore.playerWidth, () => this.playerStore.playerHeight], () => {
            let { width: containerW, height: containerH } = this.containerSize;
            containerH -= 96; // 上下功能栏
            containerW -= 16; // 左右功能栏
            this.updateCanvasSize({ width: containerW, height: containerH });
        });
        // 前置依赖加载完成
        watch([this.ffmpeg.isLoaded, () => this.playerStore.ingLoadingCount], () => this.initPlayer(), {
            flush: 'post',
            immediate: true
        });
        watch(() => this.playerStore.playStartFrame, async() => this.drawCanvas());
    }
    // 更新尺寸
    updateCanvasSize({ width, height }: Record<string, number>) {
        const { playerWidth, playerHeight } = this.playerStore;
        const scaleWidth = playerWidth !== 0 ? Math.floor(height / playerHeight * playerWidth) : width; // 等高情况下的宽度
        const scaleHeight = playerHeight !== 0 ? Math.floor(width / playerWidth * playerHeight) : height; // 等宽情况啊下的高度
        const canvasWidth = Math.min(scaleWidth, width);
        const canvasHeight = Math.min(scaleHeight, height);
        if (this.canvasSize.width !== canvasWidth || this.canvasSize.height !== canvasHeight) {
            this.canvasSize.width = canvasWidth;
            this.canvasSize.height = canvasHeight;
            this.player.value.width = canvasWidth;
            this.player.value.height = canvasHeight;
            this.renderPlayer.width = canvasWidth;
            this.renderPlayer.height = canvasHeight;
        }
    }
    clearCanvas() {
        if (this.renderContext) {
            this.renderContext.fillStyle = this.textOptions.bgColor;
            this.renderContext.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        }
    }
    // 绘制
    async drawCanvas() {
        if (!this.ffmpeg.isLoaded.value || this.playerStore.ingLoadingCount !== 0) return;
        const videoList: Array<any> = [];
        const otherList: Array<any> = [];
        this.playerStore.playTargetTrackMap.forEach((trackItem: Record<string, any>, id: number) => {
            if (this.attrStore.trackAttrMap[id]) {
                const { type } = trackItem;
                if (isVideo(type)) {
                    videoList.push(() => this.drawToRenderCanvas(trackItem, id, this.playerStore.playStartFrame));
                } else {
                    otherList.unshift(() => this.drawToRenderCanvas(trackItem, id, this.playerStore.playStartFrame));
                }
            }
        });
        this.clearCanvas();
        await videoList.reduce((chain, nextPromise) => chain.then(() => nextPromise()), Promise.resolve()); // 顺序绘制，保证视频在底部
        await otherList.reduce((chain, nextPromise) => chain.then(() => nextPromise()), Promise.resolve());
        await this.drawToPlayerCanvas();
    }
    // 预渲染canvas先加载
    drawToRenderCanvas(trackItem: Record<string, any>, id: number, frameIndex: number) {
        return new Promise(resolve => {
            const { sourceWidth, sourceHeight, drawL, drawT, drawW, drawH } = this.computedRect(trackItem, id);
            const { type, start, end, offsetL, name, sourceFrame } = trackItem;
            if (frameIndex > end) {
                resolve(true);
            } else if (isVideo(type)) {
                const frame = Math.max(frameIndex - start + offsetL, 1); // 默认展示首帧
                const blobFrame = this.ffmpeg.getFrame(name, frame);
                createImageBitmap(blobFrame as Blob).then(imageBitmap => {
                    this.renderContext?.drawImage(imageBitmap, 0, 0, sourceWidth, sourceHeight, drawL, drawT, drawW, drawH);
                    resolve(true);
                });
            } else if (type === 'image') {
                const frame = Math.max(frameIndex - start, 1); // 默认展示首帧
                const showFrame = frame % sourceFrame;
                const blobFrame = this.ffmpeg.getGifFrame(name, showFrame === 0 ? sourceFrame : showFrame);
                createImageBitmap(blobFrame as Blob).then(imageBitmap => {
                    this.renderContext?.drawImage(imageBitmap, 0, 0, sourceWidth, sourceHeight, drawL, drawT, drawW, drawH);
                    resolve(true);
                });
            } else if (type === 'text') {
                let { text, color, fontSize } = this.attrStore.trackAttrMap[id];
                if (this.renderContext) {
                    this.renderContext.font = this.getFont(fontSize);
                    this.renderContext.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
                    this.renderContext.fillText(text, drawL, drawT + fontSize);
                }
                resolve(true);
            } else {
                resolve(true);
            }
        });
    }
    // 将预渲染好的canvas进行渲播放器渲染
    async drawToPlayerCanvas() {
        return new Promise(resolve => {
            this.playerContext?.drawImage(this.renderPlayer, 0, 0, this.canvasSize.width, this.canvasSize.height, 0, 0, this.canvasSize.width, this.canvasSize.height);
            resolve(true);
        });
    }
    /**
     * 预抽帧
     * */
    async preGenFrame() {
        return new Promise(resolve => {
            this.playerStore.isPause && (this.loading.value = true);
            const promiseList: Array<any> = [];
            this.playerStore.playTargetTrackMap.forEach((trackItem: Record<string, any>, id: number) => {
                if (isVideo(trackItem.type)) {
                    const { name, format, width, height, start } = trackItem;
                    const diffFrame = this.playerStore.playStartFrame - start;
                    const targetTime = Math.floor(diffFrame / 30);
                    promiseList.push(() => this.ffmpeg.genPlayFrame(name, format, {
                        w: width,
                        h: height
                    }, targetTime)); // 预加载当前秒
                    promiseList.push(() => this.ffmpeg.genPlayFrame(name, format, {
                        w: width,
                        h: height
                    }, targetTime + 1)); // 预加载 + 1秒
                    promiseList.push(() => this.ffmpeg.genPlayFrame(name, format, {
                        w: width,
                        h: height
                    }, targetTime + 2)); // 预加载 + 2秒
                }
            });
            promiseList.push(() => resolve(true));
            promiseList.reduce((chain, nextPromise) => chain.then(() => {
                return nextPromise();
            }), Promise.resolve());
            this.playerStore.isPause && (this.loading.value = false);
        });
    }
    // 计算渲染区域
    computedRect(trackItem: Record<string, any>, id: number) {
        return computedItemShowArea(trackItem, this.canvasSize, this.attrStore.trackAttrMap[id]);
    }
}