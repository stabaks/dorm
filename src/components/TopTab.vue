<!--  -->
<template>
  <div class="tab-wrapper">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="goToSelectPage"
    >
      <el-tab-pane v-for="item in this.$store.state.cardList" :key="item.path" :label="item.title"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {
      editableTabsValue: `${this.$store.state.currentCard}`,
      editableTabs: [],
      tabIndex: 2
    };
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      console.log(targetName);
    },
    goToSelectPage(cardItem) {
      //   this.editableTabsValue = this.$store.getters.getCurrentCard;
      this.$router.push(this.$store.state.cardList[cardItem.index]);
    }
  },
  watch: {
    "$store.state.currentCard": function(newVal) {
      console.log(newVal);
      this.editableTabsValue = `${newVal}`;
    }
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
// .tab-wrapper /deep/ .el-tabs__item {
//     background: #fff;
// }
.tab-wrapper /deep/ .el-tabs__item.is-active {
  background: #fff;
  animation: fade-in; /*动画名称*/
  animation-duration: 1.5s; /*动画持续时间*/
  -webkit-animation: fade-in 1.5s; /*针对webkit内核*/
  color: #409eff;
  box-shadow: 2px 22px 21px 2px #000;
  transition: all 2.5s;
}
.tab-wrapper /deep/ .el-tabs__header {
  margin: 0;
}
.tab-wrapper /deep/ .el-tabs__item {
  animation: fade-in; /*动画名称*/
  animation-duration: 1s; /*动画持续时间*/
  -webkit-animation: fade-in 1s; /*针对webkit内核*/
  color: #b7b7b7;
}
.tab-wrapper /deep/ .el-tabs__nav {
  margin-left: 40px;
  line-height: 0;
  animation: fade-in; /*动画名称*/
  animation-duration: 1s; /*动画持续时间*/
  -webkit-animation: fade-in 1s; /*针对webkit内核*/
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translate(700px);
  } /*初始状态 透明度为0*/
  40% {
    opacity: 0;
    transform: translate(450px);
  } /*过渡状态 透明度为0*/
  100% {
    opacity: 1;
  } /*结束状态 透明度为1*/
}
</style>