<template>
  <div class="student-edit">
    <h1>{{id? '编辑':'新建'}}缴费单</h1>
    <el-form label-width="100px"
             :model="model"
             :rules="payRules"
             ref="payRef"
             @submit.native.prevent="saveStudent"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="添加缴费单">
          <el-form-item label="缴费单号" prop="pay_number">
            <el-input v-model="model.pay_number"></el-input>
          </el-form-item>
          <el-form-item label="房屋编号" prop="house_number">
            <el-input v-model="model.house_number"></el-input>
          </el-form-item>
          <el-form-item label="学生编号" prop="student_number">
            <el-input v-model="model.student_number"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="租金" prop="rent">
            <el-input type="number" placeholder="单位：元" v-model.number="model.rent" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="水费" prop="water_rate">
            <el-input type="number" placeholder="单位：元" v-model.number="model.water_rate" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="电费" prop="electric_charge">
            <el-input type="number" placeholder="单位：元" v-model.number="model.electric_charge" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="燃气费" prop="gas_fee">
            <el-input type="number" placeholder="单位：元" v-model.number="model.gas_fee" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="处理垃圾费" prop="garbage_fees">
            <el-input type="number" placeholder="单位：元" v-model.number="model.garbage_fees" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
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
    name: "PayEdit",
    props: {
      id: {}
    },
    data() {
      return {
        // 数据
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
        },

        //表单验证
        payRules: {
          pay_number: [
            {required: true, message: '请输入缴费单号', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          house_number: [
            {required: true, message: '请输入房屋编号', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          student_number: [
            {required: true, message: '请输入学生编号', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入学生姓名', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          rent: [
            {required: true, message: '租金不能为空'},
            {type: 'number', message: '租金必须为数字值'}
          ],
          water_rate: [
            {required: true, message: '水费不能为空'},
            {type: 'number', message: '水费必须为数字值'}
          ],
          electric_charge: [
            {required: true, message: '电费不能为空'},
            {type: 'number', message: '电费必须为数字值'}
          ],
          gas_fee: [
            {required: true, message: '燃气费不能为空'},
            {type: 'number', message: '燃气费必须为数字值'}
          ],
          garbage_fees: [
            {required: true, message: '处理垃圾费不能为空'},
            {type: 'number', message: '处理垃圾费必须为数字值'}
          ],
          remark: [
            {required: true, message: '请输入备注', trigger: 'blur'},
            {min: 0, max: 10000, message: '长度在 0 到 10000 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      //保存数据
      async saveStudent() {
        let res // eslint-disable-line no-unused-vars
        //id编辑数据
        if (this.id) {
          this.$refs.payRef.validate(async valid => {
            if (!valid) return
            res = await this.$http.put(`pays/${this.id}`, this.model); // eslint-disable-line no-unused-vars
            await this.$router.push('/pays/list');
            this.$message({type: 'success', message: '保存成功'})
          })
        } else {
          this.$refs.payRef.validate(async valid => {
            if (!valid) return
            res = await this.$http.post('pays', this.model); // eslint-disable-line no-unused-vars
            await this.$router.push('/pays/list');
            this.$message({type: 'success', message: '保存成功'})
          })
        }
      },

      //通过id获取编辑数据
      async fetchStudent() {
        const res = await this.$http.get(`pays/${this.id}`)
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