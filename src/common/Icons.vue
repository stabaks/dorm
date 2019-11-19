<!--  -->
<template>
  <div>
    <el-dialog
      title="选择图标"
      :visible.sync="isShow"
      width="44%"
      @close="closeDialog()"
      custom-class="changePasswordDialog"
    >
      <div class="iconsBox">
        <div class="iconsList">
          <div
            class="iconItem"
            v-for="icon in icons"
            :key="icon.name"
            :class="icon.name === selectedIcon ?'highlight' : ''"
            @click="changeSelect(icon.name)"
          >
            <div class="iconImg">
              <i :class="icon.name"></i>
            </div>
            <div class="iconName">{{icon.name}}</div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmIcon()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { changePassword } from "../common/api";
export default {
  data() {
    return {
      selectedIcon: "",
      isShow: false,
      icons: [
        {
          name: "el-icon-platform-eleme"
        },
        {
          name: "el-icon-eleme"
        },
        {
          name: "el-icon-delete-solid"
        },
        {
          name: "el-icon-delete"
        },
        {
          name: "el-icon-s-tools"
        },
        {
          name: "el-icon-setting"
        },
        {
          name: "el-icon-user-solid"
        },
        {
          name: "el-icon-user"
        },
        {
          name: "el-icon-phone"
        },
        {
          name: "el-icon-phone-outline"
        },
        {
          name: "el-icon-more"
        },
        {
          name: "el-icon-more-outline"
        },
        {
          name: "el-icon-star-on"
        },
        {
          name: "el-icon-star-off"
        },
        {
          name: "el-icon-s-goods"
        },
        {
          name: "el-icon-goods"
        },
        {
          name: "el-icon-warning"
        },
        {
          name: "el-icon-warning-outline"
        },
        {
          name: "el-icon-question"
        },
        {
          name: "el-icon-info"
        },
        {
          name: "el-icon-remove"
        },
        {
          name: "el-icon-circle-plus"
        },
        {
          name: "el-icon-success"
        },
        {
          name: "el-icon-error"
        },
        {
          name: "el-icon-zoom-in"
        },
        {
          name: "el-icon-zoom-out"
        },
        {
          name: "el-icon-remove-outline"
        },
        {
          name: "el-icon-circle-plus-outline"
        },
        {
          name: "el-icon-circle-check"
        },
        {
          name: "el-icon-circle-close"
        },
        {
          name: "el-icon-s-help"
        },
        {
          name: "el-icon-help"
        },
        {
          name: "el-icon-minus"
        },
        {
          name: "el-icon-plus"
        },
        {
          name: "el-icon-check"
        },
        {
          name: "el-icon-close"
        }
      ]
    };
  },
  props: ["changeVisible"],
  components: {},

  computed: {},
  watch: {
    changeVisible: function(newVal) {
      this.isShow = newVal;
      // console.log(newVal);
    }
  },
  mounted() {},

  methods: {
    closeDialog() {
      this.$emit("closeDialog", this.selectedIcon);
    },
    changeSelect(thisName) {
      if (this.selectedIcon === thisName) {
        this.selectedIcon = "";
      } else {
        this.selectedIcon = thisName;
      }
    },
    confirmIcon() {
      if (this.selectedIcon) {
        this.isShow = false;
        // this.$emit("closeDialog", this.selectedIcon);
        // this.$emit("newIcon", this.selectedIcon);
      } else {
        this.$message.error({
          message: "请选择一个标签"
        });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
/deep/ .changePasswordDialog {
  height: 700px;
  width: 500px;
  border-radius: 24px;
  transition: all 1s;
  .el-dialog__body {
    min-height: 500px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .iconsBox {
      width: 665px;
      height: 500px;
      overflow-y: scroll;
      overflow-x: hidden;
      .iconsList {
        border-top: 1px solid #eee;
        border-left: 1px solid #eee;

        display: flex;
        flex-wrap: wrap;
        .iconItem {
          width: 130px;
          height: 130px;
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          font-size: 12px;

          &:hover {
            box-sizing: border-box;
            transition: all 0.5s;
            box-shadow: black 3px 2px 27px;
            transform: translateY(-2px);
            background: #1890ff;
            border-color: #1890ff;
            color: #fff;
            border-radius: 5px;
          }
          .iconImg {
            height: 70%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32px;
          }
          .iconName {
            height: 30%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  &:hover {
    box-shadow: 60px -16px rgb(84, 92, 100);
  }
  .highlight {
    border: none !important;
    // box-sizing: border-box;
    transition: all 0.5s;
    box-shadow: black 3px 2px 27px;
    transform: translateY(-2px);
    background: #1890ff;
    color: #fff;
    border-radius: 5px;
  }
}
</style>