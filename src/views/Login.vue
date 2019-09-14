<!--  -->
<template>
  <div class="wrapper">
    <div class="login-wrapper">
      <div class="loginHeader">
        <span>登录</span>
      </div>
      <div class="login-content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              placeholder="UserName"
              prefix-icon="el-icon-user"
              v-model="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              placeholder="Password"
              prefix-icon="el-icon-user"
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="loginBtn"
              type="primary"
              :loading="isBtnLoading"
              @click="submitForm('ruleForm')"
            >登录</el-button>
          </el-form-item>
        </el-form>
        <!-- <br />
        <el-input placeholder="UserName" prefix-icon="el-icon-user" v-model="userName"></el-input>
        <br />
        <br />
        <el-input
          placeholder="PassWord"
          prefix-icon="el-icon-lock"
          v-model="passWord"
          show-password
        ></el-input>
        <br />
        <br />
        <el-button class="loginBtn" type="primary" :loading="isBtnLoading" @click="login()">登录</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
import service from "../common/common";
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      isShowLogin: false,
      isBtnLoading: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    // 在整个页面添加回车登录事件的方法
    var lett = this;
    document.onkeyup = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.submitForm('ruleForm');
      }
    };
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    login() {},
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isBtnLoading = true;
          const url = "waken/dorm/login";
          const queryUserForm = {
            userName: this.ruleForm.username,
            password: this.ruleForm.password
          };
          service.post(url, queryUserForm, res => {
            if (res.body.code === "1") {
              this.$message({
                message: "Login Success",
                type: "success"
              });
              this.goToHome(res.body.data);
              this.isBtnLoading = false;
            } else {
              this.$message.error({
                message: res.body.msg
              });
              this.isBtnLoading = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goToHome(resData) {
      console.log(resData.token);
      Cookies.set('userToken', resData.token, {expires: 7});
      Cookies.set('userId', resData.user.userId, {expires: 7});
      this.$router.push('/home')
    }
  }
};
</script>
<style  lang='scss' scoped>
.wrapper {
  background-image: url("../assets/login-back.png");
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;

  .login-wrapper {
    position: absolute;
    width: 20%;
    height: 45%;
    left: 18%;
    .loginHeader {
      :first-child {
        border-top: 3px solid rgb(91, 175, 241);
        font-size: 30px;
        padding-top: 20px;
        margin-left: 50px;
      }
    }
    .login-content {
      margin-top: 50px;
    }
  }
}
.loginBtn {
  width: 40%;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  } /*初始状态 透明度为0*/
  40% {
    opacity: 0;
  } /*过渡状态 透明度为0*/
  100% {
    opacity: 1;
  } /*结束状态 透明度为1*/
}
.login-wrapper {
  animation: fade-in; /*动画名称*/
  animation-duration: 1.5s; /*动画持续时间*/
  -webkit-animation: fade-in 1.5s; /*针对webkit内核*/
}
</style>