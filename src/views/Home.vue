<!--  -->
<template>
  <div class="wrapper">
    <el-container>
      <slider :menuData="menuData" ></slider>
      <!-- <router-link to="/home/user">TEST</router-link> -->
      <el-container>
        <el-header>
          <div class="trigger-wrapper" @click="()=> this.$store.commit('switchCollapase')">
            <i :class="this.$store.state.navCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
        </el-header>
        <el-main><router-view/></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import slider from "../components/Slider";
import Cookies from "js-cookie";
import { getMenuData } from "../common/api";
import { menusToRoutes } from "../common/utils"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    slider
  },
  data() {
    //这里存放数据
    return {
      isCollapse: false,
      menuData: [],
      asyncRoutes: this.$router.options.routes
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getMenuData() {
      getMenuData().then(res => {
        if (res.data.length !== 0 && res.data) {
          this.menuData = [...res.data];
          const newRoute = menusToRoutes(this.menuData);
          this.$router.options.routes = newRoute;
          this.$router.addRoutes(newRoute);
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(Cookies.get("userToken"));
    // console.log(this.$store.state.token);
    this.getMenuData();
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
//@import url(); 引入公共css类
.el-container {
  height: 100%;
}
.wrapper {
  width: 100%;
  height: 100%;
}
.el-aside {
  // width: 207px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  background: rgb(255, 255, 255);
  color: #333;
  line-height: 60px;
  padding: 0 0;

  .trigger-wrapper {
  width: 68px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
  background-color: #fff
  }
  &:hover i{
      color: #5cb6ff;    
  }
  i {
    font-size: 25px;
    color: #e9eef3;
  }
}
  
}
</style>