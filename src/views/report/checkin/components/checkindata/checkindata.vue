<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="700px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>职工打卡信息详情</h3>
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
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">个人基本信息</span>
          </div>
          <div class="BaseInfoDetail">
            <!-- 姓名 -->
            <el-form-item label="姓名" prop="Name">
              <el-input
                v-model="form.Name"
                style="width: 200px"
                placeholder="请输入姓名"
                @blur="$refs.form.validateField('Name')"
              ></el-input>
            </el-form-item>

            <!-- 性别 -->
            <el-form-item label="性别" prop="Gender">
              <el-radio-group v-model="form.Gender">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 年龄 -->
            <el-form-item label="年龄" prop="Age">
              <el-input
                v-model="form.Age"
                style="width: 200px"
                placeholder="根据身份证号生成"
              ></el-input>
            </el-form-item>

            <!-- 民族 -->
            <el-form-item label="民族" prop="Ethnicity">
              <el-radio-group v-model="form.Ethnicity">
                <el-radio value="汉族">汉族</el-radio>
                <el-radio value="藏族">藏族</el-radio>
                <el-radio value="彝族">彝族</el-radio>
                <el-radio value="其他少数民族">其他少数民族</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 部门/工种 -->
            <el-form-item label="部门/工种" prop="Department">
              <el-radio-group v-model="form.Department">
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
              </el-radio-group>
            </el-form-item>

            <el-form-item label="打卡时间" prop="CheckInDate">
              <el-input
                v-model="form.CheckInDate"
                style="width: 200px"
                @blur="$refs.form.validateField('CheckInDate')"
                disabled
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">点击标签查看症状</span>
          </div>
          <el-check-tag
            :checked="selectedTag === 'GeneralSymptoms'"
            type="success"
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
            危险因素与暴露史
          </el-check-tag>
        </div>

        <!-- 根据选择的标签显示不同内容 -->
        <div>
          <div v-if="selectedTag === 'GeneralSymptoms'">
            <p>查看全身症状</p>
            <GeneralSymptoms ref="GeneralSymptoms" />
          </div>

          <div v-if="selectedTag === 'RespiratorySymptoms'">
            <p>查看呼吸系统症状</p>
            <RespiratorySymptoms ref="RespiratorySymptoms" />
          </div>

          <div v-if="selectedTag === 'DigestiveSymptoms'">
            <p>查看消化系统症状</p>
          </div>

          <div v-if="selectedTag === 'CirculatorySymptoms'">
            <p>查看循环系统症状</p>
            <CirculatorySymptoms ref="CirculatorySymptoms" />
          </div>

          <div v-if="selectedTag === 'NeurologicalSymptoms'">
            <p>查看神经系统症状</p>
            <NeurologicalSymptoms ref="NeurologicalSymptoms"/>
          </div>

          <div v-if="selectedTag === 'LocalSymptoms'">
            <p>查看局部症状</p>
            <DiagnosisLocalSymptoms ref="DiagnosisLocalSymptoms"/>
          </div>

          <div v-if="selectedTag === 'OtherSymptoms'">
            <p>查看其他症状</p>
            <OtherSymptoms ref="OtherSymptoms"/>
          </div>

          <div v-if="selectedTag === 'RiskFactorsAndExposure'">
            <p>查看危险因素与暴露史</p>
            <RiskFactorsAndExposure ref="RiskFactorsAndExposure"/>
          </div>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date_selection.vue";
import GeneralSymptoms from "./GeneralSymptoms.vue";
import RespiratorySymptoms from "./RespiratorySymptoms.vue";
import CirculatorySymptoms from "./CirculatorySymptoms.vue";
import NeurologicalSymptoms from './NeurologicalSymptoms.vue';
import DiagnosisLocalSymptoms from './DiagnosisLocalSymptoms.vue';
import OtherSymptoms from './OtherSymptoms.vue';
import RiskFactorsAndExposure from './RiskFactorsAndExposure.vue';
export default {
  components: {
    Dateselection,
    GeneralSymptoms,
    RespiratorySymptoms,
    CirculatorySymptoms,
    NeurologicalSymptoms,
    DiagnosisLocalSymptoms,
    OtherSymptoms,
    RiskFactorsAndExposure
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

      if (this.$refs.GeneralSymptoms) {
        this.$refs.GeneralSymptoms.handleReset();
      }
      if (this.$refs.RespiratorySymptoms) {
        this.$refs.RespiratorySymptoms.handleReset();
      }
      if (this.$refs.CirculatorySymptoms) {
        this.$refs.CirculatorySymptoms.handleReset();
      }
      if (this.$refs.NeurologicalSymptoms) {
        this.$refs.NeurologicalSymptoms.handleReset();
      }
      if (this.$refs.DiagnosisLocalSymptoms) {
        this.$refs.DiagnosisLocalSymptoms.handleReset();
      }
    },
    handleSubmit() {
      console.log("触发");
      if (this.$refs.form) {
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
      } else {
        console.error("Form reference is null");
      }
    },

    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
      this.selectedTag = null;
    },
    getInitialForm() {
      return {
      };
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
  width: 700px;
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
}

.blue-box {
  width: 6px;
  height: 22px;
  background-color: #285ac8;
  margin-right: 10px;
}

.title-text {
  font-size: 14px;
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
