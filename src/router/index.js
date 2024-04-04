import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import routes from "../router/routes";

const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: "active",
});

router.beforeEach((to, from) => {
    // console.log("Global befor each:", to, from);

    // canceling a navigation
    // return false

    // redirecting to a location
    // if (to.path === "/tasks") {
    //     return { name: "login" };
    // }

    if (to.meta.auth) {
        return {
            name: 'login',
            query: {
                redicrect: to.fullPath
            }
        }
    }
});

export default router;
