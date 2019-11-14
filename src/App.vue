<template>
  <div id="app">
    <router-view/>
    <loading></loading>
  </div>
</template>
<script>
import loading from './common/loading'
export default {
  components: {
    loading
  }
}
</script>
<style>
  #app{
    width: 100%;
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  body{
    margin: 0 0 0 0;
    width: 100%;
    height: 100%;
  }
  html{
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
</style>
