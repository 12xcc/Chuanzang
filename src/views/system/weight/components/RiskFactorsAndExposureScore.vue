<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="140px"
      class="form-container"
      ref="form"
      :rules="rules"
    >
      <div class="select flex gap-2 mb-4">
        <div class="title-container">
          <div class="blue-box"></div>
          <span class="title-text">危险因素与暴露史权重表</span>
        </div>

        <div class="slider-demo-block" v-for="(score, index) in riskLabels" :key="index">
          <el-tag type="primary">{{ score.label }}</el-tag>
          <el-slider
            class="custom-slider"
            v-model.number="form[score.model]"
            show-input
            @change="updateWeightScore"
          />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        ContactWithFeverPatient: 0, // 接触过发热患者
        ContactWithDiarrheaPatient: 0, // 接触过腹泻患者
        ContactWithRashPatient: 0, // 接触过皮疹患者
        ContactWithTuberculosisPatient: 0, // 接触过结核病患者
        HasDrinkingRawWater: 0, // 饮生水
        HasEatingRawFood: 0, // 吃生冷食品
        HasEatingColdCookedFood: 0, // 熟食冷吃
        HasEatingSeafood: 0, // 吃海水产品
        OutdoorStayOrWorkWithinMonth: 0, // 发病前1月内在野外住宿或工作
        OtherWildActivityName: '', // 其他户外活动方式名称
        IsHillyOrMountainous: 0, // 是否居住在丘陵或山区
        IsPlain: 0, // 是否居住在平原
        HasMosquitoBite: 0, // 14天内是否明确被蚊虫叮咬过
        TickBite: 0, // 发病前2周内是否被蜱叮咬过
        FleaBite: 0, // 发病是否被跳蚤叮咬过
        ContactWithRatIn2Months: 0, // 发病前2个月内是否接触鼠类
        EatenFoodContaminatedByRatFeces: 0, // 发病前1月内是否吃过被鼠排泄物污染的食物
        DrunkWaterFromDitchesOrPonds: 0, // 发病前1月内是否在野外喝过沟（塘）水
        RestedNearRatHoles: 0, // 发病前9天内是否在鼠洞附近坐卧
        RatOrRatDroppingsAtWorkplace: 0, // 工作场所有无鼠或鼠排泄物
        ContactWithPatientExcreta: 0, // 发病前1月内是否接触过病人排泄物
      },
      rules: {},
      riskLabels: [
        { label: "接触过发热患者", model: "ContactWithFeverPatient" },
        { label: "接触过腹泻患者", model: "ContactWithDiarrheaPatient" },
        { label: "接触过皮疹患者", model: "ContactWithRashPatient" },
        { label: "接触过结核病患者", model: "ContactWithTuberculosisPatient" },
        { label: "饮生水", model: "HasDrinkingRawWater" },
        { label: "吃生冷食品", model: "HasEatingRawFood" },
        { label: "熟食冷吃", model: "HasEatingColdCookedFood" },
        { label: "吃海水产品", model: "HasEatingSeafood" },
        { label: "发病前1月内在野外住宿或工作", model: "OutdoorStayOrWorkWithinMonth" },
        { label: "居住在丘陵或山区", model: "IsHillyOrMountainous" },
        { label: "居住在平原", model: "IsPlain" },
        { label: "14天内被蚊虫叮咬过", model: "HasMosquitoBite" },
        { label: "发病前2周内被蜱叮咬过", model: "TickBite" },
        { label: "发病是否被跳蚤叮咬过", model: "FleaBite" },
        { label: "发病前2个月内接触鼠类", model: "ContactWithRatIn2Months" },
        { label: "发病前1月内吃过被鼠排泄物污染的食物", model: "EatenFoodContaminatedByRatFeces" },
        { label: "发病前1月内在野外喝过沟水", model: "DrunkWaterFromDitchesOrPonds" },
        { label: "发病前9天内在鼠洞附近坐卧", model: "RestedNearRatHoles" },
        { label: "工作场所有鼠或鼠排泄物", model: "RatOrRatDroppingsAtWorkplace" },
        { label: "发病前1月内接触病人排泄物", model: "ContactWithPatientExcreta" },
      ],
    };
  },

  methods: {
    updateWeightScore() {
      const totalScore = this.totalWeightScore;
      this.$emit('update-weight-score', totalScore);
    },
  },

  computed: {
    totalWeightScore() {
      const scores = Object.values(this.form).map(score => Number(score));
      const total = scores.reduce((acc, score) => acc + score, 0);

      console.log("Individual Scores:", scores);
      console.log("Total Weight Score:", total);

      return total;
    },
  },
};
</script>

<style scoped>
.custom-drawer {
  height: 100%;
}
.form-container {
  padding: 20px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 850px;
  background: #ffffff;
  padding: 3px;
  z-index: 100;
  border: 3px solid #fafafa;
}

h3 {
  margin-top: 20px;
  font-size: 16px;
  color: #333333;
  margin-left: 30px;
}
.custom-input {
  margin-bottom: 10px;
}
.el-dropdown-link:focus {
  outline: none;
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

.BaseInfo {
  margin-bottom: 50px;
}
.el-tag {
  margin: 10px;
  font-weight: normal;
}

.select {
  margin-top: 10px;
  margin-bottom: 20px;
  display: block;
}
.el-form-item {
  margin-left: 20px;
}
.slider-demo-block {
  width: 700px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-left: 12px;
}
.custom-slider .el-input-number {
  width: 130px !important;
}
.el-slider__input {
  width: 130px;
}
.custom-slider {
  width: 400px;
}
.el-slider {
  --el-slider-button-size: 15px !important;
}
.el-slider__runway .show-input {
  width: 200px !important;
}
</style>
