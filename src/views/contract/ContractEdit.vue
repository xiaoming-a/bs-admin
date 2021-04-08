<template>
  <div class="student-edit">
    <h1>{{id? '编辑':'新建'}}合同</h1>
    <el-form label-width="100px" @submit.native.prevent="saveStudent">
      <el-tabs type="border-card">
        <el-tab-pane label="添加合同">
          <el-form-item label="合同编号">
            <el-input v-model="model.contract_number"></el-input>
          </el-form-item>
          <el-form-item label="房屋编号">
            <el-input v-model="model.house_number"></el-input>
          </el-form-item>
          <el-form-item label="学生编号">
            <el-input v-model="model.student_number"></el-input>
          </el-form-item>

          <el-form-item label="起始日期">
            <el-date-picker
                    v-model="model.begin_date"
                    type="date"
                    placeholder="选择日期"
                    style="width: 250px"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="结束日期">
            <el-date-picker
                    v-model="model.finish_date"
                    type="date"
                    placeholder="选择日期"
                    style="width: 250px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同状况">
            <el-radio v-model="model.contract_state" :label="true">有效</el-radio>
            <el-radio v-model="model.contract_state" :label="false">无效</el-radio>
          </el-form-item>
          <el-form-item label="租金">
            <el-input type="number" placeholder="单位：元" v-model="model.rent" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="押金">
            <el-input type="number" placeholder="单位：元" v-model="model.cash_pledge" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="model.remark" class="texta"></el-input>
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
    name: "ContractEdit",
    props: {
      id: {}
    },
    data() {
      return {
        model: {
          contract_number: '',
          house_number: '',
          student_number: '',
          begin_date: null,
          finish_date: null,
          contract_state: null,
          rent: null,
          cash_pledge: null,
          remark: '',
        }
      }
    },
    methods: {
      //保存数据
      async saveStudent() {
        let res // eslint-disable-line no-unused-vars
        //id编辑数据
        if (this.id) {
          res = await this.$http.put(`contracts/${this.id}`, this.model); // eslint-disable-line no-unused-vars
        } else {
          res = await this.$http.post('contracts', this.model); // eslint-disable-line no-unused-vars
        }
        await this.$router.push('/contracts/list');
        this.$message({type: 'success', message: '保存成功'})
      },

      //通过id获取编辑数据
      async fetchStudent() {
        const res = await this.$http.get(`contracts/${this.id}`)
        this.model = res.data
        // console.log(typeof this.model.contract_state)
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