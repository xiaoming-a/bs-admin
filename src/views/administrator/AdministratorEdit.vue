<template>
  <div class="Administrator_edit">
    <h1>{{id? '编辑':'新建'}}管理员</h1>
    <el-form label-width="80px" @submit.native.prevent="saveAdmin">

      <el-tabs type="border-card">
        <el-tab-pane label="添加管理员">
          <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="model.password"></el-input>
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
    name: "AdministratorEdit",
    props: {
      id: {}
    },
    data() {
      return {
        model: {
          username: '',
          password:''
        }
      }
    },
    methods: {
      //保存数据
      async saveAdmin() {
        let res // eslint-disable-line no-unused-vars
        //id编辑数据
        if (this.id) {
          res = await this.$http.put(`administrators/${this.id}`, this.model); // eslint-disable-line no-unused-vars
        } else {
          res = await this.$http.post('administrators', this.model); // eslint-disable-line no-unused-vars
        }
        await this.$router.push('/administrators/list');
        this.$message({type: 'success', message: '保存成功'})
      },

      //通过id获取编辑数据
      async fetchAdmin() {
        const res = await this.$http.get(`administrators/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.id && this.fetchAdmin()
    }
  }
</script>

<style scoped>
  .el-input {
    width: 500px;
  }
</style>