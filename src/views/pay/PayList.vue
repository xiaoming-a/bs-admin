<template>
  <div class="student-list">
    <div class="hear_search">
      <el-input placeholder="请输入缴费单号" v-model.trim="payNumber.pay_number" class="input-with-select">
        <el-button slot="append" @click="searchPay" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <h1>缴费单列表</h1>
    <div class="Administrator_table">
      <el-table :data="studentTable" stripe style="width: 100%;">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="pay_number" label="缴费单号"></el-table-column>
        <el-table-column prop="house_number" label="房屋编号"></el-table-column>
        <el-table-column prop="student_number" label="学生编号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="rent" label="租金（元）"></el-table-column>
        <el-table-column prop="water_rate" label="水费（元）"></el-table-column>
        <el-table-column prop="electric_charge" label="电费（元）"></el-table-column>
        <el-table-column prop="gas_fee" label="燃气费（元）"></el-table-column>
        <el-table-column prop="garbage_fees" label="处理垃圾费用（元）"></el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="$router.push(`/pays/edit/${scope.row._id}`)">编辑
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
    name: "PayList",
    data() {
      return {
        studentTable: [],
        payNumber: {
          pay_number: ''
        }
      }
    },
    methods: {
      //获取管理员数据
      async getStudentList() {
        const res = await this.$http.get('pays')
        this.studentTable = res.data
      },

      //通过id删除管理员
      removeStudent(row) {
        this.$confirm(`是否删除${row.username}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`pays/${row._id}`) // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getStudentList();
        })
      },
      async searchPay() {
        const res = await this.$http.post('pays/search', this.payNumber);
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