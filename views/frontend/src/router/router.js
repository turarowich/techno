import store from '../store/index';
import { createWebHistory, createRouter } from "vue-router";
import SignIn from "@/components/sign-in/SignIn";
import SignUp from "@/components/sign-up/SignUp";
import Orders from "@/components/orders/Orders";
import Sample from "@/components/Sample/Sample";
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
import Workers from "@/components/workers/Workers";
import CashBack from "@/components/loyalty/CashBack";
import Discount from "@/components/loyalty/Discount";
import PromoCode from "@/components/loyalty/Promocode";
import General from "@/components/settings/General";
import CatalogDetail from "@/client/components/ClientCatalog/CatalogDetail";
import NewsDetail from "@/client/components/ClientNews/NewsDetail";
import ClientNews from "@/client/components/ClientNews/ClientNews";
import Basket from "@/client/components/Basket/Basket";
import Menu from "@/client/components/CatalogMenu/Menu";
import ClientAccount from "@/client/components/ClientAccount/ClientAccount";
import ClientInfoModal from "@/components/clients/ClientInfoModal";
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
import AddWorkers from "@/components/workers/AddWorker";
import EditWorkers from "@/components/workers/EditWorker";
import EmployeeLogin from "@/client/components/EmployeeLogin";


import EditPromo from "@/components/loyalty/EditPromo";
import PersonalSettings from "@/components/settings/PersonalSettings";
import AddressDelivery from "@/components/settings/AddressDelivery";
import Log from "@/components/Log/Log";
import Admin from "@/components/admin/Admin";

import AdminLogin from "@/components/admin/AdminLogin";
import AdminNav from "@/components/admin/AdminNav";
import CatalogImport from "@/components/admin/CatalogImport";



const routes = [
    {
        path: "/client_info/:company_id/:client_id",
        name: "ClientInfoModal",
        component: ClientInfoModal,
        meta: {
            hideNavbar: true,
            hideForAuth: true
        }
    },
    {
        path: "/",
        name: "SignIn",
        component: SignIn,
        meta: {
            hideNavbar: true,
            hideForAuth: true
        }
    },
    {
        path: "/orders",
        name: "Заказы",
        component: Orders,
        meta:{
            title:"Orders",
            requiresAuthMain:true,
        }

    },
    {
        path: "/sample",
        name: "Образец",
        component: Sample,
        meta:{
            title:"Sample",
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
            // {
            //     path: "client_info/:client_id",
            //     name: "ClientInfoModal",
            //     component: ClientInfoModal,
            //     meta: {
            //         hideNavbar: true,
            //         hideForAuth: true
            //     }
            // },
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
        name: "Клиенты",
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
        name: "Чаты",
        component: Chats,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/admin",
        name: "AdminNav",
        component: AdminNav,
        meta: {
            hideNavbar: true,
            requiresAuthAdmin:true,
        },
        children: [
            {
                path: 'company-list',
                name: 'CompanyList',
                component: Admin,
            },
            {
                path: 'catalog-import',
                name: 'CatalogImport',
                component: CatalogImport,
            },
        ],
    },
    {
        path: "/adminLogin",
        name: "AdminLogin",
        component: AdminLogin,
        meta: {
            hideNavbar: true,
            requiresAuthMain:false,
        },
        children: [
        ],
    },

    {
        path: "/log",
        name: "Логи",
        component: Log,
        meta:{
            requiresAuthMain:true,
        }
    },

    {
        path: "/catalog",
        name: "Каталог",
        component: Catalog,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: '/analytics',
        name: "Аналитика",
        component: Analytics,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: '/settings',
        name: "Настройки",
        component: Settings,
        children: [
            {
                path: '',
                name: 'General',
                component: General,

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
        name: "Новости",
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
        path: "/workers",
        name: "Работники",
        component: Workers,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/add-workers",
        name: "AddWorkers",
        component: AddWorkers,
        meta:{
            requiresAuthMain:true,
        }
    },
    {
        path: "/edit-worker-page/:id",
        name: "Работник",
        component: EditWorkers,
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
    const authenticatedUser = store.state.Client.user.auth;
    const current_company_url = store.state.Catalog.company_url;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresAuthMain = to.matched.some(record => record.meta.requiresAuthMain);
    const requiresAuthAdmin = to.matched.some(record => record.meta.requiresAuthAdmin);
    const hideForAuth = to.matched.some(record => record.meta.hideForAuth);

    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const token = localStorage.getItem("token");

    // Check for protected route
    if (requiresAuth && !authenticatedUser) {
        //if client catalog
        next({ path: `/${current_company_url}/signin` });
    } else if(token == null && requiresAuthMain){
        //if main crm
        next({ path: '/' });
    } else if(tokenAdmin == null && requiresAuthAdmin){
        console.log("router only s admin")
        next({ path: '/' });
    }
    else {
        if(token && hideForAuth){
            next({ path: '/orders' });
        }
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
