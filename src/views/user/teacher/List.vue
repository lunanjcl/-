<template>
  <div>
    <!-- {{ total | fa | fb(9)}} -->
    <el-form :inline="true" :model="filter" ref="filterForm" size="mini">
      <el-form-item label="关键字" prop="keywordsLike">
        <el-input
          clearable
          v-model="filter.keywordsLike"
          placeholder="姓名/账号/微信/手机号/QQ号"
          @keyup.enter.native="query"
          @clear="query"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          clearable
          v-model="filter.status"
          placeholder="请选择"
          @clear="query"
        >
          <el-option
            v-for="(label, key) in $Constants.ENABLE_STATUS"
            :key="key"
            :label="label"
            :value="key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query()">查询</el-button>
        <el-button @click="resetForm('filterForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="teacherListTable"
      highlight-current-row
      stripe
      :header-cell-style="{ fontSize: '14px' }"
      size="mini"
    >
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="userName" label="账号"> </el-table-column>
      <el-table-column prop="title" label="职称"> </el-table-column>
      <el-table-column prop="tel" label="联系电话"> </el-table-column>
      <el-table-column prop="QQ" label="QQ"> </el-table-column>
      <el-table-column width="60" label="状态">
        <template slot-scope="scope">
          <span :class="scope.row.enableStatus | formatEnableStatusToClass">{{
            scope.row.enableStatus | formatEnableStatusToCN
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"
            @click="
             $router.push({
               name: 'teacherEdit',
               params: { teacherID: scope.row.uuid }
             })
            "
            >编辑</el-button
          >
          <el-button type="primary" size="mini" @click="delTeacher(scope.row.uuid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="[1, 2, 3, 10]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    this['appPageTools'] =[
      {
      icon: 'el-icon-plus',
      content: '新增',
      callback: () => this.$router.push({ name: 'teacherAdd'}),
      type: 'primary'
      }
    ]
    return {
      teacherListTable: [],
      filter: {
        keywordsLike: "",
        status: "",
      },
      pagination: {
        page: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  created() {
    this.refreshPage();
    this.setAppPageToolsMap()
  },
  activated() {
    this.refreshPage();
  },
  // filters: {
  //   fa: function (val) {
  //     return val + 11;
  //   },
  //   fb: (val1, val2) => {
  //     return val1 + val2;
  //   },
  // },
  methods: {
    refreshPage() {
      this.query();
    },
    async query() {
      let params = {};
      params.filter = this.filter;
      params.pagination = this.pagination;
      console.log(params);
      const res = await this.$api.teacher.query(params);
      this.teacherListTable = res.rows;
      this.total = res.count;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      //数据重新加载
      this.refreshPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.page = val;
      //数据重新加载
      this.refreshPage();
    },
    setAppPageToolsMap() {
      this.$store.commit('setAppPageToolsMap', {
        key: this.$route.name,
        value: this['appPageTools'],
      })
    },
    delTeacher() {
      this.$confirm('此操作将永久删除该教师信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // 更新字段deleted的值为1
          this.$api.teacher.delModify({ uuid })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
};
</script>

<style>
</style>