<!--  -->
<template>
  <div class="sliderWrapper">
    <el-menu
      default-active="1-4-1"
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
import { getMenuData } from "../common/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["isCollapse"],
  data() {
    //这里存放数据
    return {
      menuData: [
        {
          id: "e719a109a7014484901f657f7f3a8c3b",
          parentId: "root",
          key: "e719a109a7014484901f657f7f3a8c3b",
          title: "系统管理",
          icon: "el-icon-location",
          sort: 0,
          checked: false,
          open: false,
          attribute: {},
          children: [
            {
              id: "e719a109a7014484901f657f7f3a8c3b",
              parentId: "root",
              key: "e719a109a7014484901f657f7f3a8c3b",
              title: "系统管理",
              icon: "el-icon-location",
              sort: 0,
              checked: false,
              open: false,
              attribute: {
                resourceUrl: "/home/user",
                routeName: "user",
                component: "@/views/User"
              },
              children: [],
              leaf: false
            }
          ],
          leaf: false
        },
        {
          id: "e719a109a7014484901f657f7f3a8c3b",
          parentId: "root",
          key: "e719a109a7014484901f657f7f3a8c3b",
          title: "系统管理",
          icon: "el-icon-location",
          sort: 0,
          checked: false,
          open: false,
          attribute: {
            resourceUrl: "/sada/fdsg"
          },
          children: [],
          leaf: false
        }
      ],
      asyncRoutes: this.$router.options.routes
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
      getMenuData().then(res => {
        if (res.data.length !== 0 && res.data) {
          // this.menuData = [...res.data];
          const newRoute = this.menusToRoutes(this.menuData);
          console.log(newRoute);
          this.$router.beforeEach(async (to, from, next) => {
            this.$router.addRoutes(newRoute);
          });
        }
      });
    },
    menusToRoutes(data) {
      console.log(data);
      console.log(this.$router.options.routes);
      const result = [];
      const children = [];
      result.push({
        path: "/home",
        component: () => import("../views/Home"),
        children
      });
      data.forEach(item => {
        this.generateRoutes(children, item);
      });
      result.push({ path: "*", redirect: "/login" });
      return result;
    },
    generateRoutes(children, item) {
      let isExist = false;
      if (item.attribute.routeName) {
        this.asyncRoutes.forEach(route => {
          if (route.name === item.attribute.routeName) {
            isExist = true;
          }
        });
        if (!isExist) {
          children.push({
            path: item.attribute.resourceUrl,
            name: item.attribute.routeName,
            component: () => resolve =>
              require([item.attribute.component], resolve)
          });
        }
      } else if (item.children && item.children.length !== 0) {
        item.children.forEach(e => {
          this.generateRoutes(children, e);
        });
      }
    },
    getViews(path) {
      return resolve => {
        require.ensure([], require => {
          resolve(require("../views/" + path + ".vue"));
        });
      };
    }
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