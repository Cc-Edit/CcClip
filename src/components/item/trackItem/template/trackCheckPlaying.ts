import { usePlayerState } from '@/stores/playerState';
import { watchEffect, onBeforeUnmount } from 'vue';
export default function setup(props: Record<string, any>) {
    const store = usePlayerState();
    watchEffect(() => {
        const trackItem = props.trackItem;
        if (store.playStartFrame >= trackItem.start && store.playStartFrame <= trackItem.end) {
            !store.playTargetTrackMap.has(trackItem.id) && store.playTargetTrackMap.set(trackItem.id, trackItem);
        } else {
            store.playTargetTrackMap.has(trackItem.id) && store.playTargetTrackMap.delete(trackItem.id);
        }
    });
    onBeforeUnmount(() => {
        store.playTargetTrackMap.has(props.trackItem.id) && store.playTargetTrackMap.delete(props.trackItem.id);
    });
}