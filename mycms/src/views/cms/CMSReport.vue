<template>
  <div class="report">
    <!-- 查询区 -->
    <div class="input">
      <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="型号" prop="tz_EngineModel">
          <el-select v-model="ruleForm.tz_EngineModel" placeholder="请选择发动机型号" style="width:100%">
            <el-option
              v-for="item in engineModelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="台份" prop="tz_EngineSN">
          <el-input v-model="ruleForm.tz_EngineSN" placeholder="请输入台份号（例如:C1A-01）"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" required>
          <!-- <el-col :span="11">
            <el-form-item prop="tz_CreateTimeStart">
              <el-date-picker
                type="date"
                placeholder="选择开始日期"
                v-model="ruleForm.tz_CreateTimeStart"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="tz_CreateTimeEnd">
              <el-date-picker
                type="date"
                placeholder="选择结束日期"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.tz_CreateTimeEnd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>-->
          <el-date-picker
            v-model="ruleForm.tz_CreateTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态" style="text-align:left">
          <el-radio-group v-model="ruleForm.tz_EngineStatusType">
            <el-radio label="装配"></el-radio>
            <el-radio label="分解"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="次数">
          <el-input v-model="ruleForm.tz_EngineStatusNum" placeholder="装配状态次数（例如：001）"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 查询操作按钮 -->
    <div clase="btn-query" style="margin-top:10px">
      <el-row>
        <el-col :span="3" align="left">
          <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 查询结果表 -->
    <div class="result-element">
      <el-table :data="result" border stripe height="500" highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column prop="tz_DocSN" label="文件编号" width="250"></el-table-column>
        <el-table-column prop="tz_DocName" label="文件名称" width="250"></el-table-column>
        <el-table-column prop="tz_CreateTime" label="审批时间" width="140"></el-table-column>
        <el-table-column prop="tz_UserName" label="反馈人" width="250"></el-table-column>
        <el-table-column prop="tz_UserContent" label="反馈内容" width="250"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
    return {
      // 输入
      ruleForm: {
        tz_EngineModel: "",
        tz_EngineSN: "",
        tz_EngineStatusType: "",
        tz_EngineStatusNum: "",
        tz_CreateTimeStart: "",
        tz_CreateTimeEnd: "",
        tz_CreateTime: "",
        tz_ID: ""
      },

      // 输出
      result: [],
      // 其他
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
      ],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      rules: {
        tz_EngineModel: [
          { required: true, message: "请输入发动机型号", trigger: "change" }
        ],
        tz_EngineSN: [
          { required: true, message: "请输入发动机台份", trigger: "blur" }
        ],
        tz_CreateTimeStart: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        tz_CreateTimeEnd: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: "/myCMS/report.php",
            method: "post",
            data: {
              tz_EngineModel: this.ruleForm.tz_EngineModel,
              tz_EngineSN: this.ruleForm.tz_EngineSN,
              tz_EngineStatusType: this.ruleForm.tz_EngineStatusType,
              tz_EngineStatusNum: this.ruleForm.tz_EngineStatusNum,
              tz_CreateTimeStart: this.ruleForm.tz_CreateTime[0],
              tz_CreateTimeEnd: this.ruleForm.tz_CreateTime[1],
            }
          }).then(res => {
            console.log(res);
            this.result = res;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-form {
  width: 400px;
}
</style>