<template>
  <div class="goods-category">
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
        <el-col class="add-click"><el-button @click="addCategory" type="primary">添加分类</el-button></el-col>

        <!-- 表格 -->
        <tree-table
          index-text="#"
          show-index
          :expand-type="false"
          :selection-type="false"
          :data="categoryList"
          :columns="columns"
          border
        >
          <!-- 插槽 -->
          <template slot="isok" slot-scope="scope">
            <i style="color:green" v-if="scope.row.cat_deleted" class="el-icon-success"></i>
            <i style="color:red" v-else class="el-icon-error"></i>
          </template>
          <template slot="order" slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.cat_level == '0'">一级</el-tag>
            <el-tag size="mini" v-else-if="scope.row.cat_level == '1'" type="success">二级</el-tag>
            <el-tag size="mini" v-else type="warning">三级</el-tag>
          </template>
          <template slot="tip" slot-scope="scope">
            <el-button @click="alterGoodsCategory(scope.row)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="deleteUser(scope.row)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </tree-table>

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
      </el-row>
    </el-card>

    <!-- 添加分类的对话框 -->
    <my-dialog title="添加分类" @isShow="addCategoryDialog" :isvisible="addCategoryDialogVisible">
      <!-- 添加分类的表单 -->
      <el-form
        :status-icon="true"
        :model="addCategoryForm"
        ref="categoryformRef"
        label-width="100px"
        :rules="categoryRules"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCategoryForm.cat_name"></el-input>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item label="父级分类名称">
          <!-- options用来指定数据来源 -->
          <!-- props用来指定配置信息 -->
          <!-- v-model绑定的是一个数组 -->
          <!-- 在propes总定义checkStrictly:true允许选择任何一项 -->
          <el-cascader
            v-model="selectKeys"
            :options="paramsCatList"
            :props="cascaderProps"
            @change="categoryChange"
            ref="categoryCascaderRef"
            placeholder="请选择"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>
<script>
import { getAndAddGoodsCategoryList } from "@/network/home/goodsManagement";
import MyDialog from "../../components/common/dialog/MyDialog.vue";
export default {
  components: { getAndAddGoodsCategoryList, MyDialog },
  data() {
    return {
      // 获取商品列表数据对象
      querInfo: {
        // 查询信息
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 2,
      },
      // get获取全部的商品信息
      categoryList: [],
      // 页码数
      total: 0,
      // columns
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 表示使用模板列
          type: "template",
          // 使用那个模板
          template: "isok",
        },
        {
          label: "排序",
          // 表示使用模板列
          type: "template",
          // 使用那个模板
          template: "order",
        },
        {
          label: "编辑",
          // 表示使用模板列
          type: "template",
          // 使用那个模板
          template: "tip",
        },
      ],
      // 添加分类的弹出框
      addCategoryDialogVisible: false,
      // 添加分类表单
      addCategoryForm: {
        // 添加分类名称
        cat_name: "",
        // 父级id
        cat_pid: 0,
        // 分类等级
        cat_level: 0,
      },
      // 分类表单规则
      categoryRules: {
        cat_name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
      },
      // 父级分类的列表
      paramsCatList: [],
      // 添加分类对话框 指定联机触发配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        expandTrigger: "hover",
        checkStrictly: true,
      },
      // 添加分类对话框选这的数据
      selectKeys: [],
    };
  },
  created() {
    this.getAndAddGoodsCategoryList();
  },
  methods: {
    // 获取商品列表
    getAndAddGoodsCategoryList() {
      getAndAddGoodsCategoryList(this.querInfo)
        .then(res => {
          console.log("获取商品分类成功", res);
          const { data, meta } = res;
          this.categoryList = data.result;
          this.total = data.total;
        })
        .catch(err => {
          console.log("获取商品分failure", err);
        });
    },

    // 点击添加分类按钮
    addCategory() {
      // 显示添加分类用户对话框
      this.addCategoryDialogVisible = true;
      // 获取父级分类的数据列表
      getAndAddGoodsCategoryList({ params: { type: 2 } })
        .then(res => {
          console.log("获取父级分类的数据列表success", res);
          const { data, meta } = res;
          if (res.meta.status == 200) {
            this.paramsCatList = data;
          } else {
            this.$message.error(res.meta.msg);
          }
        })
        .catch(err => {
          console.log("获取父级分类的数据列表failure", err);
        });
    },

    // 一页显示多少数据
    handleSizeChange(newSize) {
      console.log("一页显示多少数据", newSize);
      this.querInfo.pagesize = newSize;
      this.getAndAddGoodsCategoryList();
    },

    // 页码发生改变
    handleCurrentChange(newPage) {
      console.log("页码发生改变", newPage);
      this.querInfo.pagenum = newPage;
      this.getAndAddGoodsCategoryList();
    },

    // click alter botton
    alterGoodsCategory() {},

    // click delete botton
    alterGoodsCategory() {},

    // click failure cancel add category dialog
    addCategoryDialog(params) {
      // 点击取消
      if (!params) {
        console.log("点击cancel");
        this.addCategoryDialogVisible = false;
        // 还原数据
        this.resetCategoryDialog();
        return;
      }
      console.log(this.addCategoryForm);
      // 添加分类
      getAndAddGoodsCategoryList("", "post", this.addCategoryForm)
        .then(res => {
          console.log("添加分类成功", res);
          if (res.meta.status == 201) {
            this.$message.success(res.meta.msg);
            // 关闭提示框
            this.addCategoryDialogVisible = false;
            console.log("点击finish");
            // 还原数据
            this.resetCategoryDialog();
            // 重新获取数据
            this.getAndAddGoodsCategoryList();
          } else {
            this.$message.error(res.meta.msg);
          }
        })
        .catch(err => {
          console.log("添加分类失败", err);
        });
    },

    // 添加分类对话框发生改变
    categoryChange() {
      // 先判断选择的数据的数组是否有值
      if (this.selectKeys.length > 0) {
        // 父级分类id
        this.addCategoryForm.cat_pid = this.selectKeys[this.selectKeys.length - 1];
        // leven
        this.addCategoryForm.cat_level = this.selectKeys.length;
      }
    },

    // 还原添加分类对话框数据
    resetCategoryDialog() {
      // 还原表单数据
      this.addCategoryForm.cat_name = "";
      // 还原复选框数据
      this.selectKeys = [];
      this.addCategoryForm.cat_pid = 0;
      this.addCategoryForm.cat_leven = 0;
    },
  },
};
</script>

<style lang="less" scoped>
/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
}
// 分页
.el-pagination {
  margin-top: 10px;
}
.add-click {
  margin-bottom: 20px;
}
</style>
