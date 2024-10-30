<template> 
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">疾病诊断准确率报表</div>
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
import { getDiseaseDataToday } from '@/api/report/screen.js';
import { useDiseaseStore } from '@/store/diseaseStore';

echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent]);
const chart = ref(null);
const diseaseStore = useDiseaseStore();

onMounted(async () => {
  const myChart = echarts.init(chart.value);

  try {
    const response = await getDiseaseDataToday();
    if (response.data.code === 1) {
      const data = response.data.data;
      diseaseStore.setDiseaseData(data); // 将数据存储到 pinia 的全局状态

      const xAxisData = data.map(item => item.diagnosisdiseaseTypeName || "健康");
      const seriesData = data.map(item => item.count);

      const option = {
        color: ['#D43030'],
        grid: {
          top: '25%',
          bottom: '5%',
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
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
            data: seriesData,
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
    } else {
      console.error("获取疾病数据失败:", response.data.msg);
    }
  } catch (error) {
    console.error("请求出错:", error);
  }

  window.addEventListener('resize', () => {
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
  background-color: #FAFAFA;
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
