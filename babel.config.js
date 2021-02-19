const proPlugins = [];
// 发布阶段需要的插件
if (process.env.NODE_ENV === "production") {
  proPlugins.push("transform-remove-console");
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // 发布产品时用的插件
    ...proPlugins,
  ],
};
