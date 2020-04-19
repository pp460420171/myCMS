<template>
  <div clase="query">
    <!-- 查询输入区 -->
    <div class="input">
      <el-row>
        <el-col :span="4">
          <div>
            <el-input v-model="tz_UserName" placeholder="请输入姓名"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div>
            <el-select v-model="tz_EngineModel" placeholder="请选择发动机型号" style="width:100%">
              <el-option
                v-for="item in engineModelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-input v-model="tz_EngineSN" placeholder="请输入台份号（例如:C1A-01）" :disabled="isDisabled"></el-input>
        </el-col>
      </el-row>
    </div>

    <!-- 查询操作按钮 -->
    <div clase="btn-query" style="margin-top:10px">
      <el-row>
        <el-col :span="3" align="left">
          <el-button type="primary" @click="btnQuery">查询未反馈条目</el-button>
        </el-col>
        <el-col :span="3" align="left">
          <el-button type="primary" @click="btnQueryDone">查询最近已反馈条目</el-button>
        </el-col>
      </el-row>
    </div>  
    <!-- 查询结果表 -->
    <div class="result-element">
      <el-table
        :data="result"
        border
        stripe
        height="500"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="tz_ID" label="ID编号" width="80"></el-table-column>
        <el-table-column prop="tz_DocSN" label="文件编号" width="250"></el-table-column>
        <el-table-column prop="tz_DocName" label="文件名称" width="250"></el-table-column>
        <el-table-column prop="tz_CreateTime" label="审批时间" width="140"></el-table-column>
        <el-table-column prop="tz_UserContent" label="反馈内容" width="250"></el-table-column>
        <el-table-column prop="tz_UserTime" label="最近反馈时间" width="180"></el-table-column>
      </el-table>
    </div>

    <!-- 反馈区 -->
    <div class="feedback" style="margin-top:10px">
      <el-row>
        <el-col :span=4 align=left> 
          正在反馈ID:{{tz_ID}}
        </el-col>
      </el-row>

      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="tz_UserContent"></el-input>
    </div>

    <!-- 反馈按钮 -->
    <div class="btn-submit" style="margin-top:10px">
      <el-button type="primary" @click="btnFeedback()">提交反馈信息</el-button>
    </div>
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
    return {
      // 输入
      tz_UserName: "",
      tz_EngineModel: "",
      tz_EngineSN: "",
      tz_UserContent: "",
      tz_ID: "",
      // 输出
      result: [],

      // 其他
      currentIndex: -1,
      currentTable: 1,
      // 发动机型号
      engineModelOptions: [
        {
          value: "CJ-1000A",
          label: "CJ-1000A"
        },
        {
          value: "CJ-1000AX",
          label: "CJ-1000AX"
        },
        {
          value: "CJ-2000AX",
          label: "CJ-2000AX"
        },
        {
          value: "all",
          label: "全部"
        }
      ]
    };
  },
  computed: {
    isDisabled() {
      if (this.tz_EngineModel == "all") {
        return "disabled";
      } else {
        return;
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
          tz_EngineSN: this.tz_EngineSN
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
          tz_EngineSN: this.tz_EngineSN
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
    // rowClick(index, tz_ID) {
    //   this.currentIndex = index;
    //   this.tz_ID = tz_ID;
    // },
    handleCurrentChange(currentRow) {
      //这里不加这个逻辑会去找currentRow的tz_ID，如果传过来的是空的就会报错了。
      if (!(currentRow == null)) {
        this.tz_ID = currentRow.tz_ID;
      }
    },
    // 反馈贯彻内容
    btnFeedback() {
      if (!(this.tz_UserContent == "") && !(this.tz_ID == "")) {
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
            if (this.currentTable == 1) {
              this.btnQuery();
            } else if (this.currentTable == 2) {
              this.btnQueryDone();
            }
          } else {
            alert("出错了！请联系系统管理员！");
          }
        });
      } else if (this.tz_UserContent == "") {
        alert("请输入反馈内容！");
      } else {
        alert("请选择需反馈的条目！");
      }
    }
  }
};
</script>

<style scoped>
.btn-query {
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-submit {
  margin-top: 10px;
}
.result-element {
  margin-top: 10px;
}
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