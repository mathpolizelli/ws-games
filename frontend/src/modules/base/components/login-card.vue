<template>
    <div class="w-100 h-75 d-flex justify-center align-center">
        <v-card
            width="500px"
            class="d-flex flex-column align-center justify-center px-6 pb-4"
        >
            <v-card-title>Welcome to WS games!</v-card-title>
            <v-card-subtitle>What is you name?</v-card-subtitle>
            <v-text-field
                v-model="text"
                density="comfortable"
                :rules="[inputRules.required]"
                variant="outlined"
                width="100%"
                class="mt-4 mb-2"
            ></v-text-field>
            <v-btn
                block
                :disabled="!text"
                variant="outlined"
                @click="createUser"
            >
                Play
            </v-btn>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const text = ref("");
const inputRules = { required: (value) => !!value || "Field is required" };

const createUser = () => {
    localStorage.setItem("user", text.value);
    router.push({ name: "tictactoerooms" });
};
</script>
