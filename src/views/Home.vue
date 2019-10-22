<!--  -->
<template>
  <div class="wrapper">
    <el-container>
      <slider :menuData="menuData"></slider>
      <!-- <router-link to="/home/user">TEST</router-link> -->
      <el-container>
        <el-header>
          <div class="trigger-wrapper" @click="()=> this.$store.commit('switchCollapase')">
            <i :class="this.$store.state.navCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
          <div class="userInfoWrapper">
            <el-dropdown style="height: 100%;" trigger="click" @command="handleCommond">
              <div class="infoCard">
                <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
                <div class="nameWrapper">
                  <span style="padding-left: 5px;">{{userName}}</span>
                  <div class="statusWrapper">
                    <img
                      :class="{status: isShowStatus}"
                      :src="status === '启用'? greenPoint:status === '已删除' ? redPoint:yellowPoint"
                    />
                    <span style="font-size: 12px;">{{status}}</span>
                  </div>
                </div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0" style="display: flex; align-items: center;">
                  <img
                    src="../assets/setting.png"
                    style="margin-right: 5px; width:16px; height:16px;"
                  />
                  <span>Setting</span>
                </el-dropdown-item>
                <el-dropdown-item command="1" style="display: flex; align-items: center;">
                  <img
                    src="../assets/password.png"
                    style="margin-right: 5px; width:16px; height:16px;"
                  />
                  <span>Change password</span>
                </el-dropdown-item>
                <el-dropdown-item command="2" style="display: flex; align-items: center;">
                  <img
                    src="../assets/logout.png"
                    style="margin-right: 5px; width:16px; height:16px;"
                  />
                  <span>Logout</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
    <el-dialog title="更改密码" :visible.sync="changePasswordVisible" width="30%">
      <el-form :model="passwordForm" ref="passwordForm" :rules="newPassRules" inline-message>
        <el-form-item label="旧密码" label-width="120px" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            autocomplete="off"
            placeholder="OldPassword"
            maxlength="18"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            autocomplete="off"
            placeholder="newPassword"
            maxlength="18"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            autocomplete="off"
            placeholder="confirmPassword"
            maxlength="18"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePasswordVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveNewPassword('passwordForm')"
          :loading="isChangePwBtnLoading"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import slider from "../components/Slider";
import Cookies from "js-cookie";
import { getMenuData, changePassword } from "../common/api";
import { menusToRoutes } from "../common/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    slider
  },
  data() {
    //这里存放数据
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passwordForm.confirmPassword !== "") {
          this.$refs.passwordForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isCollapse: false,
      menuData: [],
      asyncRoutes: this.$router.options.routes,
      userName: "",
      status: "",
      greenPoint: require("@/assets/greenPoint.png"),
      redPoint: require("@/assets/redPoint.png"),
      yellowPoint: require("@/assets/yellowPoint.png"),
      isShowStatus: true,
      changePasswordVisible: false,
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      isChangePwBtnLoading: false,
      newPassRules: {
        oldPassword: [{ validator: validatePass, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
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
    initData() {
      const userStatus = JSON.parse(window.localStorage.getItem("userInfo"))
        .status;
      this.status =
        userStatus === 1 ? "启用" : userStatus === -1 ? "已删除" : "禁用" || "";
      setInterval(() => {
        this.isShowStatus = !this.isShowStatus;
      }, 500);
    },
    handleCommond(commond) {
      console.log(commond);
      switch (commond) {
        case "0":
          break;
        case "1":
          this.handleChangePassword();

          break;

        case "2":
          this.handleLogout();
          break;
      }
    },
    handleLogout() {
      this.$confirm("确认登出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "登出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消登出"
          });
        });
    },
    handleChangePassword() {
      this.changePasswordVisible = true;
    },
    saveNewPassword(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            oldPassword: this.passwordForm.oldPassword,
            newPassword: this.passwordForm.newPassword
          }
          changePassword(param).then(res => {
            console.log(res);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.userName = Cookies.get("userName");
    this.initData();

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
  line-height: 50px;
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
  display: flex;
  justify-content: space-between;
  .trigger-wrapper {
    width: 68px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #e6e6e6;
    }
    &:hover i {
      color: #5cb6ff;
    }
    i {
      font-size: 25px;
      color: #e9eef3;
    }
  }
  .userInfoWrapper {
    .infoCard {
      width: 162px;
      height: 100%;
      display: flex;
      align-items: center;
      line-height: 1;
      padding-left: 10px;
      .nameWrapper {
        width: 110px;
        padding: 10px;
        .statusWrapper {
          display: flex;
          align-items: center;
          img {
            transition: all 0.5s;
          }
        }
      }
      &:hover {
        background: #e6e6e6;
      }
    }
  }
  .status {
    opacity: 0;
  }
  /deep/ .el-dropdown-menu {
    .el-dropdown-menu__item {
      display: flex;
      align-items: center;
    }
  }
}
</style>