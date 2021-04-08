import axios from "axios";
import Vue from "vue"
import router from "./src/router";

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

//增加中间授权，用户对应不上不能操作数据
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//服务器错误校验 （axios 相应拦截）
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    // status 为401 跳转到登录页面
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http;