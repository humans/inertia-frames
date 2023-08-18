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
        <Component v-for="frame in store.frames" :is="frame.component">
            <FetchFrame :frame="frame" />
        </Component>
    </div>
</template>

<style scoped></style>
