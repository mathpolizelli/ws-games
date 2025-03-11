<template>
    <v-btn
        @click="clickSquare"
        :disabled="
            squareValue === 0 && lastPlayAuthorId != appStore.player.id
                ? false
                : true
        "
        variant="text"
        class="board-btn"
    >
        {{ squareSymbol }}
    </v-btn>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { socket } from "@/plugins/websocket";
import { useAppStore } from "@/app.store";
import { usetictactoeStore } from "../ttt-store.ts";

const props = defineProps({
    row: Number,
    column: Number,
});

const appStore = useAppStore();
const tictactoeStore = usetictactoeStore();

const lastPlayAuthorId = ref();

const squareValue = computed(
    () => tictactoeStore.board[props.row][props.column]
);

const squareSymbol = computed(() => {
    if (squareValue.value == 0) return "";
    return squareValue.value == 1 ? "X" : "O";
});

const clickSquare = () => {
    tictactoeStore.changeSquare(
        props.row,
        props.column,
        tictactoeStore.playIndex % 2 == 0 ? 1 : 2
    );
};

socket.on("changeSquare", (currentBoard, currentPlayer) => {
    lastPlayAuthorId.value = currentPlayer;
});
</script>

<style scoped>
.board-btn {
    font: 50px arial;
}

.v-btn--disabled {
    opacity: 1;
}
</style>
