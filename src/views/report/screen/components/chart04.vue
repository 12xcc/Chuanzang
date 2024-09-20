<template>
  <div class="container">
    <div class="chart-container">
      <h3>打卡时间分布</h3>
      <el-radio-group
        v-model="timeRange"
        @change="updateChart"
        class="radio-group"
      >
        <el-radio-button label="最近一周">最近一周</el-radio-button>
        <el-radio-button label="最近一月">最近一月</el-radio-button>
        <el-radio-button label="最近一年">最近一年</el-radio-button>
      </el-radio-group>
      <div ref="chartContainer" class="chart"></div>
    </div>
  </div>
</template>


<script>
import * as echarts from "echarts";
import dayjs from "dayjs";

export default {
  data() {
    return {
      chartInstance: null,
      //   默认显示最近一周
      timeRange: "最近一周",
    };
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.chartContainer);
    this.updateChart();
  },
  methods: {
    updateChart() {
      let xAxisData = [];
      let seriesData = [];

      const today = dayjs();
      if (this.timeRange === "最近一周") {
        // 显示最近7天的日期
        for (let i = 6; i >= 0; i--) {
          xAxisData.push(today.subtract(i, "day").format("M.D"));
          seriesData.push(Math.floor(Math.random() * 2000));
        }
      } else if (this.timeRange === "最近一月") {
        // 以5天为一个单位显示最近30天的数据
        for (let i = 5; i >= 0; i--) {
          const startDay = today.subtract(i * 5, "day").subtract(5, "day");
          const endDay = today.subtract(i * 5, "day");
          xAxisData.push(`${startDay.format("M.D")}-${endDay.format("M.D")}`);
          seriesData.push(Math.floor(Math.random() * 2000));
        }
      } else if (this.timeRange === "最近一年") {
        // 显示最近12个月的数据
        for (let i = 11; i >= 0; i--) {
          xAxisData.push(today.subtract(i, "month").format("YYYY.M"));
          seriesData.push(Math.floor(Math.random() * 2000));
        }
      }

      const option = {
        color: ["#285AC8"],
        grid: {
          top: "10%",
          bottom: "15%",
          left: "15%",
          right: "3%",
        },
        tooltip: {
          trigger: "axis", // 确保提示框在坐标轴上触发
          axisPointer: {
            type: "line", // 显示虚线
            lineStyle: {
              type: "dashed",
              color: "#285AC8",
            },
          },
          formatter: function (params) {
            console.log("Formatter params:", params); // 调试输出
            if (params.length > 0) {
              const date = params[0].name; // 获取数据点的名称
              const value = params[0].value; // 获取数据点的值
              return `${date}   ${value}人`; // 格式化提示框内容
            }
            return "";
          },
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          textStyle: {
            color: "#333333",
          },
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {
            show: true,
          },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
          },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            data: seriesData,
            type: "line",
            smooth: true,
            markLine: {
              data: [{ xAxis: dayjs().format("M.D") }], // 当前日期的虚线
              lineStyle: {
                type: "dashed",
                color: "#285AC8",
              },
            },
            itemStyle: {
              color: "#285AC8", // 圆点颜色
            },
            symbolSize: 10, // 圆点大小
          },
        ],
      };

      this.chartInstance.setOption(option);
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #fafafa;
  margin-top: 64px;
  margin-left: 10px;
}

.chart-container {
  padding: 20px;
  background-color: #fafafa;
  border-radius: 5px;
  width: 340px;
  height: 410px;
}

h3 {
  font-size: 14px;
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 10px;
}

.el-radio-group {
  margin-top: 15px;
  margin-left: 30px;
}

.el-radio-button__inner {
  color: #285ac8;
}

.el-radio-button__inner:hover {
  background-color: #285ac8;
  color: white;
}

.chart {
  width: 100%;
  height: 300px;
  margin-top: 20px;
}
</style>
