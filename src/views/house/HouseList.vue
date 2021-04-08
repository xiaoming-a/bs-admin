<template>
  <div class="house_list">
    <div class="hear_search">
      <el-input placeholder="请输入房屋编号" v-model.trim="searchNumber.house_number" class="input-with-select">
        <el-button slot="append" @click="searchId" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <h1>出租房列表</h1>
    <div class="house_table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand" v-show="scope.row.tabs.length">
              <span style="margin-right: 2rem">标签</span>
              <span v-for="(item,i) in scope.row.tabs" :key="i" style="margin-right: 3px">
              <el-tag type="success" size="mini">{{item}}</el-tag>
            </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="house_number" label="房屋编号"></el-table-column>
        <el-table-column prop="house_name" label="出租房描述"></el-table-column>
        <el-table-column prop="rent" label="租金（元）"></el-table-column>
        <el-table-column prop="door_model" label="户型"></el-table-column>
        <el-table-column prop="area" label="面积（㎡）"></el-table-column>
        <el-table-column prop="city.city_name" label="所属城市"></el-table-column>
        <el-table-column prop="owners" label="业主"></el-table-column>
        <el-table-column prop="telephone" label="联系电话"></el-table-column>
        <el-table-column label="是否租出">
          <template slot-scope="scope">
            <span>{{scope.row.already_taken ===true ?"是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="$router.push(`/houses/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="danger" size="mini" @click="removeHouse(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HouseList",
    data() {
      return {
        tableData: [],
        searchNumber: {
          house_number: ''
        }
      }
    },
    methods: {
      //获取房屋数据
      async getTableList() {
        const res = await this.$http.get('houses')
        this.tableData = res.data
        console.log(this.tableData)
      },
      //通过id删除城市
      removeHouse(row) {
        this.$confirm(`是否删除${row.house_name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`houses/${row._id}`) // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getTableList();
        })
      },

      //通过房屋编号搜索
      async searchId() {
        const res = await this.$http.post('houses/search', this.searchNumber);
        this.tableData = res.data;
      }

    },
    created() {
      this.getTableList();
    }
  }
</script>

<style scoped>
  .input-with-select {
    width: 300px;
  }
</style>