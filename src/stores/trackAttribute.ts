import { reactive, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { getJsonParse } from '@/utils/common';

export const useTrackAttrState = defineStore('trackAttrState', () => {
    const trackAttrMap = reactive(localStorage.trackAttr ? getJsonParse(localStorage.trackAttr) : {});

    function initTrackAttr(id: string) {
        if (!trackAttrMap[id]) trackAttrMap[id] = {};
    }
    function setTrackAttr(id: string, data: Record<string, any>) {
        initTrackAttr(id);
        for (let key in data) {
            trackAttrMap[id][key] = data[key];
        }
    }
    function deleteTrack(id: string) {
        if (trackAttrMap[id]) {
            delete trackAttrMap[id];
        }
    }
    watchEffect(() => {
        console.log(`trackAttrMap change`);
        localStorage.trackAttr = JSON.stringify(trackAttrMap);
    });
    return {
        trackAttrMap,
        initTrackAttr,
        setTrackAttr,
        deleteTrack
    };
});
