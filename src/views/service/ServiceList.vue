<template>
  <div class="service-list">
    <div class="hear_search">
      <el-input placeholder="请输入内容" v-model="service_num.business_number" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchService"></el-button>
      </el-input>
    </div>
    <h1>维修报表列表</h1>
    <div class="service-table">
      <el-table :data="reportData" stripe style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand" v-show="scope.row.remark !==''">
              <span style="margin-right: 5px">备注:</span>
              <span>{{scope.row.remark}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="business_number" label="业务号"></el-table-column>
        <el-table-column prop="house_number" label="房屋编号"></el-table-column>
        <el-table-column prop="tenant_name" label="提交人"></el-table-column>
        <el-table-column prop="telephone" label="联系电话"></el-table-column>
        <el-table-column prop="Maintenance_reasons" label="原因描述"></el-table-column>
        <el-table-column label="提交日期">
          <template slot-scope="scope">
            {{scope.row.submission_date | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150px"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="$router.push(`/services/edit/${scope.row._id}`)">编辑
            </el-button>
            <el-button type="danger" size="mini" @click="removeService(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ServiceList",
    data() {
      return {
        reportData: [],
        service_num: {
          business_number: ''
        }
      }
    },
    methods: {
      //获取维修报表信息
      async getReportData() {
        let res = await this.$http.get('services')
        this.reportData = res.data
        console.log(this.reportData)
      },

      //通过id删除
      async removeService(row) {
        this.$confirm(`是否删除业务号为${row.business_number}的数据`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`services/${row._id}`) // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getReportData();
        })
      },
      async searchService() {
        const res = await this.$http.post('services/search', this.service_num);
        this.reportData = res.data
      }
    },
    created() {
      this.getReportData();
    }
  }
</script>

<style scoped>
  .input-with-select {
    width: 300px;
  }
</style>