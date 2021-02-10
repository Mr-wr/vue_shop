<template>
  <!-- 全局提示框 -->
  <div class="toast-wrapper" v-show="toastShow">
    <span class="toast">
      {{ toastText }}
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toastShow: false,
      toastText: "",
    };
  },
};
</script>
<style scoped>
.toast-wrapper {
  max-height: 90px;
  overflow: hidden;
  position: fixed;
  z-index: 2000;
  line-height: 1.25;
  left: 50%;
  top: 85%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  background: rgba(17, 17, 17, 0.7);
  padding: 0 15px;
  max-width: 100%;
  transition: all 0.5s;
}
.toast {
  font-size: 12px;
  width: 100%;
  color: #fff;
  line-height: 14px;
}
</style>
