<template>
  <div class="city">
    <h1>{{id? '编辑':'新建'}}地域</h1>

    <el-form label-width="80px" @submit.native.prevent="save">

      <el-tabs type="border-card">
        <el-tab-pane label="添加城市">
          <el-form-item label="城市名称">
            <el-input v-model="model.city_name"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "CityEdit",
    props: {
      id: {}
    },
    data() {
      return {
        model: {
          city_name: '',
        }
      }
    },
    methods: {
      //保存数据
      async save() {
        let res // eslint-disable-line no-unused-vars
        //id编辑数据
        if (this.id) {
          res = await this.$http.put(`cities/${this.id}`, this.model); // eslint-disable-line no-unused-vars
        } else {
          res = await this.$http.post('cities', this.model); // eslint-disable-line no-unused-vars
        }
        await this.$router.push('/cities/list');
        this.$message({type: 'success', message: '保存成功'})
      },

      //通过id获取编辑数据
      async fetch() {
        const res = await this.$http.get(`cities/${this.id}`)
        this.model = res.data
      }
    },
    created() {
      this.id && this.fetch()
    }
  }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }
</style>