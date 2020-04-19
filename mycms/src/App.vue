<template>
  <div id="app">
    <!-- <main-tab-bar/> -->
    <!-- <router-view/> -->

    <!-- Element版 -->
    <el-container style="height: 100%">
      <el-aside width="200px">
        <main-tab-bar-element />
      </el-aside>
      <el-container>
        <el-header>装配OS</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import MainTabBar from "./components/content/maintabbar/MainTabBar";
import MainTabBarElement from "./components/content/maintabbarelement/MainTabBarElement";

export default {
  name: "App",
  components: {
    // MainTabBar,
    MainTabBarElement
  }
};
</script>

<style>
  /* @import "./assets/css/base.css"; */
 html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 90px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
