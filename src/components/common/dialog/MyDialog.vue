<template>
  <div class="dialog">
    <el-dialog :show-close="false" :close-on-click-modal="false" :title="title" :visible.sync="isvisible" :width="width">
      <slot><span>这是一段信息</span></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow(false)">取 消</el-button>
        <el-button type="primary" @click="isShow(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isvisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    title: {
      type: String,
      default() {
        return "提示";
      },
    },
    width: {
      type: String,
      default() {
        return "50%";
      },
    },
  },
  data() {
    return {
      // isShow: this.isvisible,
    };
  },
  methods: {
    isShow(params) {
      this.$emit("isShow", params);
    },
  },
};
</script>

<style scoped></style>
