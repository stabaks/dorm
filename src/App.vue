<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
    <loading></loading>
  </div>
</template>
<script>
import loading from "./common/loading";
export default {
  components: {
    loading
  }
};
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
body {
  margin: 0 0 0 0;
  width: 100%;
  height: 100%;
}
html {
  margin: 0 0 0 0;
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
