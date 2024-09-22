<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="160px"
      class="form-container"
      ref="form"
      :rules="rules"
      label-position="left"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">确诊疾病</span>
          </div>
          <el-check-tag
            :checked="form.DiseaseType === '新型冠状病毒感染'"
            type="primary"
            @change="toggleDisease('新型冠状病毒感染')"
            :disabled="allDisabled"
          >
            新型冠状病毒感染
          </el-check-tag>
          <el-check-tag
            :checked="form.DiseaseType === '流感'"
            type="primary"
            @change="toggleDisease('流感')"
            :disabled="allDisabled"
          >
            流感
          </el-check-tag>
          <div>
            <el-check-tag
              :checked="form.DiseaseType === '鼠疫'"
              type="primary"
              @change="toggleDisease('鼠疫')"
              :disabled="allDisabled"
            >
              鼠疫
            </el-check-tag>

            <div
              v-if="form.DiseaseType === '鼠疫'"
              class="PlagueSubtype"
              style="margin-left: 20px"
            >
              <el-check-tag
                :checked="form.PlagueSubtype === '腺鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('腺鼠疫')"
                :disabled="allDisabled"
              >
                腺鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.PlagueSubtype === '肺鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('肺鼠疫')"
                :disabled="allDisabled"
              >
                肺鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.PlagueSubtype === '败血型鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('败血型鼠疫')"
                :disabled="allDisabled"
              >
                败血型鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.PlagueSubtype === '肠鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('肠鼠疫')"
                :disabled="allDisabled"
              >
                肠鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.PlagueSubtype === '眼鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('眼鼠疫')"
                :disabled="allDisabled"
              >
                眼鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.PlagueSubtype === '皮肤鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('皮肤鼠疫')"
                :disabled="allDisabled"
              >
                皮肤鼠疫
              </el-check-tag>
              <el-check-tag
                :checked="form.PlagueSubtype === '脑鼠疫'"
                type="primary"
                @change="togglePlagueSubtype('脑鼠疫')"
                :disabled="allDisabled"
              >
                脑鼠疫
              </el-check-tag>
            </div>
          </div>

          <el-check-tag
            :checked="form.DiseaseType === '感染性腹泻'"
            type="primary"
            @change="toggleDisease('感染性腹泻')"
            :disabled="allDisabled"
          >
            感染性腹泻
          </el-check-tag>
          <div>
            <el-check-tag
              :checked="form.DiseaseType === '炭疽'"
              type="primary"
              @change="toggleDisease('炭疽')"
              :disabled="allDisabled"
            >
              炭疽
            </el-check-tag>
            <div v-if="form.DiseaseType === '炭疽'" style="margin-left: 20px">
              <el-check-tag
                :checked="form.AnthraxSubtype === '皮肤炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('皮肤炭疽')"
                :disabled="allDisabled"
              >
                皮肤炭疽
              </el-check-tag>
              <el-check-tag
                :checked="form.AnthraxSubtype === '肠炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('肠炭疽')"
                :disabled="allDisabled"
              >
                肠炭疽
              </el-check-tag>
              <el-check-tag
                :checked="form.AnthraxSubtype === '肺炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('肺炭疽')"
                :disabled="allDisabled"
              >
                肺炭疽
              </el-check-tag>
              <el-check-tag
                :checked="form.AnthraxSubtype === '脑膜炎型炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('脑膜炎型炭疽')"
                :disabled="allDisabled"
              >
                脑膜炎型炭疽
              </el-check-tag>
              <el-check-tag
                :checked="form.AnthraxSubtype === '败血症型炭疽'"
                type="primary"
                @change="toggleAnthraxSubtype('败血症型炭疽')"
                :disabled="allDisabled"
              >
                败血症型炭疽
              </el-check-tag>
            </div>
          </div>
          <el-check-tag
            :checked="form.DiseaseType === '结核病'"
            type="primary"
            @change="toggleDisease('结核病')"
            :disabled="allDisabled"
          >
            结核病
          </el-check-tag>
          <el-check-tag
            :checked="form.DiseaseType === '登革热（蚊媒传染病）'"
            type="primary"
            @change="toggleDisease('登革热（蚊媒传染病）')"
            :disabled="allDisabled"
          >
            登革热（蚊媒传染病）
          </el-check-tag>
          <el-check-tag
            :checked="form.DiseaseType === '疟疾（蚊媒传染病）'"
            type="primary"
            @change="toggleDisease('疟疾（蚊媒传染病）')"
            :disabled="allDisabled"
          >
            疟疾（蚊媒传染病）
          </el-check-tag>
          <el-check-tag
            :checked="form.DiseaseType === '森林脑炎（蜱媒传染病）'"
            type="primary"
            @change="toggleDisease('森林脑炎（蜱媒传染病）')"
            :disabled="allDisabled"
          >
            森林脑炎（蜱媒传染病）
          </el-check-tag>
          <el-check-tag
            :checked="
              form.DiseaseType === '发热伴血小板减少综合征（蜱媒传染病）'
            "
            type="primary"
            @change="toggleDisease('发热伴血小板减少综合征（蜱媒传染病）')"
            :disabled="allDisabled"
          >
            发热伴血小板减少综合征（蜱媒传染病）
          </el-check-tag>
          <el-check-tag
            :checked="form.DiseaseType === '斑疹伤寒'"
            type="primary"
            @change="toggleDisease('斑疹伤寒')"
            :disabled="allDisabled"
          >
            斑疹伤寒
          </el-check-tag>
          <el-check-tag
            :checked="form.DiseaseType === '流行性出血热'"
            type="primary"
            @change="toggleDisease('流行性出血热')"
            :disabled="allDisabled"
          >
            流行性出血热
          </el-check-tag>
          <div>
            <el-check-tag
              :checked="form.DiseaseType === '其他'"
              type="primary"
              @change="toggleDisease('其他')"
              :disabled="allDisabled"
            >
              其他
            </el-check-tag>
            <div class="NextContainer">
              <el-form-item
                v-if="form.DiseaseType === '其他'"
                label="其他疾病"
                style="margin-left: 20px; padding: 15px 0 15px 0"
              >
                <el-input
                  v-model="form.OtherDiseaseName"
                  placeholder="请输入其他疾病名称"
                  :disabled="allDisabled"
                  style=""
                />
              </el-form-item>
            </div>
          </div>
        </div>

        <!-- 病例发现途径 -->
        <div class="DiscoveryMethod">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">病例发现途径</span>
          </div>
          <el-radio-group
            v-model="form.DiscoveryMethod"
            @change="toggleDiscoveryMethod"
            :disabled="allDisabled"
            style="margin-left: 20px"
          >
            <el-radio value="APP填报">APP填报</el-radio>
            <el-radio value="主动就诊">主动就诊</el-radio>
            <el-radio value="常规监测发现">常规监测发现</el-radio>
            <el-radio value="健康检查">健康检查</el-radio>
            <el-radio value="其他">其他</el-radio>
          </el-radio-group>
          <div class="NextContainer">
            <el-form-item
              v-if="form.DiscoveryMethod === '其他'"
              label="其他途径"
              style="margin-left: 20px; padding: 15px 0 15px 0"
            >
              <el-input
                v-model="form.OtherDiscoveryMethodName"
                placeholder="请输入其他途径名称"
                :disabled="allDisabled"
                style=""
              />
            </el-form-item>
          </div>
        </div>

        <!-- 疾病转归 -->
        <div class="DiseaseOutcome">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">疾病转归</span>
          </div>
          <el-radio-group
            v-model="form.DiseaseOutcome"
            @change="toggleOutcome"
            :disabled="allDisabled"
            style="margin-left: 20px"
          >
            <el-radio value="治愈">治愈</el-radio>
            <el-radio value="好转">好转</el-radio>
            <el-radio value="未愈">未愈</el-radio>
            <el-radio value="死亡">死亡</el-radio>
          </el-radio-group>
        </div>

        <div>
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">就诊信息</span>
          </div>
          <div style="margin-left: 20px">
            <!-- 确诊医院名称 -->
            <el-form-item label="确诊医院名称">
              <el-input
                clearable
                v-model="form.HospitalName"
                :disabled="allDisabled"
                placeholder="请输入确诊医院名称"
              />
            </el-form-item>

            <!-- 就诊/入院日期 -->
            <el-form-item label="就诊/入院日期">
              <el-date-picker
                v-model="form.AdmissionDate"
                type="date"
                placeholder="请选择就诊/入院日期"
                :disabled="allDisabled"
              />
            </el-form-item>

            <!-- 出院日期 -->
            <el-form-item label="出院日期">
              <el-date-picker
                v-model="form.DischargeDate"
                type="date"
                placeholder="请选择出院日期"
                :disabled="allDisabled"
              />
            </el-form-item>

            <!-- 死亡日期 -->
            <el-form-item label="死亡日期">
              <el-date-picker
                v-model="form.DeathDate"
                type="date"
                placeholder="请选择死亡日期"
                :disabled="allDisabled"
              />
            </el-form-item>

            <!-- 就诊/入院时症状和体征 -->
            <el-form-item label="就诊/入院时症状和体征">
              <el-input
                type="textarea"
                placeholder="请输入就诊/入院时症状和体征"
                v-model="form.AdmissionSymptomsAndSigns"
                :disabled="allDisabled"
              />
            </el-form-item>
          </div>
        </div>

        <!-- 登记分类 -->
        <div class="RegistrationClassification">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">登记分类</span>
          </div>
          <el-check-tag
            :checked="form.RegistrationClassification === '新患者'"
            type="primary"
            @change="toggleRegistration('新患者')"
            :disabled="allDisabled"
          >
            新患者
          </el-check-tag>
          <el-check-tag
            :checked="form.RegistrationClassification === '复发'"
            type="primary"
            @change="toggleRegistration('复发')"
            :disabled="allDisabled"
          >
            复发
          </el-check-tag>
          <el-check-tag
            :checked="form.RegistrationClassification === '返回'"
            type="primary"
            @change="toggleRegistration('返回')"
            :disabled="allDisabled"
          >
            返回
          </el-check-tag>
          <el-check-tag
            :checked="form.RegistrationClassification === '治疗失败'"
            type="primary"
            @change="toggleRegistration('治疗失败')"
            :disabled="allDisabled"
          >
            治疗失败
          </el-check-tag>

          <div>
            <el-check-tag
              :checked="form.RegistrationClassification === '其他'"
              type="primary"
              @change="toggleRegistration('其他')"
              :disabled="allDisabled"
            >
              其他
            </el-check-tag>
            <div class="NextContainer">
              <el-form-item
                v-if="form.RegistrationClassification === '其他'"
                label="其他"
                style="margin-left: 20px; padding: 15px 0 15px 0"
              >
                <el-input
                  v-model="form.OtherRegistrationDetails"
                  placeholder="请详述"
                  :disabled="allDisabled"
                  style=""
                />
              </el-form-item>
            </div>
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
        allDisabled:false,
      visible: false, // 控制弹窗显示
      form: {
        DiseaseType: "", // 确诊疾病
        OtherDiseaseName: "", // 其他疾病名称
        DiscoveryMethod: "", // 病例发现途径
        OtherDiscoveryMethodName: "", // 其他途径名称
        DiseaseOutcome: "", // 疾病转归
        HospitalName: "", // 确诊医院名称
        AdmissionDate: "", // 就诊/入院日期
        DischargeDate: "", // 出院日期
        DeathDate: "", // 死亡日期
        AdmissionSymptomsAndSigns: "", // 就诊/入院时症状和体征
        RegistrationClassification: "", // 登记分类
        OtherRegistrationDetails: "", // 登记分类其他详情
      },

      rules: {},
    };
  },
  methods: {
    toggleDisease(disease) {
      this.form.DiseaseType = this.form.DiseaseType === disease ? "" : disease;
      if (this.form.DiseaseType !== "鼠疫") {
        this.form.PlagueSubtype = ""; // 清空鼠疫子类
      }
    },
    togglePlagueSubtype(subtype) {
      this.form.PlagueSubtype =
        this.form.PlagueSubtype === subtype ? "" : subtype;
    },
    toggleDiscoveryMethod(value) {
      this.form.DiscoveryMethod = value;
       if (this.form.DiscoveryMethod !== '其他') {
      this.form.OtherDiscoveryMethodName = ''; // 清空其他途径名称
    }
    },

    toggleOutcome() {
      // this.form.DiseaseOutcome = value;
    },
    
    toggleRegistration(value) {
      this.form.RegistrationClassification = value;
    },
    getInitialForm() {
      return {
        DiseaseType: "", // 确诊疾病
        OtherDiseaseName: "", // 其他疾病名称
        DiscoveryMethod: "", // 病例发现途径
        OtherDiscoveryMethodName: "", // 其他途径名称
        DiseaseOutcome: "", // 疾病转归
        HospitalName: "", // 确诊医院名称
        AdmissionDate: "", // 就诊/入院日期
        DischargeDate: "", // 出院日期
        DeathDate: "", // 死亡日期
        AdmissionSymptomsAndSigns: "", // 就诊/入院时症状和体征
        RegistrationClassification: "", // 登记分类
        OtherRegistrationDetails: "", // 登记分类其他详情
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
  width: 420px;
}
/* 确保选中状态的圆点颜色 */
.NextContainer :deep(.el-radio.is-checked .el-radio__inner::before) {
  background-color: #fff !important; /* 选中状态的圆点颜色 */
}
/* 单选框选中状态 */
.NextContainer :deep(.el-radio.is-checked .el-radio__inner) {
  background-color: #285ac8 !important; /* 选中背景色，默认蓝色 */
  border-color: #285ac8 !important; /* 选中边框色 */
}
.el-input {
  width: 220px;
}
</style>
