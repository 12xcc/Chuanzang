<template>
  <div>
    <div class="positionInfo">
      <span>经度: {{ longitude }}°</span>
      <span>纬度: {{ latitude }}°</span>
      <span>地点: {{ address }}</span>
    </div>
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script>
import locationIcon from '@/assets/location.svg';

export default {
  name: 'MapComponent',
  data() {
    return {
      longitude: 94.3668, // 默认经度
      latitude: 29.6524, // 默认纬度
      address: '', // 地址信息
    };
  },
  methods: {
    initializeMap() {
      // 模拟经纬度
      const fakeLatLng = [this.longitude, this.latitude];

      // 初始化地图
      const map = new AMap.Map(this.$refs.mapContainer, {
        center: fakeLatLng, // 默认中心点设置为模拟经纬度
        zoom: 13,
      });

      // 自定义定位图标
      const customIcon = new AMap.Icon({
        size: new AMap.Size(48, 48), // 图标大小
        image: locationIcon, // 自定义图标路径
        imageSize: new AMap.Size(48, 48), // 图标显示大小
      });

      // 添加标记
      new AMap.Marker({
        position: fakeLatLng,
        icon: customIcon,
        map: map,
      });

      // 调用逆地理编码服务
      this.getAddress(fakeLatLng);
    },

    // 使用逆地理编码 API 获取地址信息
    getAddress(latlng) {
      const geocoder = new AMap.Geocoder();
      geocoder.getAddress(latlng, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          this.address = result.regeocode.formattedAddress;
        } else {
          this.address = '无法获取地点信息';
        }
      });
    }
  },
  mounted() {
    this.initializeMap();
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
  border-radius: 5px;
}
.positionInfo {
  font-size: 14px;
  margin-bottom: 10px;
}
span{
    margin-right: 30px;
}
</style>
