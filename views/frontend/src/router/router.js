import { createWebHistory, createRouter } from "vue-router";
// import auth from '../middle-ware/auth';
const SignIn = () => import("@/components/sign-in/SignIn");
const SignUp = () => import("@/components/sign-up/SignUp");
const Orders = () => import("@/components/orders/Orders");
const Loaylty = () => import("@/components/loyalty/Loaylty");
const Chats = () => import('@/components/chats/Chats');
const Clients = () => import("@/components/clients/Clients");
const Catalog = () => import("@/components/catalog/Catalog");
const Analytics = () => import("@/components/analytics/Analytics");
const Settings = () => import("@/components/settings/Settings");
const Home = () => import("@/client/components/Home/Home");
const About = () => import("@/client/components/About/About");
const Dashboard = () => import("@/client/components/Dashboard/Dashboard");
const News = () => import("@/components/News/News");
const CashBack = () => import("@/components/loyalty/CashBack");
const Discount = () => import("@/components/loyalty/Discount");
const PromoCode = () => import("@/components/loyalty/Promocode");
const General = () => import("@/components/settings/General");
const Price = () => import("@/components/settings/Price");
const CatalogDetail = () => import("@/client/components/ClientCatalog/CatalogDetail");
const NewsDetail = () => import("@/client/components/ClientNews/NewsDetail");
const ClientNews = () => import("@/client/components/ClientNews/ClientNews");
const Basket = () => import("@/client/components/Basket/Basket");
const ClientAccount = () => import("@/client/components/ClientAccount/ClientAccount");
const PersonalInfo = () => import("@/client/components/PersonalInfo/PersonalInfo");
const EditProfile = () => import("@/client/components/EditProfile/EditProfile");
const ProductInfo = () => import("@/client/components/product-info/ProductInfo");
const ClientLogin = () => import("@/client/components/ClientLogin");
const ClientRegister = () => import("@/client/components/ClientRegister");
const EditClientPage = () => import("@/components/clients/EditClientPage");
const PushNotification = () => import("@/components/clients/PushNotification");
const AddPromoPage = () => import("@/components/loyalty/AddPromoPage");
const AddProductPage = () => import("@/components/catalog/AddProductPage");
const EditProductPage = () => import("@/components/catalog/EditProductPage");
const IndividualPush = () => import("@/components/clients/IndividualPush");
const CatalogSettings = () => import("@/components/settings/CatalogSettings");
const StaffSettings = () => import("@/components/settings/StaffSettings");
const AccessSettings = () => import("@/components/settings/AccessSettings");
const AddNews = () => import("@/components/News/AddNews");
const EditNews = () => import("@/components/News/EditNews");

const EditPromo = () => import("@/components/loyalty/EditPromo");
const PersonalSettings = () => import("@/components/settings/PersonalSettings");
const AddressDelivery = () => import("@/components/settings/AddressDelivery");
const Log = () => import("@/components/Log/Log");
const Admin = () => import("@/components/admin/Admin") ;




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
        path: "/shop/:bekon",
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
                path:'client-news',
                name:"ClientNews",
                component:ClientNews
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
            {
                path:'signin',
                name:'ClientLogin',
                component:ClientLogin
            },
            {
                path:'signup',
                name:'ClientRegister',
                component:ClientRegister
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
        path:'/analytics',
        name:"Analytics",
        component: Analytics,

    },
    {
        path:'/access-settings',
        name:"AccessSettings",
        component: AccessSettings,

    },
    {
        path:'/settings',
        name:"Settings",
        component: Settings,
        children: [
            {
                path:'',
                name:'General',
                component: General,

            },
            {
                path:'price',
                name:'Price',
                component: Price,

            },
            {
                path:'address-delivery',
                name:'AddressDelivery',
                component: AddressDelivery  ,

            },
            {
                path:'catalog-settings',
                name:'CatalogSettings',
                component: CatalogSettings,

            },
            {
                path:'staff-settings',
                name:'StaffSettings',
                component: StaffSettings,

            },
            {
                path:'personal-settings',
                name:'PersonalSettings',
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
        path:'/signup',
        name:"SignUp",
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