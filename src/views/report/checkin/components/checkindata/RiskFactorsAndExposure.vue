<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="300px"
      class="form-container"
      ref="form"
      :rules="rules"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">发热情况</span>
          </div>
          <el-form-item label="是否接触过发热或有呼吸道症状的患者：" label-position="left" style="margin-left: 15px;">
            <div>
              <el-radio-group v-model="form.ContactWithFeverPatient">
                <el-radio :label="'是'">是</el-radio>
                <el-radio :label="'否'">否</el-radio>
                <el-radio :label="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item label="是否接触过有腹泻症状的患者：" label-position="left" style="margin-left: 15px;">
            <div>
              <el-radio-group v-model="form.ContactWithDiarrheaPatient">
                <el-radio :label="'是'">是</el-radio>
                <el-radio :label="'否'">否</el-radio>
                <el-radio :label="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item label="是否接触过有皮疹的患者：" label-position="left" style="margin-left: 15px;">
            <div>
              <el-radio-group v-model="form.ContactWithRashPatient">
                <el-radio :label="'是'">是</el-radio>
                <el-radio :label="'否'">否</el-radio>
                <el-radio :label="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>

          <el-form-item label="是否接触过诊断为结核病的患者：" label-position="left" style="margin-left: 15px;">
            <div>
              <el-radio-group v-model="form.ContactWithTuberculosisPatient">
                <el-radio :label="'是'">是</el-radio>
                <el-radio :label="'否'">否</el-radio>
                <el-radio :label="'不清楚'">不清楚</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </div>

        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">情况</span>
          </div>
          <el-check-tag
            :checked="form.HasChills"
            type="primary"
            @change="toggleTag('HasChills')"
          >
            寒战
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSweating"
            type="primary"
            @change="toggleTag('HasSweating')"
          >
            大汗
          </el-check-tag>
          <el-check-tag
            :checked="form.HasFatigue"
            type="primary"
            @change="toggleTag('HasFatigue')"
          >
            乏力
          </el-check-tag>
          <el-check-tag
            :checked="form.HasHeadache"
            type="primary"
            @change="toggleTag('HasHeadache')"
          >
            头痛
          </el-check-tag>
          <el-check-tag
            :checked="form.HasMusclePain"
            type="primary"
            @change="toggleTag('HasMusclePain')"
          >
            肌肉酸痛
          </el-check-tag>
          <el-check-tag
            :checked="form.HasJointPain"
            type="primary"
            @change="toggleTag('HasJointPain')"
          >
            关节酸痛
          </el-check-tag>
        </div>

        <el-check-tag
          :checked="form.HasLymphNodeSwelling"
          type="primary"
          @change="toggleTag('HasLymphNodeSwelling')"
        >
          淋巴结肿大
        </el-check-tag>

        <div v-if="form.HasLymphNodeSwelling" class="flex gap-2 mt-4">
          <el-check-tag
            :checked="form.HasLymphNodeSwellingGroin"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingGroin')"
          >
            腹股沟
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingArmpit"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingArmpit')"
          >
            腋下
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingSubclavian"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingSubclavian')"
          >
            锁骨下
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingNeck"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingNeck')"
          >
            颈部
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingElbow"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingElbow')"
          >
            肘
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingPopliteal"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingPopliteal')"
          >
            腘窝
          </el-check-tag>
        </div>

        <div class="flex gap-2 mt-4">
          <el-check-tag
            :checked="form.HasCyanosis"
            type="primary"
            @change="toggleTag('HasCyanosis')"
          >
            口唇、颜面、四肢及全身皮肤发绀
          </el-check-tag>
          <el-check-tag
            :checked="form.hasSubcutaneousAndMucosalBleedingSpots"
            type="primary"
            @change="toggleTag('hasSubcutaneousAndMucosalBleedingSpots')"
          >
            皮下及黏膜出血或出血点
          </el-check-tag>
          <el-check-tag
            :checked="form.HasPainfulRedRash"
            type="primary"
            @change="toggleTag('HasPainfulRedRash')"
          >
            皮肤可见剧痛的红色丘疹
          </el-check-tag>
          <el-check-tag
            :checked="form.HasBloodBlisters"
            type="primary"
            @change="toggleTag('HasBloodBlisters')"
          >
            皮肤可见周边呈灰黑色、基底坚硬的血性水泡
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSkinUlcer"
            type="primary"
            @change="toggleTag('HasSkinUlcer')"
          >
            皮肤出现呈灰黑色创面的溃疡
          </el-check-tag>
          <el-check-tag
            :checked="form.HasCongestiveOrPetechialRash"
            type="primary"
            @change="toggleTag('HasCongestiveOrPetechialRash')"
          >
            皮疹：充血性或点状出血疹
          </el-check-tag>
          <el-check-tag
            :checked="form.HasPressureInsensitiveRash"
            type="primary"
            @change="toggleTag('HasPressureInsensitiveRash')"
          >
            皮疹：起初压之退色，后期压之不退，多见于四肢、躯干，面部一般没有
          </el-check-tag>

          <!-- 失水 -->
          <div class="Dehydration" style="display: flex">
            <el-check-tag
              :checked="form.HasDehydration"
              type="primary"
              @change="toggleTag('HasDehydration')"
            >
              失水
            </el-check-tag>

            <div
              v-if="form.HasDehydration"
              style="margin-left: 10px; margin-top: 8px"
            >
              <el-radio-group v-model="form.Dehydration">
                <el-radio :label="'重度'">重度</el-radio>
                <el-radio :label="'中度'">中度</el-radio>
                <el-radio :label="'轻度'">轻度</el-radio>
              </el-radio-group>
            </div>
          </div>

          <!-- 瘙痒性斑丘疹/水疱 -->
          <el-check-tag
            :checked="form.HasItchyRash"
            type="primary"
            @change="toggleTag('HasItchyRash')"
          >
            瘙痒性斑丘疹/水疱
          </el-check-tag>

          <div v-if="form.HasItchyRash">
            <el-check-tag
              :checked="form.ItchyRashOnFingers"
              type="primary"
              @change="toggleTag('ItchyRashOnFingers')"
            >
              手指
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnBackOfHands"
              type="primary"
              @change="toggleTag('ItchyRashOnBackOfHands')"
            >
              手背
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnUpperLimbs"
              type="primary"
              @change="toggleTag('ItchyRashOnUpperLimbs')"
            >
              上肢
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnLowerLimbs"
              type="primary"
              @change="toggleTag('ItchyRashOnLowerLimbs')"
            >
              下肢
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnFeet"
              type="primary"
              @change="toggleTag('ItchyRashOnFeet')"
            >
              足背
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnFace"
              type="primary"
              @change="toggleTag('ItchyRashOnFace')"
            >
              面部
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnOther"
              type="primary"
              @change="toggleTag('ItchyRashOnOther')"
            >
              其他
            </el-check-tag>
          </div>

          <!-- 水肿 -->
          <el-check-tag
            :checked="form.HasEdema"
            type="primary"
            @change="toggleTag('HasEdema')"
          >
            水肿
          </el-check-tag>

          <!-- 盗汗 -->
          <el-check-tag
            :checked="form.HasNightSweats"
            type="primary"
            @change="toggleTag('HasNightSweats')"
          >
            盗汗
          </el-check-tag>

          <!-- 消瘦 -->
          <el-check-tag
            :checked="form.HasWeightLoss"
            type="primary"
            @change="toggleTag('HasWeightLoss')"
          >
            消瘦
          </el-check-tag>

          <!-- 虚脱/全身无力 -->
          <el-check-tag
            :checked="form.HasExhaustion"
            type="primary"
            @change="toggleTag('HasExhaustion')"
          >
            虚脱/全身无力
          </el-check-tag>
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
      visible: false, // 控制弹窗显示
      form: {
        ContactWithFeverPatient: '',
        ContactWithDiarrheaPatient: '',
        ContactWithRashPatient: '',
        ContactWithTuberculosisPatient: '',
      },

      rules: {},
    };
  },
  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
      if (field === "HasDehydration" && !this.form[field]) {
        this.form.Dehydration = "";
      }
      if (field === "HasLymphNodeSwelling" && !this.form[field]) {
        this.form.HasLymphNodeSwellingGroin = false;
        this.form.HasLymphNodeSwellingArmpit = false;
        this.form.HasLymphNodeSwellingSubclavian = false;
        this.form.HasLymphNodeSwellingNeck = false;
        this.form.HasLymphNodeSwellingElbow = false;
        this.form.HasLymphNodeSwellingPopliteal = false;
      }
    },
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },
    handleSubmit() {
      console.log("触发");
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
    clearAllDiseases() {},
    clearCancerFields() {
      this.form.HasLungCancer = false;
      this.form.HasOtherCancer = false;
      this.form.OtherCancerName = "";
    },
    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    getInitialForm() {
      return {
        ContactWithFeverPatient: '',
        ContactWithDiarrheaPatient: '',
        ContactWithRashPatient: '',
        ContactWithTuberculosisPatient: ''
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
.el-form-item {
  display: flex;
  flex-direction: column;
}

.el-radio-group {
  margin-top: 5px; 
}
</style>
