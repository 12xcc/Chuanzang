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
        <h3>添加诊断信息</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
        disabled
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
              <!-- <el-radio-group v-model="form.gender">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
              </el-radio-group> -->
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
              <!-- <el-radio-group v-model="form.ethnicity">
                <el-radio value="汉族">汉族</el-radio>
                <el-radio value="藏族">藏族</el-radio>
                <el-radio value="彝族">彝族</el-radio>
                <el-radio value="其他少数民族">其他少数民族</el-radio>
              </el-radio-group> -->
            </el-form-item>

            <!-- 部门/工种 -->
            <el-form-item label="部门/工种" prop="department">
              <el-input
                v-model="form.department"
                style="width: 200px"
                placeholder=""
                clearable
              ></el-input>
              <!-- <el-radio-group v-model="form.department">
                <el-radio value="安全部">安全部</el-radio>
                <el-radio value="财务部">财务部</el-radio>
                <el-radio value="测量队">测量队</el-radio>
                <el-radio value="工程技术部">工程技术部</el-radio>
                <el-radio value="合约部">合约部</el-radio>
                <el-radio value="试验室">试验室</el-radio>
                <el-radio value="物资设备部">物资设备部</el-radio>
                <el-radio value="项目管理层">项目管理层</el-radio>
                <el-radio value="征拆协调部">征拆协调部</el-radio>
                <el-radio value="综合管理部">综合管理部</el-radio>
              </el-radio-group> -->
            </el-form-item>
          </div>
        </div>

        <!------------------------------------ 症状标签 ------------------------------->
        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">点击标签添加症状</span>
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
            :checked="selectedTag === 'DiagnosisComplications'"
            type="primary"
            @change="selectTag('DiagnosisComplications')"
          >
            并发症
          </el-check-tag>

          <el-check-tag
            :checked="selectedTag === 'Diagnosistag'"
            type="primary"
            @change="selectTag('Diagnosistag')"
          >
            上传检测报告
          </el-check-tag>
        </div>

        <!-- 根据选择的标签显示不同内容 -->
        <div>
          <div v-show="selectedTag === 'DiagnosisResults'">
            <p>诊断信息</p>
            <DiagnosisResults ref="DiagnosisResults" />
          </div>

          <div v-show="selectedTag === 'DiagnosisPersonalInfo'">
            <p>基本情况</p>
            <DiagnosisPersonalInfo ref="DiagnosisPersonalInfo" />
          </div>

          <div v-show="selectedTag === 'GeneralSymptoms'">
            <p>全身症状</p>
            <GeneralSymptoms ref="GeneralSymptoms" />
          </div>

          <div v-show="selectedTag === 'RespiratorySymptoms'">
            <p>呼吸系统症状</p>
            <RespiratorySymptoms ref="RespiratorySymptoms" />
          </div>

          <div v-show="selectedTag === 'DigestiveSymptoms'">
            <p>查看消化系统症状</p>
            <DigestiveSymptoms ref="DigestiveSymptoms" />
          </div>

          <div v-show="selectedTag === 'CirculatorySymptoms'">
            <p>循环系统症状</p>
            <CirculatorySymptoms ref="CirculatorySymptoms" />
          </div>

          <div v-show="selectedTag === 'NeurologicalSymptoms'">
            <p>神经系统症状</p>
            <NeurologicalSymptoms ref="NeurologicalSymptoms" />
          </div>

          <div v-show="selectedTag === 'LocalSymptoms'">
            <p>局部症状</p>
            <DiagnosisLocalSymptoms ref="DiagnosisLocalSymptoms" />
          </div>

          <div v-show="selectedTag === 'OtherSymptoms'">
            <p>其他症状</p>
            <OtherSymptoms ref="OtherSymptoms" />
          </div>

          <div v-show="selectedTag === 'DiagnosisComplications'">
            <p>并发症</p>
            <DiagnosisComplications ref="DiagnosisComplications" />
          </div>
          <div v-show="selectedTag === 'Diagnosistag'">
            <p>上传检测报告</p>
            <Diagnosistag ref="Diagnosistag" />
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
import DiagnosisComplications from "./DiagnosisComplications.vue";
import DiagnosisPersonalInfo from "./DiagnosisPersonalInfo.vue";
import Diagnosistag from "./Diagnosistag.vue";
import DigestiveSymptoms from '../adddiagnosisdata/DigestiveSymptoms.vue';
export default {
  components: {
    Dateselection,
    DiagnosisResults,
    DiagnosisPersonalInfo,
    GeneralSymptoms,
    RespiratorySymptoms,
    CirculatorySymptoms,
    NeurologicalSymptoms,
    DiagnosisLocalSymptoms,
    OtherSymptoms,
    DiagnosisComplications,
    Diagnosistag,
    DigestiveSymptoms,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      selectedTag: null, // 当前选中的标签
      form: {},
      rules: {},
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
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },

    async handleSubmit() {
      console.log("触发");

      try {
        // 调用子组件的 validate 方法
        // 诊断信息
        await this.$refs.DiagnosisResults.validate();
        // 基本信息
        // 全身症状
        await this.$refs.GeneralSymptoms.validate();

        // 其他
        await this.$refs.OtherSymptoms.validate();
        // 并发症
        await this.$refs.DiagnosisComplications.validate();

        // 如果子组件验证通过，继续处理其他数据
        const DiagnosisResultsData = this.$refs.DiagnosisResults.getData();
        const GeneralSymptomsData = this.$refs.GeneralSymptoms.getData();
        const DiagnosisPersonalInfoData =
          this.$refs.DiagnosisPersonalInfo.getData();
        const RespiratorySymptomsData =
          this.$refs.RespiratorySymptoms.getData();
        const NeurologicalSymptomsData =
          this.$refs.NeurologicalSymptoms.getData();
        const CirculatorySymptomsData =
          this.$refs.CirculatorySymptoms.getData();
        const DiagnosisLocalSymptomsData =
          this.$refs.DiagnosisLocalSymptoms.getData();
        const OtherSymptomsData = this.$refs.OtherSymptoms.getData();
        const DiagnosisComplicationsData =
          this.$refs.DiagnosisComplications.getData();
        const DiagnosistagData = this.$refs.Diagnosistag.getData();
        const DigestiveSymptomsData = this.$refs.DigestiveSymptoms.getData();
        console.log("诊断信息:", DiagnosisResultsData);
        console.log("基本信息：", DiagnosisPersonalInfoData);
        console.log("全身症状:", GeneralSymptomsData);
        console.log("呼吸系统症状:", RespiratorySymptomsData);
        console.log("循环系统症状:", CirculatorySymptomsData);
        console.log("神经系统症状:", NeurologicalSymptomsData);
        console.log("局部症状:", DiagnosisLocalSymptomsData);
        console.log("其他:", OtherSymptomsData);
        console.log("并发症:", DiagnosisComplicationsData);
        console.log("检测报告:", DiagnosistagData);
        console.log("消化系统症状:", DigestiveSymptomsData);
  

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
      this.$refs.DiagnosisResults.handleReset();
      this.$refs.GeneralSymptoms.handleReset();
      this.$refs.RespiratorySymptoms.handleReset();
      this.$refs.NeurologicalSymptoms.handleReset();
      this.$refs.CirculatorySymptoms.handleReset();
      this.$refs.DiagnosisLocalSymptoms.handleReset();
      this.$refs.OtherSymptoms.handleReset();
      this.$refs.DiagnosisComplications.handleReset();
      this.$refs.DiagnosisPersonalInfo.handleReset();
      this.$refs.Diagnosistag.handleReset();
      this.$refs.DigestiveSymptoms.handleReset();
      
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
