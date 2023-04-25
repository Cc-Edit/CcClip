import type { TrackItem } from '@/stores/trackState';
import { baseFps } from '@/data/trackConfig';
import { getId } from '@/utils/common';
/**
 * 格式化 Track Data 补充id 和起始坐标
 * @param itemData 接口节点数据
 * @param startFrame 当前播放指针位置
 * */
export function formatTrackItemData(itemData: Record<string, any>, startFrame: number): TrackItem {
    let { time = 2000, type, frameCount, offsetL = 0, offsetR = 0, start = 0, end = 0, id = getId() } = itemData;
    if (type === 'video') {
        time = frameCount ? parseInt(`${frameCount / baseFps * 1000}`) : time;
    } else {
        frameCount = baseFps * time / 1000;
    }
    let originWidth = (start === 0 && end === 0) ? frameCount : (end - start);
    let endFrame = startFrame + originWidth;
    itemData.main = false;
    const trackItemData = {
        ...itemData,
        id,
        start: startFrame,
        end: endFrame,
        offsetL,
        offsetR,
        time,
        frameCount
    };
    return trackItemData as TrackItem;
}

/**
 * 检查 checkItem 是否与当前 trackList 存在帧重叠部分
 * */
export function checkTrackListOverlap(trackList: TrackItem[], checkItem: TrackItem, moveIndex = -1) {
    const { start: insertStart, end: insertEnd } = checkItem;
    let overLapIndex = -1;
    let insertIndex = 0;
    const hasOverlap = trackList.some((trackItem, index) => {
        if (moveIndex !== -1 && index === moveIndex) { // 行内移动情况下忽略掉移动元素
            return false;
        }
        const { start, end } = trackItem;
        // 当前列表中元素 开始帧处于新元素内部，或结束帧处于新元素内部，则视为重叠
        if (
            (start <= insertStart && end >= insertEnd) // 添加节点的开始和结束位置位于老节点外 或 两端相等
            || (start >= insertStart && start < insertEnd) // 老节点开始位置在添加节点内部
            || (end > insertStart && end <= insertEnd) // 老节点结束位置在添加节点内部
        ) {
            overLapIndex = index;
            return true;
        } else {
            if (end <= insertStart) {
                insertIndex = index + 1;
            }
            return false;
        }
    });
    return {
        hasOverlap,
        overLapIndex,
        insertIndex
    };
}
