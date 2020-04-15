<template>
  <div id="app">
    <main-tab-bar/>
    <router-view/>
  </div>
</template>

<script>
import MainTabBar from './components/content/maintabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>

</style>
