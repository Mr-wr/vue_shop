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
      <!-- search -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="querInfo.query" @clear="getGoodsList" clearable placeholder="请输入内容" class="input-with-select">
            <el-button @click="getGoodsList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button @click="goAddGoodsRoute" type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- table用户列表区域 -->
      <el-table class="goods-table" border stripe :data="goodsList" style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="商品时间">
          <template slot-scope="scope">
            {{ scope.row.upd_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button @click="alterGoodsInfo(scope.row.id)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="deleteGoods(scope.row)" size="mini" type="danger" icon="el-icon-delete" circle></el-button
          ></template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[10, 30, 100, 200]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList } from "@/network/home/goodsManagement";
import MyDialog from "../../components/common/dialog/MyDialog.vue";
export default {
  components: { getGoodsList, MyDialog },

  data() {
    return {
      // 获取用户列表数据对象
      querInfo: {
        // 查询信息
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 10,
      },
      // 页码数
      total: 0,
      // 商品列表
      goodsList: [],
      // 添加商品对话框显示
      addGoodsDialogVisible: false,
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表
    getGoodsList() {
      getGoodsList(this.querInfo)
        .then(res => {
          console.log("获取商品列表成功", res);
          const { data, meta } = res;
          if (meta.status == 200) {
            this.goodsList = data.goods;
            this.total = data.total;
          } else {
            this.$message.error(meta.msg);
          }
        })
        .catch(err => {
          console.log("获取商品列表failure", err);
        });
    },

    // 点击编辑商品goods按钮
    alterGoodsInfo() {},

    // 点击删除商品goods按钮
    deleteGoods() {},

    // 一页显示多少数据
    handleSizeChange(newSize) {
      console.log("一页显示多少数据", newSize);
      this.querInfo.pagesize = newSize;
      this.getGoodsList();
    },

    // 页码发生改变
    handleCurrentChange(newPage) {
      console.log("页码发生改变", newPage);
      this.querInfo.pagenum = newPage;
      this.getGoodsList();
    },

    // 点击添加商品
    goAddGoodsRoute() {
      this.$router.push("/goods/add");
    },
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
}
.el-row {
  margin-bottom: 20px;
}

// 商品列表
.goods-table {
  margin-bottom: 20px;
}
</style>
