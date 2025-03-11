<template>
    <div>
        <h1>TicTacToe</h1>
        <ttt-board></ttt-board>
        <v-dialog v-model="gameOverModal" width="400px">
            <v-card class="d-flex justify-center">
                <v-card-title class="d-flex justify-center">
                    Game Over!
                </v-card-title>
                <v-card-actions>
                    <v-btn @click="tictactoeStore.restartGame">
                        Restart Game
                    </v-btn>
                    <v-btn to="/">Home</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

import { useAppStore } from "@/app.store";
import { usetictactoeStore } from "../ttt-store";
import { socket } from "@/plugins/websocket";

import TttBoard from "@/modules/tictactoe/components/ttt-board.vue";

const appStore = useAppStore();
const tictactoeStore = usetictactoeStore();
const route = useRoute();

const gameOverModal = computed(() => tictactoeStore.isGameOver);

onMounted(() => {
    appStore.player.id = socket.id;

    tictactoeStore.enterRoom("room" + route.params.id);
});

onUnmounted(() => {
    tictactoeStore.leaveRoom("room" + route.params.id);
});
</script>
