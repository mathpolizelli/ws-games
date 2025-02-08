import { createRouter, createWebHistory } from "vue-router";
import Home from "../modules/base/views/home.vue";
import Empty from "@/modules/base/views/empty.vue";

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
    if (to.name != "login" && localStorage.getItem("user") == null)
        return next({ name: "login" });

    next();
});

export default router;
