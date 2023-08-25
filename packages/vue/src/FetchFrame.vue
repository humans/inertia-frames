<script setup>
import { onMounted, provide, ref } from "vue";
import RenderFrame from "./RenderFrame.vue";

const { frame } = defineProps({
    frame: {
        required: true,
    },
});

provide("inertia-frames-vue::frame", frame);

let status = ref("processing");
let page = ref({});

onMounted(async () => {
    try {
        page.value = await fetch(frame.url, {
            headers: { "X-Inertia-Frame": "Yes" },
        }).then((response) => response.json());

        status.value = "loaded";
    } catch (e) {
        status.value = "failed";
    }
});
</script>

<template>
    <div>
        <div v-if="status === 'processing'">
          <slot name="processing"></slot>
        </div>

        <div v-if="status === 'failed'">
          <slot name="failed"></slot>
        </div>

        <RenderFrame v-if="status === 'loaded'" :page="page" />
    </div>
</template>

<style scoped></style>
