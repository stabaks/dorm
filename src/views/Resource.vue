<!--  -->
<template>
  <div class="totalBox">
    <div class="box-left">
      <div class="tree-box">
          <!-- <loader :isShow = "isLoading"></loader> -->
        <div class="tree-title">资源树</div>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          highlight-current
          default-expand-all
        ></el-tree>
      </div>
    </div>
    <div class="box-right">
      <div class="detail-title">资源信息</div>
      <div class="form-box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="资源名称" prop="resourceName">
            <el-input v-model="ruleForm.resourceName"></el-input>
          </el-form-item>
          <el-form-item label="资源路由名称" prop="routeName">
            <el-input v-model="ruleForm.routeName"></el-input>
          </el-form-item>
          <el-form-item label="资源组件名称" prop="component">
            <el-input v-model="ruleForm.component"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="resourceUrl" required>
            <el-input v-model="ruleForm.component"></el-input>
          </el-form-item>
          <el-form-item label="资源图标" prop="resourceIcon" inline>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </el-form-item>
          <el-form-item label="资源种类" prop="resourceType" inline>
            <el-radio-group v-model="ruleForm.resourceType" size="medium">
              <el-radio-button label="菜单" name="0"></el-radio-button>
              <el-radio-button label="按钮" name="1"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <div style="text-align: center">
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getAllResource } from "../common/api";
import loader from "../common/inline-loader";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    loader
  },
  data() {
    //这里存放数据
    return {
      isLoading: true,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      ruleForm: {
        resourceName: "",
        routeName: "",
        component: "",
        resourceUrl: "",
        resourceIcon: "",
        resourceType: 0
      },
      rules: {
        resourceName: [
          { required: true, message: "请输入资源名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        routeName: [
          { required: true, message: "请输入资源路由名称", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        component: [
          { required: true, message: "请输入资源组件名称", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        resourceUrl: [
          { required: true, message: "请输入资源路径", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        // resourceIcon: [
        //   { required: true, message: "请选择资源图标", trigger: "blur" }
        // ],
        resourceType: [
          { required: true, message: "请选择资源类型", trigger: "blur" }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    initTree() {
      getAllResource().then(res => {
        console.log(res);
        if (res["code"] === "1") {
          if (res.data && res.data.length !== 0) {
            this.treeData = [...res.data];
          }
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initTree();
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
.totalBox {
  display: flex;
  width: 100%;
  height: 100%;
  //   padding: 14px 14px 20px 14px;
  .box-left {
    margin: 14px;
    padding: 14px;
    width: 30%;
    background: white;
    border-radius: 17px;
    transition: all 0.5s;
    box-shadow: 6px 6px 10px #333333;
    .tree-title {
      width: 100%;
    }
    &:hover {
      box-shadow: 1px 1px 25px #333333;
    }
    .tree-box {
        position: relative;
    }
  }
  .box-right {
    margin: 14px;
    width: 70%;
    background: white;
    border-radius: 17px;
    transition: all 0.5s;
    box-shadow: 6px 6px 10px #333333;
    &:hover {
      box-shadow: 1px 1px 25px #333333;
    }
    .detail-title {
      width: 100%;
    }
    .form-box {
      text-align: left;
      padding: 16px 32px 16px 0;
    }
  }
  .tree-box /deep/ .el-tree-node__content:hover {
    background-color: #409eff;
    color: #fff;
  }
  .tree-box /deep/ .el-tree-node__content {
    transition: all 0.5s;
  }
  .tree-box
    /deep/
    .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #409eff;
    color: #fff;
  }
}
</style>