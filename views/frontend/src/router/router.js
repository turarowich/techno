import { createWebHistory, createRouter } from "vue-router";
// import auth from '../middle-ware/auth';
const SignIn = "@/components/sign-in/SignIn";
const SignUp = "@/components/sign-up/SignUp";
const Orders = "@/components/orders/Orders";
const Loaylty = "@/components/loyalty/Loaylty";
const Chats = '@/components/chats/Chats';
const Clients = "@/components/clients/Clients";
const Catalog = "@/components/catalog/Catalog";
const Analytics = "@/components/analytics/Analytics";
const Settings = "@/components/settings/Settings";
const Home = "@/client/components/Home/Home";
const About = "@/client/components/About/About";
const Dashboard = "@/client/components/Dashboard/Dashboard";
const News = "@/components/News/News";
const CashBack = "@/components/loyalty/CashBack";
const Discount = "@/components/loyalty/Discount";
const PromoCode = "@/components/loyalty/Promocode";
const General = "@/components/settings/General";
const Price = "@/components/settings/Price";
const CatalogDetail = "@/client/components/ClientCatalog/CatalogDetail";
const NewsDetail = "@/client/components/ClientNews/NewsDetail";
const ClientNews = "@/client/components/ClientNews/ClientNews";
const Basket = "@/client/components/Basket/Basket";
const ClientAccount = "@/client/components/ClientAccount/ClientAccount";
const PersonalInfo = "@/client/components/PersonalInfo/PersonalInfo";
const EditProfile = "@/client/components/EditProfile/EditProfile";
const ProductInfo = "@/client/components/product-info/ProductInfo";
const ClientLogin = "@/client/components/ClientLogin";
const ClientRegister = "@/client/components/ClientRegister";
const EditClientPage = "@/components/clients/EditClientPage";
const PushNotification = "@/components/clients/PushNotification";
const AddPromoPage = "@/components/loyalty/AddPromoPage";
const AddProductPage = "@/components/catalog/AddProductPage";
const EditProductPage = "@/components/catalog/EditProductPage";
const IndividualPush = "@/components/clients/IndividualPush";
const CatalogSettings = "@/components/settings/CatalogSettings";
const StaffSettings = "@/components/settings/StaffSettings";
const AccessSettings = "@/components/settings/AccessSettings";
const AddNews = "@/components/News/AddNews";
const EditNews = "@/components/News/EditNews";

const EditPromo = "@/components/loyalty/EditPromo";
const PersonalSettings = "@/components/settings/PersonalSettings";
const AddressDelivery = "@/components/settings/AddressDelivery";
const Log = "@/components/Log/Log";
const Admin = "@/components/admin/Admin";

function lazyLoad(view) {
    return () => import(`${view}.vue`)
}


const routes = [
    {
        path: "/",
        name: "SignIn",
        component: lazyLoad(SignIn),

    },
    {
        path: "/orders",
        name: "Orders",
        component: lazyLoad(Orders),

    },

    {
        path: "/edit-client-page",
        name: "EditClientPage",
        component: lazyLoad(EditClientPage),

    },
    {
        path: "/push-notification",
        name: "PushNotification",
        component: lazyLoad(PushNotification),

    },
    {
        path: "/add-promo-page",
        name: "AddPromoPage",
        component: lazyLoad(AddPromoPage),

    },
    {
        path: "/edit-promo",
        name: "EditPromo",
        component: lazyLoad(EditPromo),

    },
    {
        path: "/add-product-page",
        name: "AddProductPage",
        component: lazyLoad(AddProductPage),

    },
    {
        path: "/edit-product-page",
        name: "EditProductPage",
        component: lazyLoad(EditProductPage),

    },
    {
        path: "/individual-push",
        name: "IndividualPush",
        component: lazyLoad(IndividualPush),

    },

    {
        path: "/shop/:bekon",
        name: "Home",
        component: lazyLoad(Home),
        children:[
            {
                path:'',
                name:"Home",
                component:lazyLoad(Dashboard)
            },
            {
                path:'about',
                name:"About",
                component: lazyLoad(About)
            },
            {
                path:'news',
                name:"News",
                component:lazyLoad(News)
            },
            {
                path:'client-news',
                name:"ClientNews",
                component:lazyLoad(ClientNews)
            },
            {
                path:'product-info',
                name:"ProductInfo",
                component:lazyLoad(ProductInfo)
            },
            {
                path:'catalog-detail/:id',
                name:"CatalogDetail",
                component:lazyLoad(CatalogDetail),

            },
            {
                path:'news-detail',
                name:"NewsDetail",
                component:lazyLoad(NewsDetail)
            },
            {
                path:'basket',
                name:"Shopping cart",
                component:lazyLoad(Basket)
            },
            {
                path:'client-account',
                name:"ClientAccount",
                component:lazyLoad(ClientAccount)
            },
            {
                path:'personal-info',
                name:'PersonalInfo',
                component: lazyLoad(PersonalInfo)
            },
            {
                path:'edit-profile',
                name:'EditProfile',
                component: lazyLoad(EditProfile)
            },
            {
                path:'signin',
                name:'ClientLogin',
                component: lazyLoad(ClientLogin)
            },
            {
                path:'signup',
                name:'ClientRegister',
                component: lazyLoad(ClientRegister)
            },
        ],



    },
    {
        path: "/clients",
        name: "Clients",
        component: lazyLoad(Clients),

    },
    {
        path: "/loyalty",
        name: "Loyalty",
        component: lazyLoad(Loaylty),
        children: [
            {
                path: '',
                name:'CashBack',
                component: lazyLoad(CashBack)
            },
            {
                path: 'promocode',
                name:'PromoCode',
                component: lazyLoad(PromoCode)
            },
            {
                path: 'discount',
                name:'Discount',
                component: lazyLoad(Discount)
            },

        ]


    },
    {
        path: "/chats",
        name: "Chats",
        component: lazyLoad(Chats),

    },
    {
        path: "/admin",
        name: "Admin",
        component: lazyLoad(Admin),

    },
    {
        path: "/log",
        name: "log",
        component: lazyLoad(Log),

    },

    {
        path: "/catalog",
        name: "Catalog",
        component: lazyLoad(Catalog),

    },
    {
        path:'/analytics',
        name:"Analytics",
        component: lazyLoad(Analytics),

    },
    {
        path:'/access-settings',
        name:"AccessSettings",
        component: lazyLoad(AccessSettings),

    },
    {
        path:'/settings',
        name:"Settings",
        component: lazyLoad(Settings),
        children: [
            {
                path:'',
                name:'General',
                component: lazyLoad(General),

            },
            {
                path:'price',
                name:'Price',
                component: lazyLoad(Price),

            },
            {
                path:'address-delivery',
                name:'AddressDelivery',
                component: lazyLoad(AddressDelivery),

            },
            {
                path:'catalog-settings',
                name:'CatalogSettings',
                component: lazyLoad(CatalogSettings),

            },
            {
                path:'staff-settings',
                name:'StaffSettings',
                component: lazyLoad(StaffSettings),

            },
            {
                path:'personal-settings',
                name:'PersonalSettings',
                component: lazyLoad(PersonalSettings),

            }
        ]

    },
    {
        path: "/news",
        name: "News",
        component: lazyLoad(News),

    },
    {
        path: "/add-news",
        name: "AddNews",
        component: lazyLoad(AddNews),

    },
    {
        path: "/edit-news",
        name: "EditNews",
        component: lazyLoad(EditNews),

    },
    {
        path:'/signup',
        name:"SignUp",
        component: lazyLoad(SignUp)
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