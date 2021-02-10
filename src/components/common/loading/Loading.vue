<template>
  <div class="loading" v-show="isShow">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    },
  },
};
</script>
<style scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #888;
  width: 100px;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}
.loader {
  text-indent: -9999em;
  position: relative;
  width: 100px;
  height: 100px;
  background: #ffffff;

  /*从左向右0~10%位置纯白，10%~50%纯白~透明*/
  background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 50%);
  border-radius: 50%;
  box-shadow: inset 0 0 0 20px rgba(255, 255, 255, 0.2);
  -webkit-animation: load-effect 2s infinite linear;
  animation: load-effect 1.5s infinite linear;
}
/*绘制纯白1/4圆*/

.loader::before {
  position: absolute;
  content: "";
  width: 50%;
  height: 50%;
  background: #fff;
  border-radius: 100% 0 0 0;
  left: 0;
  top: 0;
}
/*绘制绿色背景内圆，挡住白色*/
.loader::after {
  background: #888;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  content: "";
  position: absolute;
  top: 20px;
  left: 20px;
}

@keyframes load-effect {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
