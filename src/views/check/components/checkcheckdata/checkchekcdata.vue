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
        <h3>查看/编辑检测信息</h3>
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
        
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">个人基本信息</span>
          </div>
          <div class="BaseInfoDetail">
            <!------------------------------- 姓名 --------------------------------------->
            <el-form-item label="姓名" prop="Name">
              <el-input
                v-model="form.Name"
                style="width: 200px"
                placeholder="请输入姓名"
                @blur="$refs.form.validateField('Name')"
                clearable
                :disabled="allDisabled"  
              ></el-input>
            </el-form-item>

            <!------------------------------- 性别 ----------------------------------------->
            <el-form-item label="性别" prop="Gender">
              <el-input
                v-model="form.Gender"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="allDisabled"  
              ></el-input>
              <!-- <el-radio-group v-model="form.Gender">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
              </el-radio-group> -->
            </el-form-item>

            <!-- 年龄 -->
            <el-form-item label="年龄" prop="Age">
              <el-input
                v-model="form.Age"
                style="width: 200px"
                placeholder="根据身份证号生成"
                clearable
                :disabled="allDisabled"  
              ></el-input>
            </el-form-item>

            <!-- 民族 -->
            <el-form-item label="民族" prop="Ethnicity">
              <el-input
                v-model="form.Ethnicity"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="allDisabled"  
              ></el-input>
              <!-- <el-radio-group v-model="form.Ethnicity">
                <el-radio value="汉族">汉族</el-radio>
                <el-radio value="藏族">藏族</el-radio>
                <el-radio value="彝族">彝族</el-radio>
                <el-radio value="其他少数民族">其他少数民族</el-radio>
              </el-radio-group> -->
            </el-form-item>

            <!-- 部门/工种 -->
            <el-form-item label="部门/工种" prop="Department">
              <el-input
                v-model="form.Department"
                style="width: 200px"
                placeholder=""
                clearable
                :disabled="allDisabled"  
              ></el-input>
              <!-- <el-radio-group v-model="form.Department">
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
            :checked="form.IsVirusAntigenTestDone"
            type="primary"
            @change="toggleTag('IsVirusAntigenTestDone')"
          >
            病毒抗原检测
          </el-check-tag>

          <el-check-tag
            :checked="form.IsVirusNucleicAcidTestDone"
            type="primary"
            @change="toggleTag('IsVirusNucleicAcidTestDone')"
          >
            病毒核酸检测
          </el-check-tag>

          <el-check-tag
            :checked="form.IsVirusCultureIsolationDone"
            type="primary"
            @change="toggleTag('IsVirusCultureIsolationDone')"
          >
            病毒培养分离
          </el-check-tag>

          <el-check-tag
            :checked="form.IsSerologicalTestDone"
            type="primary"
            @change="toggleTag('IsSerologicalTestDone')"
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
      isEditing: false,
      form: {
        IsVirusAntigenTestDone: false, // BOOLEAN, -- 是否已进行病毒抗原检测
        IsVirusNucleicAcidTestDone: false, // BOOLEAN, -- 是否已进行病毒核酸检测
        IsVirusCultureIsolationDone: false, // BOOLEAN, -- 是否已进行病毒培养分离
        IsSerologicalTestDone: false, // BOOLEAN, -- 是否已进行血清学检测
      },
      refs: [
        "LabTestReport"
      ],
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
    handleCancel(){
    this.visible = false;
      this.refs.forEach((ref) => {
        this.$refs[ref].handleCancel();
      });
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
        IsVirusAntigenTestDone: false, // BOOLEAN, -- 是否已进行病毒抗原检测
        IsVirusNucleicAcidTestDone: false, // BOOLEAN, -- 是否已进行病毒核酸检测
        IsVirusCultureIsolationDone: false, // BOOLEAN, -- 是否已进行病毒培养分离
        IsSerologicalTestDone: false, // BOOLEAN, -- 是否已进行血清学检测
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
