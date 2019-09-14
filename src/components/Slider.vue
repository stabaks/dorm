<!--  -->
<template>
  <div class="sliderWrapper">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-collapse-transition>
      <div class="avatarWrapper" v-if="!this.$store.state.navCollapsed">
        <el-avatar :size="50" fit="fill" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <div class="infoWrapper">
          <span class="userName">Yang</span>
          <span class="userId">123123</span>
        </div>
    </div>
    </el-collapse-transition>
    
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="this.$store.state.navCollapsed"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import headerNav from "./Header";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    headerNav
  },
  props: ['isCollapse'],
  data() {
    //这里存放数据
    return {
      isCollapse: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.sliderWrapper{
  overflow: hidden;
  height: 100%;
  background: #545c64;
  // width: 207px;
  .avatarWrapper{
    background: #545c64;
    color: rgb(255,208,75);
    padding: 10px 0px 10px 10px;
    display: flex;
    align-items: center;
    .infoWrapper{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 70px;
      width: 146px;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
  min-height: 100%
}
.el-menu-vertical-demo{
  height: 100%;
}
</style>