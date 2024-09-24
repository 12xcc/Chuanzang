<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="160px"
      class="form-container"
      ref="form"
      :rules="rules"
      label-position="left"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      <div class="Symptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">基本信息</span>
          </div>

          <el-form-item label="身高(cm)">
            <el-input
              v-model.number="form.Height"
              placeholder="请输入身高"
              clearable
            />
          </el-form-item>

          <el-form-item label="体重(kg)">
            <el-input
              v-model.number="form.Weight"
              placeholder="请输入体重"
              clearable
            />
          </el-form-item>

          <el-form-item label="血压(mmHg)">
            <el-input
              v-model="form.BloodPressure"
              placeholder="请输入血压 "
              clearable
            />
          </el-form-item>
        </div>
      </div>

      <div class="Symptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">血糖</span>
          </div>

          <el-form-item label="空腹血糖(mmol/L)">
            <el-input
              v-model.number="form.BloodSugarFasting"
              placeholder="请输入空腹血糖 "
              clearable
            />
          </el-form-item>
          <el-form-item label="随机血糖(mmol/L)">
            <el-input
              v-model.number="form.BloodSugarRandom"
              placeholder="请输入随机血糖 "
              clearable
            />
          </el-form-item>
        </div>
      </div>

      <div class="Symptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">血脂</span>
          </div>

          <el-form-item label="总胆固醇(mmol/L)">
            <el-input
              v-model.number="form.CholesterolTotal"
              placeholder="请输入总胆固醇 "
              clearable
            />
          </el-form-item>
          <el-form-item label="甘油三酯(mmol/L)">
            <el-input
              v-model.number="form.Triglycerides"
              placeholder="请输入甘油三酯 "
              clearable
            />
          </el-form-item>
          <el-form-item label="胆固醇脂(mmol/L)">
            <el-input
              v-model.number="form.CholesterolLipid"
              placeholder="请输入胆固醇脂 "
              clearable
            />
          </el-form-item>
          <el-form-item label="高密度脂蛋白(mmol/L)">
            <el-input
              v-model.number="form.HDL"
              placeholder="请输入高密度脂蛋白 "
              clearable
            />
          </el-form-item>
          <el-form-item label="低密度脂蛋白(mmol/L)">
            <el-input
              v-model.number="form.LDL"
              placeholder="请输入低密度脂蛋白"
              clearable
            />
          </el-form-item>
        </div>
      </div>

      <div class="Symptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">血氧饱和度</span>
          </div>

          <el-form-item label="血氧饱和度(%)">
            <el-input
              v-model.number="form.BloodOxygen"
              placeholder="请输入血氧饱和度"
              clearable
            />
          </el-form-item>
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
         Height: null,
        Weight: null,
        BloodPressure: '',
        BloodSugarFasting: null,
        BloodSugarRandom: null,
        CholesterolTotal: null,
        Triglycerides: null,
        CholesterolLipid: null,
        HDL: null,
        LDL: null,
        BloodOxygen: null,
      },

      rules: {},
    };
  },
  methods: {
    getInitialForm() {
      return {
          Height: null,
        Weight: null,
        BloodPressure: '',
        BloodSugarFasting: null,
        BloodSugarRandom: null,
        CholesterolTotal: null,
        Triglycerides: null,
        CholesterolLipid: null,
        HDL: null,
        LDL: null,
        BloodOxygen: null,
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
.Symptoms {
  margin-top: 20px;
  margin-left: 20px;
}
.Condition {
  margin-top: 20px;
}
.el-form-item{
  margin-left: 20px;
}
.el-input {
  width: 220px;
}
</style>
