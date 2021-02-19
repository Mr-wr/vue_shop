<template>
  <div class="add">
    <!-- 面包屑导航区 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-alert center class="alert" show-icon title="添加商品信息" :closable="false" type="info"></el-alert>

      <!-- 步骤条 -->
      <el-steps :space="200" align-center finish-status="success" :active="stepsActiveIndex - 0">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tabs标签页 -->
      <!-- 表单 -->
      <el-form :rules="goodsBaseInfoRules" :model="goodsBaseInfo" label-position="top" ref="goodsBaseInfoRef" label-width="80px">
        <!-- tabs标签页 -->
        <el-tabs v-model="stepsActiveIndex" tab-position="left" style="">
          <!-- 这里中间不能放其他的标签 -->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="goodsBaseInfo.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" v-model="goodsBaseInfo.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model="goodsBaseInfo.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" v-model="goodsBaseInfo.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
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
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action图片要上传的地址 -->
            <!-- on-preview 处理图片预览 -->
            <!-- on-remove 处理移除图片 -->
            <!-- list-type="picture"预览组件的ui效果显示方式 -->
            <!-- headers手动绑定请求头 -->
            <!-- :on-success="upSuccess"上传成功时执行
             on-success	文件上传成功时的钩子	function(response, file, fileList)
             response:响应数据
             file：文件信息
            fileList：文件列表-->
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture-card"
              :on-success="upSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 文本编辑器 -->
            <quill-editor ref="myQuillEditor" v-model="content" />
            <!-- 完成按钮 -->
            <el-button @click="addFailure" type="primary">完成</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getGoodsCategoryList } from "@/network/home/goodsManagement";
import MyDialog from "../../components/common/dialog/MyDialog.vue";
export default {
  components: { getGoodsCategoryList, MyDialog },
  data() {
    return {
      // 步骤条索引
      stepsActiveIndex: 0,
      // 基本信息绑定
      goodsBaseInfo: {
        goods_name: "",
        goods_number: "",
        goods_price: "",
      },
      // 分类数据
      categoryList: [],
      // 分类级联选择的数据
      selectKeys: [],
      // 指定联机触发配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        expandTrigger: "hover",
        checkStrictly: true,
      },
      goodsBaseInfoRules: {
        goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        goods_number: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        goods_price: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        goods_weight: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
      },
      content: "",
    };
  },
  created() {
    this.getGoodsCategoryList();
    console.log("categoryList", this.categoryList);
  },
  methods: {
    // 获取商品分类列表
    getGoodsCategoryList() {
      getGoodsCategoryList(this.querInfo)
        .then(res => {
          console.log("获取商品分类成功", res);
          const { data, meta } = res;
          this.categoryList = data;
          this.total = data.total;
        })
        .catch(err => {
          console.log("获取商品分failure", err);
        });
    },

    // 级联选择触发
    categoryChange() {
      // 只能选择最后一级的节点
      // 判断选择的数组长度判断是否选择的是三级节点
      if (this.selectKeys.length < 3) {
        this.selectKeys = [];
        // 清空动态参数/静态参数表格

        return;
      }
      // 每次改变都获取一次数据
      // this.getOrAddIdCategoryList();
    },

    // 处理图片预览
    handlePreview() {},

    // 处理移除图片
    handleRemove() {},

    // 上传成
    upSuccess() {},

    // 点击完成按钮
    addFailure() {
      this.$router.push("/goods");
    },
  },
};
</script>

<style lang="less" scoped>
/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
}
</style>
