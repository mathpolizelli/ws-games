import { createRouter, createWebHistory } from "vue-router";
import { useRoute } from "vue-router";
import Home from "../modules/base/views/home.vue";
import Empty from "@/modules/base/views/empty.vue";
import { usetictactoeStore } from "@/modules/tictactoe/ttt-store";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/modules/base/views/login.vue"),
        },
        {
            path: "/tictactoe",
            name: "tictactoe",
            component: Empty,
            children: [
                {
                    path: "",
                    name: "tictactoerooms",
                    component: () =>
                        import("@/modules/tictactoe/views/ttt-rooms.vue"),
                },
                {
                    path: ":id",
                    name: "tictactoeboard",
                    component: () =>
                        import("@/modules/tictactoe/views/tictactoe.vue"),
                },
            ],
        },
        {
            path: "/admin",
            name: "admin",
            component: () => import("@/admin/admin.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const route = useRoute()
    const tictactoeStore = usetictactoeStore()

    if (to.name != "login" && localStorage.getItem("user") == null)
        return next({ name: "login" });

    // if(to.name == "tictactoeboard") tictactoeStore.

    if(from.name == "tictactoeboard") tictactoeStore.leaveRoom("room"+route.params.id)

    next();
});

export default router;
