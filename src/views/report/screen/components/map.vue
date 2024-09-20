<template>
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">地理位置分布</div>
      <div id="mapContainer" class="chart"></div>
      <div class="legend-label">
            <img src="@/assets/map.svg" alt="">
            <div class="legend-title">患病人数多的高风险地区</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const map = new AMap.Map('mapContainer', {
    zoom: 3.6, 
    center: [104.0668, 30.5728]  
  });

  map.plugin(['AMap.HeatMap'], () => {
    const heatmap = new AMap.HeatMap(map, {
      radius: 25,
      opacity: [0, 0.8]
    });

    // 热力点
    heatmap.setDataSet({
      data: [
        { lng: 104.0668, lat: 30.5728, count: 100 },
        { lng: 90.3715, lat: 29.6624, count: 100 },   
        { lng: 93.3454, lat: 30.6555, count: 90 },    
        { lng: 103.0864, lat: 32.2344, count: 230 },    
        { lng: 102.8284, lat: 30.2051, count: 220 },   
        { lng: 101.7242, lat: 36.6527, count: 85 },   
        { lng: 91.3457, lat: 29.6756, count: 300 },    
        { lng: 94.2500, lat: 31.0000, count: 200 },  
        { lng: 94.0000, lat: 32.0000, count: 200 },
        { lng: 95.0000, lat: 33.0000, count: 200 }    
      ],
      max: 100
    });
  });
});
</script>

<style scoped>
.container {
    margin-top: 64px;
    margin-left: 10px;
    width: 100%;
    height: auto;
}

.chart-container {
    width: 580px;
    height: 700px;
    background-color: #FAFAFA;
    border-radius: 5px;
    position: relative;
    padding-top: 50px; 
    padding-left: 20px; 
    padding-right: 20px;
    padding-bottom: 60px;
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

#mapContainer {
    width: 100%;
    height: calc(100% - 40px); 
}


.legend-label {
    margin-top: 30px;
    font-size: 12px;
    display: flex;
}
img{
    width: 34px;
    height: 34px;
}
.legend-title{
    margin-top: 10px;
    font-weight: bold;
    color: #4A4A4A;
}
</style>
