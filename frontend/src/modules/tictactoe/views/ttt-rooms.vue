<template>
    <div class="w-100 h-75 d-flex justify-center align-center">
        <v-card width="500px">
            <v-card-title>Rooms</v-card-title>
            <v-divider></v-divider>
            <v-list>
                <ttt-room-btn :id="1"></ttt-room-btn>
                <ttt-room-btn :id="2"></ttt-room-btn>
                <ttt-room-btn :id="3"></ttt-room-btn>
                <ttt-room-btn :id="4"></ttt-room-btn>
                <ttt-room-btn :id="5"></ttt-room-btn>
            </v-list>
        </v-card>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import tttRoomBtn from "../components/ttt-room-btn.vue";
</script>
