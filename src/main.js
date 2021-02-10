import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "@/assets/css/base.css";
import Loading from "@/components/common/loading";
import Toast from "@/components/common/toast";
import https from "./network/http";
Vue.config.productionTip = false;
Vue.use(Loading);
Vue.use(Toast);
Vue.use(https);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
