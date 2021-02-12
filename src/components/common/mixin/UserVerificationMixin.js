export const userVerificationMixin = {
  data() {
    // 自定义用户验证
    // 邮箱
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
      if (regEmail.test(value)) return cb();
      cb(new Error("请输入合法邮箱"));
    };
    // 手机
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[3|4|5|7|8][0-9]{9}$/;
      if (regMobile.test(value)) return cb();
      cb(new Error("请输入合法手机号"));
    };
    return {
      // 用户校验
      userRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登入密码", trigger: "blur" },
          { min: 2, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }],
      },
    };
  },
};
