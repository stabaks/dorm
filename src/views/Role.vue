<!--  -->
<template>
  <div class="tableWrapper">
    <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
      <el-table-column label="角色名" prop="roleName" width="120" fixed></el-table-column>
      <el-table-column label="状态" prop="status" width="100">
        <template slot-scope="scope">{{scope.row.status | status}}</template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="创建操作人" prop="createUserName"></el-table-column>
      <el-table-column label="修改时间" prop="lastModifyTime"></el-table-column>
      <el-table-column label="修改操作人" prop="lastModifyUserName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column align="right" width="260" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <i class="el-icon-plus add-btn" @click="addRole()"></i>
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
    <el-dialog :title="isNewUser === false? '更改角色信息': '新建角色' " :visible.sync="roleFormVisible">
      <el-form :model="form" ref="roleForm">
        <el-form-item label="角色名" label-width="120px" prop="roleName">
          <el-input
            v-model="form.roleName"
            autocomplete="off"
            placeholder="rolename"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input v-model="form.roleDesc" autocomplete="off" placeholder="roleDesc" maxlength="11"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
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
import { cloneObj } from "../common/utils";
import {
  saveRole,
  delUser,
  getRoleList,
  saveUserRole,
  getRoleResource,
  saveRoleResource
} from "../common/api";
import axios from "axios"; // 引入axios
export default {
  data() {
    return {
      allRoleList: [],
      tableData: [],
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
        roleDesc: "",
        roleName: "",
        startTime: "",
        // status: 0
      },
      form: {
        roleName: "",
        roleDesc: "",
        pkRoleId: ""
      },
      roleFormVisible: false,
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

  components: {},

  computed: {},

  mounted() {
    this.getRoleTableData();
  },

  methods: {
    handleEdit(index, row) {
      console.log(row);
      // this.form = {...row};
      cloneObj(row, this.form);
      this.isNewUser = false;
      this.roleFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      const telParam = {
        delIds: [row.pkRoleId],
        delStatus: 1
      };
      this.$confirm("确定要删除这个角色吗？")
        .then(_ => {
          axios
            .delete("https://aishu.site/waken/dorm/role/delete", {
              data: telParam
            })
            .then(res => {
              if (res.data.code === "1") {
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
                this.getRoleTableData();
                this.roleFormVisible = false;
              } else {
                this.$message.error({
                  message: res.data.msg
                });
              }
            });
        })
        .catch(_ => {});
    },
    handleSizeChange(val) {
      this.listparam.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listparam.pageNum = val;
    },
    getRoleTableData() {
      this.tableLoading = true;
      getRoleList(this.listparam).then(res => {
        if (res.code === "1") {
          if (res.data.records) {
            this.tableData = [...res.data.records];
            this.tableData.forEach(user => {
              user.getResourceLoading = false;
            });
            this.tableLoading = false;
          }
          // this.tableData = [...res.data.records];
          console.log(this.tableData);
          // this.tableLoading = false;
        } else {
          this.$message.error({
            message: res.msg
          });
          this.tableLoading = false;
        }
      });
    },
    saveRoleForm() {
      this.isBtnLoading = true;
      saveRole(this.form).then(res => {
        if (res.code === "1") {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.isBtnLoading = false;
          this.roleFormVisible = false;
          this.getRoleTableData();
        } else {
          this.$message.error({
            message: res.msg
          });
          this.isBtnLoading = false;
        }
      });
    },
    addRole() {
      cloneObj(null, this.form);
      this.isNewUser = true;
      this.roleFormVisible = true;
    },
    handleCloseDrawer(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.currentUserResources = [];
          this.isShowDrawer = false;
          done();
        })
        .catch(_ => {});
    },
    handleNodeClick(data) {
      console.log(data);
    },
    getResourceData(row) {
      this.currentSaveRoleId = row.pkRoleId;
      row.getResourceLoading = true;
      this.tableData = [...this.tableData]; //更新按钮刷新状态值
      getRoleResource(row.pkRoleId).then(res => {
        if (res.code === "1") {
          if (res.data) {
            this.resourceTreeData = [...res.data];
            this.reCurrenceResouece(this.resourceTreeData);
            this.isShowDrawer = true;
            row.getResourceLoading = false;
            this.tableData = [...this.tableData];
          }
        }
      });
    },
    reCurrenceResouece(resourceArr) {
      if (resourceArr && resourceArr.length !== 0) {
        resourceArr.forEach(item => {
          if (item.checked) {
            this.currentUserResources.push(item.id);
          }
          if (item.children && item.children.length !== 0) {
            this.reCurrenceResouece(item.children);
          }
        });
      }
    },
    saveRoleResource() {
      this.saveResourceLoading = true;
      const resourceObjList = this.$refs.tree.getCheckedNodes();
      console.log(resourceObjList);
      const resourceIdList = [];
      resourceObjList.forEach(resourceObj => {
        resourceIdList.push(resourceObj.id);
      })
      const param = {
        resourceIds: resourceIdList,
        roleId: this.currentSaveRoleId
      };
      saveRoleResource(param).then(res => {
        if (res.code === "1") {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.saveResourceLoading = false;
          this.isShowDrawer = false;
        } else {
          this.$message.error({
            message: res.msg
          });
          this.saveResourceLoading = false;
        }
      });
    }
  },
  filters: {
    gender: function(value) {
      switch (value) {
        case 0:
          return "女";
          break;
        case 1:
          return "男";
          break;
      }
    },
    status: function(value) {
      switch (value) {
        case 1:
          return "启用";
          break;
        case -1:
          return "已删除";
          break;
        case 0:
          return "禁用";
          break;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.tableWrapper {
  padding: 14px;
  background: white;
  border-radius: 17px;
  transition: all 0.5s;
  box-shadow: 6px 6px 10px #333333;
  &:hover{
    box-shadow: 1px 1px 25px #333333;
  }
}
.pagination {
  padding-top: 10px;
  .el-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
.el-select {
  width: 100%;
}
/deep/.el-table th > .cell {
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
.demo-drawer__content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  .treeWrapper {
    height: 94%;
  }
  .demo-drawer__footer {
    display: flex;
    height: 6%;
    min-height: 40px;
  }
}
</style>