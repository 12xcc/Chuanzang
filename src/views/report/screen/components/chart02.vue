<template>
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">疾病人数统计图</div>
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { ref, onMounted } from 'vue';
echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent]);
const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  const option = {
    color: ['#D43030'],
    grid: {
      top: '25%',
      bottom: '5%',
    },
    xAxis: {
      type: 'category',
      data: ['新型冠状病毒感染', '流感', '鼠疫', '感染性腹泻', '炭疽', '结核病', '登革热（蚊媒传染病）', '疟疾（蚊媒传染病）', '森林脑炎（蜱媒传染病）', '发热伴血小板减少综合征（蜱媒传染病）', '斑疹伤寒', '流行性出血热'],
      axisLabel: {
        show: false
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    tooltip: {
      trigger: 'item', 
      formatter: function(params) {
        return `${params.name}  ${params.value}人`;
      },
      backgroundColor: '#FFFFFF',  
      borderColor: '#FFFFFF',      
      borderWidth: 1,           
      padding: [10, 10],         
      textStyle: {
        color: '#333333',        
        fontSize: 14,          
        },
        extraCssText: 'border-radius: 4px;'  
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          borderRadius: [3, 3, 0, 0]
        },
        showBackground: true,
        backgroundStyle: {
          color: '#F4F4F4'
        }
      }
    ]
  };

  myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style scoped>
.container {
  margin-top: 10px;
  width: 100%;
  height: 200px;
}

.chart-container {
  width: 320px;
  height: 200px;
  background-color: #FAFAFA;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  padding: 10px;  
}

.chart-title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #4A4A4A;
  background-color: #FAFAFA;
  padding: 2px 5px;
  border-radius: 3px;
  z-index: 10;  
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
