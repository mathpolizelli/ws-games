<template>
    <login-card></login-card>
</template>

<script setup lang="ts">
import { useAppStore } from "@/app.store";

import loginCard from "../components/login-card.vue";
console.log(useAppStore().isLoggedIn);
</script>
