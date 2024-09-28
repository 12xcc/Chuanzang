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
          <span class="title-text">消化系统症状权重表</span>
        </div>

        <div class="slider-demo-block" v-for="(score, index) in scoreLabels" :key="index">
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
        arrheaFrequencyGEThreeTimesPerDay: 0, //腹泻，>=3天
        StoolType1DetailScore: 0, //稀便或水样便或米泔样或洗肉水样（粪便性状1）
        StoolType2DetailScore: 0, //大块黏膜样或脓血样或黑便样（粪便性状2）
        HasVomiting: 0, // 是否呕吐
        HasNausea: 0, // 是否恶心
        HasAppetiteLoss: 0, // 是否食欲减退
        HasAbdominalDistension: 0, // 是否腹胀
        HasAbdominalPain: 0, // 是否腹痛
        HasBorborygmus: 0, // 是否腹鸣
        HasUpperAbdominalDiscomfort: 0, // 是否上腹部不适
        HasConstipation: 0, // 是否便秘
        HasOliguriaOrAnuria: 0, // 是否少尿或无尿
      },
      rules: {},
      scoreLabels: [
        { label: "腹泻，>=3天", model: "arrheaFrequencyGEThreeTimesPerDay" },
        { label: "稀便或水样便或米泔样或洗肉水样（粪便性状1）", model: "StoolType1DetailScore" },
        { label: "大块黏膜样或脓血样或黑便样（粪便性状2）", model: "StoolType2DetailScore" },
        { label: "是否呕吐", model: "HasVomiting" },
        { label: "是否恶心", model: "HasNausea" },
        { label: "是否食欲减退", model: "HasAppetiteLoss" },
        { label: "是否腹胀", model: "HasAbdominalDistension" },
        { label: "是否腹痛", model: "HasAbdominalPain" },
        { label: "是否腹鸣", model: "HasBorborygmus" },
        { label: "是否上腹部不适", model: "HasUpperAbdominalDiscomfort" },
        { label: "是否便秘", model: "HasConstipation" },
        { label: "是否少尿或无尿", model: "HasOliguriaOrAnuria" },
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
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: -25px;
  margin-right: 10px;
  margin-bottom: 20px;
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
