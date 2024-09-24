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
            :checked="form.HasArrhythmia"
            type="primary"
            @change="toggleTag('HasArrhythmia')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            心律不齐
          </el-check-tag>
          <el-check-tag
            :checked="form.HasChestPain"
            type="primary"
            @change="toggleTag('HasChestPain')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            胸痛
          </el-check-tag>
          <el-check-tag
            :checked="form.HasRapidPulse"
            type="primary"
            @change="toggleTag('HasRapidPulse')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            脉搏细速
          </el-check-tag>
          <el-check-tag
            :checked="form.HasPalpitation"
            type="primary"
            @change="toggleTag('HasPalpitation')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            心悸
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
        HasArrhythmia: false,
        HasChestPain: false,
        HasRapidPulse: false,
        HasPalpitation: false,
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
    handleAble() {
      this.allDisabled = false;
      this.allReadonly = false;
    },
    handleCancel(){
      this.allDisabled = true;
      this.allReadonly = true;
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
        HasArrhythmia: false,
        HasChestPain: false,
        HasRapidPulse: false,
        HasPalpitation: false,
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
