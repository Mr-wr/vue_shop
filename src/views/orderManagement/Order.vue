<template>
  <div class="order">
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
          <el-input v-model="querInfo.query" @clear="getOrdersList" clearable placeholder="请输入内容" class="input-with-select">
            <el-button @click="getOrdersList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- table订单列表区域 -->
      <el-table class="order-table" border stripe :data="ordersList" style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格(元)" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.pay_status" type="success">已付款</el-tag>
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"> </el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button @click="alterOrderInfo(scope.row.id)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="showAddress()" size="mini" type="danger" icon="el-icon-location" circle></el-button
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

    <!-- 修改地址对话框 -->
    <my-dialog title="地址对话框" @isShow="alterAddressDialog" :isvisible="alterAddressDialogVisible">
      <!-- 时间线 -->
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </my-dialog>
  </div>
</template>

<script>
import { getOrdersList, getAddressInfo } from "@/network/home/orderManagement";
import MyDialog from "../../components/common/dialog/MyDialog.vue";
export default {
  components: { getOrdersList, getAddressInfo, MyDialog },
  name: "",
  props: {},
  data() {
    return {
      // 获取商品列表数据对象
      querInfo: {
        // 查询信息
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 10,
      },
      total: 0,
      // 订单列表
      ordersList: [],
      // 修改地址对话框
      alterAddressDialogVisible: false,

      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
    };
  },
  created() {
    this.getOrdersList();
  },
  methods: {
    // 获取订单列表
    getOrdersList() {
      getOrdersList(this.querInfo)
        .then(res => {
          console.log("获取订单列表success", res);
          const { data, meta } = res;
          if (meta.status == 200) {
            this.ordersList = data.goods;
            this.total = data.total;
          } else {
            this.$message.error(meta.msg);
          }
        })
        .catch(err => {
          console.log("获取订单列表failure", err);
        });
    },

    // 一页显示多少数据
    handleSizeChange(newSize) {
      console.log("一页显示多少数据", newSize);
      this.querInfo.pagesize = newSize;
      this.getOrdersList();
    },

    // 页码发生改变
    handleCurrentChange(newPage) {
      console.log("页码发生改变", newPage);
      this.querInfo.pagenum = newPage;
      this.getOrdersList();
    },

    // 点击编辑订单按钮
    alterOrderInfo() {},

    // 点击显示地址按钮
    showAddress() {
      // 获取地址
      // getAddressInfo("804909574412580")
      //   .then(res => {
      //     console.log("获取地址成功", res);
      //     if (res.meta.status == 201) {
      //       this.$message.success(res.meta.msg);
      //       console.log("点击finish");
      this.alterAddressDialogVisible = true;
      //   } else {
      //     this.$message.error(res.meta.msg);
      //   }
      // })
      // .catch(err => {
      //   console.log("获取地址失败", err);
      // });
    },

    // 点击确认或取消 修改地址对话框
    alterAddressDialog(params) {
      // 点击取消
      if (!params) {
        console.log("点击cancel");
        this.alterAddressDialogVisible = false;
        return;
      }
      this.alterAddressDialogVisible = false;
      console.log("点击finish");
    },
  },
  computed: {},
};
</script>
<style lang="less" scoped>
/* 面包屑 */
.breadcrumb {
  margin-bottom: 20px;
}

// row

.el-row {
  margin-bottom: 20px;
}

// 分页
.el-pagination {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
