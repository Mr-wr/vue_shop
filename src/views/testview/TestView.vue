<template>
  <div class="test-view">
    <!-- 卡片视图 -->
    <el-card class="box-card">
      
      <!-- 面包屑导航区 -->
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created(){
  },
  methods: {
    test() {
      console.log(this.$route, "this.$route");
    },
  },
};
</script>

<style lang="less" scoped></style>
