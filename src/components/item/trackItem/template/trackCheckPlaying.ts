import { usePlayerState } from '@/stores/playerState';
import { watchEffect, onBeforeUnmount } from 'vue';
import { isEqual } from 'lodash-es';

export default function setup(props: Record<string, any>) {
    const store = usePlayerState();
    watchEffect(() => {
        const trackItem = props.trackItem;
        if (store.playStartFrame >= trackItem.start && store.playStartFrame <= trackItem.end) {
            const oldPlayTargetTrackMap = store.playTargetTrackMap.get(trackItem.id);
            if (!oldPlayTargetTrackMap || !isEqual(oldPlayTargetTrackMap, trackItem)) {
                store.playTargetTrackMap.set(trackItem.id, trackItem);
            }
        } else {
            store.playTargetTrackMap.has(trackItem.id) && store.playTargetTrackMap.delete(trackItem.id);
        }
    });
    onBeforeUnmount(() => {
        store.playTargetTrackMap.has(props.trackItem.id) && store.playTargetTrackMap.delete(props.trackItem.id);
    });
}