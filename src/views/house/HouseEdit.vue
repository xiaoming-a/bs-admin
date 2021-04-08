<template>
  <div class="house">
    <h1>{{id ? '编辑' :'新建'}}出租房</h1>
    <el-form label-width="80px" @submit.native.prevent="addHouse">
      <el-tabs type="border-card">

        <el-tab-pane label="房屋基本信息">
          <el-form-item label="房屋编号">
            <el-input v-model="information.house_number" :disabled="id?true:false"></el-input>
          </el-form-item>
          <el-form-item label="房子描述">
            <el-input type="textarea" v-model="information.house_name" class="texta"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-checkbox-group v-model="information.tabs">
              <el-checkbox label="满五年"></el-checkbox>
              <el-checkbox label="近公园"></el-checkbox>
              <el-checkbox label="近地铁"></el-checkbox>
              <el-checkbox label="业主推荐"></el-checkbox>
              <el-checkbox label="随时看"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="租金">
            <el-input type="number" placeholder="单位：元" v-model="information.rent" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="户型">
            <el-input placeholder="户型" v-model="information.door_model"></el-input>
          </el-form-item>
          <el-form-item label="面积">
            <el-input type="number" placeholder="单位：㎡" v-model="information.area" class="inp"></el-input>
          </el-form-item>
          <el-form-item label="看房时间">
            <el-input v-model="information.checking_time"></el-input>
          </el-form-item>
          <el-form-item label="支付形式">
            <el-input v-model="information.pay"></el-input>
          </el-form-item>
          <el-form-item label="电梯">
            <el-radio v-model="information.elevator" :label="true">有电梯</el-radio>
            <el-radio v-model="information.elevator" :label="false">无电梯</el-radio>
          </el-form-item>
          <el-form-item label="出租方式">
            <el-input v-model="information.rent_way"></el-input>
          </el-form-item>
          <el-form-item label="朝向">
            <el-input v-model="information.orientation"></el-input>
          </el-form-item>
          <el-form-item label="楼层">
            <el-input v-model="information.floors"></el-input>
          </el-form-item>
          <el-form-item label="装修">
            <el-input v-model="information.fitment"></el-input>
          </el-form-item>
          <el-form-item label="楼型">
            <el-input v-model="information.floor_type"></el-input>
          </el-form-item>
          <el-form-item label="家居配置">
            <el-checkbox-group v-model="information.configuration">
              <el-checkbox label="洗衣机"></el-checkbox>
              <el-checkbox label="冰箱"></el-checkbox>
              <el-checkbox label="电视"></el-checkbox>
              <el-checkbox label="空调"></el-checkbox>
              <el-checkbox label="热水器"></el-checkbox>
              <el-checkbox label="天然气"></el-checkbox>
              <el-checkbox label="暖气"></el-checkbox>
              <el-checkbox label="床"></el-checkbox>
              <el-checkbox label="网络"></el-checkbox>
              <el-checkbox label="衣柜"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="房屋亮点">
            <el-input type="textarea" v-model="information.bright_spot" class="texta"></el-input>
          </el-form-item>
          <el-form-item label="户型介绍">
            <el-input type="textarea" v-model="information.door_introduced" class="texta"></el-input>
          </el-form-item>
          <el-form-item label="交通出行">
            <el-input type="textarea" v-model="information.travel" class="texta"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="information.city">
              <el-option
                      v-for="item of cities"
                      :key="item._id"
                      :label="item.city_name"
                      :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市区域">
            <el-input v-model="information.areas"></el-input>
          </el-form-item>
          <el-form-item label="业主名称">
            <el-input v-model="information.owners"></el-input>
          </el-form-item>
          <el-form-item label="业主编号">
            <el-input v-model="information.owners_number"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input type="tel" placeholder="请输入联系电话" v-model="information.telephone"></el-input>
          </el-form-item>
          <el-form-item label="是否租出">
            <el-radio v-model="information.already_taken" :label="true">已出租</el-radio>
            <el-radio v-model="information.already_taken" :label="false">未出租</el-radio>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="房屋图片">
          <el-button type="primary" style="margin-left: 20px" @click="information.house_icon.push({})">
            <i class="el-icon-plus"></i>添加图片
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="11" v-for="(item,i) in information.house_icon" :key="i" class="col_if">
              <el-form-item label="上传图片">
                <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :headers="getAuthorization()"
                        :on-success="res =>$set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="图片描述">
                <el-input type="textarea" v-model="item.title"></el-input>
              </el-form-item>
              <el-button
                      type="danger"
                      size="small"
                      @click="information.house_icon.splice(i,1)"
              >删除
              </el-button>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>
      <el-form-item class="el_bc">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "HouseEdit",
    props: {
      id: {}
    },
    data() {
      return {
        //城市分类
        cities: [],
        information: {
          house_number: '',
          house_name: '',
          house_icon: [],
          tabs: [],
          rent: null,
          door_model: '',
          area: null,
          checking_time: '',
          pay: '',
          elevator: null,
          rent_way: '',
          orientation: '',
          floors: '',
          fitment: '',
          floor_type: '',
          configuration: [],
          bright_spot: '',
          door_introduced: '',
          travel: '',
          city: '',
          areas: '',
          owners: '',
          owners_number: '',
          telephone: null,
          already_taken: false //是否租出
        }
      }
    },
    methods: {
      //提交数据
      async addHouse() {
        let res  // eslint-disable-line no-unused-vars
        if (this.id) {
          res = await this.$http.put(`houses/${this.id}`, this.information); // eslint-disable-line no-unused-vars
        } else {
          res = await this.$http.post('houses', this.information); // eslint-disable-line no-unused-vars
        }
        await this.$router.push('/houses/list');
        this.$message({type: 'success', message: '保存成功'})
      },

      //通过id获取房屋编辑数据
      async fetchHouse() {
        const res = await this.$http.get(`houses/${this.id}`)
        this.information = res.data
        console.log(res.data)
      },

      //获取城市数据
      async fetchCities() {
        const res = await this.$http.get(`houses/ci`)
        this.cities = res.data
        // console.log(this.cities)
      }
    },
    created() {
      this.fetchCities()
      this.id && this.fetchHouse()
    }
  }
</script>

<style scoped>
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

  .el_bc {
    margin-top: 2rem;
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