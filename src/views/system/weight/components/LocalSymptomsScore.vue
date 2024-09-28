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
          <span class="title-text">局部症状权重表</span>
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
        HasConjunctivitis: 0, // 是否有结膜炎
        HasConjunctivalCongestion: 0, // 是否有眼结膜充血、肿胀疼痛
        HasEyelidEdema: 0, // 是否有上下眼睑水肿
        HasSmellTasteLoss: 0, // 是否有嗅觉味觉减退或丧失
        HasFacialRednessOrPallor: 0, // 是否有颜面潮红或苍白
        HasRednessNeckChest: 0, // 是否有颈部、胸部潮红
        HasLipCyanosis: 0, // 是否有口唇发绀
        HasSkinPallorOrBruising: 0, // 是否有皮肤苍白或带青紫
        HasGumBleeding: 0, // 是否有牙龈出血
        HasKidneyPain: 0, // 是否有肾区疼痛
        HasLowBackPain: 0, // 是否有腰痛
        HasOrbitalPain: 0, // 是否有眼眶痛
        HasMucosalBleedingInOralOrNasal: 0, // 是否有口腔、鼻腔等处黏膜出血点
        HasSkinBleedingPoints: 0, // 是否有腋下/上臂/胸部或其它部位皮肤出血点
      },
      rules: {},
      scoreLabels: [
        { label: "是否有结膜炎", model: "HasConjunctivitis" },
        { label: "是否有眼结膜充血、肿胀疼痛", model: "HasConjunctivalCongestion" },
        { label: "是否有上下眼睑水肿", model: "HasEyelidEdema" },
        { label: "是否有嗅觉味觉减退或丧失", model: "HasSmellTasteLoss" },
        { label: "是否有颜面潮红或苍白", model: "HasFacialRednessOrPallor" },
        { label: "是否有颈部、胸部潮红", model: "HasRednessNeckChest" },
        { label: "是否有口唇发绀", model: "HasLipCyanosis" },
        { label: "是否有皮肤苍白或带青紫", model: "HasSkinPallorOrBruising" },
        { label: "是否有牙龈出血", model: "HasGumBleeding" },
        { label: "是否有肾区疼痛", model: "HasKidneyPain" },
        { label: "是否有腰痛", model: "HasLowBackPain" },
        { label: "是否有眼眶痛", model: "HasOrbitalPain" },
        { label: "是否有口腔、鼻腔等处黏膜出血点", model: "HasMucosalBleedingInOrNasal" },
        { label: "是否有腋下/上臂/胸部或其它部位皮肤出血点", model: "HasSkinBleedingPoints" },
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
