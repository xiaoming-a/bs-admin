<template>
  <div class="service-edit">
    <h1>创建维修报表</h1>
    <el-form label-width="80px" @submit.native.prevent="addService">
      <el-tabs type="border-card">

        <el-tab-pane label="添加业务号">
          <el-form-item label="业务号">
            <el-input v-model="serviceData.business_number" :disabled="id?true:false"></el-input>
          </el-form-item>
          <el-form-item label="房屋编号">
            <el-input v-model="serviceData.house_number"></el-input>
          </el-form-item>
          <el-form-item label="提交人">
            <el-input v-model="serviceData.tenant_name"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input type="tel" placeholder="请输入联系电话" v-model="serviceData.telephone"></el-input>
          </el-form-item>
          <el-form-item label="维修原因">
            <el-input type="textarea" v-model="serviceData.Maintenance_reasons" class="texta"></el-input>
          </el-form-item>
          <el-form-item label="提交日期">
            <el-date-picker
                    v-model="serviceData.submission_date"
                    type="date"
                    placeholder="选择日期"
                    style="width: 250px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="serviceData.remark" class="texta"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="维修图片">
          <el-button type="primary" style="margin-left: 20px" @click="serviceData.service_icon.push({})">
            <i class="el-icon-plus"></i>添加图片
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="11" v-for="(item,i) in serviceData.service_icon" :key="i" class="col_if">
              <el-form-item label="上传图片">
                <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :headers="getAuthorization()"
                        :show-file-list="false"
                        :on-success="res =>$set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

              </el-form-item>
              <el-button
                      type="danger"
                      size="small"
                      @click="serviceData.service_icon.splice(i,1)"
              >删除
              </el-button>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>

      <el-form-item class="el_bd">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "ServiceEdit",
    props: {
      id: {}
    },
    data() {
      return {
        serviceData: {
          business_number: '',
          house_number: '',
          tenant_name: '',
          telephone: null,
          service_icon: [],
          Maintenance_reasons: '',
          submission_date: null,
          remark: ''
        }
      }
    },
    methods: {
      //提交报表数据
      async addService() {
        let res // eslint-disable-line no-unused-vars
        if (this.id) {
          res = await this.$http.put(`services/${this.id}`, this.serviceData) // eslint-disable-line no-unused-vars
        } else {
          res = await this.$http.post('services', this.serviceData) // eslint-disable-line no-unused-vars
        }
        await this.$router.push('/services/list')
        this.$message({type: 'success', message: '保存成功'})
      },

      //通过id获取报表编辑数据
      async fetchService() {
        const res = await this.$http.get(`services/${this.id}`)
        this.serviceData = res.data
      },
    },
    created() {
      this.id && this.fetchService();
    }

  }
</script>

<style scoped>
  .el_bd {
    margin-top: 2rem;
  }

  .el-input, .texta {
    width: 500px;
  }

  .avatar-uploader, .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }

  .avatar-uploader:hover, .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .col_if {
    border: 1px solid deepskyblue;
    padding: 20px;
    margin-top: 20px;
    margin-left: 20px;
  }

  .col_if:nth-child(2n) {
    margin-left: 60px;
  }
</style>