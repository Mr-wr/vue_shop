import axios from "axios";
const https = {};

https.install = Vue => {
  Vue.prototype.$http = axios;
};
export default https;
