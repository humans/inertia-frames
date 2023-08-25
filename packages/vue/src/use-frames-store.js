import { ref, nextTick } from 'vue'
import { defineStore } from "pinia";

export const useFramesStore = defineStore("inertia-frames", () => {
    const frames = ref([])

    function open (frame) {
        const transition = frame?.transition || 300

        let $$id = Symbol()

        frames.value = frames.value.concat({
            $$id,
            transition,
            active: false,
            ...frame,
        })

        nextTick(() => {
            frames.value = frames.value.map((frame) => {
                if (frame.$$id === $$id) {
                    frame.active = true
                }

                return frame
            })
        })
    }

    function close ({ transition, $$id }) {
        frames.value = frames.value.map((frame) => {
            if (frame.$$id === $$id) {
                frame.active = false
            }

            return frame
        })

        setTimeout(() => {
            frames.value = frames.value.filter(
                (frame) => frame.$$id !== $$id,
            );
        }, transition * 1.2)
    }

    return { frames, open, close }
});
