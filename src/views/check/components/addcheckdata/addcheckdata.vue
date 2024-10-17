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
        <h3>添加检测信息</h3>
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
            <!------------------------------- 姓名 --------------------------------------->
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="form.name"
                style="width: 200px"
                placeholder="请输入姓名"
                @blur="$refs.form.validateField('name')"
                clearable
                :disabled="allDisabled"  
              ></el-input>
            </el-form-item>

            <!------------------------------- 性别 ----------------------------------------->
            <el-form-item label="性别" prop="gender">
              <el-input
                v-model="form.gender"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="allDisabled"  
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
                :disabled="allDisabled"  
              ></el-input>
            </el-form-item>

            <!-- 民族 -->
            <el-form-item label="民族" prop="ethnicity">
              <el-input
                v-model="form.ethnicity"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="allDisabled"  
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
                :disabled="allDisabled"  
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
            <span class="title-text">病原学及血清学检查</span>
          </div>

          <el-check-tag
            :checked="form.isVirusAntigenTestDone"
            type="primary"
            @change="toggleTag('isVirusAntigenTestDone')"
          >
            病毒抗原检测
          </el-check-tag>

          <el-check-tag
            :checked="form.isVirusNucleicAcidTestDone"
            type="primary"
            @change="toggleTag('isVirusNucleicAcidTestDone')"
          >
            病毒核酸检测
          </el-check-tag>

          <el-check-tag
            :checked="form.isVirusCultureIsolationDone"
            type="primary"
            @change="toggleTag('isVirusCultureIsolationDone')"
          >
            病毒培养分离
          </el-check-tag>

          <el-check-tag
            :checked="form.isSerologicalTestDone"
            type="primary"
            @change="toggleTag('isSerologicalTestDone')"
          >
            血清学检测
          </el-check-tag>
        </div>

            <div class="LabTestReport">
                <LabTestReport ref="LabTestReport" />
            </div>

      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import LabTestReport from './LabTestReport.vue';

export default {
  components: {
    LabTestReport,
  },
  data() {
    return {
    allDisabled:true, 
      visible: false, // 控制弹窗显示
      form: {
        isVirusAntigenTestDone: false, // BOOLEAN, -- 是否已进行病毒抗原检测
        isVirusNucleicAcidTestDone: false, // BOOLEAN, -- 是否已进行病毒核酸检测
        isVirusCultureIsolationDone: false, // BOOLEAN, -- 是否已进行病毒培养分离
        isSerologicalTestDone: false, // BOOLEAN, -- 是否已进行血清学检测
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

    async handleSubmit() {
      console.log("触发");

      try {
        // 调用子组件的 validate 方法
        // 诊断信息
        // await this.$refs.DiagnosisResults.validate();
        // 基本信息
        // 全身症状

        // 如果子组件验证通过，继续处理其他数据
        // const DiagnosisResultsData = this.$refs.DiagnosisResults.getData();

        // console.log("诊断信息:", DiagnosisResultsData);

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
      // this.$refs.DiagnosisComplications.handleReset();
    },
    getInitialForm() {
      return {
        isVirusAntigenTestDone: false, // BOOLEAN, -- 是否已进行病毒抗原检测
        isVirusNucleicAcidTestDone: false, // BOOLEAN, -- 是否已进行病毒核酸检测
        isVirusCultureIsolationDone: false, // BOOLEAN, -- 是否已进行病毒培养分离
        isSerologicalTestDone: false, // BOOLEAN, -- 是否已进行血清学检测
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
.LabTestReport{
    /* margin-left: -60px; */
    margin-top: 20px;
}
</style>
