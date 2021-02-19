export const CascaderPropsMixin = {
  data() {
    return {
      // 添加分类对话框 指定联机触发配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        expandTrigger: "hover",
        checkStrictly: true,
      },
      // 添加分类对话框选这的数据
      selectKeys: [],
    };
  },
};
