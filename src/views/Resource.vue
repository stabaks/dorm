<!--  -->
<template>
  <div class="totalBox">
    <div class="box-left" :class="{'hasResource': currentClickResource}">
      <div class="tree-box">
        <!-- <loader :isShow = "isLoading"></loader> -->
        <div class="tree-title">
          <span>资源树</span>
          <div class="btn-group">
            <el-link class="el-icon-plus" @click="addRedource()">新增</el-link>
            <el-link style="color: #F56C6C;" class="el-icon-edit" @click="delResource">删除</el-link>
          </div>
        </div>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          highlight-current
          default-expand-all
        ></el-tree>
      </div>
    </div>
    <div class="box-right" v-if="currentClickResource">
      <div class="detail-title">
        <span>{{isCreate? '创建新资源': '资源信息'}}</span>
        <div class="btn-group" v-if="isCreate">
          <div>
            <el-radio v-model="isParent" :label="true" size="small">在当前层级创建</el-radio>
            <el-radio v-model="isParent" :label="false" size="small">在子级创建</el-radio>
          </div>
          <!-- <el-switch v-model="isParent" active-text="在当前层级创建" inactive-text="在子级创建"></el-switch> -->
        </div>
      </div>
      <div class="form-box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资源路由名称" prop="routeName">
            <el-input v-model="ruleForm.routeName"></el-input>
          </el-form-item>
          <el-form-item label="资源组件名称" prop="component">
            <el-input v-model="ruleForm.component"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="resourceUrl">
            <el-input v-model="ruleForm.resourceUrl"></el-input>
          </el-form-item>
          <el-form-item label="资源图标" prop="resourceIcon">
            <div style="width: 100%; display: flex; ">
              <div style="width: 50px; text-align: center;">
                <i :class="ruleForm.resourceIcon"></i>
              </div>
              <el-button
                type="primary"
                :icon="ruleForm.resourceIcon? 'el-icon-edit' : 'el-icon-plus'"
                @click="changeIconsVisible = !changeIconsVisible"
                circle
              ></el-button>
            </div>
          </el-form-item>
          <el-form-item label="按钮管理" prop="resourceType">
            <!-- <el-radio-group v-model="ruleForm.resourceType" size="medium">
              <el-radio-button label="1">菜单</el-radio-button>
              <el-radio-button label="2">按钮</el-radio-button>
            </el-radio-group>-->
            <el-tag
              :key="tag.name"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag.name}}</el-tag>
            <!-- <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
            <el-popover placement="right" v-model="inputVisible">
              <el-form :label-position="'right'" :model="formInline" class="demo-form-inline">
                <el-form-item label="按钮名称" style="display: flex;justify-content: flex-end">
                  <el-input v-model="formInline.name" placeholder="按钮名称"></el-input>
                </el-form-item>
                <el-form-item label="权限" style="display: flex; justify-content: flex-end">
                  <el-input v-model="formInline.perms" placeholder="按钮权限"></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <el-button type="primary" size="mini" @click="visible = false">确定</el-button> -->
                </el-form-item>
              </el-form>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="inputVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleInputConfirm">确定</el-button>
              </div>
              <el-button slot="reference" class="button-new-tag">增加按钮资源</el-button>
            </el-popover>
          </el-form-item>
          <el-form-item>
            <div style="text-align: center">
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                style="width: 100%"
                :loading="isSaveBtnLoading"
              >保存</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <icons :changeVisible="changeIconsVisible" @closeDialog="changeIconsDialog"></icons>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  deleteResource,
  getAllResource,
  saveResourceInfo,
  getBtnsResource
} from "../common/api";
import loader from "../common/inline-loader";
import { cloneObj } from "../common/utils";
import icons from "../common/Icons";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    loader,
    icons
  },
  data() {
    //这里存放数据
    return {
      formInline: {
        name: "",
        perms: ""
      },
      changeIconsVisible: false,
      isSaveBtnLoading: false,
      isLoading: true,
      isCreate: false,
      currentClickResource: null,
      isParent: false,
      changeVisible: false,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      ruleForm: {
        parentId: "",
        id: "",
        name: "",
        routeName: "",
        component: "",
        resourceUrl: "",
        resourceIcon: "",
        resourceType: 0
      },
      rules: {
        name: [
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
        ]
        // resourceIcon: [
        //   { required: true, message: "请选择资源图标", trigger: "blur" }
        // ],
        // resourceType: [
        //   { required: true, message: "请选择资源类型", trigger: "blur" }
        // ]
      },
      dynamicTags: [],
      inputVisible: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClose(tag) {
      console.log(tag);
      if (tag.id) {
        this.$confirm("确定要删除这个资源吗？")
          .then(_ => {
            this.doDelResource(tag.id);
          })
          .catch(_ => {});
      } else {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      }
    },

    handleInputConfirm() {
      console.log(123123);
      let isExist = false;
      this.dynamicTags.forEach(tag => {
        if (tag.name === this.formInline.name) {
          isExist = true;
        }
      });
      if (!isExist) {
        if (this.formInline.name && this.formInline.perms) {
          const newTagObj = {
            name: this.formInline.name,
            perms: this.formInline.perms
          };
          this.dynamicTags.push(newTagObj);
          this.inputVisible = false;
          this.formInline.name = "";
          this.formInline.perms = "";
        } else {
          this.$message.error({
            message: "必填字段不能为空"
          });
        }
      } else {
        this.$message.error({
          message: "按钮资源名称不能相同"
        });
      }
    },
    updateIcon(param) {
      console.log(param);
    },
    handleNodeClick(data) {
      console.log(data);
      this.dynamicTags = []; // 重置按钮标签数组
      if (this.currentClickResource === data) {
        this.currentClickResource = null;
      } else {
        this.isCreate = false;
        this.isParent = null;
        this.ruleForm.id = data.attribute.id
        cloneObj(data.attribute, this.ruleForm);
        this.currentClickResource = data;
      }
      // 将数据渲染进表单clg
      getBtnsResource(data.attribute.id).then(res => {
        console.log(res);
        if (res["code"] === "1") {
          this.dynamicTags = [...res.data];
        }
      });
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
          console.log(this.ruleForm);
          console.log(this.currentClickResource);
          if (this.isParent !== null) {
            // 如果有值那就是创建
            if (this.isParent) {
              this.ruleForm.parentId = this.currentClickResource.attribute.parentId;
            } else {
              this.ruleForm.parentId = this.currentClickResource.attribute.id;
            }
          }
          if (this.dynamicTags && this.dynamicTags.length !== 0) {
            this.ruleForm.buttonResourcesList = [...this.dynamicTags];
          }
          this.ruleForm.resourceType = 1;
          if (this.ruleForm) {
            this.isSaveBtnLoading = true;
            saveResourceInfo(this.ruleForm).then(res => {
              if (res["code"] === "1") {
                this.$message({
                  message: res['msg'],
                  type: "success"
                });
                this.isSaveBtnLoading = false;
                this.initTree();
              } else {
                this.isSaveBtnLoading = false;
                this.$message.error({
                  message: res["msg"]
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeIconsDialog(newIcon) {
      // console.log(newIcon);
      this.changeIconsVisible = false;
      if (newIcon) {
        this.ruleForm.resourceIcon = newIcon;
      }
    },
    addRedource() {
      this.isParent = false;
      // console.log(this.currentClickResource);

      if (!this.currentClickResource) {
        this.$message.error({
          message: "请选择一个资源再进行操作"
        });
      } else {
        this.isCreate = true;
        cloneObj(null, this.ruleForm);
        this.dynamicTags = []
      }
    },
    doDelResource(resourceId) {
      const param = {
        delIds: [`${resourceId}`],
        delStatus: 1
      };
      console.log(param);
      deleteResource(param).then(res => {
        if (res["code"] === "1") {
          this.$message.success({
            message: "删除成功！"
          });
          this.initTree();
        } else {
          this.$message.error({
            message: res.msg
          });
        }
      });
    },
    delResource() {
      if (this.currentClickResource) {
        this.$confirm("确定要删除这个资源吗？")
          .then(_ => {
            this.doDelResource(
              this.currentClickResource.attribute.id
            );
          })
          .catch(_ => {});
      } else {
        this.$message.error("请选择一条数据再进行操作");
      }
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
    margin: 0 14px 14px 14px;
    padding: 14px;
    width: 100%;
    background: white;
    border-radius: 17px;
    transition: all 0.5s;
    box-shadow: 6px 6px 10px #333333;
    transition: all 0.75s;
    .tree-title {
      width: 100%;
      position: relative;
      span {
        text-align: center;
      }
      .btn-group {
        position: absolute;
        right: 0;
        top: 0;
        a {
          margin-left: 9px;
        }
      }
    }
    &:hover {
      box-shadow: 1px 42px 25px #333333;
    }
    .tree-box {
      position: relative;
    }
  }
  .hasResource {
    width: 30%;
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
      position: relative;
      .btn-group {
        position: absolute;
        right: 10px;
        top: 0;
      }
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>