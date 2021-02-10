<template>
  <div class="login">
    <div class="box">
      <h3 style="text-align:center; margin-bottom:10px;">登入</h3>
      <el-form ref="form" size="mini" :rules="loginFormRules" label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名称" prop="username">
          <el-input prefix-icon="el-icon-s-custom" placeholder="请输入用户名称" v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            prefix-icon="el-icon-key"
            placeholder="请输入密码"
            type="password"
            v-model="formLabelAlign.password"
          ></el-input>
        </el-form-item>
        <div class="log-btn">
          <el-button @click="submitForm" type="primary">登入</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  name: "Login",
  components: { request },
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登入密码", trigger: "blur" },
          { min: 2, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 重置按钮
    resetForm() {
      this.$refs.form.resetFields();
    },
    // 登入按钮
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          request({
            url: "/api/login/account",
            method: "post",
            data: this.formLabelAlign,
            // data:
            //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1ODMyODgxNjMsImV4cCI6MTU4MzM3NDU2M30.LBFXgTMuRJ-D3ozdcdhqRQ10Uou91V-Fuk98PoneaPA",
          }).then(res => {
            console.log(res);
            if (res.code == "403") {
              this.$message.error(res.status);
            } else {
              this.$message.success(res.status);
              window.sessionStorage.setItem("token", res.token);
              this.$router.push("/home");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  background-color: #2a4b69;
}
.login .box {
  position: absolute;
  width: 300px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgb(0, 0, 0, 0.3);
}
.log-btn {
  margin-top: 35px;
  display: flex;
  justify-content: space-evenly;
}
</style>
