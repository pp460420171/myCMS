<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        router
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>构型管理系统</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="/cmsquery">台账反馈</el-menu-item>
            <el-menu-item index="/2">台账维护</el-menu-item>
            <el-menu-item index="/cmsreport">台账报表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>工装管理系统</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="/tooling">工装管理</el-menu-item>
            <!-- <el-menu-item index="/2">2</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>设备管理系统</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="/1">设备管理</el-menu-item>
            <!-- <el-menu-item index="/2">2</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-flag"></i>
            <span>党工团园地</span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <el-menu-item index="/1">党工团事务</el-menu-item>
            <!-- <el-menu-item index="/2">2</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu-vertical.el-menu{
  border-right: solid 0px;
}
</style>