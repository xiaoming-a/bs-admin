<template>
  <div class="login">
    <el-card header="登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input type="text" v-model="model.username" class="int1"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" class="int2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        model: {
          //先用着记住密码，省事
          username: 'admin',
          password: '123456'
        }
      }
    },
    methods: {
      //登录
      async login() {
        const res = await this.$http.post('login', this.model)
        // sessionStorage.token = res.data.token
        localStorage.token = res.data.token //先用着记住密码，省事
        await this.$router.push('/')
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
      }
    }
  }
</script>

<style scoped>

  .login-card {
    width: 530px;
    margin: 100px auto;
  }

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .el-button {
    margin-left: 50%;
    transform: translate(-50%);
  }

  .int1 {
    width: 435px;
  }

  .int2 {
    width: 435px;
    margin-left: 14px;
  }
</style>