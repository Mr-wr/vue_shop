<template>
  <div class="rights">
    <!-- 面包屑导航区 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-table class="user-table" border stripe :data="rightsList" style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"> </el-table-column>
        <el-table-column prop="path" label="路径" width="180"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <!-- 如果指定了作用域插槽prop就没有用了 -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level == '1'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightsList } from "@/network/home/authorityManagement";
export default {
  components: {
    getRightsList,
  },
  name: "rights",
  data() {
    return {
      rightsList: [],
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    // 获取权限列表
    getRightsList() {
      getRightsList("list")
        .then(res => {
          console.log("获取权限列表", res);
          if (res.meta.status == 200) {
            this.rightsList = res.data;
          } else {
            this.$message.error(res.meta.msg);
          }
        })
        .catch(err => {
          this.$message.success(err);
        });
    },
  },
};
</script>

<style scoped>
/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
}
/* 卡片 */
.box-card {
  margin-bottom: 20px;
}
</style>
