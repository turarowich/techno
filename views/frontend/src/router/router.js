import store from '../store/index';
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
import General from "@/components/settings/General";
import Price from "@/components/settings/Price";
import CatalogDetail from "@/client/components/ClientCatalog/CatalogDetail";
import NewsDetail from "@/client/components/ClientNews/NewsDetail";
import ClientNews from "@/client/components/ClientNews/ClientNews";
import Basket from "@/client/components/Basket/Basket";
import Menu from "@/client/components/CatalogMenu/Menu";
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
import ProductsImport from "@/components/settings/ProductsImport";
import AddNews from "@/components/News/AddNews";
import EditNews from "@/components/News/EditNews";
import EmployeeLogin from "@/client/components/EmployeeLogin";

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
        meta:{
            title:"Orders",
            requiresAuthMain:true,
        }

    },
    {
        path: "/edit-client-page/:id",
        name: "EditClientPage",
        component: EditClientPage,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/push-notification",
        name: "PushNotification",
        component: PushNotification,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/add-promo-page",
        name: "AddPromoPage",
        component: AddPromoPage,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/edit-promo",
        name: "EditPromo",
        component: EditPromo,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/add-product-page",
        name: "AddProductPage",
        component: AddProductPage,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/edit-product-page",
        name: "EditProductPage",
        component: EditProductPage,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/individual-push",
        name: "IndividualPush",
        component: IndividualPush,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/menu/:code",
        name: "Menu",
        component: Menu,
        meta: {
            hideNavbar: true,
        },
    },
    {
        // path: "/shop/:bekon",
        path: "/:bekon",
        name: "Home",
        component: Home,
        meta: {
            hideNavbar: true,
            noScroll:true

        },
        children: [
            {
                path: '',
                name: "Home",
                component: Dashboard,

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
                meta: { disableScroll: true }

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
                path: 'login',
                name: 'EmployeeLogin',
                component: EmployeeLogin,
                meta: {
                    hideNavbar: true
                }
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
        meta:{
            requiresAuthMain:true,
        }
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

        ],
        meta:{
            requiresAuthMain:true,
        }

    },
    {
        path: "/chats",
        name: "Chats",
        component: Chats,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {
            hideNavbar: true,
            requiresAuthMain:true,
        }
    },
    {
        path: "/log",
        name: "Log",
        component: Log,
        meta:{
            requiresAuthMain:true,
        }
    },

    {
        path: "/catalog",
        name: "Catalog",
        component: Catalog,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: '/analytics',
        name: "Analytics",
        component: Analytics,
        meta:{
            requiresAuthMain:true,
        }
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

            },
            {
                path: 'products-import',
                name: 'ProductsImport',
                component: ProductsImport,

            },
        ],
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/news",
        name: "News",
        component: News,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/add-news",
        name: "AddNews",
        component: AddNews,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/edit-news",
        name: "EditNews",
        component: EditNews,
        meta:{
            requiresAuthMain:true,
        }
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
    routes,
    scrollBehavior (to, from, savedPosition) {
     if(savedPosition){
         return savedPosition
     }
     else{
         return {top: 0}
     }
    }

});


//WEB Catalog auth guard.
router.beforeEach((to, from, next) => {
    console.log('router BEFORE EACH');
    const authenticatedUser = store.state.Client.user.auth;
    const current_company_url = store.state.Catalog.company_url;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    const requiresAuthMain = to.matched.some(record => record.meta.requiresAuthMain);
    const token = localStorage.getItem("token");

    // Check for protected route
    if (requiresAuth && !authenticatedUser) {
        //if client catalog
        next({ path: `/${current_company_url}/signin` })
    } else if(token == null && requiresAuthMain){
        //if main crm
        next({ path: '/' })
    }
    else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     console.log('window.scrollY:', window.scrollY)
//     from.meta?.scrollTop && (from.meta.scrollTop = window.scrollY)
//     console.log('from:\t', from.name, '\t', from.meta)
//     console.log('to:\t\t', to.name, '\t', to.meta)
//     return next()
// })
export default router;