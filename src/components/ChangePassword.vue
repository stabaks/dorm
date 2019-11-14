<!--  -->
<template>
  <div>
    <el-dialog
      title="更改密码"
      :visible.sync="isShow"
      width="44%"
      @close="closeDialog()"
      custom-class="changePasswordDialog"
    >
      <div class="userInfo">
        <div class="userAvatar">
          <el-avatar
            :size="80"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </div>
        <div class="userName">test</div>
      </div>
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
import { changePassword } from "../common/api";
export default {
  data() {
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
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      newPassRules: {
        oldPassword: [{ validator: validatePass, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      isChangePwBtnLoading: false,
      isShow: false
    };
  },
  props: ["changePasswordVisible"],
  components: {},

  computed: {},
  watch: {
    changePasswordVisible: function(newVal) {
      this.isShow = newVal;
      // console.log(newVal);
    }
  },
  mounted() {},

  methods: {
    saveNewPassword(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            oldPassword: this.passwordForm.oldPassword,
            newPassword: this.passwordForm.newPassword
          };
          changePassword(param).then(res => {
            if (res['code'] === "1") {
              this.$message({
                type: "success",
                message: "修改密码成功!"
              });
              
            } else {
              this.$message.error({
                  message: res.data.msg
                });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closeDialog() {
      this.$emit("changePwDialog", false);
    }
  }
};
</script>
<style lang='scss' scoped>
/deep/ .changePasswordDialog {
  height: 700px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  transition: all 1s;
  .el-dialog__body {
    min-height: 500px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .el-form {
      width: 58%;
    }
    .userInfo {
      width: 100%;
      text-align: center;
      .userName {
        line-height: 50px;
      }
    }
  }
  .dialog-footer {
    text-align: center;
  }
  &:hover {
    box-shadow: 60px -16px rgb(84, 92, 100);
  }
}
</style>