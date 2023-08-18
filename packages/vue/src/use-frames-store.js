import { defineStore } from "pinia";

export const useFramesStore = defineStore("inertia-frames", {
    state: () => ({
        frames: [],
    }),

    actions: {
        open(frame) {
            this.frames = [
                ...this.frames,
                {
                    $uuid: Symbol(),
                    ...frame,
                },
            ];
        },

        close(frame) {
            if (!frame) {
                return;
            }

            this.frames = this.frames.filter(
                ({ $uuid }) => $uuid !== frame.$uuid,
            );
        },
    },
});
