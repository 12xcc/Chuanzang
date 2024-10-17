<template>
  <div class="flex gap-2">
    <!-- 表单选项 -->
    <el-check-tag
      :checked="form.hasCough"
      type="primary"
      @change="toggleTag('hasCough')"
    >
      咳嗽
    </el-check-tag>
    <el-check-tag
      :checked="form.hasSputum"
      type="primary"
      @change="toggleTag('hasSputum')"
    >
      咳痰
    </el-check-tag>
    <el-check-tag
      :checked="form.hasBloodySputum"
      type="primary"
      @change="toggleTag('hasBloodySputum')"
    >
      血痰
    </el-check-tag>
    <el-check-tag
      :checked="form.hasHemoptysis"
      type="primary"
      @change="toggleTag('hasHemoptysis')"
    >
      咳血
    </el-check-tag>
    <el-check-tag
      :checked="form.hasSoreThroat"
      type="primary"
      @change="toggleTag('hasSoreThroat')"
    >
      咽痛
    </el-check-tag>
    <el-check-tag
      :checked="form.hasDryThroat"
      type="primary"
      @change="toggleTag('hasDryThroat')"
    >
      咽干
    </el-check-tag>
    <el-check-tag
      :checked="form.hasNasalCongestion"
      type="primary"
      @change="toggleTag('hasNasalCongestion')"
    >
      鼻塞
    </el-check-tag>
    <el-check-tag
      :checked="form.hasRunnyNose"
      type="primary"
      @change="toggleTag('hasRunnyNose')"
    >
      流涕
    </el-check-tag>
    <el-check-tag
      :checked="form.hasPharyngealHyperemia"
      type="primary"
      @change="toggleTag('hasPharyngealHyperemia')"
    >
      咽充血
    </el-check-tag>
    <el-check-tag
      :checked="form.hasChestTightness"
      type="primary"
      @change="toggleTag('hasChestTightness')"
    >
      胸闷
    </el-check-tag>
    <el-check-tag
      :checked="form.hasShortnessOfBreath"
      type="primary"
      @change="toggleTag('hasShortnessOfBreath')"
    >
      气促
    </el-check-tag>
    <el-check-tag
      :checked="form.hasBreathingDifficulty"
      type="primary"
      @change="toggleTag('hasBreathingDifficulty')"
    >
      呼吸困难
    </el-check-tag>
    <el-check-tag
      :checked="form.hasHoarseness"
      type="primary"
      @change="toggleTag('hasHoarseness')"
    >
      声音嘶哑
    </el-check-tag>
    <el-check-tag
      :checked="form.hasBronchitis"
      type="primary"
      @change="toggleTag('hasBronchitis')"
    >
      支气管炎或支气管肺炎
    </el-check-tag>
    <el-check-tag
      :checked="form.hasLungRales"
      type="primary"
      @change="toggleTag('hasLungRales')"
    >
      听诊肺部有散在湿性罗音
    </el-check-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        hasCough: false,
        hasSputum: false,
        hasBloodySputum: false,
        hasHemoptysis: false,
        hasSoreThroat: false,
        hasDryThroat: false,
        hasNasalCongestion: false,
        hasRunnyNose: false,
        hasChestTightness: false,
        hasShortnessOfBreath: false,
        hasBreathingDifficulty: false,
        hasHoarseness: false,
        hasBronchitis: false,
        hasPharyngealHyperemia: false, //咽充血
        hasLungRales: false, //是否听诊肺部有散在湿性罗音
      }
    };
  },
  methods: {
    toggleTag(field) {
     this.form[field] = !this.form[field];
    },

    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    getInitialForm() {
      return {
         hasCough: false,
        hasSputum: false,
        hasBloodySputum: false,
        hasHemoptysis: false,
        hasSoreThroat: false,
        hasDryThroat: false,
        hasNasalCongestion: false,
        hasRunnyNose: false,
        hasChestTightness: false,
        hasShortnessOfBreath: false,
        hasBreathingDifficulty: false,
        hasHoarseness: false,
        hasBronchitis: false
      };
    },
    getData() {
      return this.form; // 返回当前组件的表单数据
    },
  }
};
</script>

<style scoped>
.el-check-tag{
    margin: 10px;
    font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: var(--el-color-primary) !important;
  color: #fff !important;
  border-color: var(--el-color-primary) !important;
  font-weight: normal;
}
</style>
