<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="800px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>查看/编辑诊断信息详情</h3>
        <div class="footer">
          <!-- <el-button v-if="isEditing" @click="handleQuit">取消</el-button> -->
          <el-button v-if="!isEditing" @click="handleEdit">编辑</el-button>
          <el-button v-if="isEditing" type="primary" @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
        :disabled="allDisabled"
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">个人基本信息</span>
          </div>
          <div class="BaseInfoDetail">
            <!------------------------------- 姓名 --------------------------------------->
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                style="width: 200px"
                placeholder="请输入姓名"
                @blur="$refs.form.validateField('name')"
                clearable
              ></el-input>
            </el-form-item>

            <!------------------------------- 性别 ----------------------------------------->
            <el-form-item label="性别" prop="gender">
              <el-input
                v-model="form.gender"
                style="width: 200px"
                placeholder=""
                clearable
              ></el-input>
            </el-form-item>

            <!-- 年龄 -->
            <el-form-item label="年龄" prop="age">
              <el-input
                v-model="form.age"
                style="width: 200px"
                placeholder="根据身份证号生成"
                clearable
              ></el-input>
            </el-form-item>

            <!-- 民族 -->
            <el-form-item label="民族" prop="ethnicity">
              <el-input
                v-model="form.ethnicity"
                style="width: 200px"
                placeholder=""
                clearable
              ></el-input>
            </el-form-item>

            <!-- 部门/工种 -->
            <el-form-item label="部门/工种" prop="department">
              <el-input
                v-model="form.department"
                style="width: 200px"
                placeholder=""
                clearable
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <!------------------------------------ 症状标签 ------------------------------->
        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">点击标签查看症状</span>
          </div>
          <el-check-tag
            :checked="selectedTag === 'DiagnosisResults'"
            type="primary"
            @change="selectTag('DiagnosisResults')"
          >
            诊断信息
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'DiagnosisPersonalInfo'"
            type="primary"
            @change="selectTag('DiagnosisPersonalInfo')"
          >
            基本信息
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'GeneralSymptoms'"
            type="primary"
            @change="selectTag('GeneralSymptoms')"
          >
            全身症状
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'RespiratorySymptoms'"
            type="primary"
            @change="selectTag('RespiratorySymptoms')"
          >
            呼吸系统症状
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'DigestiveSymptoms'"
            type="primary"
            @change="selectTag('DigestiveSymptoms')"
          >
            消化系统症状
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'CirculatorySymptoms'"
            type="primary"
            @change="selectTag('CirculatorySymptoms')"
          >
            循环系统症状
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'NeurologicalSymptoms'"
            type="primary"
            @change="selectTag('NeurologicalSymptoms')"
          >
            神经系统症状
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'LocalSymptoms'"
            type="primary"
            @change="selectTag('LocalSymptoms')"
          >
            局部症状
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'OtherSymptoms'"
            type="primary"
            @change="selectTag('OtherSymptoms')"
          >
            其他
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'RiskFactorsAndExposure'"
            type="primary"
            @change="selectTag('RiskFactorsAndExposure')"
          >
            并发症
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'DiagnosisExaminations'"
            type="primary"
            @change="selectTag('DiagnosisExaminations')"
          >
            检测报告
          </el-check-tag>
        </div>


        <!-- 根据选择的标签显示不同内容 -->
        <div>
          <div v-show="selectedTag === 'DiagnosisResults'">
            <p>查看诊断信息</p>
            <DiagnosisResults ref="DiagnosisResults" />
          </div>

          <div v-show="selectedTag === 'DiagnosisPersonalInfo'">
            <p>基本情况</p>
            <DiagnosisPersonalInfo ref="DiagnosisPersonalInfo" />
          </div>

          <div v-show="selectedTag === 'GeneralSymptoms'">
            <p>查看全身症状</p>
            <GeneralSymptoms ref="GeneralSymptoms" />
          </div>

          <div v-show="selectedTag === 'RespiratorySymptoms'">
            <p>查看呼吸系统症状</p>
            <RespiratorySymptoms ref="RespiratorySymptoms" />
          </div>

          <div v-show="selectedTag === 'DigestiveSymptoms'">
            <p>查看消化系统症状</p>
            <DigestiveSymptoms ref="DigestiveSymptoms" />
          </div>

          <div v-show="selectedTag === 'CirculatorySymptoms'">
            <p>查看循环系统症状</p>
            <CirculatorySymptoms ref="CirculatorySymptoms" />
          </div>

          <div v-show="selectedTag === 'NeurologicalSymptoms'">
            <p>查看神经系统症状</p>
            <NeurologicalSymptoms ref="NeurologicalSymptoms" />
          </div>

          <div v-show="selectedTag === 'LocalSymptoms'">
            <p>查看局部症状</p>
            <DiagnosisLocalSymptoms ref="DiagnosisLocalSymptoms" />
          </div>

          <div v-show="selectedTag === 'OtherSymptoms'">
            <p>查看其他症状</p>
            <OtherSymptoms ref="OtherSymptoms" />
          </div>

          <div v-show="selectedTag === 'RiskFactorsAndExposure'">
            <p>查看并发症</p>
            <RiskFactorsAndExposure ref="RiskFactorsAndExposure" />
          </div>
          <div v-show="selectedTag === 'DiagnosisExaminations'">
            <p>检测报告</p>
            <DiagnosisExaminations ref="DiagnosisExaminations" />
          </div>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date_selection.vue";
import DiagnosisResults from "./DiagnosisResults.vue";
import GeneralSymptoms from "./GeneralSymptoms.vue";
import RespiratorySymptoms from "./RespiratorySymptoms.vue";
import CirculatorySymptoms from "./CirculatorySymptoms.vue";
import NeurologicalSymptoms from "./NeurologicalSymptoms.vue";
import DiagnosisLocalSymptoms from "./DiagnosisLocalSymptoms.vue";
import OtherSymptoms from "./OtherSymptoms.vue";
import RiskFactorsAndExposure from "./RiskFactorsAndExposure.vue";
import DiagnosisPersonalInfo from "./DiagnosisPersonalInfo.vue";
import DiagnosisExaminations from "../adddiagnosisdata/DiagnosisExaminations .vue";
import DigestiveSymptoms from '../checkdaignosisdata/DigestiveSymptoms.vue';
export default {
  components: {
    Dateselection,
    DiagnosisResults,
    GeneralSymptoms,
    RespiratorySymptoms,
    CirculatorySymptoms,
    NeurologicalSymptoms,
    DiagnosisLocalSymptoms,
    OtherSymptoms,
    RiskFactorsAndExposure,
    DiagnosisPersonalInfo,
    DiagnosisExaminations,
    DigestiveSymptoms,
  },
  data() {
    return {
      allDisabled: true,
      visible: false, // 控制弹窗显示
      selectedTag: null, // 当前选中的标签
      form: {},
      rules: {},
      isEditing: false,
      refs: [
        "GeneralSymptoms", 
        "DiagnosisResults", 
        "RespiratorySymptoms", 
        "CirculatorySymptoms", 
        "NeurologicalSymptoms", 
        "DiagnosisLocalSymptoms", 
        "OtherSymptoms", 
        "DiagnosisPersonalInfo", 
        "RiskFactorsAndExposure", 
      ],
    };
  },

  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
    },
    selectTag(tag) {
      this.selectedTag = tag;
    },
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    
    handleQuit() {
      this.allDisabled = true;
      this.isEditing = false; // 退出编辑模式
      // this.$refs.GeneralSymptoms.handleCancel()
      this.refs.forEach((ref) => {
        this.$refs[ref].handleCancel();
      });
    },

    handleCancel(){
      this.allDisabled = true;
      this.isEditing = false; // 退出编辑模式
      // this.$refs.GeneralSymptoms.handleCancel()
      this.refs.forEach((ref) => {
        this.$refs[ref].handleCancel();
      });
      this.visible = false;
      this.handleReset();
    },
    handleEdit() {
      this.allDisabled = false;
      this.isEditing = true; // 进入编辑模式
      this.refs.forEach((ref) => {
       this.$refs[ref].handleAble();
      });
    },

    async handleSubmit() {
      console.log("触发");

      try {
        // 调用子组件的 validate 方法
        await this.$refs.GeneralSymptoms.validate();
        await this.$refs.OtherSymptoms.validate();

        // 如果子组件验证通过，继续处理其他数据
        const DiagnosisResultsData = this.$refs.DiagnosisResults.getData();
        const GeneralSymptomsData = this.$refs.GeneralSymptoms.getData();
        const RespiratorySymptomsData =
          this.$refs.RespiratorySymptoms.getData();
        const NeurologicalSymptomsData =
          this.$refs.NeurologicalSymptoms.getData();
        const CirculatorySymptomsData =
          this.$refs.CirculatorySymptoms.getData();
        const DiagnosisLocalSymptomsData =
          this.$refs.DiagnosisLocalSymptoms.getData();
        const OtherSymptomsData = this.$refs.OtherSymptoms.getData();
        const RiskFactorsAndExposureData =
          this.$refs.RiskFactorsAndExposure.getData();

        console.log("诊断信息:", DiagnosisResultsData);
        console.log("全身症状:", GeneralSymptomsData);
        console.log("呼吸系统症状:", RespiratorySymptomsData);
        console.log("循环系统症状:", CirculatorySymptomsData);
        console.log("神经系统症状:", NeurologicalSymptomsData);
        console.log("局部症状:", DiagnosisLocalSymptomsData);
        console.log("其他:", OtherSymptomsData);
        console.log("危险因素与暴露史:", RiskFactorsAndExposureData);

        this.visible = false;
        ElMessage({
          message: "提交成功",
          type: "success",
        });
        this.handleReset();
      } catch (error) {
        // 处理验证错误
        console.error("验证失败:", error.message);
        ElMessage({
          message: error.message,
          type: "error",
        });
      }
    },

    handleReset() {
      // this.form = this.getInitialForm();
      this.message = "";
      this.selectedTag = null;
      this.$refs.GeneralSymptoms.handleReset();
      this.$refs.RespiratorySymptoms.handleReset();
      this.$refs.NeurologicalSymptoms.handleReset();
      this.$refs.CirculatorySymptoms.handleReset();
      this.$refs.DiagnosisLocalSymptoms.handleReset();
      this.$refs.OtherSymptoms.handleReset();
      this.$refs.RiskFactorsAndExposure.handleReset();
    },
    getInitialForm() {
      return {};
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
  width: 800px;
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
}
</style>
