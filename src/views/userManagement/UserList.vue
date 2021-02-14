<template>
  <div class="user">
    <!-- 面包屑导航区 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- search -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="querInfo.query" @clear="getUserList" clearable placeholder="请输入内容" class="input-with-select">
            <el-button @click="getUserList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button @click="addDialogVisible = true" type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- table用户列表区域 -->
      <el-table class="user-table" border stripe :data="userList" style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <!-- 如果指定了作用域插槽prop就没有用了 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch @change="mg_stateChange(scope.row)" v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              @click="(alterDialogVisible = true), alterUserInfo(scope.row.id)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button @click="deleteUser(scope.row)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            <!-- 鼠标是否可进入到 tooltip 中 -->
            <el-tooltip :enterable="false" class="item" effect="dark" content="分配角色" placement="top">
              <el-button size="mini" type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[2, 10, 100, 200]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <my-dialog title="添加用户" @isShow="addUserDialog" :isvisible="addDialogVisible">
      <!-- 添加用户表单 -->
      <el-form :status-icon="true" :model="user" :rules="userRules" ref="userForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名字" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
      </el-form>
    </my-dialog>

    <!-- 添加修改的对话框 -->
    <my-dialog title="修改用户" @isShow="alterUserDialog" :isvisible="alterDialogVisible">
      <!-- 添加用户表单 -->
      <el-form
        :status-icon="true"
        :model="alterUserInfoData"
        :rules="userRules"
        ref="alterUserInfoDataRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名字">
          <el-input :disabled="true" v-model="alterUserInfoData.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="alterUserInfoData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="alterUserInfoData.mobile"></el-input>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
import { addUser, getUserList, getIdUser, alterIdUser, alterUserState, deleteUser } from "@/network/home/userManagement";
import { userVerificationMixin } from "@/components/common/mixin";
import MyDialog from "@/components/common/dialog/MyDialog";
export default {
  components: {
    getUserList,
    getIdUser,
    alterUserState,
    alterIdUser,
    addUser,
    deleteUser,
    MyDialog,
    userVerificationMixin,
  },
  mixins: [userVerificationMixin],
  name: "UserList",
  data() {
    return {
      // 获取用户列表数据对象
      querInfo: {
        // 查询信息
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 2,
      },
      // get获取全部的用户信息
      userList: [],
      // 页码数
      total: 0,
      // 控制添加用户对话框显示和隐藏
      addDialogVisible: false,
      // 控制修改用户对话框显示和隐藏
      alterDialogVisible: false,
      // 要修改用户的信息
      alterUserInfoData: {},
      // 用户对象信息
      user: {
        username: "",
        email: "",
        mobile: "",
        password: "",
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取用户信息
    getUserList() {
      getUserList(this.querInfo)
        .then(res => {
          console.log("获取去管理员列表success", res);
          const { data, meta } = res;
          if (meta.status != 200) return this.$message.error(meta.msg);
          this.userList = data.users;
          this.total = data.total;
        })
        .catch(err => {
          console.log("获取去管理员列表failure", err);
        });
    },

    // 一页显示多少数据
    handleSizeChange(newSize) {
      console.log("一页显示多少数据", newSize);
      this.querInfo.pagesize = newSize;
      this.getUserList();
    },

    // 页码发生改变
    handleCurrentChange(newPage) {
      console.log("页码发生改变", newPage);
      this.querInfo.pagenum = newPage;
      this.getUserList();
    },

    // 用户状态改变
    mg_stateChange(userInfo) {
      alterUserState(userInfo).then(res => {
        console.log("用户状态改变", res);
        if (res.meta.status == 200) return this.$message.success(res.meta.msg);
        this.$message.error(res.meta.status);
      });
    },

    // 点击确定和取消添加用户的对话框显示form
    addUserDialog(params) {
      // 点击取消
      if (!params) {
        this.addDialogVisible = false;
        this.$refs.userForm.resetFields();
        return;
      }
      // 点击确定
      this.$refs.userForm.validate(valid => {
        if (valid) {
          addUser(this.user)
            .then(res => {
              console.log("添加用户返回信息", res);
              const { data, meta } = res;
              if (meta.status == 201) {
                this.$message.success(meta.msg);
                // 重新获取用户
                this.getUserList();
              } else {
                this.$message.error(meta.msg);
              }
            })
            .catch(err => {
              console.log("添加用户失败", err);
            });
          // 清空用户表单
          this.$refs.userForm.resetFields();
          // 关闭提示框
          this.addDialogVisible = false;
        }
      });
    },

    // 点击确定和取消修改用户对话框显示from
    alterUserDialog(params) {
      // 点击取消
      if (!params) {
        console.log("cancel");
        this.$refs.alterUserInfoDataRef.resetFields();
        this.alterDialogVisible = false;
      }
      // 点击确定
      if (params) {
        console.log("finish");
        this.$refs.alterUserInfoDataRef.validate(valid => {
          if (valid) {
            alterIdUser(this.alterUserInfoData.id, this.alterUserInfoData).then(res => {
              console.log("修改用户", res);
              const { data, meta } = res;
              /* 200表示成功，500表示失败 */
              if (meta.status == 200) {
                this.$message.success(meta.msg);
              } else {
                this.$message.error(meta.msg);
              }
            });
            this.alterDialogVisible = false;
            this.getUserList();
          }
        });
      }
    },

    // 点击修改按钮图标
    alterUserInfo(id) {
      // 根据id获取用户
      getIdUser(id).then(res => {
        console.log("根据id获取用户", res);
        const { data, meta } = res;
        if (meta.status !== 200) return this.$message.error(meta.msg);
        this.alterUserInfoData = data;
      });
    },

    // 点击删除图标
    deleteUser(user) {
      this.$confirm(`此操作将永久删除该用户(${user.username}), 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 点击确定
        .then(() => {
          deleteUser(user.id).then(res => {
            if (res.meta.status == 200) {
              this.$message({
                type: "success",
                message: `用户${user.username}删除成功`,
              });
            } else {
              this.$message({
                type: "error",
                message: `用户${user.username}删除失败`,
              });
            }
          });
          this.getUserList();
        })
        // 点击取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
.el-row {
  margin-bottom: 20px;
}
/* 用户列表 */
.user-table {
  margin-bottom: 20px;
}
</style>
