<template>
  <div class="container">
    <div class="title-container">
      <div class="title">
        <div class="blue-box"></div>
        <span class="title-text">时间段</span>
      </div>
      <span class="contents">
        <el-radio-group v-model="radio">
          <el-radio :value="1">当天</el-radio>
          <el-radio :value="2">最近一周</el-radio>
          <el-radio :value="3">最近一个月</el-radio>
          <el-radio :value="4">最近一年</el-radio>
          <el-radio :value="5">自定义</el-radio>
        </el-radio-group>
      </span>
    </div>
    <div v-if="radio === 5" class="date-selection-container">
      <DateSelection />
    </div>

    <div class="title-container">
      <div class="title">
        <div class="blue-box"></div>
        <span class="title-text">数据类型</span>
      </div>
      <span class="contents">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="自动诊断疾病数据" value="自动诊断疾病数据" />
          <el-checkbox label="医院诊断疾病统计" value="医院诊断疾病统计" />
        </el-checkbox-group>
      </span>
    </div>

    <div class="title-container">
      <div class="title">
        <div class="blue-box"></div>
        <span class="title-text">疾病类型</span>
      </div>
      <span class="contents">
        <el-checkbox-group v-model="DiseaseType">
          <el-checkbox label="新型冠状病毒感染" value="新型冠状病毒感染" />
          <el-checkbox label="流感" value="流感" />
          <el-checkbox label="鼠疫" value="鼠疫" />
          <el-checkbox label="感染性腹泻" value="感染性腹泻" />
          <el-checkbox label="炭疽" value="炭疽" />
          <el-checkbox label="结核病" value="结核病" />
          <el-checkbox
            label="登革热（蚊媒传染病）"
            value="登革热（蚊媒传染病）"
          />
          <el-checkbox label="疟疾（蚊媒传染病）" value="疟疾（蚊媒传染病）" />
          <el-checkbox
            label="森林脑炎（蜱媒传染病）"
            value="森林脑炎（蜱媒传染病）"
          />
          <el-checkbox
            label="发热伴血小板减少综合征（蜱媒传染病）"
            value="发热伴血小板减少综合征（蜱媒传染病）"
          />
          <el-checkbox label="斑疹伤寒" value="斑疹伤寒" />
          <el-checkbox label="流行性出血热" value="流行性出血热" />
          <el-checkbox label="其他" value="其他" />
        </el-checkbox-group>
      </span>
    </div>
    <LineChart :DiseaseType="DiseaseType" :TimePeriod="radio" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import DateSelection from "@/components/date_selection.vue";
import LineChart from './components/LineChart.vue'; 

const radio = ref(1); // 默认选择当天
const checkList = ref(["自动诊断疾病数据"]);
const DiseaseType = ref([]);
</script>

<style scoped>
.container {
  padding-top: 10px;
  width: 100%;
  height: 900px;
  background-color: #ffffff;
}

.title-container {
  margin-top: 30px;
  margin-left: 10px;
  align-items: center;
}

.blue-box {
  width: 6px;
  height: 22px;
  background-color: #285ac8;
  margin-right: 10px;
}

.title-text {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}

.contents {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.el-radio {
  margin-left: 60px;
  margin-top: 10px;
}

.date-selection-container {
  margin-top: 20px;
  margin-left: 90px;
}
.el-checkbox-group {
  margin-top: 10px;
  margin-left: 60px;
}
.title {
  display: flex;
}
</style>
