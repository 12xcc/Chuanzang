<template>
  <div class="container">
    <div class="title-container">
        <div class="blue-box"></div>
        <span class="title-text">满意度统计(单位：人)</span>
    </div>
    <div class="card-container">
        <div class="card" v-for="(item, index) in cardData" :key="index">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-bottom">
                <div class="card-data" :id="'card-data-' + index">{{ item.data }}</div>
                <!-- <img :src="item.imgSrc" alt=""/> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { CountUp } from 'countup.js';
// import allusernumber from '@/assets/screenimgs/allusernumber.svg';
// import satisone from '@/assets/satisfaction/satisone.svg';
// import todaycheckin from '@/assets/screenimgs/todaycheckin.svg';
// import todayhealth from '@/assets/screenimgs/todayhealth.svg';
// import todaydisease from '@/assets/screenimgs/todaydisease.svg';
// import todaynotcheckin from '@/assets/screenimgs/todaynotcheckin.svg';
import { getStatisticsData } from '@/api/report/screen.js'; // 导入接口

export default {
  data() {
    return {
      // cardData: [
      //   { title: "总提交人数", data: 0, imgSrc: allusernumber },
      //   { title: "非常满意", data: 0, imgSrc: satisone },
      //   { title: "满意", data: 0, imgSrc: todaycheckin },
      //   { title: "一般", data: 0, imgSrc: todayhealth },
      //   { title: "不满意", data: 0, imgSrc: todaydisease },
      //   { title: "非常不满意", data: 0, imgSrc: todaynotcheckin }
      // ]
       cardData: [
        { title: "总提交人数", data: 0, },
        { title: "非常满意", data: 0,  },
        { title: "满意", data: 0,  },
        { title: "一般", data: 0,  },
        { title: "不满意", data: 0,  },
        { title: "非常不满意", data: 0,  }
      ]
    };
  },
  methods: {
    startCountAnimation() {
      this.cardData.forEach((item, index) => {
        const countUp = new CountUp(`card-data-${index}`, item.data);
        countUp.start();
      });
    },

    async fetchStatisticsData() {
      try {
        const response = await getStatisticsData();
        if (response.data.code === 1) {
          const statistics = response.data.data;
          this.cardData[0].data = statistics.userNumber; // 总人数
          this.cardData[1].data = statistics.checkInNumber; // 总打卡数
          this.cardData[5].data = statistics.userHealthNumber + statistics.userDiseaseNumber; // 今日打卡人数
          this.cardData[3].data = statistics.userHealthNumber; // 今日健康人数
          this.cardData[4].data = statistics.userDiseaseNumber; // 今日患病人数
          this.cardData[2].data = statistics.userNumber - (statistics.userHealthNumber + statistics.userDiseaseNumber); // 今日未打卡人数

          this.startCountAnimation(); // 调用动画
        } else {
          this.$message.error("获取统计数据失败，请重试！");
        }
      } catch (error) {
        console.error("Error fetching statistics data:", error);
        this.$message.error("获取统计数据失败，请重试！");
      }
    }
  },
  mounted() {
    this.fetchStatisticsData(); // 组件挂载时调用接口
  }
};
</script>

<style scoped>
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
    width: 100px;
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
