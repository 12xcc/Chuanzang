<template>
  <div class="container">
    <div class="title-container">
        <div class="blue-box"></div>
        <span class="title-text">打卡数据监控大屏</span>
    </div>
    <div class="card-container">
        <div class="card" v-for="(item, index) in cardData" :key="index">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-bottom">
                <div class="card-data" :id="'card-data-' + index">{{ item.data }}</div>
                <img :src="item.imgSrc" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { CountUp } from 'countup.js';
import allusernumber from '@/assets/screenimgs/allusernumber.svg';
import allcheckinnumber from '@/assets/screenimgs/allcheckinnumber.svg';
import todaycheckin from '@/assets/screenimgs/todaycheckin.svg';
import todayhealth from '@/assets/screenimgs/todayhealth.svg';
import todaydisease from '@/assets/screenimgs/todaydisease.svg';
import todaynotcheckin from '@/assets/screenimgs/todaynotcheckin.svg';

export default {
  data() {
    return {
      cardData: [
        { title: "职工总人数 (人)", data: 2000, imgSrc: allusernumber },
        { title: "打卡总次数 (次)", data: 339398, imgSrc: allcheckinnumber },
        { title: "今日打卡人数 (人)", data: 1723, imgSrc: todaycheckin },
        { title: "今日健康人数 (人)", data: 1700, imgSrc: todayhealth },
        { title: "今日患病人数 (人)", data: 23, imgSrc: todaydisease },
        { title: "今日未打卡人数 (人)", data: 277, imgSrc: todaynotcheckin }
      ]
    };
  },
  methods: {
    startCountAnimation() {
      this.cardData.forEach((item, index) => {
        const countUp = new CountUp(`card-data-${index}`, item.data);
        countUp.start();
      });
    }
  },
  mounted() {
    this.startCountAnimation();
  }
}
</script>

<style  scoped>
.container {
    margin-top: 40px;
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
.card-container {
    display: flex;
}

.card {
    background: #FAFAFA;
    border-radius: 10px;
    height: 130px;
    width: 250px;
    margin: 8px;
}

.card-title {
    margin: 15px;
    font-size: 14px;
    font-weight: 550;
    color: #4A4A4A;
}

.card-bottom {
    display: flex;
}

img {
    height: 50px;
    width: 50px;
    margin-left: 50px;
    margin-top: 5px;
}

.card-data {
    width: 74px;
    font-size: 24px;
    margin-top: 15px;
    margin-left: 15px;
    font-weight: bold;
    color: #333333;
}
</style>
