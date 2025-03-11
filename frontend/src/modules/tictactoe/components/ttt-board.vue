<template>
    <v-container class="d-flex flex-column justify-center align-center">
        <v-row class="board-row">
            <ttt-board-btn
                :row="0"
                :column="0"
                :value="board[0][0]"
            ></ttt-board-btn>
            <v-divider vertical :thickness="5"></v-divider>
            <ttt-board-btn
                :row="0"
                :column="1"
                :value="board[0][1]"
            ></ttt-board-btn>
            <v-divider vertical :thickness="5"></v-divider>
            <ttt-board-btn
                :row="0"
                :column="2"
                :value="board[0][2]"
            ></ttt-board-btn>
            <v-divider :thickness="5"></v-divider>
        </v-row>
        <v-row class="board-row">
            <ttt-board-btn
                :row="1"
                :column="0"
                :value="board[1][0]"
            ></ttt-board-btn>
            <v-divider vertical :thickness="5"></v-divider>
            <ttt-board-btn
                :row="1"
                :column="1"
                :value="board[1][1]"
            ></ttt-board-btn>
            <v-divider vertical :thickness="5"></v-divider>
            <ttt-board-btn
                :row="1"
                :column="2"
                :value="board[1][2]"
            ></ttt-board-btn>
            <v-divider :thickness="5"></v-divider>
        </v-row>
        <v-row class="board-row">
            <ttt-board-btn
                :row="2"
                :column="0"
                :value="board[2][0]"
            ></ttt-board-btn>
            <v-divider vertical :thickness="5"></v-divider>
            <ttt-board-btn
                :row="2"
                :column="1"
                :value="board[2][1]"
            ></ttt-board-btn>
            <v-divider vertical :thickness="5"></v-divider>
            <ttt-board-btn
                :row="2"
                :column="2"
                :value="board[2][2]"
            ></ttt-board-btn>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";

import { usetictactoeStore } from "../ttt-store.ts";
import { socket } from "@/plugins/websocket";

import TttBoardBtn from "./ttt-board-btn.vue";

const tictactoeStore = usetictactoeStore();

const board = computed(() => tictactoeStore.board);

const handleChangeSquare = (currentBoard: any, currentPlayer: any) => {
    tictactoeStore.board = currentBoard;
    tictactoeStore.playIndex++;
};

onMounted(() => {
    socket.on("changeSquare", handleChangeSquare);
});

onUnmounted(() => {
    socket.off("changeSquare", handleChangeSquare);
});
</script>

<style scoped>
.board-row {
    width: 308px;
}

.board-btn {
    width: 100px;
    height: 100px;

    border: 0;
    border-radius: 0;
}

.horizontal-divider {
    width: 100px;
}
</style>
