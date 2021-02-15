<template>
  <div class="role-list">
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
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- table角色列表区域 -->
      <el-table class="user-table" border stripe :data="roleList" style="width: 100%">
        <!-- 张开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 一级权限 -->
            <el-row class="c-center" v-for="item1 in scope.row.children" :key="item1.id">
              <el-col :span="5">
                <el-tag closable @close="deleteIdRight(scope.row, item1)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="19">
                <el-row class="c-center" v-for="item2 in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag closable @close="deleteIdRight(scope.row, item2)" type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级 -->
                  <el-col :span="18">
                    <el-tag
                      closable
                      @close="deleteIdRight(scope.row, item3)"
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 把数据张开 -->
            <!-- <pre>
              {{ scope.row }}
            </pre> -->
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              @click="(setDialogVisible = true), showSetRightDialog(scope.row)"
              size="mini"
              type="warning"
              icon="el-icon-setting"
            >
              分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户的对话框 -->
    <my-dialog title="添加用户" @isShow="setUserDialog" :isvisible="setDialogVisible">
      <el-tree
        ref="rightTree"
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="treeSelectDefaultL"
        :data="rightsList"
        :props="dialogTreeDefaultProps"
        show-checkbox
      >
      </el-tree>
    </my-dialog>
  </div>
</template>

<script>
import { getRightsList, getRolesList, deleteIdRight, alterIdRights } from "@/network/home/authorityManagement";
import MyDialog from "@/components/common/dialog/MyDialog.vue";
export default {
  components: { getRightsList, getRolesList, deleteIdRight, alterIdRights, MyDialog },
  name: "rights",
  data() {
    return {
      roleList: [],
      // 设置权限对话框显示否
      setDialogVisible: false,
      // 根据tree获取到的信息
      rightsList: [],
      // 设置对话框tree中的数据显示
      dialogTreeDefaultProps: {
        children: "children",
        label: "authName",
      },
      // 设置对话框tree中的数据默认选中
      treeSelectDefaultL: [],
      // 设置分配角色的role的id
      roleId: "",
    };
  },
  created() {
    // 获取所有角色的列表
    this.getRolesList();
  },
  methods: {
    // 获取所有角色的列表
    getRolesList() {
      getRolesList()
        .then(res => {
          console.log("获取所有角色的列表", res);
          const { data, meta } = res;
          if (meta.status == 200) {
            this.roleList = data;
          } else {
            this.$message.error(meta.msg);
          }
        })
        .catch(err => {
          console.log("获取所有角色的列表失败", err);
        });
    },

    // 点击删除权限按钮
    deleteIdRight(role, right) {
      this.$confirm(`此操作将永久删除该用户(${right.authName}), 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 点击确定
        .then(() => {
          deleteIdRight(role.id, right.id).then(res => {
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: `用户${right.authName}删除成功`,
              });
              // 不用重新获取、只需跟新相应改变的值
              // this.getRolesList();
              role.children = res.data;
            } else {
              this.$message({
                type: "error",
                message: `用户${right.authName}删除失败`,
              });
            }
          });
        })
        // 点击取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 点击设置权限按钮
    showSetRightDialog(role) {
      // 设置分配角色的role的id
      this.roleId = role.id;
      // 获取role数据
      getRightsList("tree")
        .then(res => {
          console.log("get role data success", res);
          const { data, meta } = res;
          this.rightsList = data;
        })
        .catch(err => {
          console.log("get role data failure");
        });
      console.log("点击设置权限按钮", role);
      // treeSelectDefaultL设置对话框tree中的数据默认选中数据
      this.getAtLastChildren(role);
      console.log("this.treeSelectDefaultL", this.treeSelectDefaultL);
    },

    // 获取role中最后一个children
    getAtLastChildren(role) {
      if (!role.hasOwnProperty("children")) {
        this.treeSelectDefaultL.push(role.id);
        return;
      } else {
        role.children.forEach(item => {
          this.getAtLastChildren(item);
        });
      }
    },

    // 点击确定和取消权限设置的对话框显示
    setUserDialog(params) {
      // 点击取消
      if (!params) {
        console.log("点击cancel");
        this.setDialogVisible = false;
        // 还原数据
        this.treeSelectDefaultL = [];
        return;
      }
      // 点击确定 获取 全选和半选的数据
      const keys = [...this.$refs.rightTree.getCheckedKeys(), ...this.$refs.rightTree.getHalfCheckedKeys()];
      let keysStr = keys.join(",");
      console.log("点击确定 获取 全选和半选的数据", keysStr);
      alterIdRights(this.roleId, { rids: keysStr })
        .then(res => {
          console.log("修改right返回数据成功", res);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.getRolesList();
          } else {
            this.$message.error(res.meta.msg);
          }
        })
        .catch(err => {
          console.log("修改right返回数据失败", err);
        });
      // 还原数据
      this.treeSelectDefaultL = [];
      // 关闭提示框
      console.log("点击finish");
      this.setDialogVisible = false;
      // 重新获取数据
      this.getRolesList();
    },

    // 权限设置的对话框中的按钮被点击
    handleCheckChange() {},
  },
};
</script>

<style lang="less" scoped>
/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
}
/* 卡片 */
.box-card {
  margin-bottom: 20px;
  // 添加按钮
  .el-row {
    margin-bottom: 20px;
  }
  .el-table {
    .el-tag {
      margin-bottom: 10px;
    }
    .el-row {
      border-bottom: 1px solid #eee;
    }
  }
}
// column居中对齐
.c-center {
  display: flex;
  align-items: center;
}
</style>
