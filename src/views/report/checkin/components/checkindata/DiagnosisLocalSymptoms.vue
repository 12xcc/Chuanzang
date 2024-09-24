<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="80px"
      class="form-container"
      ref="form"
      :rules="rules"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">症状</span>
          </div>
          <el-check-tag
            :checked="form.HasConjunctivitis"
            type="primary"
            @change="toggleTag('HasConjunctivitis')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            结膜炎
          </el-check-tag>

          <el-check-tag
            :checked="form.HasConjunctivalCongestion"
            type="primary"
            @change="toggleTag('HasConjunctivalCongestion')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            眼结膜充血、肿胀疼痛
          </el-check-tag>

          <el-check-tag
            :checked="form.HasEyelidEdema"
            type="primary"
            @change="toggleTag('HasEyelidEdema')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            上下眼睑水肿
          </el-check-tag>

          <el-check-tag
            :checked="form.HasSmellTasteLoss"
            type="primary"
            @change="toggleTag('HasSmellTasteLoss')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            嗅觉味觉减退或丧失
          </el-check-tag>

          <el-check-tag
            :checked="form.HasFacialRednessOrPallor"
            type="primary"
            @change="toggleTag('HasFacialRednessOrPallor')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            颜面潮红或苍白
          </el-check-tag>

          <el-check-tag
            :checked="form.HasRednessNeckChest"
            type="primary"
            @change="toggleTag('HasRednessNeckChest')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            潮红（颈部、胸部）
          </el-check-tag>

          <el-check-tag
            :checked="form.HasLipCyanosis"
            type="primary"
            @change="toggleTag('HasLipCyanosis')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            口唇发绀
          </el-check-tag>

          <el-check-tag
            :checked="form.HasSkinPallorOrBruising"
            type="primary"
            @change="toggleTag('HasSkinPallorOrBruising')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            皮肤苍白或带青紫
          </el-check-tag>

          <el-check-tag
            :checked="form.HasGumBleeding"
            type="primary"
            @change="toggleTag('HasGumBleeding')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            牙龈出血
          </el-check-tag>

          <el-check-tag
            :checked="form.HasKidneyPain"
            type="primary"
            @change="toggleTag('HasKidneyPain')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            肾区疼痛
          </el-check-tag>

          <el-check-tag
            :checked="form.HasLowBackPain"
            type="primary"
            @change="toggleTag('HasLowBackPain')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            腰痛
          </el-check-tag>

          <el-check-tag
            :checked="form.HasOrbitalPain"
            type="primary"
            @change="toggleTag('HasOrbitalPain')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            眼眶痛
          </el-check-tag>

          <el-check-tag
            :checked="form.HasMucosalBleedingInOralOrNasal"
            type="primary"
            @change="toggleTag('HasMucosalBleedingInOralOrNasal')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            口腔、鼻腔等处黏膜有出血点
          </el-check-tag>

          <el-check-tag
            :checked="form.HasSkinBleedingPoints"
            type="primary"
            @change="toggleTag('HasSkinBleedingPoints')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            腋下/上臂/胸部或其它部位有皮肤出血点
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
        HasConjunctivitis: false,
        HasConjunctivalCongestion: false,
        HasEyelidEdema: false,
        HasSmellTasteLoss: false,
        HasFacialRednessOrPallor: false,
        HasRednessNeckChest: false,
        HasLipCyanosis: false,
        HasSkinPallorOrBruising: false,
        HasGumBleeding: false,
        HasKidneyPain: false,
        HasLowBackPain: false,
        HasOrbitalPain: false,
        HasMucosalBleedingInOralOrNasal: false,
        HasSkinBleedingPoints: false,
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
        HasConjunctivitis: false,
        HasConjunctivalCongestion: false,
        HasEyelidEdema: false,
        HasSmellTasteLoss: false,
        HasFacialRednessOrPallor: false,
        HasRednessNeckChest: false,
        HasLipCyanosis: false,
        HasSkinPallorOrBruising: false,
        HasGumBleeding: false,
        HasKidneyPain: false,
        HasLowBackPain: false,
        HasOrbitalPain: false,
        HasMucosalBleedingInOralOrNasal: false,
        HasSkinBleedingPoints: false,
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
.title-container {
  display: flex;
  margin-left: 0px;
  margin-bottom: 20px;
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
</style>
