<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <h5>自定义颜色</h5>
        <!-- 左侧导航栏 -->
        <el-menu :unique-opened="true" background-color="#333744" text-color="#fff" active-text-color="#409eff">
          <!-- 一级导航栏 -->
          <el-submenu :index="item.path" v-for="(item, index) in menusList" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.id" index="1-1">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu :index="item.path" v-for="(item, index) in menusList" :key="index + 10">
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getHomeMenus } from "@/network/home";
import { request } from "@/network/request";
export default {
  components: { request, getHomeMenus },
  data() {
    return {
      menusList: [],
    };
  },
  created() {
    this.getHomeMenus();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    // 获取左侧菜单数据
    getHomeMenus() {
      getHomeMenus({ url: "/menus" })
        .then(result => {
          const { data, meta } = result;
          if (meta.status !== 200) return this.$message.error(meta.msg);
          this.menusList = data;
          console.log("获取左侧菜单数据", this.menusList);
        })
        .catch(err => {});
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
