<template>
 <div class="container">
  <div class="title">疾病诊断准确率报表</div>
    <div>
      <Card />
    </div>
    <div>
      <Chart01 />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Card from "./card.vue"
import Chart01 from "./chart01.vue"
export default {
    components:{
    Card,
    Chart01,
  },
}
</script>

<style scoped>
.container {
  padding-top: 10px;
  width: 100%;
  height: 550px;
  background-color: #ffffff;
  padding-bottom: 5px;
  padding-right: 5px;
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
