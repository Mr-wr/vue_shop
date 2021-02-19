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
      <el-alert class="alert" show-icon title="提示只能选择第三节点" :closable="false" type="warning"></el-alert>
      <!-- 添加按钮单独一行 -->
      <el-row>
        <el-col>
          <span>选择商品分类：</span>
          <!-- options用来指定数据来源 -->
          <!-- props用来指定配置信息 -->
          <!-- v-model绑定的是一个数组 -->
          <!-- 在propes总定义checkStrictly:true允许选择任何一项 -->
          <el-cascader
            v-model="selectKeys"
            :options="categoryList"
            :props="cascaderProps"
            @change="categoryChange"
            ref="categoryCascaderRef"
            placeholder="请选择"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>

      <!-- tab导航 -->
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加按钮 -->
          <el-button class="many-add-btn" :disabled="isBisabled" @click="addParamsBtn" type="primary" size="mini"
            >添加参数</el-button
          >
          <!-- 参数表格table -->
          <el-table class="user-table" border stripe :data="idManyCategoryList" style="width: 100%">
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  closable
                  v-show="scope.row.attr_vals.split(' ')[0] != ''"
                  v-for="(itme, index) in scope.row.attr_vals.split(' ')"
                  :key="index"
                  @close="deleteIdRight(scope.row)"
                  >{{ itme }} </el-tag
                >e
                <!-- 添加标签 -->
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="inputVisible = true">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引 -->
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 编辑 -->
                <el-button @click="alterMany(scope.row.id)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                <!-- 删除 -->
                <el-button @click="deleteMany(scope.row)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <!-- 添加按钮 -->
          <el-button class="many-add-btn" :disabled="isBisabled" @click="addParamsBtn" type="primary" size="mini"
            >添加属性</el-button
          >
          <!-- 参数表格table -->
          <el-table class="user-table" border stripe :data="idOnlyCategoryList" style="width: 100%">
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  closable
                  v-show="scope.row.attr_vals.split(' ')[0] != ''"
                  v-for="(itme, index) in scope.row.attr_vals.split(' ')"
                  :key="index"
                  @close="deleteIdRight(scope.row)"
                  >{{ itme }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- 编辑 -->
                <el-button @click="alterOnly(scope.row.id)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                <!-- 删除 -->
                <el-button @click="deleteOnly(scope.row)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数/属性对话框 -->
    <my-dialog
      :title="activeName == 'many' ? '动态参数' : '静态参数'"
      @isShow="addManyOrOnlyAddDialog"
      :isvisible="addManyOrOnlyDialogVisible"
    >
      <!-- 参数/属性form -->
      <el-form
        :status-icon="true"
        :model="addManyOrOnlyForm"
        ref="manyOrOnlyDataRef"
        :rules="manyOrOnlyDataRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="attr_name" :label="activeName == 'many' ? '动态参数' : '静态参数'">
          <el-input v-model="addManyOrOnlyForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from "../../components/common/dialog/MyDialog.vue";
import { getGoodsCategoryList, getOrAddIdCategoryList } from "@/network/home/goodsManagement";
export default {
  components: { getGoodsCategoryList, getOrAddIdCategoryList, MyDialog },
  data() {
    return {
      categoryList: [],

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
      // 点击的导航栏
      activeName: "many",
      // 根据id获取到的数据
      idManyCategoryList: [],
      idOnlyCategoryList: [],
      // 显示与否添加参数/属性对话框
      addManyOrOnlyDialogVisible: false,
      // addManyOrOnly表单数据
      addManyOrOnlyForm: {},
      // 表单验证
      manyOrOnlyDataRules: {
        attr_name: [{ required: true, message: "请输入参数名称", trigger: "blur" }],
      },
      // 添加标签按钮
      inputVisible: false,
      // 添加标签的值
      inputValue: "",
    };
  },
  created() {
    this.getGoodsCategoryList();
  },
  methods: {
    // 根据id获取参数列表
    getOrAddIdCategoryList() {
      getOrAddIdCategoryList(this.categoryId, { sel: this.activeName })
        .then(res => {
          console.log("根据分类id获取数据success", res);
          const { data, meta } = res;
          if (meta.status == 200) {
            // 判断获取到的数据是动态参数的还是静态的参数
            if (this.activeName == "many") {
              this.idManyCategoryList = data;
            } else if (this.activeName == "only") {
              this.idOnlyCategoryList = data;
            } else {
              this.$message.error("获取参数错误");
            }
          }
        })
        .catch(err => {
          console.log("根据分类id获取数据failure", err);
        });
    },

    // 获取分类列表
    getGoodsCategoryList() {
      getGoodsCategoryList(this.querInfo)
        .then(res => {
          console.log("获取商品分类成功", res);
          const { data, meta } = res;
          this.categoryList = data;
        })
        .catch(err => {
          console.log("获取商品分类failure", err);
        });
    },

    // 级联选择触发
    categoryChange() {
      // 只能选择最后一级的节点
      // 判断选择的数组长度判断是否选择的是三级节点
      if (this.selectKeys.length < 3) {
        this.selectKeys = [];
        // 清空动态参数/静态参数表格
        this.idManyCategoryList = [];
        this.idOnlyCategoryList = [];
        return;
      }
      // 每次改变都获取一次数据
      this.getOrAddIdCategoryList();
    },

    // tab导航栏点击事件
    tabClick() {
      this.getOrAddIdCategoryList();
    },

    // 编辑动态参数按钮
    alterMany() {},

    // 编辑静态参数按钮
    alterOnly() {},

    // 删除静态参数按钮
    deleteMany() {},

    // 删除静态参数按钮
    deleteOnly() {},

    // 添加参数按钮
    addParamsBtn() {
      this.addManyOrOnlyDialogVisible = true;
    },

    // 点击确定和取消  添加参数/属性对话框
    addManyOrOnlyAddDialog(params) {
      // 点击取消
      if (!params) {
        console.log("点击cancel");
        this.addManyOrOnlyDialogVisible = false;
        // 还原数据
        this.$refs.manyOrOnlyDataRef.resetFields();
        return;
      }
      this.$refs.manyOrOnlyDataRef.validate(valid => {
        if (valid) {
          getOrAddIdCategoryList(
            this.categoryId,
            "",
            {
              attr_name: this.addManyOrOnlyForm.attr_name,
              attr_sel: this.activeName,
            },

            "post"
          )
            .then(res => {
              console.log("修改right返回数据成功", res);
              if (res.meta.status == 201) {
                this.$message.success(res.meta.msg);
                // 还原数据
                this.$refs.manyOrOnlyDataRef.resetFields();
                // 关闭提示框
                console.log("点击finish");
                this.addManyOrOnlyDialogVisible = false;
                // 重新获取数据
                this.getOrAddIdCategoryList();
              } else {
                this.$message.error(res.meta.msg);
              }
            })
            .catch(err => {
              console.log("修改right返回数据失败", err);
            });
        }
      });
    },

    // tag标签点击x按钮
    deleteIdRight(row) {
      console.log(row.attr_vals.split(" "));
    },

    // tag标签中的input失去焦点
    handleInputConfirm() {
      this.inputVisible = false;
    },
  },
  computed: {
    // 判断是否可以使用按钮
    isBisabled() {
      return this.selectKeys.length != 3;
    },

    // 获取选这的id
    categoryId() {
      return this.selectKeys[this.selectKeys.length - 1];
    },
  },
};
</script>

<style lang="less" scoped>
/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
}
// 卡片视图
.alert {
  margin-bottom: 10px;
  width: 45%;
}

// 添加参数按钮
.many-add-btn {
  margin-bottom: 10px;
}

// 添加tag标签
.input-new-tag {
  width: 300px;
}
</style>
