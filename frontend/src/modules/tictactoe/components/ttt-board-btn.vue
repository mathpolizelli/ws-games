<template>
    <v-btn
        @click="clickSquare"
        :disabled="
            squareValue === 0 && lastPlayAuthor != tictactoeStore.player
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
import { usetictactoeStore } from "../ttt-store.ts";

const props = defineProps({
    row: Number,
    column: Number,
});

const tictactoeStore = usetictactoeStore();

const lastPlayAuthor = ref();

const squareValue = computed(
    () => tictactoeStore.board[props.row][props.column]
);

const squareSymbol = computed(() => {
    console.log(tictactoeStore.player.id);
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
    lastPlayAuthor.value = currentPlayer;
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
