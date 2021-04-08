<template>
  <div class="Administrator_list">
    <h1>管理员列表</h1>
    <div class="Administrator_table">
      <el-table :data="adminTable" stripe style="width: 100%;">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="_id" label="ID"></el-table-column>
        <el-table-column prop="username" label="管理员姓名"></el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="$router.push(`/administrators/edit/${scope.row._id}`)">编辑
            </el-button>
            <el-button type="danger" size="mini" @click="removeAdmin(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AdministratorList",
    data() {
      return {
        adminTable: []
      }
    },
    methods: {
      //获取管理员数据
      async getAdminList() {
        const res = await this.$http.get('administrators')
        this.adminTable = res.data
      },

      //通过id删除管理员
      removeAdmin(row) {
        this.$confirm(`是否删除${row.username}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`administrators/${row._id}`) // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getAdminList();
        })
      }
    },
    created() {
      this.getAdminList()
    }
  }
</script>

<style scoped>
  .input-with-select {
    width: 300px;
  }
</style>