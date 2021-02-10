import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/home",
    meta: {
      index: 2,
      title: "首页",
    },
    component: () => import(/* webpackChunkName: "about" */ "@/views/home/Home"),
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
