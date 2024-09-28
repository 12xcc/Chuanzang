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
          <span class="title-text">全身症状权重表</span>
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
        HasCyanosisScore: 0,
        HasSubcutaneousAndMucosalBleedingSpotsScore: 0,
        HasPainfulRedRashScore: 0,
        HasBloodBlistersScore: 0,
        HasSkinUlcerScore: 0,
        HasCongestiveOrPetechialRashScore: 0,
        HasPressureInsensitiveRashScore: 0,
        HasItchyRashScore: 0,
        HasEdemaScore: 0,
        HasNightSweatsScore: 0,
        HasWeightLossScore: 0,
        HasExhaustionScore: 0,
      },
      rules: {},
      scoreLabels: [
        { label: "口唇、颜面、四肢及全身皮肤发绀", model: "HasCyanosisScore" },
        { label: "皮下及黏膜出血或出血点", model: "HasSubcutaneousAndMucosalBleedingSpotsScore" },
        { label: "皮肤可见剧痛的红色丘疹", model: "HasPainfulRedRashScore" },
        { label: "皮肤可见周边呈灰黑色、基底坚硬的血性水泡", model: "HasBloodBlistersScore" },
        { label: "皮肤出现呈灰黑色创面的溃疡", model: "HasSkinUlcerScore" },
        { label: "皮疹：充血性或点状出血疹", model: "HasCongestiveOrPetechialRashScore" },
        { label: "皮疹：起初压之退色，后期压之不退", model: "HasPressureInsensitiveRashScore" },
        { label: "失水", model: "HasDehydrationScore" },
        { label: "瘙痒性斑丘疹/水疱", model: "HasItchyRashScore" },
        { label: "水肿", model: "HasEdemaScore" },
        { label: "盗汗", model: "HasNightSweatsScore" },
        { label: "消瘦", model: "HasWeightLossScore" },
        { label: "虚脱/全身无力", model: "HasExhaustionScore" },
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
              return Object.values(this.form).reduce((acc, score) => acc + Number(score), 0);

    //   const scores = Object.values(this.form).map(score => Number(score));
    //   const total = scores.reduce((acc, score) => acc + score, 0);

    //   console.log("Individual Scores:", scores);
    //   console.log("Total Weight Score:", total);

      return total;
    },
  },
   watch: {
    form: {
      handler() {
        this.$emit('update-weight-score', this.totalWeightScore);
      },
      deep: true,
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


