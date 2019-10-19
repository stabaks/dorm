<!--  -->
<template>
  <div class="sliderWrapper" @mouseenter="()=> this.$store.commit('showCollapase')">
    <el-menu
      :default-active="activeMenuIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="this.$store.state.navCollapsed"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <fragment v-for="(item, i) in menuData" :key="i">
        <el-submenu v-if="item.children.length!=0" :index="item.title">
          <template slot="title">
            <i v-if="item.icon" :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.title"
            :index="child.attribute.resourceUrl"
          >
            <i :class="child.icon"></i>
            <span slot="title">{{child.title}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.attribute.resourceUrl" v-else>
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </fragment>
    </el-menu>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import { getMenuData } from "../common/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["menuData"],
  data() {
    //这里存放数据
    return {
      activeMenuIndex: this.$route.path
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
    },
    initMenuData() {
      
    },
    
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initMenuData();
  },
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
.sliderWrapper {
  overflow: hidden;
  height: 100%;
  background: #545c64;
  display: flex;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
  min-height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>