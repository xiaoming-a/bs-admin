<template>
  <div class="student-list">
    <div class="hear_search">
      <el-input placeholder="请输入学生姓名" v-model.trim="items.name" class="input-with-select">
        <el-button slot="append" @click="searchName" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <h1>学生列表</h1>
    <div class="Administrator_table">
      <el-table :data="studentTable" stripe style="width: 100%;">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="student_number" label="学生编号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="number" label="学号与账号"></el-table-column>
        <el-table-column prop="college" label="所属大学"></el-table-column>
        <el-table-column prop="telephone" label="联系电话"></el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="$router.push(`/students/edit/${scope.row._id}`)">编辑
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
    name: "StudentList",
    data() {
      return {
        studentTable: [],
        items: {
          name: ''
        }
      }
    },
    methods: {
      //获取管理员数据
      async getStudentList() {
        const res = await this.$http.get('students')
        this.studentTable = res.data
      },

      //通过id删除管理员
      removeStudent(row) {
        this.$confirm(`是否删除${row.username}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`students/${row._id}`) // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getStudentList();
        })
      },

      //搜索
      async searchName() {
        const res = await this.$http.post('students/search', this.items);
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