import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/components/dashboard/Dashboard";
import Orders from "@/components/orders/Orders";
const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/orders",
        name: "Orders",
        component: Orders,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;