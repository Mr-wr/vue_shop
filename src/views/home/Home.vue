<template>
  <div class="home">
    <el-container class="container">
      <!-- 头部 -->
      <el-header class="header">
        <!-- 头部分布 -->
        <el-row>
          <el-col style="" :span="4">
            <div class="grid-content bg-purple" @click="getHome"><img src="" alt="" /> 这是一个logo</div>
          </el-col>
          <el-col style="" :span="18">
            <div class="grid-content bg-purple-light">
              <h3>xx电商管理后台</h3>
            </div>
          </el-col>
          <el-col style="" :span="2">
            <div class="grid-content bg-purple"></div>
            <el-button style="background:#ccc;" @click="logout">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!-- 中部 -->
      <el-container>
        <el-aside class="aside" :width="isCollapse ? '64px' : '200px'">
          <!-- 导航标识 -->
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 左侧导航栏 -->
          <el-menu
            :collapse-transition="false"
            :collapse="isCollapse"
            :unique-opened="true"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            router
          >
            <!-- 一级菜单 -->
            <el-submenu :index="item.path" v-for="(item, index) in menusList" :key="index">
              <!-- 标题显示 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item v-for="child in item.children" :key="child.id" :index="child.path">
                <i class="el-icon-location"></i>
                <span>{{ child.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 中间部分 -->
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getHomeMenus } from "@/network/home/home";
import { request } from "@/network/request";
export default {
  components: { request, getHomeMenus },
  data() {
    return {
      menusList: [],
      iconsObj: {},
      isCollapse: false,
    };
  },
  created() {
    // 获取左侧菜单数据
    this.getHomeMenus();
  },
  methods: {
    // 获取左侧菜单数据
    getHomeMenus() {
      getHomeMenus({ url: "/menus" })
        .then(result => {
          const { data, meta } = result;
          if (meta.status !== 200) return this.$message.error(meta.msg);
          this.menusList = data;
          console.log("获取左侧菜单数据", this.menusList);
        })
        .catch(err => {
          console.log("获取左侧菜单数据错误", err);
        });
    },
    // 退出按钮
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 导航菜单折叠和张开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 跳转到home主页
    getHome() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  .container {
    height: 100%;
  }
}
.header {
  text-align: center;
  background-color: #373d41;
  color: #fff;
}
.aside {
  background-color: #333744;
}
.main {
  background-color: #eaedf1;
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-aside .el-menu {
  border-right: none;
}
/* 导航标识 */
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
