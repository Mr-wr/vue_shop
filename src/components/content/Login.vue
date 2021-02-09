<template>
  <div class="login">
    <h3 style="text-align:center;">登入</h3>
    <el-form size="mini" label-position="left" label-width="80px" :model="formLabelAlign">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="formLabelAlign.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-button @click="subit" type="primary">主要按钮</el-button>
    </el-form>
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
    };
  },
  methods: {
    subit() {
      request({
        url: "/api/login/account",
        method: "post",
        data: this.formLabelAlign,
      }).then(res => {
        if (res.code == "403") {
          this.$message.error(res.status);
        } else {
          this.$message.success(res.status);
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>

<style scoped>
.login {
  position: absolute;
  width: 300px;
  height: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: rgb(0, 255, 255);
}
</style>
