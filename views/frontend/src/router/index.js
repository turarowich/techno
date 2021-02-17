import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/components/dashboard/Dashboard";
import Orders from "@/components/orders/Orders";
import LoayltyProgramm from "@/components/loyalty-programm/LoayltyProgramm";
import Chats from '@/components/chats/Chats';
import Clients from "@/components/clients/Clients";
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
    {
        path: "/clients",
        name: "Clients",
        component: Clients,
    },
    {
        path: "/loyalty",
        name: "LoyaltyProgramm",
        component: LoayltyProgramm,
    },
    {
        path: "/chats",
        name: "Chats",
        component: Chats,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;