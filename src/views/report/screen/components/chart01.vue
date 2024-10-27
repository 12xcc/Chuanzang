<template>
  <div class="container">
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">其他数据</span>
    </div>
    <div class="chart-container">
      <div class="chart-title">当日疾病分布百分比</div>
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { ref, onMounted, watch } from 'vue';
import { useDiseaseStore } from '@/store/diseaseStore';

echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent]);
const chart = ref(null);
const diseaseStore = useDiseaseStore();

onMounted(() => {
  const myChart = echarts.init(chart.value);

  watch(
    () => diseaseStore.diseaseData,
    (newData) => {
      if (newData.length > 0) {
        const total = newData.reduce((acc, item) => acc + item.count, 0);
        const percentData = newData.map(item => ({
          name: item.diagnosisdiseaseTypeName || "健康",
          value: ((item.count / total) * 100).toFixed(2)
        }));

        const option = {
          color: ['#285AC8'],
          grid: {
            top: '25%',
            bottom: '5%',
          },
          xAxis: {
            type: 'category',
            data: percentData.map(item => item.name),
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
              return `${params.name}  ${percentData[params.dataIndex].value}%`;
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
              data: percentData.map(item => item.value),
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
      }
    },
    { immediate: true }
  );

  window.addEventListener('resize', () => {
    myChart.resize();
  });
});
</script>



<style  scoped>
.container {
  margin-top: 30px;
  width: 100%;
  height: auto;
}
.title-container {
    display: flex;
    margin-left: 0px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  
  .blue-box {
    width: 6px;
    height: 18px;
    background-color: #285ac8;
    margin-right: 10px;
  }
  
  .title-text {
    font-size: 12px;
    font-weight: bold;
    color: #4a4a4a;
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
