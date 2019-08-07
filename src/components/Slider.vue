<!--  -->
<template>
  <div class="wrapper">
    <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider>
    <div class="logo" >
      <a-avatar size="large" icon="user"/>
    </div>
    <a-menu  mode="inline" theme="dark">
      <a-sub-menu v-for="item in menuData" :key="item.key">
        <span slot="title">
          <a-icon type="mail" />
          <span>{{item.name}}</span>
        </span>
        <a-menu-item v-for="menuitem in item.child" :key="menuitem.key">{{menuitem.name}}</a-menu-item>
      </a-sub-menu>
    </a-menu>
    </a-layout-sider>
    <headerNav></headerNav>
    </a-layout>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import headerNav from './Header'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    headerNav
  },
  data() {
    //这里存放数据
    return {
      menuData: [
        {
          name: "用户管理",
          key: 1
        },
        {
          name: "用户管理",
          key: 2,
          child: [{ name: "用户", key: 3 }]
        },
        {
          name: "用户管理",
          key: 5,
          child: [{ name: "用户", key: 4 }]
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    openKeys() {}
  },
  //方法集合
  methods: {
    handleClick() {},
    titleClick() {}
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
//@import url(); 引入公共css类
.wrapper {
  height: 100%;
}
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
}
</style>