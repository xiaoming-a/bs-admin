<template>
  <div class="student-edit">
    <h1>{{id? '编辑':'新建'}}学生</h1>
    <el-form label-width="100px" @submit.native.prevent="saveStudent">
      <el-tabs type="border-card">
        <el-tab-pane label="添加学生">
          <el-form-item label="学生编号">
            <el-input v-model="model.student_number"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input type="number" v-model="model.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="model.gender" label="男">男</el-radio>
            <el-radio v-model="model.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="model.number"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="model.password"></el-input>
          </el-form-item>
          <el-form-item label="所属大学">
            <el-input v-model="model.college"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input type="number" v-model="model.telephone"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="model.identity_number"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input type="textarea" v-model="model.address" class="texta"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 2rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "StudentEdit",
    props: {
      id: {}
    },
    data() {
      return {
        model: {
          student_number:'',
          name: '',
          age: null,
          gender: '',
          number: '',
          password: '',
          college: '',
          telephone: null,
          identity_number: '',
          address: '',
        }
      }
    },
    methods: {
      //保存数据
      async saveStudent() {
        let res // eslint-disable-line no-unused-vars
        //id编辑数据
        if (this.id) {
          res = await this.$http.put(`students/${this.id}`, this.model); // eslint-disable-line no-unused-vars
        } else {
          res = await this.$http.post('students', this.model); // eslint-disable-line no-unused-vars
        }
        await this.$router.push('/students/list');
        this.$message({type: 'success', message: '保存成功'})
      },

      //通过id获取编辑数据
      async fetchStudent() {
        const res = await this.$http.get(`students/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.id && this.fetchStudent()
    }
  }
</script>

<style scoped>
  .el-input {
    width: 500px;
  }

  .el-input, .texta {
    width: 500px;
  }

  /*去除input的箭头样式后面*/
  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  /deep/ input[type='number'] {
    -moz-appearance: textfield !important;
  }
</style>