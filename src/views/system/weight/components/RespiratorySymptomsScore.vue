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
  props: {
    symptomsData: {
      type: Array,
      required: true, 
    },
  },
data() {
  return {
    form: {
      HasCough: 0,
      HasSputum: 0,
      HasBloodySputum: 0,
      HasHemoptysis: 0,
      HasSoreThroat: 0,
      HasDryThroat: 0,
      HasNasalCongestion: 0,
      HasRunnyNose: 0,
      HasChestTightness: 0,
      HasShortnessOfBreath: 0,
      HasBreathingDifficulty: 0,
      HasHoarseness: 0,
      HasBronchitis: 0,
    },
    rules: {},  // 表单验证规则
    scoreLabels: [
      { label: "咳嗽", model: "HasCough" },
      { label: "咳痰", model: "HasSputum" },
      { label: "血痰", model: "HasBloodySputum" },
      { label: "咳血", model: "HasHemoptysis" },
      { label: "咽痛", model: "HasSoreThroat" },
      { label: "咽干", model: "HasDryThroat" },
      { label: "鼻塞", model: "HasNasalCongestion" },
      { label: "流涕", model: "HasRunnyNose" },
      { label: "胸闷", model: "HasChestTightness" },
      { label: "气促", model: "HasShortnessOfBreath" },
      { label: "呼吸困难", model: "HasBreathingDifficulty" },
      { label: "声音嘶哑", model: "HasHoarseness" },
      { label: "支气管炎或支气管肺炎", model: "HasBronchitis" },
    ],
  };
},

watch: {
  symptomsData: {
    immediate: true,
    handler(newData) {
      newData.forEach((item) => {
        const fieldName = item.symptomFieldName; 
        if (this.form.hasOwnProperty(fieldName)) {
          this.form[fieldName] = item.weightScore; // 直接将 weightScore 映射到 form 中
        }
      });
      this.updateWeightScore(); 
    },
  },
},


  methods: {
    // 更新总分数，并传递给父组件
    updateWeightScore() {
      const totalScore = Object.values(this.form).reduce((acc, score) => acc + Number(score), 0);
      this.$emit("update-weight-score", totalScore);  
    },
  },

  computed: {
    // 计算总分
    totalWeightScore() {
      return Object.values(this.form).reduce((acc, score) => acc + Number(score), 0);
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


