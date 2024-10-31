<template> 
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">疾病诊断准确率报表</div>
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { ref, onMounted } from "vue";

echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent, LegendComponent]);
const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  const diseaseTypeName = [
    "流行性热出血",
    "斑疹伤寒",
    "蜱传(森林脑炎和莱姆病)",
    "蚊传(输入性为主)",
    "结核病",
    "炭疽",
    "感染性腹泻",
    "鼠疫",
    "流感",
    "新型冠状病毒",
  ];
  const dataHigh = [80, 70, 60, 90, 50, 85, 75, 65, 95, 55];
  const dataLow = [50, 65, 55, 70, 40, 65, 65, 55, 80, 45];
  const option = {
    color: ["#424242", "#285AC8"],
    legend: {
      data: ["诊断数", "确诊数"],
      top: "5%", 
    },
    grid: {
      left: "4%",
      right: "1%",
      top: "20%",
      bottom: "10%",
    },
    xAxis: {
      type: "category",
      data: diseaseTypeName,
      axisLabel: {
        interval: 0,
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: function (params) {
        let highValue = null;
        let lowValue = null;

        // 检查是否同时存在诊断数和预测数
        params.forEach((param) => {
          if (param.seriesName === "诊断数" && param.value !== '-') highValue = param.value;
          if (param.seriesName === "确诊数" && param.value !== '-') lowValue = param.value;
        });

        let tooltipContent = `${params[0].name}<br>`;
        params.forEach((param) => {
          tooltipContent += `${param.seriesName}: ${param.value}<br>`;
        });

        // 只有当“诊断数”和“预测数”都存在时才显示准确率
        if (highValue !== null && lowValue !== null) {
          const accuracyRate = ((lowValue / highValue) * 100).toFixed(2);
          tooltipContent += `准确率: ${accuracyRate}%`;
        }

        return tooltipContent;
      },
      backgroundColor: "#FFFFFF",
      borderColor: "#DDDDDD",
      borderWidth: 1,
      padding: [10, 10],
      textStyle: {
        color: "#333333",
        fontSize: 14,
      },
      extraCssText: "border-radius: 4px;",
    },
    series: [
      {
        name: "诊断数",
        data: dataHigh,
        type: "bar",
        barWidth: "25%",
        barCategoryGap: "100%",
        stack: "0%",
        itemStyle: {
          borderRadius: [7, 7, 0, 0],
        },
      },
      {
        name: "确诊数",
        data: dataLow,
        type: "bar",
        barWidth: "25%",
        barCategoryGap: "100%",
        stack: "10%",
        itemStyle: {
          borderRadius: [7, 7, 0, 0],
        },
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
</script>


<style scoped>
.container {
  width: 100%;
  height: auto;
}

.chart-container {
  width: auto;
  height: 100%;
  background-color: #fafafa;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 5px;
  position: relative;
  padding: 10px;
}

.chart-title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #4a4a4a;
  background-color: #fafafa;
  padding: 2px 5px;
  border-radius: 3px;
  z-index: 10;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
