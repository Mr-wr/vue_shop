import axios from "axios";
export function request(config) {
  const instance = axios.create({
    // baseURL: "http://152.136.185.210:7878/api/m5",
    // 测试
    // baseURL: "http://bao.montaro.cn",
    timeout: 5000,
  });
  // 拦截器
  instance.interceptors.request.use(
    // 请求成功拦截
    config => {
      // Toast.loading({
      //   duration: 0,
      // });
      console.log("请求成功拦截", config);
      // 如果不返回出去的话请求会报错
      return config;
    },
    // 请求失败拦截
    err => {
      console.log("请求失败拦截", err);
    }
  );
  instance.interceptors.response.use(
    res => {
      // Toast.clear();
      console.log("相应成功拦截", res);
      return res.data;
    },
    err => {
      // Toast.clear();
      console.log("相应失败拦截", err);
    }
  );
  return instance(config);
}
