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
import Home from "@/client/components/Home/Home";
import About from "@/client/components/About/About";
import Dashboard from "@/client/components/Dashboard/Dashboard";
import News from "@/client/components/News/News";
import auth from '../middle-ware/auth';
import CatalogDetail from "@/client/components/ClientCatalog/CatalogDetail";



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
        meta:{
            middleware: auth
        }
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        children:[
            {
                path:'',
                name:"Home",
                component:Dashboard
            },
            {
                path:'about',
                name:"About",
                component:About
            },
            {
                path:'news',
                name:"News",
                component:News
            },
            {
                path:'catalog-detail',
                name:"CatalogDetail",
                component:CatalogDetail
            },
        ]


    },
    {
        path: "/clients",
        name: "Clients",
        component: Clients,
        meta:{
            middleware: auth
        }
    },
    {
        path: "/loyalty",
        name: "Loyalty",
        component: Loaylty,
        meta:{
            middleware: auth
        }

    },
    {
        path: "/chats",
        name: "Chats",
        component: Chats,
        meta:{
            middleware: auth
        }
    },
    {
        path: "/catalog",
        name: "Catalog",
        component: Catalog,
        meta:{
            middleware: auth
        }
    },
    {
        path:'/analytics',
        name:"Analytics",
        component: Analytics,
        meta:{
            middleware: auth
        }
    },
    {
        path:'/settings',
        name:"Settings",
        component: Settings,
        meta:{
            middleware: auth
        }
    },
    {
        path:'/signup',
        name:"SignUp",
        component: SignUp
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/"
    },
];

const index = createRouter({
    history: createWebHistory(),
    routes,
});

// Creates a nextMiddleware() function which not only
// runs the default next() callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default next() callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router next() callback first.
        context.next(...parameters);
        // Than run the subsequent Middleware with a new
        // nextMiddleware() callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware });
    };
}

index.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ?
            to.meta.middleware : [to.meta.middleware];

        const context = {
            from,
            next,
            router: index,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware });
    }

    return next();
});



export default index;