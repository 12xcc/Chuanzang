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
          <span class="title-text">神经系统症状权重表</span>
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
        HasDelirium: 0, // 是否有儋妄
        HasConvulsion: 0, // 是否有抽搐
        HasDrowsiness: 0, // 是否有昏睡
        HasComa: 0, // 是否有昏迷
        HasStiffNeck: 0, // 是否有颈部强直
        HasRestlessness: 0, // 是否有烦躁不安
        HasMuscleParalysisNeckShoulder: 0, // 是否有颈肩部肌肉迟缓性瘫痪
        HasMuscleParalysisLimbs: 0, // 是否有肢体肌肉迟缓性瘫痪
        HasSwallowingDifficulty: 0, // 是否有吞咽困难
        HasSpeechDisorder: 0, // 是否有语言障碍
        HasConsciousnessDisorder: 0, // 是否有意识障碍或惊厥
        HasDizziness: 0, // 是否有头晕
        HasTinnitus: 0, // 是否有耳鸣
        HasHearingLoss: 0, // 是否有听力减退
      },
      rules: {},
      scoreLabels: [
        { label: "是否有儋妄", model: "HasDelirium" },
        { label: "是否有抽搐", model: "HasConvulsion" },
        { label: "是否有昏睡", model: "HasDrowsiness" },
        { label: "是否有昏迷", model: "HasComa" },
        { label: "是否有颈部强直", model: "HasStiffNeck" },
        { label: "是否有烦躁不安", model: "HasRestlessness" },
        { label: "是否有颈肩部肌肉迟缓性瘫痪", model: "HasMuscleParalysisNeckShoulder" },
        { label: "是否有肢体肌肉迟缓性瘫痪", model: "HasMuscleParalysisLimbs" },
        { label: "是否有吞咽困难", model: "HasSwallowingDifficulty" },
        { label: "是否有语言障碍", model: "HasSpeechDisorder" },
        { label: "是否有意识障碍或惊厥", model: "HasConsciousnessDisorder" },
        { label: "是否有头晕", model: "HasDizziness" },
        { label: "是否有耳鸣", model: "HasTinnitus" },
        { label: "是否有听力减退", model: "HasHearingLoss" },
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
