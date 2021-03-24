import { createWebHistory, createRouter } from "vue-router";
import SignIn from "@/components/sign-in/SignIn";
import SignUp from "@/components/sign-up/SignUp";
import Orders from "@/components/orders/Orders";
import Loaylty from "@/components/loyalty/Loaylty";
import Chats from '@/components/chats/Chats';
import Clients from "@/components/clients/Clients";
import Catalog from "@/components/catalog/Catalog";
import Analytics from "@/components/analytics/Analytics";
import Settings from "@/components/settings/Settings";
const routes = [
    {
        path: "/",
        name: "SignIn",
        component: SignIn,
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
        name: "Loyalty",
        component: Loaylty,

    },
    {
        path: "/chats",
        name: "Chats",
        component: Chats,
    },
    {
        path: "/catalog",
        name: "Catalog",
        component: Catalog,
    },
    {
        path:'/analytics',
        name:"Analytics",
        component: Analytics
    },
    {
        path:'/settings',
        name:"Settings",
        component: Settings
    },
    {
        path:'/signup',
        name:"SignUp",
        component: SignUp
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;