<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="140px"
      class="form-container"
      ref="form"
      :rules="rules"
      :disabled="allDisabled" :readonly="allReadonly"
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">发热情况</span>
          </div>
          <el-form-item label="是否发热(≥37.3℃)" prop="HasFever" >
            <el-select
              v-model="form.HasFever"
              placeholder="是否发热"
              clearable
              size="default"
              style="width: 200px"
            >
              <el-option :key="1" label="是" :value="1"></el-option>
              <el-option :key="2" label="否" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="最高体温(℃)"
            v-if="form.HasFever === 1"
            prop="HighestTemperature"
          >
            <el-input
              v-model="form.HighestTemperature"
              placeholder="最高体温"
              clearable
              size="default"
              style="width: 200px"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="持续时间(h)"
            v-if="form.HasFever === 1"
            prop="FeverDuration"
          >
            <el-input
              v-model="form.FeverDuration"
              placeholder="最高体温"
              clearable
              size="default"
              style="width: 200px"
            >
            </el-input>
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
            :disabled="allDisabled" :readonly="allReadonly"
          >
            寒战
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSweating"
            type="primary"
            @change="toggleTag('HasSweating')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            大汗
          </el-check-tag>
          <el-check-tag
            :checked="form.HasFatigue"
            type="primary"
            @change="toggleTag('HasFatigue')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            乏力
          </el-check-tag>
          <el-check-tag
            :checked="form.HasHeadache"
            type="primary"
            @change="toggleTag('HasHeadache')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            头痛
          </el-check-tag>
          <el-check-tag
            :checked="form.HasMusclePain"
            type="primary"
            @change="toggleTag('HasMusclePain')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            肌肉酸痛
          </el-check-tag>
          <el-check-tag
            :checked="form.HasJointPain"
            type="primary"
            @change="toggleTag('HasJointPain')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            关节酸痛
          </el-check-tag>
        </div>

        <el-check-tag
          :checked="form.HasLymphNodeSwelling"
          type="primary"
          @change="toggleTag('HasLymphNodeSwelling')"
          prop="HasLymphNodeSwelling"
          :disabled="allDisabled" :readonly="allReadonly"
        >
          淋巴结肿大
        </el-check-tag>

        <div
          v-if="form.HasLymphNodeSwelling"
          class="flex gap-2 mt-4"
          style="margin-left: 20px"
        >
          <!-- <span style="color: red">*</span> -->
          <el-check-tag
            :checked="form.HasLymphNodeSwellingGroin"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingGroin')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            腹股沟
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingArmpit"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingArmpit')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            腋下
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingSubclavian"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingSubclavian')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            锁骨下
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingNeck"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingNeck')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            颈部
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingElbow"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingElbow')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            肘
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingPopliteal"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingPopliteal')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            腘窝
          </el-check-tag>
        </div>

        <div class="flex gap-2 mt-4">
          <el-check-tag
            :checked="form.HasCyanosis"
            type="primary"
            @change="toggleTag('HasCyanosis')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            口唇、颜面、四肢及全身皮肤发绀
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSubcutaneousAndMucosalBleedingSpots"
            type="primary"
            @change="toggleTag('HasSubcutaneousAndMucosalBleedingSpots')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            皮下及黏膜出血或出血点
          </el-check-tag>
          <el-check-tag
            :checked="form.HasPainfulRedRash"
            type="primary"
            @change="toggleTag('HasPainfulRedRash')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            皮肤可见剧痛的红色丘疹
          </el-check-tag>
          <el-check-tag
            :checked="form.HasBloodBlisters"
            type="primary"
            @change="toggleTag('HasBloodBlisters')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            皮肤可见周边呈灰黑色、基底坚硬的血性水泡
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSkinUlcer"
            type="primary"
            @change="toggleTag('HasSkinUlcer')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            皮肤出现呈灰黑色创面的溃疡
          </el-check-tag>
          <el-check-tag
            :checked="form.HasCongestiveOrPetechialRash"
            type="primary"
            @change="toggleTag('HasCongestiveOrPetechialRash')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            皮疹：充血性或点状出血疹
          </el-check-tag>
          <el-check-tag
            :checked="form.HasPressureInsensitiveRash"
            type="primary"
            @change="toggleTag('HasPressureInsensitiveRash')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            皮疹：起初压之退色，后期压之不退，多见于四肢、躯干，面部一般没有
          </el-check-tag>

          <!-- 失水 -->
          <div class="Dehydration" style="">
            <el-check-tag
              :checked="form.HasDehydration"
              type="primary"
              @change="toggleTag('HasDehydration')"
              prop="HasDehydration"
              :disabled="allDisabled" :readonly="allReadonly"
            >
              失水
            </el-check-tag>

            <div class="NextContainer">
              <el-form-item
                v-if="form.HasDehydration"
                style="padding: 15px 0 15px 0; margin-left: 20px"
                prop="Dehydration"
                label="失水程度"
                label-position="left"
              >
                <el-radio-group v-model="form.Dehydration">
                  <el-radio :value="'重度'">重度</el-radio>
                  <el-radio :value="'中度'">中度</el-radio>
                  <el-radio :value="'轻度'">轻度</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>

          <!-- 瘙痒性斑丘疹/水疱 -->
          <el-check-tag
            :checked="form.HasItchyRash"
            type="primary"
            @change="toggleTag('HasItchyRash')"
            style="display: block; width: 154px"
            prop="HasItchyRash"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            瘙痒性斑丘疹/水疱
          </el-check-tag>

          <div
            v-if="form.HasItchyRash"
            @change="handleHasItchyRashChange"
            style="margin-left: 20px"
          >
            <!-- <span style="color: red">*</span> -->
            <el-check-tag
              :checked="form.ItchyRashOnFingers"
              type="primary"
              @change="toggleTag('ItchyRashOnFingers')"
              :disabled="allDisabled" :readonly="allReadonly"

            >
              手指
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnBackOfHands"
              type="primary"
              @change="toggleTag('ItchyRashOnBackOfHands')"
              :disabled="allDisabled" :readonly="allReadonly"
            >
              手背
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnUpperLimbs"
              type="primary"
              @change="toggleTag('ItchyRashOnUpperLimbs')"
              :disabled="allDisabled" :readonly="allReadonly"
            >
              上肢
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnLowerLimbs"
              type="primary"
              @change="toggleTag('ItchyRashOnLowerLimbs')"
              :disabled="allDisabled" :readonly="allReadonly"
            >
              下肢
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnFeet"
              type="primary"
              @change="toggleTag('ItchyRashOnFeet')"
              :disabled="allDisabled" :readonly="allReadonly"
            >
              足背
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnFace"
              type="primary"
              @change="toggleTag('ItchyRashOnFace')"
              :disabled="allDisabled" :readonly="allReadonly"
            >
              面部
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnOther"
              type="primary"
              @change="toggleTag('ItchyRashOnOther')"
              :disabled="allDisabled" :readonly="allReadonly"
            >
              其他
            </el-check-tag>
          </div>

          <!-- 水肿 -->
          <el-check-tag
            :checked="form.HasEdema"
            type="primary"
            @change="toggleTag('HasEdema')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            水肿
          </el-check-tag>

          <!-- 盗汗 -->
          <el-check-tag
            :checked="form.HasNightSweats"
            type="primary"
            @change="toggleTag('HasNightSweats')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            盗汗
          </el-check-tag>

          <!-- 消瘦 -->
          <el-check-tag
            :checked="form.HasWeightLoss"
            type="primary"
            @change="toggleTag('HasWeightLoss')"
            :disabled="allDisabled" :readonly="allReadonly"
          >
            消瘦
          </el-check-tag>

          <!-- 虚脱/全身无力 -->
          <el-check-tag
            :checked="form.HasExhaustion"
            type="primary"
            @change="toggleTag('HasExhaustion')"
            :disabled="allDisabled" :readonly="allReadonly"
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
      allDisabled:true,allReadonly:true,
      visible: false, // 控制弹窗显示
      form: {
        HasFever: null,
        HasChills: false,
        HasSweating: false,
        HasFatigue: false,
        HasHeadache: false,
        HasMusclePain: false,
        HasJointPain: false,
        HasLymphNodeSwelling: false,
        HasLymphNodeSwellingGroin: false,
        HasLymphNodeSwellingArmpit: false,
        HasLymphNodeSwellingSubclavian: false,
        HasLymphNodeSwellingNeck: false,
        HasLymphNodeSwellingElbow: false,
        HasLymphNodeSwellingPopliteal: false,
        HasCyanosis: false,
        HasSubcutaneousAndMucosalBleedingSpots: false,
        HasPainfulRedRash: false,
        HasBloodBlisters: false,
        HasSkinUlcer: false,
        HasCongestiveOrPetechialRash: false,
        HasPressureInsensitiveRash: false,
        HasDehydration: false,
        Dehydration: "",

        HasItchyRash: false,
        ItchyRashOnFingers: false,
        ItchyRashOnBackOfHands: false,
        ItchyRashOnUpperLimbs: false,
        ItchyRashOnLowerLimbs: false,
        ItchyRashOnFeet: false,
        ItchyRashOnFace: false,
        ItchyRashOnOther: false,

        HasEdema: false,
        HasNightSweats: false,
        HasWeightLoss: false,
        HasExhaustion: false,
      },

      rules: {},
    };
  },
  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
      // 失水未被选中时，其子选项清空
      if (field === "HasDehydration" && !this.form[field]) {
        this.form.Dehydration = "";
      }
      // 淋巴结肿大未被选中时，其子选项全部清空
      if (field === "HasLymphNodeSwelling" && !this.form[field]) {
        this.form.HasLymphNodeSwellingGroin = false;
        this.form.HasLymphNodeSwellingArmpit = false;
        this.form.HasLymphNodeSwellingSubclavian = false;
        this.form.HasLymphNodeSwellingNeck = false;
        this.form.HasLymphNodeSwellingElbow = false;
        this.form.HasLymphNodeSwellingPopliteal = false;
      }
      // 瘙痒性斑丘疹/水疱未被选中时，其子选项全部清空
      if(field === "HasItchyRash" && !this.form[field] ){
         this.form.ItchyRashOnFingers = false;
        this.form.ItchyRashOnBackOfHands = false;
        this.form.ItchyRashOnUpperLimbs = false;
        this.form.ItchyRashOnLowerLimbs = false;
        this.form.ItchyRashOnFeet = false;
        this.form.ItchyRashOnFace = false;
        this.form.ItchyRashOnOther = false;
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
        HasFever: null,
        HasChills: false,
        HasSweating: false,
        HasFatigue: false,
        HasHeadache: false,
        HasMusclePain: false,
        HasJointPain: false,
        HasLymphNodeSwelling: false,
        HasLymphNodeSwellingGroin: false,
        HasLymphNodeSwellingArmpit: false,
        HasLymphNodeSwellingSubclavian: false,
        HasLymphNodeSwellingNeck: false,
        HasLymphNodeSwellingElbow: false,
        HasLymphNodeSwellingPopliteal: false,
        HasCyanosis: false,
        HasSubcutaneousAndMucosalBleedingSpots: false,
        HasPainfulRedRash: false,
        HasBloodBlisters: false,
        HasSkinUlcer: false,
        HasCongestiveOrPetechialRash: false,
        HasPressureInsensitiveRash: false,
        HasDehydration: false,
        Dehydration: "",

        HasItchyRash: false,
        ItchyRashOnFingers: false,
        ItchyRashOnBackOfHands: false,
        ItchyRashOnUpperLimbs: false,
        ItchyRashOnLowerLimbs: false,
        ItchyRashOnFeet: false,
        ItchyRashOnFace: false,
        ItchyRashOnOther: false,

        HasEdema: false,
        HasNightSweats: false,
        HasWeightLoss: false,
        HasExhaustion: false,
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

</style>
