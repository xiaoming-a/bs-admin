<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opened :default-active="$route.path">

        <el-submenu index="1">
          <template slot="title"><i class="el-icon-office-building"></i>地域分类</template>
          <el-menu-item-group>
            <el-menu-item index="/cities/create">新建地域</el-menu-item>
            <el-menu-item index="/cities/list">地域列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-s-home"></i>出租房管理</template>
          <el-menu-item-group>
            <el-menu-item index="/houses/create">新建出租房</el-menu-item>
            <el-menu-item index="/houses/list">出租房列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-document"></i>运营管理</template>
          <el-menu-item-group>
            <el-menu-item index="/services/create">新建维修报表</el-menu-item>
            <el-menu-item index="/services/list">维修报表列表</el-menu-item>
            <el-menu-item index="/contracts/create">新建合同</el-menu-item>
            <el-menu-item index="/contracts/list">合同列表</el-menu-item>
            <el-menu-item index="/pays/create">新建缴费单</el-menu-item>
            <el-menu-item index="/pays/list">缴费单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title"><i class="el-icon-setting"></i>管理员管理</template>
          <el-menu-item-group>
            <el-menu-item index="/administrators/create">新建管理员</el-menu-item>
            <el-menu-item index="/administrators/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title"><i class="el-icon-user"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="/students/create">新建学生</el-menu-item>
            <el-menu-item index="/students/list">学生列表</el-menu-item>
            <el-menu-item index="/landlords/create">新建业主</el-menu-item>
            <el-menu-item index="/landlords/list">业主列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
            <el-dropdown-item>切换用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
<!--        <span>王小虎</span>-->
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Main",
    data() {
      return {}
    }
  }
</script>


<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>