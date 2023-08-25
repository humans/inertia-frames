import { ref, nextTick } from 'vue'
import { defineStore } from "pinia";

export const useFramesStore = defineStore("inertia-frames", () => {
    const frames = ref([])

    function toggleFrame ($$id) {
        frames.value = frames.value.map((frame) => {
            if (frame.$$id === $$id) {
                frame.active = ! frame.active
            }

            return frame
        })
    }

    function open (frame) {
        const transition = frame?.transition || 300

        let $$id = Symbol()

        frames.value = frames.value.concat({
            $$id,
            transition,
            active: false,
            ...frame,
        })

        nextTick(() => toggleFrame($$id))
    }

    function close ({ transition, $$id }) {
        toggleFrame($$id)

        setTimeout(() => {
            frames.value = frames.value.filter(
                (frame) => frame.$$id !== $$id,
            );
        }, transition * 1.2)
    }

    return { frames, open, close }
});
