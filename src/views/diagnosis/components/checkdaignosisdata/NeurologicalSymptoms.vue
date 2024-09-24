<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="80px"
      class="form-container"
      ref="form"
      :rules="rules"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">症状</span>
          </div>
          <el-check-tag
            :checked="form.HasDelirium"
            type="primary"
            @change="toggleTag('HasDelirium')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            儋妄
          </el-check-tag>

          <el-check-tag
            :checked="form.HasConvulsion"
            type="primary"
            @change="toggleTag('HasConvulsion')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            抽搐
          </el-check-tag>

          <el-check-tag
            :checked="form.HasDrowsiness"
            type="primary"
            @change="toggleTag('HasDrowsiness')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            昏睡
          </el-check-tag>

          <el-check-tag
            :checked="form.HasComa"
            type="primary"
            @change="toggleTag('HasComa')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            昏迷
          </el-check-tag>

          <el-check-tag
            :checked="form.HasStiffNeck"
            type="primary"
            @change="toggleTag('HasStiffNeck')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            颈部强直
          </el-check-tag>

          <el-check-tag
            :checked="form.HasRestlessness"
            type="primary"
            @change="toggleTag('HasRestlessness')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            烦躁不安
          </el-check-tag>

          <el-check-tag
            :checked="form.HasMuscleParalysisNeckShoulder"
            type="primary"
            @change="toggleTag('HasMuscleParalysisNeckShoulder')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            颈肩部肌肉迟缓性瘫痪
          </el-check-tag>

          <el-check-tag
            :checked="form.HasMuscleParalysisLimbs"
            type="primary"
            @change="toggleTag('HasMuscleParalysisLimbs')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            肢体肌肉迟缓性瘫痪
          </el-check-tag>

          <el-check-tag
            :checked="form.HasSwallowingDifficulty"
            type="primary"
            @change="toggleTag('HasSwallowingDifficulty')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            吞咽困难
          </el-check-tag>

          <el-check-tag
            :checked="form.HasSpeechDisorder"
            type="primary"
            @change="toggleTag('HasSpeechDisorder')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            语言障碍
          </el-check-tag>

          <el-check-tag
            :checked="form.HasConsciousnessDisorder"
            type="primary"
            @change="toggleTag('HasConsciousnessDisorder')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            意识障碍或惊厥
          </el-check-tag>

          <el-check-tag
            :checked="form.HasDizziness"
            type="primary"
            @change="toggleTag('HasDizziness')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            头晕
          </el-check-tag>

          <el-check-tag
            :checked="form.HasTinnitus"
            type="primary"
            @change="toggleTag('HasTinnitus')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            耳鸣
          </el-check-tag>

          <el-check-tag
            :checked="form.HasHearingLoss"
            type="primary"
            @change="toggleTag('HasHearingLoss')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            听力减退
          </el-check-tag>
        </div>
      </div>
    </el-form>
  </div>
</template>


<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date_selection.vue";
export default {
  components: {
    Dateselection,
  },
  data() {
    return {
      allDisabled:true,allReadonly:true,
      visible: false, // 控制弹窗显示
      form: {
         HasDelirium: false,
        HasConvulsion: false,
        HasDrowsiness: false,
        HasComa: false,
        HasStiffNeck: false,
        HasRestlessness: false,
        HasMuscleParalysisNeckShoulder: false,
        HasMuscleParalysisLimbs: false,
        HasSwallowingDifficulty: false,
        HasSpeechDisorder: false,
        HasConsciousnessDisorder: false,
        HasDizziness: false,
        HasTinnitus: false,
        HasHearingLoss: false
      },

      rules: {},
    };
  },
  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
    },

    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },
    handleSubmit() {
      console.log("触发");
      this.$refs.form.validate((valid) => {
        console.log("Form is valid:", valid);
        if (valid) {
          console.log("Form data:", this.form);
          this.visible = false;
          ElMessage({
            message: "提交成功",
            type: "success",
          });
          this.handleReset();
        } else {
          console.log("表单验证失败");
          ElMessage({
            message: "提交失败",
            type: "error",
          });
          return false;
        }
      });
    },

    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    getInitialForm() {
      return {
         HasDelirium: false,
        HasConvulsion: false,
        HasDrowsiness: false,
        HasComa: false,
        HasStiffNeck: false,
        HasRestlessness: false,
        HasMuscleParalysisNeckShoulder: false,
        HasMuscleParalysisLimbs: false,
        HasSwallowingDifficulty: false,
        HasSpeechDisorder: false,
        HasConsciousnessDisorder: false,
        HasDizziness: false,
        HasTinnitus: false,
        HasHearingLoss: false
      };
    },

    getData() {
      return this.form; // 返回当前组件的表单数据
    },
  },
};
</script>



<style scoped>
.custom-drawer {
  height: 100%;
}
.form-container {
  margin-top: 10px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 700px;
  background: #ffffff;
  padding-bottom: 25px;
  z-index: 100;
  border: 3px solid #fafafa;
}
.custom-input {
  margin-bottom: 10px;
}
.el-dropdown-link:focus {
  outline: none;
}

.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: #285ac8 !important;
  color: #fff !important;
  font-weight: normal;
}
.GeneralSymptoms {
  margin-top: 20px;
  margin-left: 20px;
}
.Condition {
  margin-top: 20px;
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
</style>
