<!--  -->
<template>
  <div class="tableWrapper">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户名" prop="name">
        <template slot-scope="scope">
          <img src="../assets/student.png" alt />
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="创建操作人" prop="createUserName"></el-table-column>
      <el-table-column label="修改时间" prop="lastModifyTime"></el-table-column>
      <el-table-column label="修改操作人" prop="lastModifyUserName"></el-table-column>
      <el-table-column label="备注" prop="memo"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @click="handleEdit(scope.$index, scope.row)"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
import { getUserList } from "../common/api";
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
      }
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getUserTableData();
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.listparam.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listparam.pageNum = val;
    },
    getUserTableData() {
      getUserList(this.listparam).then(res => {
        if (res.code === "1") {
          // {status} = res.data.list;
          this.tableData = [...res.data.list];
        } else {
          this.$message.error({
            message: res.msg
          });
        }
      });
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
</style>