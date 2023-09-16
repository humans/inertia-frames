<script setup>
import { useFramesStore } from "./use-frames-store";
import FetchFrame from "./FetchFrame.vue";
import { provide } from "vue";

const store = useFramesStore();

const { pages } = defineProps({
    pages: {},
});

provide("inertia-frames-vue::pages", pages);
</script>

<template>
    <div>
        <Component v-for="frame in store.frames" :is="frame.component" :frame="frame">
            <Teleport :to="frame.target ?? 'body'">
                <FetchFrame :frame="frame">
                    <template #processing>
                        <slot name="processing"></slot>
                    </template>

                    <template #failed>
                        <slot name="failed"></slot>
                    </template>
                </FetchFrame>
            </Teleport>
        </Component>
    </div>
</template>

<style scoped></style>
