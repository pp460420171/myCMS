<template>
  <div>
    <h2>台账查询</h2>
    <table>
      <tr>
        <td><label for="name">姓名：</label><input type="text" name="" id="name" v-model="fbPER"></td>
        <td><label for="sTime">开始时间：</label><input type="date" name="" id="sTime" v-model="startTime"></td>
      </tr>
      <tr>
        <td><label for="model">型号：</label><input type="text" name="" id="model" v-model="model"></td>
        <td><label for="eTime">结束时间：</label><input type="date" name="" id="eTime" v-model="endTime"></td>
      </tr>
    </table>
    <button @click="btnQuery">查询</button>
    <div v-for="item in result" :key="item.id">
      <div>{{item.docNum}}</div>
    </div>
  </div>
</template>

<script>
import {request} from 'network/request'
export default {
  data() {
    return {
      fbPER:'张三',
      model:'C1X-03',
      startTime:'2019-01-01',
      endTime:'2020-12-31',
      result:[]
    }
  },
  methods: {
    btnQuery() {
      console.log(this.fbPER);
      console.log(this.model);
      console.log(this.endTime);
      console.log(this.startTime);
      request({
        url:"/myCMS/query.php",
        method:"post",
        data: {
          fbPER:this.fbPER,
          model:this.model,
          startTime:this.startTime,
          endTime:this.endTime,
        }
      }).then(res => {
        // console.log(typeof(res))
        console.log(res);
        // console.log(res[0].docNum)
        this.result = res;
      })
    }
  }
}
</script>

<style>

</style>