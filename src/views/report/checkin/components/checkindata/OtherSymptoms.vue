<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="200px"
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
            :checked="form.HasSuddenOnset"
            type="primary"
            @change="toggleTag('HasSuddenOnset')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            突然发病
          </el-check-tag>

          <el-check-tag
            :checked="form.HasRapidProgress"
            type="primary"
            @change="toggleTag('HasRapidProgress')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            病情进展迅速
          </el-check-tag>

          <el-check-tag
            :checked="form.HasPeriodicAttack"
            type="primary"
            @change="toggleTag('HasPeriodicAttack')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            周期性发作
          </el-check-tag>

          <el-check-tag
            :checked="form.HasForcedPosture"
            type="primary"
            @change="toggleTag('HasForcedPosture')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            强迫体位
          </el-check-tag>

          <el-check-tag
            :checked="form.HasCalfMusclePain"
            type="primary"
            @change="toggleTag('HasCalfMusclePain')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            腓肠肌疼痛
          </el-check-tag>
        </div>

        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">生活情况</span>
          </div>
          <el-form-item label="睡眠状况" label-position="left">
            <el-radio-group v-model="form.SleepQuality">
              <el-radio :value="'好'">好</el-radio>
              <el-radio :value="'一般'">一般</el-radio>
              <el-radio :value="'差'">差</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="营养状况" label-position="left">
            <el-radio-group v-model="form.NutritionStatus">
              <el-radio :value="'好'">好</el-radio>
              <el-radio :value="'一般'">一般</el-radio>
              <el-radio :value="'差'">差</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="工作和生活压力" label-position="left">
            <el-radio-group v-model="form.WorkLifeStress">
              <el-radio :value="'大'">大</el-radio>
              <el-radio :value="'一般'">一般</el-radio>
              <el-radio :value="'小'">小</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="自我感觉症状的严重程度" label-position="left">
            <el-radio-group v-model="form.SymptomSeverity">
              <el-radio :value="'轻'">轻</el-radio>
              <el-radio :value="'中'">中</el-radio>
              <el-radio :value="'重'">重</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">其他症状</span>
          </div>
          <el-check-tag
            :checked="form.HasOtherSymptoms"
            type="primary"
            @change="toggleTag('HasOtherSymptoms')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            其他
          </el-check-tag>
          <div class="NextContainer">
            <el-form-item
              v-if="form.HasOtherSymptoms"
              label="其他症状"
              style="
                margin-left: -100px;
                margin-top: 10px;
                padding: 15px 0 15px 0;
              "
            >
              <el-input
                v-model="form.OtherSymptomsName"
                placeholder="请输入其他症状"
                clearable
                size="default"
                style="margin-left: 100px; width: 250px"
              />
            </el-form-item>
          </div>
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
        HasSuddenOnset: false,
        HasRapidProgress: false,
        HasPeriodicAttack: false,
        HasForcedPosture: false,
        HasCalfMusclePain: false,
        SleepQuality: "",
        NutritionStatus: "",
        WorkLifeStress: "",
        SymptomSeverity: "",
        HasOtherSymptoms: false,
        OtherSymptomsName: "",
      },

      rules: {},
    };
  },
  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
      if (!this.form.HasOtherSymptoms) {
        this.form.OtherSymptomsName = "";
      }
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
        HasSuddenOnset: false,
        HasRapidProgress: false,
        HasPeriodicAttack: false,
        HasForcedPosture: false,
        HasCalfMusclePain: false,
        SleepQuality: "",
        NutritionStatus: "",
        WorkLifeStress: "",
        SymptomSeverity: "",
        HasOtherSymptoms: false,
        OtherSymptomsName: "",
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
.el-form-item {
  display: flex;
  margin-left: 20px;
  /* flex-direction: column; */
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
.NextContainer {
  width: 500px;
}
</style>
