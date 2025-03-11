<template>
    <v-list-item :value="id" @click="navigateToRoom">
        Room {{ id }}
        <template v-slot:append>0 / 2</template>
    </v-list-item>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { usetictactoeStore } from "../ttt-store";

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const router = useRouter();
const tictactoeStore = usetictactoeStore();

const navigateToRoom = () => {
    router.push({ name: "tictactoeboard", params: { id: props.id } });
};
</script>
