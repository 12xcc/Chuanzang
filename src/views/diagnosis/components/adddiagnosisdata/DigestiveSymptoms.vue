<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="140px"
      class="form-container"
      ref="form"
      :rules="rules"
      :disabled="allDisabled"
       
      label-position="left"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">腹泻情况</span>
          </div>
          <el-radio-group v-model="form.arrheaFrequencyGEThreeTimesPerDay">
            <el-radio :value="1">腹泻 <3次/天</el-radio>
            <el-radio :value="2">腹泻 ≥3 次/天</el-radio>
          </el-radio-group>

          <div class="NextContainer">
            <div
              v-if="form.arrheaFrequencyGEThreeTimesPerDay"
              style="padding: 15px 0 15px 0"
            >
              <el-form-item label="腹泻次数" style="">
                <el-input-number
                  v-model="form.DiarrheaTimesPerDay"
                  :min="0"
                  placeholder="腹泻次数"
                />
                &nbsp;&nbsp;&nbsp;次/天
              </el-form-item>

              <el-form-item label="粪便性状" style="">
                <el-radio-group
                  v-model="form.HasStoolType1"
                  type="primary"
                  :disabled="allDisabled"
                   
                >
                  <el-radio value="水样">水样</el-radio>
                  <el-radio value="米泔样">米泔样</el-radio>
                  <el-radio value="洗肉水样">洗肉水样</el-radio>
                  <el-radio value="大块黏膜">大块黏膜</el-radio>
                  <el-radio value="脓血">脓血</el-radio>
                  <el-radio value="黑便">黑便</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="腹泻方式" style="margin-top: 20px">
                <el-radio-group v-model="form.DiarrheaMode">
                  <el-radio value="里急后重">里急后重</el-radio>
                  <el-radio value="通畅">通畅</el-radio>
                  <el-radio value="失禁">失禁</el-radio>
                  <el-radio value="绞痛">绞痛</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="粪便量" style="margin-top: 20px">
                <el-radio-group v-model="form.StoolAmount">
                  <el-radio value="多">多</el-radio>
                  <el-radio value="少">少</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="粪便气味" style="margin-top: 20px">
                <el-radio-group v-model="form.StoolOdor">
                  <el-radio value="恶臭">恶臭</el-radio>
                  <el-radio value="无恶臭">无恶臭</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>

          <div class="Condition">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">呕吐情况</span>
            </div>
            <el-check-tag
              :checked="form.HasVomiting"
              @change="toggleTag('HasVomiting')"
              type="primary"
              :disabled="allDisabled"
               
            >
              呕吐
            </el-check-tag>

            <div
              class="NextContainer"
              v-if="form.HasVomiting"
              style="padding: 15px 0 15px 0"
            >
              <el-radio-group
                v-model="form.VomitingMode"
                style="margin-left: 20px"
              >
                <el-radio value="喷射状">喷射状</el-radio>
                <el-radio value="先泻后吐">先泻后吐</el-radio>
                <el-radio value="先吐后泻">先吐后泻</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">其他症状</span>
          </div>
          <el-check-tag
            :checked="form.HasNausea"
            @change="toggleTag('HasNausea')"
            type="primary"
            :disabled="allDisabled"
             
          >
            恶心
          </el-check-tag>
          <el-check-tag
            :checked="form.HasAppetiteLoss"
            @change="toggleTag('HasAppetiteLoss')"
            type="primary"
            :disabled="allDisabled"
             
          >
            食欲减退
          </el-check-tag>
          <el-check-tag
            :checked="form.HasAbdominalDistension"
            @change="toggleTag('HasAbdominalDistension')"
            type="primary"
            :disabled="allDisabled"
             
          >
            腹胀
          </el-check-tag>
          <el-check-tag
            :checked="form.HasAbdominalPain"
            @change="toggleTag('HasAbdominalPain')"
            type="primary"
            :disabled="allDisabled"
             
          >
            腹痛
          </el-check-tag>
          <el-check-tag
            :checked="form.HasBorborygmus"
            @change="toggleTag('HasBorborygmus')"
            type="primary"
            :disabled="allDisabled"
             
          >
            腹鸣
          </el-check-tag>
          <el-check-tag
            :checked="form.HasUpperAbdominalDiscomfort"
            @change="toggleTag('HasUpperAbdominalDiscomfort')"
            type="primary"
            :disabled="allDisabled"
             
          >
            上腹部不适
          </el-check-tag>
          <el-check-tag
            :checked="form.HasConstipation"
            @change="toggleTag('HasConstipation')"
            type="primary"
            :disabled="allDisabled"
             
          >
            便秘
          </el-check-tag>
          <el-check-tag
            :checked="form.HasOliguriaOrAnuria"
            @change="toggleTag('HasOliguriaOrAnuria')"
            type="primary"
            :disabled="allDisabled"
             
          >
            少尿或无尿
          </el-check-tag>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      allDisabled: false,
       
      form: {
        arrheaFrequencyGEThreeTimesPerDay: "",
        DiarrheaTimesPerDay: "",
        HasStoolType1: false,
        StoolType1Detail: "",
        HasStoolType2: false,
        StoolType2Detail: "",
        DiarrheaMode: "",
        StoolAmount: "",
        StoolOdor: "",
        HasVomiting: false,
        VomitingMode: "",
        HasNausea: false,
        HasAppetiteLoss: false,
        HasAbdominalDistension: false,
        HasAbdominalPain: false,
        HasBorborygmus: false,
        HasUpperAbdominalDiscomfort: false,
        HasConstipation: false,
        HasOliguriaOrAnuria: false,
      },
      rules: {},
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
         arrheaFrequencyGEThreeTimesPerDay: "",
        DiarrheaTimesPerDay: "",
        HasStoolType1: false,
        StoolType1Detail: "",
        HasStoolType2: false,
        StoolType2Detail: "",
        DiarrheaMode: "",
        StoolAmount: "",
        StoolOdor: "",
        HasVomiting: false,
        VomitingMode: "",
        HasNausea: false,
        HasAppetiteLoss: false,
        HasAbdominalDistension: false,
        HasAbdominalPain: false,
        HasBorborygmus: false,
        HasUpperAbdominalDiscomfort: false,
        HasConstipation: false,
        HasOliguriaOrAnuria: false,
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
/* 单选框选中状态 */
.NextContainer :deep(.el-radio.is-checked .el-radio__inner) {
  background-color: #285ac8 !important; /* 选中背景色，默认蓝色 */
  border-color: #285ac8 !important; /* 选中边框色 */
}

/* 确保选中状态的圆点颜色 */
.NextContainer :deep(.el-radio.is-checked .el-radio__inner::before) {
  background-color: #fff !important; /* 选中状态的圆点颜色 */
}
</style>
