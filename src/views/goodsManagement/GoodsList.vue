<template>
  <div class="goods-list">
    <!-- 面包屑导航区 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 添加按钮单独一行 -->
      <el-row>
        <el-col>列表 </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
}
</style>
