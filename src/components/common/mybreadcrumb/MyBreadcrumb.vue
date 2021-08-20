<template>
  <div class="my-breadcrumb">
    <!-- 面包屑导航区 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      {{ this.$route }}
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [],
    };
  },
  created() {
    const link = [];
    if (this.$route.matched.length > 0)
      this.$route.matched.forEach(item => {
        if (item.path != this.$route.path) {
          link.push(item);
        }
      });
    console.log("link", link);
    const title = link.map(item => item.meta.title);
    title.push(this.$route.meta.title);
  },
};
</script>
<style lang="less" scoped>
/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
}
</style>
