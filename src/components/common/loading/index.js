import LoadingComponent from "@/components/common/loading/Loading";
const Loading = {};
// 注册Toast
Loading.install = function(Vue) {
  // 生成一个Vue的子类
  // 同时这个子类也就是组件
  const loadgin = Vue.extend(LoadingComponent);
  // 生成一个该子类的实例
  const loadginInstance = new loadgin();

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  loadginInstance.$mount(document.createElement("div"));
  document.body.appendChild(loadginInstance.$el);

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  Vue.prototype.$load = loadginInstance;
};

export default Loading;
