import store from '../store/index';
import { createWebHistory, createRouter } from "vue-router";
// import auth from '../middle-ware/auth';
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
import General from "@/components/settings/General";
import Price from "@/components/settings/Price";
import CatalogDetail from "@/client/components/ClientCatalog/CatalogDetail";
import NewsDetail from "@/client/components/ClientNews/NewsDetail";
import ClientNews from "@/client/components/ClientNews/ClientNews";
import Basket from "@/client/components/Basket/Basket";
import ClientAccount from "@/client/components/ClientAccount/ClientAccount";
import PersonalInfo from "@/client/components/PersonalInfo/PersonalInfo";
import EditProfile from "@/client/components/EditProfile/EditProfile";
import ProductInfo from "@/client/components/product-info/ProductInfo";
import ClientLogin from "@/client/components/ClientLogin";
import ClientRegister from "@/client/components/ClientRegister";
import EditClientPage from "@/components/clients/EditClientPage";
import PushNotification from "@/components/clients/PushNotification";
import AddPromoPage from "@/components/loyalty/AddPromoPage";
import AddProductPage from "@/components/catalog/AddProductPage";
import EditProductPage from "@/components/catalog/EditProductPage";
import IndividualPush from "@/components/clients/IndividualPush";
import CatalogSettings from "@/components/settings/CatalogSettings";
import StaffSettings from "@/components/settings/StaffSettings";
import AccessSettings from "@/components/settings/AccessSettings";
import AddNews from "@/components/News/AddNews";
import EditNews from "@/components/News/EditNews";

import EditPromo from "@/components/loyalty/EditPromo";
import PersonalSettings from "@/components/settings/PersonalSettings";
import AddressDelivery from "@/components/settings/AddressDelivery";
import Log from "@/components/Log/Log";
import Admin from "@/components/admin/Admin";





const routes = [
    {
        path: "/",
        name: "SignIn",
        component: SignIn,
        meta: {
            hideNavbar: true,
        }
    },
    {
        path: "/orders",
        name: "Orders",
        component: Orders,

    },

    {
        path: "/edit-client-page",
        name: "EditClientPage",
        component: EditClientPage,

    },
    {
        path: "/push-notification",
        name: "PushNotification",
        component: PushNotification,

    },
    {
        path: "/add-promo-page",
        name: "AddPromoPage",
        component: AddPromoPage,

    },
    {
        path: "/edit-promo",
        name: "EditPromo",
        component: EditPromo,

    },
    {
        path: "/add-product-page",
        name: "AddProductPage",
        component: AddProductPage,

    },
    {
        path: "/edit-product-page",
        name: "EditProductPage",
        component: EditProductPage,

    },
    {
        path: "/individual-push",
        name: "IndividualPush",
        component: IndividualPush,

    },

    {
        // path: "/shop/:bekon",
        path: "/:bekon",
        name: "Home",
        component: Home,
        meta: {
            hideNavbar: true,
        },
        children: [
            {
                path: '',
                name: "Home",
                component: Dashboard
            },
            {
                path: 'about',
                name: "About",
                component: About,
                meta: {
                    hideNavbar: true,
                },
            },
            {
                path: 'news',
                name: "News",
                component: News
            },
            {
                path: 'client-news',
                name: "ClientNews",
                component: ClientNews
            },
            {
                path: 'product-info',
                name: "ProductInfo",
                component: ProductInfo
            },
            {
                path: 'catalog-detail/:id',
                name: "CatalogDetail",
                component: CatalogDetail,

            },
            {
                path:'news-detail/:id',
                name:"NewsDetail",
                component:NewsDetail
            },
            {
                path: 'basket',
                name: "Shopping cart",
                component: Basket
            },
            {
                path:'client-account',
                name:"ClientAccount",
                component:ClientAccount,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:'personal-info',
                name:'PersonalInfo',
                component:PersonalInfo,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path:'edit-profile',
                name:'EditProfile',
                component:EditProfile,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'signin',
                name: 'ClientLogin',
                component: ClientLogin
            },
            {
                path: 'signup',
                name: 'ClientRegister',
                component: ClientRegister
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
                name: 'CashBack',
                component: CashBack
            },
            {
                path: 'promocode',
                name: 'PromoCode',
                component: PromoCode
            },
            {
                path: 'discount',
                name: 'Discount',
                component: Discount
            },

        ]


    },
    {
        path: "/chats",
        name: "Chats",
        component: Chats,

    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {
            hideNavbar: true,
        }
    },
    {
        path: "/log",
        name: "log",
        component: Log,

    },

    {
        path: "/catalog",
        name: "Catalog",
        component: Catalog,

    },
    {
        path: '/analytics',
        name: "Analytics",
        component: Analytics,

    },
    {
        path: '/access-settings',
        name: "AccessSettings",
        component: AccessSettings,

    },
    {
        path: '/settings',
        name: "Settings",
        component: Settings,
        children: [
            {
                path: '',
                name: 'General',
                component: General,

            },
            {
                path: 'price',
                name: 'Price',
                component: Price,

            },
            {
                path: 'address-delivery',
                name: 'AddressDelivery',
                component: AddressDelivery,

            },
            {
                path: 'catalog-settings',
                name: 'CatalogSettings',
                component: CatalogSettings,

            },
            {
                path: 'staff-settings',
                name: 'StaffSettings',
                component: StaffSettings,

            },
            {
                path: 'personal-settings',
                name: 'PersonalSettings',
                component: PersonalSettings,

            }
        ]

    },
    {
        path: "/news",
        name: "News",
        component: News,

    },
    {
        path: "/add-news",
        name: "AddNews",
        component: AddNews,

    },
    {
        path: "/edit-news",
        name: "EditNews",
        component: EditNews,

    },
    {
        path: '/signup',
        name: "SignUp",
        component: SignUp,
        meta: {
            hideNavbar: true,
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/"
    },
]



const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
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
        subsequentMiddleware({ ...context, next: nextMiddleware });
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

        return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});
//WEB Catalog auth guard.
router.beforeEach((to, from, next) => {
    const authenticatedUser = store.state.Client.user.auth;
    const current_company_url = store.state.Catalog.company_url;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // Check for protected route
    if (requiresAuth && !authenticatedUser) next({ path: `/shop/${current_company_url}/signin` })
    else next();
});

export default router;