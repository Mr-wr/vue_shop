import Vue from "vue";
import VueRouter from "vue-router";
import NewRoute from "./new_test_route";
Vue.use(VueRouter);

const routes = [
  NewRoute,
  { path: "", redirect: "/login" },
  {
    path: "/home",
    redirect: "/welcome",
    meta: {
      title: "首页",
    },
    component: () => import(/* webpackChunkName: "about" */ "@/views/home/Home"),
    children: [
      {
        path: "/welcome1",
        meta: {
          title: "欢迎1",
        },
        component: () => import("@/views/home/children/Welcome"),
      },
      {
        path: "/welcome",
        meta: {
          title: "欢迎",
        },
        component: () => import("@/views/home/children/Welcome"),
      },
      {
        path: "/users",
        name: "用户管理",
        meta: {
          title: "用户管理",
        },
        component: () => import(/* webpackChunkName: "about" */ "@/views/userManagement/UserList"),
      },
      {
        path: "/roles",
        component: () => import(/* webpackChunkName: "about" */ "@/views/authorityManagement/RoleList"),
      },
      {
        path: "/rights",
        component: () => import(/* webpackChunkName: "about" */ "@/views/authorityManagement/Rights"),
      },
      {
        path: "/goods",
        component: () => import(/* webpackChunkName: "about" */ "@/views/goodsManagement/GoodsList"),
      },
      {
        path: "/goods/add",
        component: () => import("@/views/goodsManagement/AddGoods"),
      },
      {
        path: "/categories",
        component: () => import(/* webpackChunkName: "about" */ "@/views/goodsManagement/GoodsCategory"),
      },
      {
        path: "/params",
        component: () => import(/* webpackChunkName: "about" */ "@/views/goodsManagement/CategoryParams"),
      },
      {
        path: "/orders",
        component: () => import(/* webpackChunkName: "about" */ "@/views/orderManagement/Order"),
      },
    ],
  },
  {
    path: "/test",
    meta: {
      index: 3,
    },
    component: () => import(/* webpackChunkName: "about" */ "@/views/test/test"),
  },
  {
    path: "/login",
    meta: {
      index: 1,
      title: "登入",
    },
    component: () => import(/* webpackChunkName: "about" */ "@/components/content/Login"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const token = window.sessionStorage.getItem("token");
  if (!token) return next("/login");
  next();
});
router.afterEach((to, from) => {});
export default router;
