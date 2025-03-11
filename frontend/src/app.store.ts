import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { socket } from "@/plugins/websocket";

export const useAppStore = defineStore("app", () => {
    const player = ref({ id: "", name: localStorage.getItem("user") });

    const isLoggedIn = computed(() => {
        return localStorage.getItem("user") != null;
    });

    return { player, isLoggedIn };
});
