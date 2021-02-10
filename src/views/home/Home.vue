<template>
  <div class="home">
    <el-container class="container">
      <!-- 头部 -->
      <el-header class="header">
        <!--  -->
        <el-row>
          <el-col style="border:1px solid black" :span="4"
            ><div class="grid-content bg-purple"><img src="" alt="" /> 这是一个logo</div></el-col
          >
          <el-col style="border:1px solid black" :span="18"
            ><div class="grid-content bg-purple-light"><h3>xx电商管理后台</h3></div></el-col
          >
          <el-col style="border:1px solid black" :span="2"
            ><div class="grid-content bg-purple"></div>
            <a href="#" @click="logout">退出</a></el-col
          >
        </el-row>
      </el-header>
      <!-- 中部 -->
      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside class="aside" width="200px">
          <el-menu :unique-opened="true">
            <!-- 1 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item>
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-submenu index="1-1">
                <template slot="title">分组一</template>
                <el-menu-item index="1-1-1">选项1</el-menu-item>
                <el-menu-item index="1-1-2">选项2</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- 2 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item>
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item>
                <i class="el-icon-location"></i>
                <span>权限列表</span>
              </el-menu-item>
              <el-submenu index="1-1">
                <template slot="title">分组一</template>
                <el-menu-item index="1-1-1">选项1</el-menu-item>
                <el-menu-item index="1-1-2">选项2</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- 3 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item>
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-submenu index="1-1">
                <template slot="title">分组一</template>
                <el-menu-item index="1-1-1">选项1</el-menu-item>
                <el-menu-item index="1-1-2">选项2</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- 4 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item>
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-submenu index="1-1">
                <template slot="title">分组一</template>
                <el-menu-item index="1-1-1">选项1</el-menu-item>
                <el-menu-item index="1-1-2">选项2</el-menu-item>
              </el-submenu>
            </el-submenu>
            <!-- 5 -->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item>
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-submenu index="1-1">
                <template slot="title">分组一</template>
                <el-menu-item index="1-1-1">选项1</el-menu-item>
                <el-menu-item index="1-1-2">选项2</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 中间部分 -->
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.home {
  height: 100vh;
}
.container {
  height: 100%;
}
.header {
  text-align: center;
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
.el-header {
  padding: 0;
}
</style>
