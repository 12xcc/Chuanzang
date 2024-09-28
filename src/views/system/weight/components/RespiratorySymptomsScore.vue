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
          <span class="title-text">呼吸系统症状权重表</span>
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
        HasCoughScore: 0,
        HasSputumScore: 0,
        HasBloodySputumScore: 0,
        HasHemoptysisScore: 0,
        HasSoreThroatScore: 0,
        HasDryThroatScore: 0,
        HasNasalCongestionScore: 0,
        HasRunnyNoseScore: 0,
        HasChestTightnessScore: 0,
        hasShortnessOfBreathScore: 0,
        HasBreathingDifficultyScore: 0,
        HasHoarsenessScore: 0,
        HasBronchitisScore: 0,
      },
      rules: {},
      scoreLabels: [
        { label: "咳嗽", model: "HasCoughScore" },
        { label: "咳痰", model: "HasSputumScore" },
        { label: "血痰", model: "HasBloodySputumScore" },
        { label: "咳血", model: "HasHemoptysisScore" },
        { label: "咽痛", model: "HasSoreThroatScore" },
        { label: "咽干", model: "HasDryThroatScore" },
        { label: "鼻塞", model: "HasNasalCongestionScore" },
        { label: "流涕", model: "HasRunnyNoseScore" },
        { label: "胸闷", model: "HasChestTightnessScore" },
        { label: "气促", model: "hasShortnessOfBreathScore" },
        { label: "呼吸困难", model: "HasBreathingDifficultyScore" },
        { label: "声音嘶哑", model: "HasHoarsenessScore" },
        { label: "支气管炎或支气管肺炎", model: "HasBronchitisScore" },
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


