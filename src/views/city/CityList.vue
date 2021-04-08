<template>
  <div class="city-list">
<!--    <div class="hear_search">-->
<!--      <el-input placeholder="请输入内容" v-model="items.city_name" class="input-with-select">-->
<!--        <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>-->
<!--      </el-input>-->
<!--    </div>-->
    <h1>区域列表</h1>
    <el-table :data="district" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="350"></el-table-column>
      <el-table-column prop="city_name" label="城市名称"></el-table-column>
      <el-table-column
              fixed="right"
              label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/cities/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "CityList",
    data() {
      return {
        district: [{
          _id: '',
          city_name: ''
        }],
        items: {
          city_name: ''
        }
      }
    },
    methods: {
      async getDistrictList() {
        const res = await this.$http.get('cities');
        this.district = res.data
        // console.log(this.district)
      },
      // 通过id删除该地域
      remove(row) {
        this.$confirm(`确认要删除地域"${row.city_name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`cities/${row._id}`) // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getDistrictList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //搜索
      // async searchName() {
      //   const res = await this.$http.post('cities/search', this.items); //eslint-disable-line no-unused-vars
      //   this.district = res.data
      // },
    },
    created() {
      this.getDistrictList()
    },
  }
</script>

<style scoped>
  .input-with-select {
    width: 300px;
  }
</style>