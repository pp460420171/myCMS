<template>
  <div>
    <h2>我是首页</h2>
    <hr>
    <query />
    <hr>
    <feed-back />
    <hr>
    <kan-ban />
    <hr>
    <alert />
  </div>
</template>

<script>
import Query from "./childComps/Query";
import FeedBack from "./childComps/FeedBack";
import KanBan from "./childComps/KanBan";
import Alert from "./childComps/Alert";

export default {
  components: {
    Query,
    FeedBack,
    KanBan,
    Alert
  }
};
</script>

<style>
</style>