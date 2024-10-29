<template>
 <div class="container">
  <div class="title">疾病诊断准确率报表（待完善）</div>
    <div>
      <Card />
    </div>
    <div class="elsedata">
      <div class="chartspartone">
      <!-- <Chart01 /> -->
      <!-- <Chart02 /> -->
      <!-- <Chart03 /> -->
    </div>
    <div class="Map">
      <Map />
    </div>
    <div class=chartspartthree>
      <!-- <Chart04 /> -->
      <!-- <Chart05 /> -->
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Card from "./card.vue"
export default {
    components:{
    Card,
  },
}
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
.title{
    text-align: center;
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    color: #333333;
    padding-top: 20px;
    padding-left: 10px;
}
</style>
