<!--  -->
<template>
  <div class="total-wrapper">
    <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
      <el-table-column label="建筑物名称" prop="name" width="120" fixed></el-table-column>
      <el-table-column label="状态" prop="status" width="100">
        <template slot-scope="scope">{{scope.row.status | status}}</template>
      </el-table-column>
      <el-table-column label="建筑物号" prop="code"></el-table-column>
      <el-table-column label="所属校区" prop="campusName"></el-table-column>
      <el-table-column label="起始楼层" prop="floorStart"></el-table-column>
      <el-table-column label="建筑物层数" prop="floorTotal"></el-table-column>
      <el-table-column label="楼栋类型" prop="type">
        <template slot-scope="scope">{{scope.row.type | type}}</template>
      </el-table-column>
      <el-table-column label="产权证号" prop="certificateCode"></el-table-column>
      <el-table-column align="right" width="260" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <i class="el-icon-plus add-btn" @click="addBuilding()"></i>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            @click="getResourceData(scope.row)"
            :loading="scope.row.getResourceLoading"
          >资源管理</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listparam.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>

    <!--  对话框 -->
    <el-dialog :title="isNewUser === false? '更改角色信息': '新建角色' " :visible.sync="buildingFormVisible">
      <el-form :model="form" ref="buildingForm">
        <el-form-item label="角色名" label-width="120px" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="name"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="description">
          <el-input v-model="form.description" autocomplete="off" placeholder="description" maxlength="11"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buildingFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleForm" :loading="isBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 抽屉 -->
    <el-drawer
      title="资源管理"
      :visible.sync="isShowDrawer"
      direction="rtl"
      :before-close="handleCloseDrawer"
      custom-class="demo-drawer"
      size="20%"
    >
      <div class="demo-drawer__content">
        <div class="treeWrapper">
          <el-tree
            ref="tree"
            :data="resourceTreeData"
            @node-click="handleNodeClick"
            show-checkbox
            default-expand-all
            node-key="id"
            :props="defaultProps"
            :default-checked-keys="currentUserResources"
            check-strictly
          ></el-tree>
        </div>

        <div class="demo-drawer__footer">
          <el-button @click="handleCloseDrawer()" style="width: 50%">取 消</el-button>
          <el-button
            type="primary"
            @click="saveRoleResource()"
            :loading="saveResourceLoading"
            style="width: 50%"
          >{{ saveResourceLoading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { saveBuildingList } from "../common/api";
import { cloneObj } from "../common/utils";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [],
      searchParam: { // 请求列表查询参数
        keywords: "",
        id: null,
        pageNum: 1,
        pageSize: 10
      },
      allRoleList: [],
      isShowDrawer: false,
      search: "",
      listparam: {
        createTime: "",
        createUserName: "",
        endTime: "",
        lastModifyTime: "",
        lastModifyUserName: "",
        pageNum: 1,
        pageSize: 10,
        pkRoleId: "",
        description: "",
        name: "",
        startTime: "",
        // status: 0
      },
      form: {
        name: "",
        description: "",
        pkRoleId: ""
      },
      buildingFormVisible: false,
      isNewUser: false,
      isBtnLoading: false,
      tableLoading: false, //表格获取用户List加载状态
      saveResourceLoading: false, //资源保存加载状态
      defaultProps: {
        children: "children",
        label: "title"
      },
      resourceTreeData: [],
      currentUserResources: [],
      currentSaveRoleId: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getBuildingList() {
      this.tableLoading = true;
      saveBuildingList(this.searchParam).then(res => {
          if (res['code'] === '1') {
              this.tableData = [...res.data.records];
              this.tableLoading = false;
          }
          console.log(res);
      });
    },
    addBuilding() {
      cloneObj(null, this.form);
      this.isNewUser = true;
      this.buildingFormVisible = true;
    },
    handleSizeChange(val) {
      this.listparam.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listparam.pageNum = val;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getBuildingList();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  filters: {
    status: function(value) {
      switch (value) {
        case 0:
          return "闲置";
          break;
      }
    },
    type: function(value) {
      switch (value) {
        case 0:
          return "校内";
          break;
      }
    },
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/deep/.el-table th>.cell { 
    display: flex;
    align-items: center;
}
.add-btn {
    font-size: 20px;
    transition: all 0.25s;

    &:hover {
        transform: rotate(90deg);
        color: #409eff;
    }
}
</style>