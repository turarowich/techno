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
import News from "@/components/News/News";
import CashBack from "@/components/loyalty/CashBack";
import Discount from "@/components/loyalty/Discount";
import PromoCode from "@/components/loyalty/Promocode";
// import auth from '../middle-ware/auth';
import CatalogDetail from "@/client/components/ClientCatalog/CatalogDetail";
import NewsDetail from "@/client/components/News/NewsDetail";
import Basket from "@/client/components/Basket/Basket";
import ClientAccount from "@/client/components/ClientAccount/ClientAccount";
import PersonalInfo from "@/client/components/PersonalInfo/PersonalInfo";
import EditProfile from "@/client/components/EditProfile/EditProfile";
import ProductInfo from "@/client/components/product-info/ProductInfo";



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
                path:'product-info',
                name:"ProductInfo",
                component:ProductInfo
            },
            {
                path:'catalog-detail/:id',
                name:"CatalogDetail",
                component:CatalogDetail,

            },
            {
                path:'news-detail',
                name:"NewsDetail",
                component:NewsDetail
            },
            {
                path:'basket',
                name:"Shopping cart",
                component:Basket
            },
            {
                path:'client-account',
                name:"ClientAccount",
                component:ClientAccount
            },
            {
                path:'personal-info',
                name:'PersonalInfo',
                component:PersonalInfo
            },
            {
                path:'edit-profile',
                name:'EditProfile',
                component:EditProfile
            },
        ],



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
        children: [
            {
                path: '',
                name:'CashBack',
                component:CashBack
            },
            {
                path: 'promocode',
                name:'PromoCode',
                component:PromoCode
            },
            {
                path: 'discount',
                name:'Discount',
                component:Discount
            },

        ]


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
        component: Analytics,

    },
    {
        path:'/settings',
        name:"Settings",
        component: Settings,

    },
    {
        path: "/news",
        name: "News",
        component: News,

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
]



const router = createRouter({
    history: createWebHistory(),
    scrollBehavior (to,from ,savedPosition) {
        if(savedPosition){
            return savedPosition
        }
        return { top:0}
    },
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

router.beforeEach((to, from, next) => {

    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ?
            to.meta.middleware : [to.meta.middleware];

        const context = {
            from,
            next,
            router: router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware });
    }

    return next();
});



export default router;