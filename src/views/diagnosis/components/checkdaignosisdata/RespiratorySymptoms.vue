<template>
  <div class="flex gap-2">
    <!-- 表单选项 -->
    <el-check-tag
      :checked="form.HasCough"
      type="primary"
      @change="toggleTag('HasCough')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      咳嗽
    </el-check-tag>
    <el-check-tag
      :checked="form.HasSputum"
      type="primary"
      @change="toggleTag('HasSputum')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      咳痰
    </el-check-tag>
    <el-check-tag
      :checked="form.HasBloodySputum"
      type="primary"
      @change="toggleTag('HasBloodySputum')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      血痰
    </el-check-tag>
    <el-check-tag
      :checked="form.HasHemoptysis"
      type="primary"
      @change="toggleTag('HasHemoptysis')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      咳血
    </el-check-tag>
    <el-check-tag
      :checked="form.HasSoreThroat"
      type="primary"
      @change="toggleTag('HasSoreThroat')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      咽痛
    </el-check-tag>
    <el-check-tag
      :checked="form.HasDryThroat"
      type="primary"
      @change="toggleTag('HasDryThroat')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      咽干
    </el-check-tag>
    <el-check-tag
      :checked="form.HasNasalCongestion"
      type="primary"
      @change="toggleTag('HasNasalCongestion')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      鼻塞
    </el-check-tag>
    <el-check-tag
      :checked="form.HasRunnyNose"
      type="primary"
      @change="toggleTag('HasRunnyNose')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      流涕
    </el-check-tag>
    <el-check-tag
      :checked="form.HasPharyngealHyperemia"
      type="primary"
      @change="toggleTag('HasPharyngealHyperemia')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      咽充血
    </el-check-tag>
    <el-check-tag
      :checked="form.HasChestTightness"
      type="primary"
      @change="toggleTag('HasChestTightness')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      胸闷
    </el-check-tag>
    <el-check-tag
      :checked="form.hasShortnessOfBreath"
      type="primary"
      @change="toggleTag('hasShortnessOfBreath')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      气促
    </el-check-tag>
    <el-check-tag
      :checked="form.HasBreathingDifficulty"
      type="primary"
      @change="toggleTag('HasBreathingDifficulty')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      呼吸困难
    </el-check-tag>
    <el-check-tag
      :checked="form.HasHoarseness"
      type="primary"
      @change="toggleTag('HasHoarseness')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      声音嘶哑
    </el-check-tag>
    <el-check-tag
      :checked="form.HasBronchitis"
      type="primary"
      @change="toggleTag('HasBronchitis')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      支气管炎或支气管肺炎
    </el-check-tag>
    <el-check-tag
      :checked="form.HasLungRales"
      type="primary"
      @change="toggleTag('HasLungRales')"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      听诊肺部有散在湿性罗音
    </el-check-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allDisabled:true,allReadonly:true,
      form: {
        HasCough: false,
        HasSputum: false,
        HasBloodySputum: false,
        HasHemoptysis: false,
        HasSoreThroat: false,
        HasDryThroat: false,
        HasNasalCongestion: false,
        HasRunnyNose: false,
        HasChestTightness: false,
        hasShortnessOfBreath: false,
        HasBreathingDifficulty: false,
        HasHoarseness: false,
        HasBronchitis: false,
        HasPharyngealHyperemia: false, //咽充血
        HasLungRales: false, //是否听诊肺部有散在湿性罗音
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
         HasCough: false,
        HasSputum: false,
        HasBloodySputum: false,
        HasHemoptysis: false,
        HasSoreThroat: false,
        HasDryThroat: false,
        HasNasalCongestion: false,
        HasRunnyNose: false,
        HasChestTightness: false,
        hasShortnessOfBreath: false,
        HasBreathingDifficulty: false,
        HasHoarseness: false,
        HasBronchitis: false
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
