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
      icons: [{name:'el-icon-platform-eleme'}, {name:'el-icon-eleme'}, {name:'el-icon-delete-solid'}, {name:'el-icon-delete'}, {name:'el-icon-s-tools'}, {name:'el-icon-setting'}, {name:'el-icon-user-solid'}, {name:'el-icon-user'}, {name:'el-icon-phone'}, {name:'el-icon-phone-outline'}, {name:'el-icon-more'}, {name:'el-icon-more-outline'}, {name:'el-icon-star-on'}, {name:'el-icon-star-off'}, {name:'el-icon-s-goods'}, {name:'el-icon-goods'}, {name:'el-icon-warning'}, {name:'el-icon-warning-outline'}, {name:'el-icon-question'}, {name:'el-icon-info'}, {name:'el-icon-remove'}, {name:'el-icon-circle-plus'}, {name:'el-icon-success'}, {name:'el-icon-error'}, {name:'el-icon-zoom-in'}, {name:'el-icon-zoom-out'}, {name:'el-icon-remove-outline'}, {name:'el-icon-circle-plus-outline'}, {name:'el-icon-circle-check'}, {name:'el-icon-circle-close'}, {name:'el-icon-s-help'}, {name:'el-icon-help'}, {name:'el-icon-minus'}, {name:'el-icon-plus'}, {name:'el-icon-check'}, {name:'el-icon-close'}, {name:'el-icon-picture'}, {name:'el-icon-picture-outline'}, {name:'el-icon-picture-outline-round'}, {name:'el-icon-upload'}, {name:'el-icon-upload2'}, {name:'el-icon-download'}, {name:'el-icon-camera-solid'}, {name:'el-icon-camera'}, {name:'el-icon-video-camera-solid'}, {name:'el-icon-video-camera'}, {name:'el-icon-message-solid'}, {name:'el-icon-bell'}, {name:'el-icon-s-cooperation'}, {name:'el-icon-s-order'}, {name:'el-icon-s-platform'}, {name:'el-icon-s-fold'}, {name:'el-icon-s-unfold'}, {name:'el-icon-s-operation'}, {name:'el-icon-s-promotion'}, {name:'el-icon-s-home'}, {name:'el-icon-s-release'}, {name:'el-icon-s-ticket'}, {name:'el-icon-s-management'}, {name:'el-icon-s-open'}, {name:'el-icon-s-shop'}, {name:'el-icon-s-marketing'}, {name:'el-icon-s-flag'}, {name:'el-icon-s-comment'}, {name:'el-icon-s-finance'}, {name:'el-icon-s-claim'}, {name:'el-icon-s-custom'}, {name:'el-icon-s-opportunity'}, {name:'el-icon-s-data'}, {name:'el-icon-s-check'}, {name:'el-icon-s-grid'}, {name:'el-icon-menu'}, {name:'el-icon-share'}, {name:'el-icon-d-caret'}, {name:'el-icon-caret-left'}, {name:'el-icon-caret-right'}, {name:'el-icon-caret-bottom'}, {name:'el-icon-caret-top'}, {name:'el-icon-bottom-left'}, {name:'el-icon-bottom-right'}, {name:'el-icon-back'}, {name:'el-icon-right'}, {name:'el-icon-bottom'}, {name:'el-icon-top'}, {name:'el-icon-top-left'}, {name:'el-icon-top-right'}, {name:'el-icon-arrow-left'}, {name:'el-icon-arrow-right'}, {name:'el-icon-arrow-down'}, {name:'el-icon-arrow-up'}, {name:'el-icon-d-arrow-left'}, {name:'el-icon-d-arrow-right'}, {name:'el-icon-video-pause'}, {name:'el-icon-video-play'}, {name:'el-icon-refresh'}, {name:'el-icon-refresh-right'}, {name:'el-icon-refresh-left'}, {name:'el-icon-finished'}, {name:'el-icon-sort'}, {name:'el-icon-sort-up'}, {name:'el-icon-sort-down'}, {name:'el-icon-rank'}, {name:'el-icon-loading'}, {name:'el-icon-view'}, {name:'el-icon-c-scale-to-original'}, {name:'el-icon-date'}, {name:'el-icon-edit'}, {name:'el-icon-edit-outline'}, {name:'el-icon-folder'}, {name:'el-icon-folder-opened'}, {name:'el-icon-folder-add'}, {name:'el-icon-folder-remove'}, {name:'el-icon-folder-delete'}, {name:'el-icon-folder-checked'}, {name:'el-icon-tickets'}, {name:'el-icon-document-remove'}, {name:'el-icon-document-delete'}, {name:'el-icon-document-copy'}, {name:'el-icon-document-checked'}, {name:'el-icon-document'}, {name:'el-icon-document-add'}, {name:'el-icon-printer'}, {name:'el-icon-paperclip'}, {name:'el-icon-takeaway-box'}, {name:'el-icon-search'}, {name:'el-icon-monitor'}, {name:'el-icon-attract'}, {name:'el-icon-mobile'}, {name:'el-icon-scissors'}, {name:'el-icon-umbrella'}, {name:'el-icon-headset'}, {name:'el-icon-brush'}, {name:'el-icon-mouse'}, {name:'el-icon-coordinate'}, {name:'el-icon-magic-stick'}, {name:'el-icon-reading'}, {name:'el-icon-data-line'}, {name:'el-icon-data-board'}, {name:'el-icon-pie-chart'}, {name:'el-icon-data-analysis'}, {name:'el-icon-collection-tag'}, {name:'el-icon-film'}, {name:'el-icon-suitcase'}, {name:'el-icon-suitcase-1'}, {name:'el-icon-receiving'}, {name:'el-icon-collection'}, {name:'el-icon-files'}, {name:'el-icon-notebook-1'}, {name:'el-icon-notebook-2'}, {name:'el-icon-toilet-paper'}, {name:'el-icon-office-building'}, {name:'el-icon-school'}, {name:'el-icon-table-lamp'}, {name:'el-icon-house'}, {name:'el-icon-no-smoking'}, {name:'el-icon-smoking'}, {name:'el-icon-shopping-cart-full'}, {name:'el-icon-shopping-cart-1'}, {name:'el-icon-shopping-cart-2'}, {name:'el-icon-shopping-bag-1'}, {name:'el-icon-shopping-bag-2'}, {name:'el-icon-sold-out'}, {name:'el-icon-sell'}, {name:'el-icon-present'}, {name:'el-icon-box'}, {name:'el-icon-bank-card'}, {name:'el-icon-money'}, {name:'el-icon-coin'}, {name:'el-icon-wallet'}, {name:'el-icon-discount'}, {name:'el-icon-price-tag'}, {name:'el-icon-news'}, {name:'el-icon-guide'}, {name:'el-icon-male'}, {name:'el-icon-female'}, {name:'el-icon-thumb'}, {name:'el-icon-cpu'}, {name:'el-icon-link'}, {name:'el-icon-connection'}, {name:'el-icon-open'}, {name:'el-icon-turn-off'}, {name:'el-icon-set-up'}, {name:'el-icon-chat-round'}, {name:'el-icon-chat-line-round'}, {name:'el-icon-chat-square'}, {name:'el-icon-chat-dot-round'}, {name:'el-icon-chat-dot-square'}, {name:'el-icon-chat-line-square'}, {name:'el-icon-message'}, {name:'el-icon-postcard'}, {name:'el-icon-position'}, {name:'el-icon-turn-off-microphone'}, {name:'el-icon-microphone'}, {name:'el-icon-close-notification'}, {name:'el-icon-bangzhu'}, {name:'el-icon-time'}, {name:'el-icon-odometer'}, {name:'el-icon-crop'}, {name:'el-icon-aim'}, {name:'el-icon-switch-button'}, {name:'el-icon-full-screen'}, {name:'el-icon-copy-document'}, {name:'el-icon-mic'}, {name:'el-icon-stopwatch'}, {name:'el-icon-medal-1'}, {name:'el-icon-medal'}, {name:'el-icon-trophy'}, {name:'el-icon-trophy-1'}, {name:'el-icon-first-aid-kit'}, {name:'el-icon-discover'}, {name:'el-icon-place'}, {name:'el-icon-location'}, {name:'el-icon-location-outline'}, {name:'el-icon-location-information'}, {name:'el-icon-add-location'}, {name:'el-icon-delete-location'}, {name:'el-icon-map-location'}, {name:'el-icon-alarm-clock'}, {name:'el-icon-timer'}, {name:'el-icon-watch-1'}, {name:'el-icon-watch'}, {name:'el-icon-lock'}, {name:'el-icon-unlock'}, {name:'el-icon-key'}, {name:'el-icon-service'}, {name:'el-icon-mobile-phone'}, {name:'el-icon-bicycle'}, {name:'el-icon-truck'}, {name:'el-icon-ship'}, {name:'el-icon-basketball'}, {name:'el-icon-football'}, {name:'el-icon-soccer'}, {name:'el-icon-baseball'}, {name:'el-icon-wind-power'}, {name:'el-icon-light-rain'}, {name:'el-icon-lightning'}, {name:'el-icon-heavy-rain'}, {name:'el-icon-sunrise'}, {name:'el-icon-sunrise-1'}, {name:'el-icon-sunset'}, {name:'el-icon-sunny'}, {name:'el-icon-cloudy'}, {name:'el-icon-partly-cloudy'}, {name:'el-icon-cloudy-and-sunny'}, {name:'el-icon-moon'}, {name:'el-icon-moon-night'}, {name:'el-icon-dish'}, {name:'el-icon-dish-1'}, {name:'el-icon-food'}, {name:'el-icon-chicken'}, {name:'el-icon-fork-spoon'}, {name:'el-icon-knife-fork'}, {name:'el-icon-burger'}, {name:'el-icon-tableware'}, {name:'el-icon-sugar'}, {name:'el-icon-dessert'}, {name:'el-icon-ice-cream'}, {name:'el-icon-hot-water'}, {name:'el-icon-water-cup'}, {name:'el-icon-coffee-cup'}, {name:'el-icon-cold-drink'}, {name:'el-icon-goblet'}, {name:'el-icon-goblet-full'}, {name:'el-icon-goblet-square'}, {name:'el-icon-goblet-square-full'}, {name:'el-icon-refrigerator'}, {name:'el-icon-grape'}, {name:'el-icon-watermelon'}, {name:'el-icon-cherry'}, {name:'el-icon-apple'}, {name:'el-icon-pear'}, {name:'el-icon-orange'}, {name:'el-icon-coffee'}, {name:'el-icon-ice-tea'}, {name:'el-icon-ice-drink'}, {name:'el-icon-milk-tea'}, {name:'el-icon-potato-strips'}, {name:'el-icon-lollipop'}, {name:'el-icon-ice-cream-square'}, {name:'el-icon-ice-cream-round'}]
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