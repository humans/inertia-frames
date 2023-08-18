<script setup>
import { inject, onMounted, ref } from "vue";

const { page } = defineProps({
    page: {},
});

const pages = inject("inertia-frames-vue::pages");
const frame = inject("inertia-frames-vue::frame");

let component = ref();
let status = ref("processing");

onMounted(() => {
    pages[`${page.path}.vue`]().then((module) => {
        component.value = module.default;
        status.value = "rendered";
    });
});
</script>

<template>
    <div>
        <div v-if="status === 'processing'">Processing</div>

        <div v-if="status === 'failed'">Could not render page</div>

        <Component
            :is="component"
            v-bind="{
                ...page.properties,
                frame,
            }"
            v-if="status === 'rendered'"
        />
    </div>
</template>

<style scoped></style>
