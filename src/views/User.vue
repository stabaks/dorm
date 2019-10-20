<!--  -->
<template>
  <div class="tableWrapper">
    <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
      <el-table-column label="用户名" prop="name" width="120">
        <template slot-scope="scope">
          <img src="../assets/student.png" alt />
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender" width="120">
        <template slot-scope="scope">{{scope.row.gender | gender}}</template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" width="170"></el-table-column>
      <el-table-column label="电话" prop="mobile" width="120"></el-table-column>
      <el-table-column label="状态" prop="status" width="100">
        <template slot-scope="scope">{{scope.row.status | status}}</template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="170"></el-table-column>
      <el-table-column label="创建操作人" prop="createUserName" width="120"></el-table-column>
      <el-table-column label="修改时间" prop="lastModifyTime" width="170"></el-table-column>
      <el-table-column label="修改操作人" prop="lastModifyUserName" width="170"></el-table-column>
      <el-table-column label="备注" prop="memo" width="150"></el-table-column>
      <el-table-column label="角色" prop="memo" width="200">
        <template>
          <el-select v-model="value1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right" width="250" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <i class="el-icon-plus add-btn" @click="addUser()"></i>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini">资源管理</el-button>
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
    <el-dialog :title="isNewUser === false? '更改用户信息': '新建用户' " :visible.sync="userFormVisible">
      <el-form :model="form" ref="userForm">
        <el-form-item label="用户名" label-width="120px" prop="userName">
          <el-input
            v-model="form.userName"
            autocomplete="off"
            placeholder="username"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off" placeholder="mobile" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="form.email" autocomplete="off" placeholder="email" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px" prop="gender">
          <el-select v-model="form.gender">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUserForm" :loading="isBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cloneObj } from "../common/utils";
import { saveUser, delUser, getUserList } from "../common/api";
import axios from "axios"; // 引入axios
export default {
  data() {
    return {
      tableData: [],
      search: "",
      listparam: {
        createUserName: "",
        email: "",
        endTime: "",
        gender: null,
        lastModifyUserName: "",
        mobile: "",
        name: "",
        nickName: "",
        pageNum: 1,
        pageSize: 10,
        password: "",
        startTime: "",
        status: null,
        userId: "",
        userName: "",
        userType: null
      },
      form: {
        email: "",
        gender: null,
        mobile: "",
        name: "",
        password: "",
        userName: "",
        userType: null,
        userId: ""
      },
      userFormVisible: false,
      isNewUser: false,
      isBtnLoading: false,
      tableLoading: false,
      options: [
        {
          value: "选项1",
          label: "超级管理员"
        },
        {
          value: "选项2",
          label: "宿管"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value1: [],
      value2: []
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getUserTableData();
  },

  methods: {
    handleEdit(index, row) {
      // this.form = {...row};
      cloneObj(row, this.form);
      this.isNewUser = false;
      this.userFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      const telParam = {
        delIds: [row.userId],
        delStatus: 1
      };
      this.$confirm("确定要删除这个用户吗？")
        .then(_ => {
          axios
            .delete("http://47.102.210.73:9896/waken/dorm/user/delete", {
              data: telParam
            })
            .then(res => {
              if (res.data.code === "1") {
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });

                this.userFormVisible = false;
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
    getUserTableData() {
      this.tableLoading = true;
      getUserList(this.listparam).then(res => {
        if (res.code === "1") {
          this.tableData = [...res.data.records];
          console.log(this.tableData);
          this.tableLoading = false;
        } else {
          this.$message.error({
            message: res.msg
          });
          this.tableLoading = false;
        }
      });
    },
    saveUserForm() {
      this.isBtnLoading = true;
      saveUser(this.form).then(res => {
        if (res.code === "1") {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.isBtnLoading = false;
          this.userFormVisible = false;
          this.getUserTableData();
        } else {
          this.$message.error({
            message: res.msg
          });
          this.isBtnLoading = false;
        }
      });
    },
    addUser() {
      cloneObj(null, this.form);
      this.isNewUser = true;
      this.userFormVisible = true;
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
</style>