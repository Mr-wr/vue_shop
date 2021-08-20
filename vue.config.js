module.exports = {
  chainWebpack: config => {
    // 发布模式
    // config.when(process.env.NODE_ENV === "production", config => {
    //   config
    //     .entry("app")
    //     .clear()
    //     .add("./src/main-pro.js");
    // 使用externals优化文件
    // config.set("externals", {
    //   vue: "Vue",
    //   "vue-router": "VueRouter",
    //   axios: "axios",
    //   lodash: "_",
    //   nprogress: "NProgress",
    //   "vue-quill-editor": "VueQuillEditor",
    // });
    // });
    // 开发模式
    // config.when(process.env.NODE_ENV === "development", config => {
    //   config
    //     .entry("app")
    //     .clear()
    //     .add("./src/main-dev.js");
    // });
  },
};
