<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="850px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>设置疾病权重</h3>
        <div class="footer">
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
        label-position="left"
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">疾病名称</span>
          </div>
          <el-form-item label="疾病名称" prop="DiseaseTypeName">
            <el-input
              v-model="form.DiseaseTypeName"
              style="width: 200px"
              clearable
              :disabled="allDisabled"
              :readonly="allReadonly"
            ></el-input>
          </el-form-item>
        </div>

        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">当前权重总分(必须等于100)</span>
          </div>
          <el-form-item label="当前权重总分" prop="WeightScore">
            <el-input
              v-model.number="form.WeightScore"
              style="width: 200px"
              clearable
              :disabled="allDisabled"
              :readonly="allReadonly"
            ></el-input>
          </el-form-item>
        </div>

        <div class="select flex gap-2 mb-4">
          <el-check-tag
            v-for="tag in tags"
            :key="tag"
            :checked="selectedTag === tag"
            type="primary"
            @change="selectTag(tag)"
          >
            {{ tag }}
          </el-check-tag>
        </div>

        <div>
          <div v-show="selectedTag === '全身症状'">
            <GeneralSymptomsScore
              ref="GeneralSymptomsScore"
              @update-weight-score="updateWeightScore"
            />
          </div>
          <div v-show="selectedTag === '呼吸系统症状'">
            <RespiratorySymptomsScore
              ref="RespiratorySymptomsScore"
              @update-weight-score="updateWeightScore"
            />
          </div>
          <div v-show="selectedTag === '消化系统症状'">
            <DigestiveSymptomsScore
              ref="DigestiveSymptomsScore"
              @update-weight-score="updateWeightScore"
            />
          </div>
          <div v-show="selectedTag === '循环系统症状'">
            <CirculatorySymptomsScore
              ref="CirculatorySymptomsScore"
              @update-weight-score="updateWeightScore"
            />
          </div>
          <div v-show="selectedTag === '神经系统症状'">
            <NeurologicalSymptomsScore
              ref="NeurologicalSymptomsScore"
              @update-weight-score="updateWeightScore"
            />
          </div>
          <div v-show="selectedTag === '局部症状'">
            <LocalSymptomsScore
              ref="LocalSymptomsScore"
              @update-weight-score="updateWeightScore"
            />
          </div>
          <div v-show="selectedTag === '其他症状'">
            <OtherSymptomsScore
              ref="OtherSymptomsScore"
              @update-weight-score="updateWeightScore"
            />
          </div>
          <div v-show="selectedTag === '危险因素与暴露史'">
            <RiskFactorsAndExposureScore
              ref="RiskFactorsAndExposureScore"
              @update-weight-score="updateWeightScore"
            />
          </div>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import GeneralSymptomsScore from "./GeneralSymptomsScore.vue";
import RespiratorySymptomsScore from "./RespiratorySymptomsScore.vue";
import DigestiveSymptomsScore from "./DigestiveSymptomsScore.vue";
import CirculatorySymptomsScore from "./CirculatorySymptomsScore.vue";
import NeurologicalSymptomsScore from "./NeurologicalSymptomsScore.vue";
import LocalSymptomsScore from "./LocalSymptomsScore.vue";
import OtherSymptomsScore from "./OtherSymptomsScore.vue";
import RiskFactorsAndExposureScore from "./RiskFactorsAndExposureScore.vue";
export default {
  components: {
    GeneralSymptomsScore,
    RespiratorySymptomsScore,
    DigestiveSymptomsScore,
    CirculatorySymptomsScore,
    NeurologicalSymptomsScore,
    LocalSymptomsScore,
    OtherSymptomsScore,
    RiskFactorsAndExposureScore,
  },
  data() {
    return {
      allDisabled: true,
      allReadonly: true,
      visible: false,
      selectedTag: "全身症状", // 默认选中的标签
      form: {
        WeightScore: 0,
        DiseaseTypeName: "",
      },
      rules: {},
      tags: [
        "全身症状",
        "呼吸系统症状",
        "消化系统症状",
        "循环系统症状",
        "神经系统症状",
        "局部症状",
        "其他症状",
        "危险因素与暴露史",
      ], // 所有可选标签
    };
  },

  methods: {
    selectTag(tag) {
      this.selectedTag = tag;
      this.updateWeightScore(); // 每次切换标签时更新分数
    },
    handleCancel() {
      this.visible = false;
    },
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    async handleSubmit() {
      this.visible = false;
      ElMessage({
        message: "提交成功",
        type: "success",
      });
    },
    updateWeightScore() {
      // 更新 WeightScore 为所有子组件的分数总和
    const components= [
        "GeneralSymptomsScore",
        "RespiratorySymptomsScore",
        "DigestiveSymptomsScore",
        "CirculatorySymptomsScore",
        "NeurologicalSymptomsScore",
        "LocalSymptomsScore",
        "OtherSymptomsScore",
        "RiskFactorsAndExposureScore",
      ]; // 需要累加的子组件

      this.form.WeightScore = components.reduce((total, component) => {
        const compRef = this.$refs[component];
        return total + (compRef ? compRef.totalWeightScore : 0);
      }, 0);

      console.log("Updated WeightScore:", this.form.WeightScore);
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
  margin-top: 70px;
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
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}

.el-check-tag.is-checked {
  background-color: #333333 !important;
  color: #ffffff;
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
</style>


