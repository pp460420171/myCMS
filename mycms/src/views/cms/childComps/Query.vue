<template>
  <div>
    <!-- 查询区 -->
    <h2>台账查询</h2>
    <!-- 查询输入区 -->
    <div>
      <table>
        <tr>
          <td>
            <label for="name">姓名：</label>
            <input type="text" id="name" v-model="tz_UserName" style="width:96px" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="model">型号：</label>
            <select name="model" id="model" v-model="tz_EngineModel" style="width:100px">
              <option value="all" selected="selected">全部</option>
              <option value="CJ-1000AX">CJ-1000AX</option>
              <option value="CJ-1000AH">CJ-1000AH</option>
              <option value="CJ-1000A">CJ-1000A</option>
              <option value="CJ-2000A">CJ-2000A</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label for="sn">台份：</label>
            <input type="text" id="sn" v-model="tz_EngineSN" style="width:96px" :disabled="isDisabled"/>
          </td>
        </tr>
      </table>
    </div>
    <!-- 查询操作按钮 -->
    <div class="btn-query">
      <button @click="btnQuery">查询未反馈条目</button>
      <button @click="btnQueryDone">查询最近已反馈条目</button>
    </div>
    <hr />
    <!-- 查询结果区 -->
    <div class="result">
      <table width="1200" rules="all" cellpadding="5" border="1">
        <tr>
          <th>序号</th>
          <th>ID编号</th>
          <th>更改单编号</th>
          <th>文件编号</th>
          <th>文件名称</th>
          <th>审批时间</th>
          <th>反馈内容</th>
          <th>最近反馈时间</th>
        </tr>
        <tr
          v-for="(item,index) in result"
          :key="index"
          :class="{active:index === currentIndex}"
          @click="rowClick(index,item.tz_ID)"
        >
          <td>{{index+1}}</td>
          <td>{{item.tz_ID}}</td>
          <td>{{item.tz_ChangesSN}}</td>
          <td>{{item.tz_DocSN}}</td>
          <td>{{item.tz_DocName}}</td>
          <td>{{item.tz_CreateTime}}</td>
          <td>{{item.tz_UserContent}}</td>
          <td>{{item.tz_UserTime}}</td>
        </tr>
      </table>
    </div>
    <!-- 反馈区 -->
    <div>
      <h2>正在反馈ID:{{tz_ID}}</h2>
      <label for="feedBackTextArea"></label>
      <textarea
        id="feedBackTextArea"
        cols="30"
        rows="5"
        v-model="tz_UserContent"
        style="width:1200px"
      ></textarea>
    </div>
    <!-- 反馈提交按钮 -->
    <div>
      <button @click="btnFeedback()">提交反馈信息</button>
    </div>
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
    return {
      // 输入
      tz_UserName: "请输入姓名",
      tz_EngineModel: "请输入型号",
      tz_EngineSN:"",
      tz_UserContent: "",
      // 输出
      result: [],
      tz_ID: "",
      // 其他
      currentIndex: -1,
      currentTable: 1,
    };
  },
  computed:{
    isDisabled(){
      if(this.tz_EngineModel == 'all'){
        return 'disabled'
      }else{
        return
      }
    }
  },
  methods: {
    // 查询未反馈条目按钮
    btnQuery() {
      request({
        url: "/myCMS/query.php",
        method: "post",
        data: {
          tz_UserName: this.tz_UserName,
          tz_EngineModel: this.tz_EngineModel,
          tz_EngineSN:this.tz_EngineSN,
        }
      }).then(res => {
        // console.log(typeof(res))
        console.log(res);
        // console.log(res[0].docNum)
        this.result = res;
      });
      // 初始化下反馈区
      this.tz_ID = "";
      this.tz_UserContent = "";
      this.currentIndex = -1;
      this.currentTable = 1;
    },
    // 查询最近反馈条目按钮
    btnQueryDone() {
      request({
        url: "/myCMS/queryDone.php",
        method: "post",
        data: {
          tz_UserName: this.tz_UserName,
          tz_EngineModel: this.tz_EngineModel,
          tz_EngineSN:this.tz_EngineSN,
        }
      }).then(res => {
        // console.log(typeof(res))
        console.log(res);
        // console.log(res[0].docNum)
        this.result = res;
      });
      // 初始化下反馈区
      this.tz_ID = "";
      this.tz_UserContent = "";
      this.currentIndex = -1;
      this.currentTable = 2;
    },
    // 功能一：点击行使之高亮
    rowClick(index, tz_ID) {
      this.currentIndex = index;
      this.tz_ID = tz_ID;
    },
    // 反馈贯彻内容
    btnFeedback() {
      if (!this.tz_UserContent == "") {
        console.log(this.tz_UserContent, this.tz_ID);
        request({
          url: "/myCMS/feedback.php",
          method: "post",
          data: {
            tz_EngineModel: this.tz_EngineModel,
            tz_UserContent: this.tz_UserContent,
            tz_ID: this.tz_ID
          }
        }).then(res => {
          console.log(res);

          if (res == true) {
            alert("反馈成功！");
            // 判断刷新后显示哪个表
            if(this.currentTable == 1){
              this.btnQuery()
            }else{
              this.btnQueryDone()
            }
          } else {
            alert("出错了！请联系系统管理员！");
          }
        });
      }else{
        alert("请输入反馈内容！")
      }
    }
  }
};
</script>

<style scoped>
.active {
  background-color: yellow;
}
.result td {
  text-align: center;
}
.result th {
  text-align: center;
  background-color: #ccc;
}
</style>