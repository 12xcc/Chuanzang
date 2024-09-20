<template>
  <div class="flex gap-2">
    <!-- 表单选项 -->
    <el-check-tag
      :checked="form.HasCough"
      type="primary"
      @change="toggleTag('HasCough')"
    >
      咳嗽
    </el-check-tag>
    <el-check-tag
      :checked="form.HasSputum"
      type="primary"
      @change="toggleTag('HasSputum')"
    >
      咳痰
    </el-check-tag>
    <el-check-tag
      :checked="form.HasBloodySputum"
      type="primary"
      @change="toggleTag('HasBloodySputum')"
    >
      血痰
    </el-check-tag>
    <el-check-tag
      :checked="form.HasHemoptysis"
      type="primary"
      @change="toggleTag('HasHemoptysis')"
    >
      咳血
    </el-check-tag>
    <el-check-tag
      :checked="form.HasSoreThroat"
      type="primary"
      @change="toggleTag('HasSoreThroat')"
    >
      咽痛
    </el-check-tag>
    <el-check-tag
      :checked="form.HasDryThroat"
      type="primary"
      @change="toggleTag('HasDryThroat')"
    >
      咽干
    </el-check-tag>
    <el-check-tag
      :checked="form.HasNasalCongestion"
      type="primary"
      @change="toggleTag('HasNasalCongestion')"
    >
      鼻塞
    </el-check-tag>
    <el-check-tag
      :checked="form.HasRunnyNose"
      type="primary"
      @change="toggleTag('HasRunnyNose')"
    >
      流涕
    </el-check-tag>
    <el-check-tag
      :checked="form.HasChestTightness"
      type="primary"
      @change="toggleTag('HasChestTightness')"
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
      :checked="form.HasBreathingDifficulty"
      type="primary"
      @change="toggleTag('HasBreathingDifficulty')"
    >
      呼吸困难
    </el-check-tag>
    <el-check-tag
      :checked="form.HasHoarseness"
      type="primary"
      @change="toggleTag('HasHoarseness')"
    >
      声音嘶哑
    </el-check-tag>
    <el-check-tag
      :checked="form.HasBronchitis"
      type="primary"
      @change="toggleTag('HasBronchitis')"
    >
      支气管炎或支气管肺炎
    </el-check-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        HasBronchitis: false
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
