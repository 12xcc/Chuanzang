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
        <h3>添加用户</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="155px"
        class="form-container"
        ref="form"
        :rules="rules"
      >
         <!-- 用户类型 -->
        <el-form-item label="用户类型" prop="UserType" size="default">
        <el-select
          v-model="form.UserType"
          placeholder="请选择用户类型"
          clearable
          size="default"
          style="width: 200px"
        >
          <el-option :key="1" label="系统管理员" :value="1"></el-option>
          <el-option :key="2" label="铁路职工" :value="2"></el-option>
          <el-option :key="3" label="疾控中心工作人员" :value="3"></el-option>
          <el-option :key="4" label="专职医护" :value="4"></el-option>
        </el-select>
      </el-form-item>

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

          <!-- 是否为孕妇 -->
        <el-form-item
          v-if="form.Gender === '女'"
          label="是否为孕妇"
          prop="IsPregnant"
        >
          <el-radio-group v-model="form.IsPregnant">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
          <el-form-item  v-if="form.IsPregnant === true" label="孕周">
            <el-input
              v-model="form.PregnancyWeeks"
              placeholder="孕周"
              style="width: 100px"
            ></el-input>
          </el-form-item>
        </el-form-item>


        <!-- 身份证号 -->
        <el-form-item label="身份证号" prop="IDNumber">
          <el-input
            v-model="form.IDNumber"
            style="width: 200px"
            placeholder="请输入身份证号"
          ></el-input>
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

        <!-- 受教育程度 -->
        <el-form-item label="受教育程度" prop="EducationLevel">
          <el-radio-group v-model="form.EducationLevel">
            <el-radio value="小学及以下">小学及以下</el-radio>
            <el-radio value="初中">初中</el-radio>
            <el-radio value="中专/高中">中专/高中</el-radio>
            <el-radio value="大专/本科">大专/本科</el-radio>
            <el-radio value="硕士及以上">硕士及以上</el-radio>
          </el-radio-group>
        </el-form-item>
 <!-- 来高原工作时间 -->
        <el-form-item
          label="来高原工作时间"
          style="display: flex; align-items: center"
          prop="WorkOnPlateauStartDate"
        >
          <div style="flex: 1">
            <el-date-picker
              type="date"
              placeholder=""
              v-model="form.WorkOnPlateauStartDate"
              style="width: 200px"
            />
          </div>
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

        <!-- 是否为特定职业人群 -->
        <el-form-item label="是否为特定职业人群" prop="SpecificOccupation">
          <el-radio-group
            v-model="form.SpecificOccupation"
            @change="SpecificOccupationChange"
          >
            <el-radio value="否">否</el-radio>
            <el-radio value="医务人员">医务人员</el-radio>
            <el-radio value="病原微生物检测人员">病原微生物检测人员</el-radio>
            <el-radio value="野生动物接触相关人员"
              >野生动物接触相关人员</el-radio
            >
            <el-radio value="家禽、家畜养殖人员">家禽、家畜养殖人员</el-radio>
          </el-radio-group>
          <el-form-item
            v-if="form.SpecificOccupation === '医务人员'"
            label="医务人员具体工作性质"
            class="yiwu"
            prop="MedicalPersonnelType"
          >
            <el-radio-group v-model="form.MedicalPersonnelType">
              <el-radio value="医生">医生</el-radio>
              <el-radio value="护士">护士</el-radio>
              <el-radio value="疾控现场工作人员">疾控现场工作人员</el-radio>
              <el-radio value="实验室检测人员">实验室检测人员</el-radio>
              <el-radio value="其他">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form-item>
         <el-form-item
          v-if="form.MedicalPersonnelType === '其他'"
          label="其他工作性质名称"
          prop="OtherPositionName"
        >
          <el-input v-model="form.OtherPositionName" style="width: 200px" />
        </el-form-item>


        <!-- 联系电话 -->
        <el-form-item label="联系电话" prop="PhoneNumber">
          <el-input
            style="width: 200px"
            v-model="form.PhoneNumber"
            placeholder="手机"
          ></el-input>
        </el-form-item>

        <!-- 其他联系电话 -->
        <el-form-item label="其他联系电话" prop="OtherPhoneNumber">
          <el-input
            style="width: 200px"
            v-model="form.OtherPhoneNumber"
            placeholder="其他联系电话"
          ></el-input>
        </el-form-item>

        <!-- 紧急联系人姓名 -->
        <el-form-item label="紧急联系人姓名" prop="EmergencyContactName">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactName"
            placeholder="姓名"
          ></el-input>
        </el-form-item>

        <!-- 紧急联系人电话 -->
        <el-form-item label="紧急联系人电话" prop="EmergencyContactPhoneNumber">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactPhoneNumber"
            placeholder="联系电话"
          ></el-input>
        </el-form-item>

        <!-- 与其关系 -->
        <el-form-item label="与其关系" prop="EmergencyContactRelation">
          <el-input
            style="width: 200px"
            v-model="form.EmergencyContactRelation"
            placeholder="关系"
          ></el-input>
        </el-form-item>

        <!-- 既往病史和基本情况 -->
        <el-form-item label="既往病史和基本情况" prop="HasMedicalHistory">
          <el-radio-group
            v-model="form.HasMedicalHistory"
            @change="handleMedicalHistoryChange"
          >
            <el-radio :value="true">有</el-radio>
            <el-radio :value="false">无</el-radio>
          </el-radio-group>

          <!-- 当选择“有”时，显示疾病选项 -->
          <div v-if="form.HasMedicalHistory">
            <el-checkbox v-model="form.HasHypertension" label="高血压"
              >高血压</el-checkbox
            >
            <el-checkbox v-model="form.HasDiabetes" label="糖尿病"
              >糖尿病</el-checkbox
            >
            <el-checkbox v-model="form.HasHyperlipidemia" label="高脂血症"
              >高脂血症</el-checkbox
            >
            <el-checkbox v-model="form.HasHyperuricemia" label="高尿酸"
              >高尿酸</el-checkbox
            >
            <el-checkbox v-model="form.HasCoronaryHeartDisease" label="冠心病"
              >冠心病</el-checkbox
            >
            <el-checkbox v-model="form.HasStroke" label="脑卒中"
              >脑卒中</el-checkbox
            >
            <el-checkbox
              v-model="form.HasOtherCardiovascularDiseases"
              label="其他心脑血管疾病"
              >其他心脑血管疾病</el-checkbox
            >
            <el-checkbox v-model="form.HasAsthma" label="哮喘"
              >哮喘</el-checkbox
            >
            <el-checkbox v-model="form.HasCOPD" label="慢性阻塞性肺部疾病"
              >慢性阻塞性肺部疾病</el-checkbox
            >
            <el-checkbox v-model="form.HasPepticUlcer" label="消化性溃疡"
              >消化性溃疡</el-checkbox
            >

            <!-- 恶性肿瘤 -->
            <el-form-item>
              <el-checkbox
                v-model="form.HasMalignantTumor"
                @change="handleCancerChange"
                label="恶性肿瘤"
              >
                恶性肿瘤
              </el-checkbox>
              <!-- 恶性肿瘤子选项 -->
              <div v-if="form.HasMalignantTumor" class="othercancer">
                <el-checkbox v-model="form.HasLungCancer" label="肺癌"
                  >肺癌</el-checkbox
                >
                <el-checkbox v-model="form.HasOtherCancer" label="其他"
                  >其他</el-checkbox
                >
                <!-- 其他恶性肿瘤请输入框 -->
                <el-input
                  v-if="form.HasOtherCancer"
                  v-model="form.OtherCancerName"
                  placeholder="请输入其他恶性肿瘤"
                  prop="OtherCancerName"
                ></el-input>
              </div>
            </el-form-item>

            <!-- 其他疾病选项 -->
            <el-checkbox
              v-model="form.HasSevereMentalDisorders"
              label="严重精神障碍"
              >严重精神障碍</el-checkbox
            >
            <el-checkbox v-model="form.HasTuberculosis" label="结核病"
              >结核病</el-checkbox
            >
            <el-checkbox v-model="form.HasHepatitis" label="肝炎"
              >肝炎</el-checkbox
            >
            <el-checkbox v-model="form.HasOccupationalDisease" label="职业病"
              >职业病</el-checkbox
            >
            <el-checkbox v-model="form.HasChronicKidneyDisease" label="慢性肾病"
              >慢性肾病</el-checkbox
            >
            <el-checkbox v-model="form.HasChronicLiverDisease" label="慢性肝病"
              >慢性肝病</el-checkbox
            >
            <el-checkbox
              v-model="form.HasImmunodeficiency"
              label="免疫缺陷类疾病"
              >免疫缺陷类疾病</el-checkbox
            >
            <el-checkbox v-model="form.HasTyphus" label="斑疹伤寒"
              >斑疹伤寒</el-checkbox
            >
            <el-checkbox
              v-model="form.IsPostpartumInSixWeeks"
              label="产后（6周以内）"
              >产后（6周以内）</el-checkbox
            >
            <el-checkbox v-model="form.HasDustExposure" label="粉尘接触史"
              >粉尘接触史</el-checkbox
            >
            <el-checkbox v-model="form.HasOtherDiseases" label="其他"
              >其他</el-checkbox
            >
          </div>
        </el-form-item>

        <!-- 吸烟史 -->
        <el-form-item label="吸烟史" prop="SmokingStatus">
          <el-radio-group v-model="form.SmokingStatus">
            <el-radio value="现在吸">现在吸</el-radio>
            <el-radio value="以前吸">以前吸</el-radio>
            <el-radio value="从不吸">从不吸</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 饮酒史 -->
        <el-form-item label="饮酒史" prop="DrinkingStatus">
          <el-radio-group v-model="form.DrinkingStatus">
            <el-radio value="不喝酒">不喝酒</el-radio>
            <el-radio value="偶尔喝酒（小于3次/周）"
              >偶尔喝酒（小于3次/周）</el-radio
            >
            <el-radio value="经常喝酒（大于等于3次/周）"
              >经常喝酒（大于等于3次/周）</el-radio
            >
            <el-radio value="经常大量喝酒（白酒≥3次/周，每次≥2两）"
              >经常大量喝酒（白酒≥3次/周，每次≥2两）</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <!-- 身高 -->
        <el-form-item label="身高(cm)" prop="Height">
          <el-input
            v-model="form.Height"
            style="width: 200px"
            placeholder="请输入身高"
          ></el-input>
        </el-form-item>

        <!-- 体重 -->
        <el-form-item label="体重(kg)" prop="Weight">
          <el-input
            v-model="form.Weight"
            style="width: 200px"
            placeholder="请输入体重"
          ></el-input>
        </el-form-item>

        <!-- 疫苗接种情况 -->
        <el-form-item label="疫苗接种情况">
          <el-checkbox v-model="form.IsVaccinatedForCOVID" value="新冠疫苗"
            >新冠疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForFlu" value="流感疫苗"
            >流感疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForPlague" value="鼠疫疫苗"
            >鼠疫疫苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForBCG" value="卡介苗"
            >卡介苗</el-checkbox
          >
          <el-checkbox v-model="form.IsVaccinatedForHepatitis" value="肝炎疫苗"
            >肝炎疫苗</el-checkbox
          >
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import Dateselection from "@/components/date.vue";
import axiosInstance from "@/utils/axiosInstance.js";
export default {
  components: {
    Dateselection,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
           UserType: null, // 用户类型
        Name: null, // 姓名
        Gender: null, // 性别
        IsPregnant: false, // 是否怀孕
        PregnancyWeeks: null, // 怀孕周数
        IDNumber: null, // 身份证号
        Age: null, // 年龄
        Ethnicity: null, // 民族
        EducationLevel: null, // 文化程度
        WorkOnPlateauStartDate: null, //高原工作时间
        Department: null, // 部门/工种
        SpecificOccupation: null, // 具体职业
        MedicalPersonnelType: null, // 医护人员类型
        OtherPositionName: null, //其他名称
        PhoneNumber: null, // 手机号码
        OtherPhoneNumber: null, // 其他电话号码
        EmergencyContactName: null, // 紧急联系人姓名
        EmergencyContactPhoneNumber: null, // 紧急联系人电话
        EmergencyContactRelation: null, // 紧急联系人关系

        // 既往病史字段
        HasMedicalHistoryRadio: null, // 是否有既往病史（“有”或“无”）
        HasMedicalHistory: false, // 既往病史疾病选项
        HasHypertension: false, // 高血压
        HasDiabetes: false, // 糖尿病
        HasHyperlipidemia: false, // 高脂血症
        HasHyperuricemia: false, // 高尿酸
        HasCoronaryHeartDisease: false, // 冠心病
        HasStroke: false, // 脑卒中
        HasOtherCardiovascularDiseases: false, // 其他心脑血管疾病
        HasAsthma: false, // 哮喘
        HasCOPD: false, // 慢性阻塞性肺疾病
        HasPepticUlcer: false, // 消化性溃疡
        HasMalignantTumor: false, // 恶性肿瘤
        // CancerType: [], // 恶性肿瘤子选项（肺癌和其他）
        HasLungCancer: false, // 肺癌
        HasOtherCancer: false, // 其他癌症
        OtherCancerName: null, // 其他恶性肿瘤名称
        HasSevereMentalDisorders: false, // 严重精神障碍
        HasTuberculosis: false, // 结核病
        HasHepatitis: false, // 肝炎
        HasOccupationalDisease: false, // 职业病
        HasChronicKidneyDisease: false, // 慢性肾病
        HasChronicLiverDisease: false, // 慢性肝病
        HasImmunodeficiency: false, // 免疫缺陷类疾病
        HasTyphus: false, // 斑疹伤寒
        IsPostpartumInSixWeeks: false, // 产后6周以内
        HasDustExposure: false, // 粉尘接触史
        HasOtherDiseases: false, // 有其他疾病
        OtherDiseasesName: null, // 其他疾病名称

        SmokingStatus: null, // 吸烟史
        DrinkingStatus: null, // 饮酒史
        Height: null, // 身高
        Weight: null, // 体重
        IsVaccinatedForCOVID: false,
        IsVaccinatedForFlu: false,
        IsVaccinatedForPlague: false,
        IsVaccinatedForBCG: false,
        IsVaccinatedForHepatitis: false,
      },

      rules: {
        Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        Gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        IDNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern: /^[0-9]{17}[0-9Xx]$/,
            message: "身份证号格式不正确",
            trigger: "blur",
          },
        ],
        Age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "年龄必须为数字", trigger: "blur" },
        ],
        Ethnicity: [
          {required: true, message: "请选择民族", trigger: "change"},
        ],
        EducationLevel: [
          {required: true, message: "请选择受教育程度", trigger: "change"},
        ],
        WorkStart: [
          {required: true, message: "请选择来高原工作时间", trigger: "blur"},
        ],
        Department: [
          {required: true, message: "请选择部门/工种", trigger: "change"},
        ],
        SpecificOccupation: [
          {required: true, message: "请选择是否为特定职业", trigger: "change"},
        ],
        PhoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "联系电话格式不正确",
            trigger: "blur",
          },
        ],
        OtherPhoneNumber: [
          { required: false, message: "请输入其他联系电话", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "联系电话格式不正确",
            trigger: "blur",
          },
        ],
        HasMedicalHistory: [
          {
            required: true,
            message: "请选择是否有既往病史",
            trigger: "change",
          },
        ],
        IsPregnant: [
          { required: false, message: "请选择是否为孕妇", trigger: "change" },
        ],
        PregnancyWeeks: [
          { required: false, message: "请输入孕周", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "孕周必须为数字", trigger: "blur" },
        ],
        Height: [
          { required: false, message: "请输入身高", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "身高必须为数字", trigger: "blur" },
        ],
        Weight: [
          { required: false, message: "请输入体重", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "体重必须为数字", trigger: "blur" },
        ],
        OtherCancerName: [
          {
            required: false,
            message: "请输入其他恶性肿瘤名称",
            trigger: "blur",
          },
        ],
        OtherDiseasesName: [
          { required: false, message: "请输入其他疾病名称", trigger: "blur" },
        ],
        SmokingStatus: [
          { required: true, message: "请选择吸烟史", trigger: "blur" },
        ],
        DrinkingStatus: [
          { required: true, message: "请选择饮酒史", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },
 // 调用增加用户api
handleSubmit() {
  this.$refs.form.validate(async (valid) => {
    if (valid) {
      try {
        // 处理必要数据，构造请求体
        const requestData = {
          age: this.form.Age,
          birthDate: this.form.BirthDate,
          department: this.form.Department,
          drinkingStatus: this.form.DrinkingStatus,
          educationLevel: this.form.EducationLevel,
          emergencyContactName: this.form.EmergencyContactName,
          emergencyContactPhoneNumber: this.form.EmergencyContactPhoneNumber,
          emergencyContactRelation: this.form.EmergencyContactRelation,
          ethnicity: this.form.Ethnicity,
          gender: this.form.Gender,
          hasAsthma: this.form.HasAsthma,
          hasCOPD: this.form.HasCOPD,
          hasChronicKidneyDisease: this.form.HasChronicKidneyDisease,
          hasChronicLiverDisease: this.form.HasChronicLiverDisease,
          hasCoronaryHeartDisease: this.form.HasCoronaryHeartDisease,
          hasDiabetes: this.form.HasDiabetes,
          hasDustExposure: this.form.HasDustExposure,
          hasHepatitis: this.form.HasHepatitis,
          hasHyperlipidemia: this.form.HasHyperlipidemia,
          hasHypertension: this.form.HasHypertension,
          hasHyperuricemia: this.form.HasHyperuricemia,
          hasImmunodeficiency: this.form.HasImmunodeficiency,
          hasLungCancer: this.form.HasLungCancer,
          hasMalignantTumor: this.form.HasMalignantTumor,
          hasMedicalHistory: this.form.HasMedicalHistory,
          hasOccupationalDisease: this.form.HasOccupationalDisease,
          hasOtherCancer: this.form.HasOtherCancer,
          hasOtherCardiovascularDiseases: this.form.HasOtherCardiovascularDiseases,
          hasOtherDiseases: this.form.HasOtherDiseases,
          hasPepticUlcer: this.form.HasPepticUlcer,
          hasSevereMentalDisorders: this.form.HasSevereMentalDisorders,
          hasStroke: this.form.HasStroke,
          hasTuberculosis: this.form.HasTuberculosis,
          hasTyphus: this.form.HasTyphus,
          height: this.form.Height,
          idNumber: this.form.IDNumber,
          isActived: this.form.IsActived,
          isPostpartumInSixWeeks: this.form.IsPostpartumInSixWeeks,
          isPregnant: this.form.IsPregnant,
          isVaccinatedForBCG: this.form.IsVaccinatedForBCG,
          isVaccinatedForCOVID: this.form.IsVaccinatedForCOVID,
          isVaccinatedForFlu: this.form.IsVaccinatedForFlu,
          isVaccinatedForHepatitis: this.form.IsVaccinatedForHepatitis,
          isVaccinatedForPlague: this.form.IsVaccinatedForPlague,
          medicalPersonnelType: this.form.MedicalPersonnelType,
          name: this.form.Name,
          otherCancerName: this.form.OtherCancerName,
          otherDiseasesName: this.form.OtherDiseasesName,
          otherPhoneNumber: this.form.OtherPhoneNumber,
          otherPositionName: this.form.OtherPositionName,
          phoneNumber: this.form.PhoneNumber,
          pregnancyWeeks: this.form.PregnancyWeeks,
          smokingStatus: this.form.SmokingStatus,
          specificOccupation: this.form.SpecificOccupation,
          userType: this.form.UserType,
          weight: this.form.Weight,
          workOnPlateauStartDate: this.form.WorkOnPlateauStartDate
        };

        // 调用接口提交用户信息
        const response = await axiosInstance.post(
          "/admin/userManager/addOneUser",
          requestData, // 请求体
          {
            headers: {
              "Content-Type": "application/json", // 请求头
            },
          }
        );

        // 判断响应
        if (response.data.code === 1) {
          ElMessage({
            message: "提交成功",
            type: "success",
          });
          this.visible = false; // 关闭弹窗
        } else {
          ElMessage({
            message: "提交失败：" + response.data.msg,
            type: "error",
          });
        }
      } catch (error) {
        console.error("提交出错:", error);
        ElMessage({
          message: "提交出错，请重试",
          type: "error",
        });
      }
    } else {
      console.log("表单验证失败");
      ElMessage({
        message: "提交失败，表单验证未通过",
        type: "error",
      });
    }
  });
},
    handleMedicalHistoryChange() {
      if (!this.form.HasMedicalHistory) {
        // 如果选择“无”，清空所有疾病选项
        this.clearAllDiseases();
      }
    },
    handleCancerChange() {
      if (!this.form.HasMalignantTumor) {
        // 清空癌症相关选项
        this.clearCancerFields();
      }
    },
    SpecificOccupationChange() {
      if (this.form.SpecificOccupation == "否") {
        this.form.MedicalPersonnelType = "";
      }
    },
    clearAllDiseases() {
      this.form.HasHypertension = false;
      this.form.HasDiabetes = false;
      this.form.HasHyperlipidemia = false;
      this.form.HasHyperuricemia = false;
      this.form.HasCoronaryHeartDisease = false;
      this.form.HasStroke = false;
      this.form.HasOtherCardiovascularDiseases = false;
      this.form.HasAsthma = false;
      this.form.HasCOPD = false;
      this.form.HasPepticUlcer = false;
      this.form.HasMalignantTumor = false;
      this.clearCancerFields();
      this.form.HasSevereMentalDisorders = false;
      this.form.HasTuberculosis = false;
      this.form.HasHepatitis = false;
      this.form.HasOccupationalDisease = false;
      this.form.HasChronicKidneyDisease = false;
      this.form.HasChronicLiverDisease = false;
      this.form.HasImmunodeficiency = false;
      this.form.HasTyphus = false;
      this.form.IsPostpartumInSixWeeks = false;
      this.form.HasDustExposure = false;
      this.form.HasOtherDiseases = false;
    },
    clearCancerFields() {
      this.form.HasLungCancer = false;
      this.form.HasOtherCancer = false;
      this.form.OtherCancerName = "";
    },
    handleReset() {
      this.form = this.getInitialForm();
      this.message="";
    },
    getInitialForm() {
      return {
           UserType: null, // 用户类型
        Name: null, // 姓名
        Gender: null, // 性别
        IsPregnant: false, // 是否怀孕
        PregnancyWeeks: null, // 怀孕周数
        IDNumber: null, // 身份证号
        Age: null, // 年龄
        Ethnicity: null, // 民族
        EducationLevel: null, // 文化程度
        WorkOnPlateauStartDate: null, //高原工作时间
        Department: null, // 部门/工种
        SpecificOccupation: null, // 具体职业
        MedicalPersonnelType: null, // 医护人员类型
        OtherPositionName: null, //其他名称
        PhoneNumber: null, // 手机号码
        OtherPhoneNumber: null, // 其他电话号码
        EmergencyContactName: null, // 紧急联系人姓名
        EmergencyContactPhoneNumber: null, // 紧急联系人电话
        EmergencyContactRelation: null, // 紧急联系人关系

        // 既往病史字段
        HasMedicalHistoryRadio: null, // 是否有既往病史（“有”或“无”）
        HasMedicalHistory: false, // 既往病史疾病选项
        HasHypertension: false, // 高血压
        HasDiabetes: false, // 糖尿病
        HasHyperlipidemia: false, // 高脂血症
        HasHyperuricemia: false, // 高尿酸
        HasCoronaryHeartDisease: false, // 冠心病
        HasStroke: false, // 脑卒中
        HasOtherCardiovascularDiseases: false, // 其他心脑血管疾病
        HasAsthma: false, // 哮喘
        HasCOPD: false, // 慢性阻塞性肺疾病
        HasPepticUlcer: false, // 消化性溃疡
        HasMalignantTumor: false, // 恶性肿瘤
        // CancerType: [], // 恶性肿瘤子选项（肺癌和其他）
        HasLungCancer: false, // 肺癌
        HasOtherCancer: false, // 其他癌症
        OtherCancerName: null, // 其他恶性肿瘤名称
        HasSevereMentalDisorders: false, // 严重精神障碍
        HasTuberculosis: false, // 结核病
        HasHepatitis: false, // 肝炎
        HasOccupationalDisease: false, // 职业病
        HasChronicKidneyDisease: false, // 慢性肾病
        HasChronicLiverDisease: false, // 慢性肝病
        HasImmunodeficiency: false, // 免疫缺陷类疾病
        HasTyphus: false, // 斑疹伤寒
        IsPostpartumInSixWeeks: false, // 产后6周以内
        HasDustExposure: false, // 粉尘接触史
        HasOtherDiseases: false, // 有其他疾病
        OtherDiseasesName: null, // 其他疾病名称

        SmokingStatus: null, // 吸烟史
        DrinkingStatus: null, // 饮酒史
        Height: null, // 身高
        Weight: null, // 体重
        IsVaccinatedForCOVID: false,
        IsVaccinatedForFlu: false,
        IsVaccinatedForPlague: false,
        IsVaccinatedForBCG: false,
        IsVaccinatedForHepatitis: false,
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
.othercancer {
  margin-left: 20px;
}
.yiwu {
  margin-top: 10px;
  margin-left: -120px;
}
</style>
