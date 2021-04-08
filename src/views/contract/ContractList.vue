<template>
  <div class="student-list">
    <div class="hear_search">
      <el-input placeholder="请输入合同编号" v-model.trim="ContractNum.contract_number" class="input-with-select">
        <el-button slot="append" @click="searchContract" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <h1>合同列表</h1>
    <div class="Administrator_table">
      <el-table :data="studentTable" stripe style="width: 100%;">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="contract_number" label="合同编号"></el-table-column>
        <el-table-column prop="house_number" label="房屋编号"></el-table-column>
        <el-table-column prop="student_number" label="学生编号"></el-table-column>

        <el-table-column label="起始日期">
          <template slot-scope="scope">
            {{scope.row.begin_date | dateFormat}}
          </template>
        </el-table-column>

        <el-table-column label="结束日期">
          <template slot-scope="scope">
            {{scope.row.finish_date | dateFormat}}
          </template>
        </el-table-column>

        <el-table-column label="合同状况">
          <template slot-scope="scope">
            <span>{{scope.row.contract_state ===true ?"有效":"无效"}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="rent" label="租金（元）"></el-table-column>
        <el-table-column prop="cash_pledge" label="押金（元）"></el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="$router.push(`/contracts/edit/${scope.row._id}`)">编辑
            </el-button>
            <el-button type="danger" size="mini" @click="removeStudent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
  export default {
    name: "ContractList",
    data() {
      return {
        studentTable: [],
        ContractNum: {
          contract_number: ''
        }
      }
    },
    methods: {
      //获取合同数据
      async getStudentList() {
        const res = await this.$http.get('contracts')
        this.studentTable = res.data
        console.log(this.studentTable)
      },

      //通过id删除合同
      removeStudent(row) {
        this.$confirm(`是否删除${row.username}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`contracts/${row._id}`) // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getStudentList();
        })
      },

      //搜索
      async searchContract() {
        const res = await this.$http.post('contracts/search', this.ContractNum);// eslint-disable-line no-unused-vars
        this.studentTable = res.data
      }
    },
    created() {
      this.getStudentList()
    }
  }
</script>

<style scoped>
  .input-with-select {
    width: 300px;
  }
</style>