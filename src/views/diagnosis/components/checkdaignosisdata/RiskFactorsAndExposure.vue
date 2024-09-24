<template>
  <div>
    <el-form :model="form" label-width="160px" ref="form" label-position="left" :rules="rules" :disabled="allDisabled" :readonly="allReadonly">
      <div class="Symptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">有无并发症</span>
          </div>
          <el-radio-group
            v-model="form.HasComplications"
          >
            <el-radio :value="true">有</el-radio>
            <el-radio :value="false">无</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div v-if="form.HasComplications">
        <div class="Symptoms">
          <div class="Condition">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">并发症</span>
            </div>
            <div class="flex gap-2">
              <el-check-tag
                :checked="form.HasViralPneumonia"
                type="primary"
                @change="toggleTag('HasViralPneumonia')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                病毒性肺炎
              </el-check-tag>
              <el-check-tag
                :checked="form.HasBacterialPneumonia"
                type="primary"
                @change="toggleTag('HasBacterialPneumonia')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                细菌性肺炎
              </el-check-tag>
              <el-check-tag
                :checked="form.HasFungalPneumonia"
                type="primary"
                @change="toggleTag('HasFungalPneumonia')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                真菌性肺炎
              </el-check-tag>
              <el-check-tag
                :checked="form.HasRespiratoryFailure"
                type="primary"
                @change="toggleTag('HasRespiratoryFailure')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                呼吸衰竭
              </el-check-tag>
              <el-check-tag
                :checked="form.HasARDS"
                type="primary"
                @change="toggleTag('HasARDS')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                急性呼吸窘迫综合征(ARDS)
              </el-check-tag>
              <el-check-tag
                :checked="form.HasDIC"
                type="primary"
                @change="toggleTag('HasDIC')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                弥散性血管内凝血（DIC）
              </el-check-tag>
              <el-check-tag
                :checked="form.HasToxicShock"
                type="primary"
                @change="toggleTag('HasToxicShock')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                感染中毒性休克
              </el-check-tag>
              <el-check-tag
                :checked="form.HasMeningitis"
                type="primary"
                @change="toggleTag('HasMeningitis')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                脑膜炎
              </el-check-tag>
              <el-check-tag
                :checked="form.HasEncephalitis"
                type="primary"
                @change="toggleTag('HasEncephalitis')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                脑炎
              </el-check-tag>
              <el-check-tag
                :checked="form.HasBacteremia"
                type="primary"
                @change="toggleTag('HasBacteremia')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                菌血症
              </el-check-tag>
              <el-check-tag
                :checked="form.HasMyocarditis"
                type="primary"
                @change="toggleTag('HasMyocarditis')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                心肌炎
              </el-check-tag>
              <el-check-tag
                :checked="form.HasAcuteLungInjury"
                type="primary"
                @change="toggleTag('HasAcuteLungInjury')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                急性肺损伤/ARDS
              </el-check-tag>
              <el-check-tag
                :checked="form.HasAcuteKidneyInjury"
                type="primary"
                @change="toggleTag('HasAcuteKidneyInjury')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                急性肾损伤
              </el-check-tag>
              <el-check-tag
                :checked="form.HasEpilepsy"
                type="primary"
                @change="toggleTag('HasEpilepsy')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                癫痫
              </el-check-tag>
              <el-check-tag
                :checked="form.HasToxicHepatitis"
                type="primary"
                @change="toggleTag('HasToxicHepatitis')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                中毒性肝炎
              </el-check-tag>
              <el-check-tag
                :checked="form.HasFluidOverload"
                type="primary"
                @change="toggleTag('HasFluidOverload')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                输液过量
              </el-check-tag>
              <el-check-tag
                :checked="form.HasSuperinfection"
                type="primary"
                @change="toggleTag('HasSuperinfection')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                二重感染
              </el-check-tag>
              <el-check-tag
                :checked="form.HasHypoxemia"
                type="primary"
                @change="toggleTag('HasHypoxemia')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                低氧血症
              </el-check-tag>
              <el-check-tag
                :checked="form.HasSepticShock"
                type="primary"
                @change="toggleTag('HasSepticShock')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                脓毒症休克
              </el-check-tag>
              <el-check-tag
                :checked="form.HasMetabolicAcidosis"
                type="primary"
                @change="toggleTag('HasMetabolicAcidosis')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                代谢性酸中毒
              </el-check-tag>
              <el-check-tag
                :checked="form.HasElectrolyteImbalance"
                type="primary"
                @change="toggleTag('HasElectrolyteImbalance')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                电解质及酸碱失衡
              </el-check-tag>
              <el-check-tag
                :checked="form.HasHemolysis"
                type="primary"
                @change="toggleTag('HasHemolysis')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                急性血管内溶血
              </el-check-tag>
              <el-check-tag
                :checked="form.HasGastrointestinalBleeding"
                type="primary"
                @change="toggleTag('HasGastrointestinalBleeding')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                消化道出血
              </el-check-tag>
              <el-check-tag
                :checked="form.HasCoagulationDisorder"
                type="primary"
                @change="toggleTag('HasCoagulationDisorder')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                凝血功能障碍
              </el-check-tag>
              <el-check-tag
                :checked="form.HasMultipleOrganFailure"
                type="primary"
                @change="toggleTag('HasMultipleOrganFailure')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                多器官功能衰竭
              </el-check-tag>
              <el-check-tag
                :checked="form.HasAnemia"
                type="primary"
                @change="toggleTag('HasAnemia')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                贫血
              </el-check-tag>
              <el-check-tag
                :checked="form.HasHepatosplenomegaly"
                type="primary"
                @change="toggleTag('HasHepatosplenomegaly')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                肝脾肿大
              </el-check-tag>
              <el-check-tag
                :checked="form.HasBrainEdema"
                type="primary"
                @change="toggleTag('HasBrainEdema')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                脑水肿
              </el-check-tag>
              <el-check-tag
                :checked="form.HasHUS"
                type="primary"
                @change="toggleTag('HasHUS')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                溶血性尿毒综合征
              </el-check-tag>
              <el-check-tag
                :checked="form.HasHematemesis"
                type="primary"
                @change="toggleTag('HasHematemesis')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                呕血
              </el-check-tag>
              <el-check-tag
                :checked="form.HasMelena"
                type="primary"
                @change="toggleTag('HasMelena')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                便血
              </el-check-tag>
              <el-check-tag
                :checked="form.HasHemoptysis"
                type="primary"
                @change="toggleTag('HasHemoptysis')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                咯血
              </el-check-tag>
              <el-check-tag
                :checked="form.HasAbdominalHemorrhage"
                type="primary"
                @change="toggleTag('HasAbdominalHemorrhage')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                腹腔出血
              </el-check-tag>
              <el-check-tag
                :checked="form.HasHypovolemicShock"
                type="primary"
                @change="toggleTag('HasHypovolemicShock')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                低血容量休克
              </el-check-tag>

              <el-check-tag
                :checked="form.OtherComplications"
                type="primary"
                @change="toggleTag('OtherComplications')"
                :disabled="allDisabled" :readonly="allReadonly"
              >
                其他
              </el-check-tag>
              <div class="NextContainer">
                <el-form-item
                  v-if="form.OtherComplications"
                  label="其他并发症"
                  style="margin-left: 20px; padding: 15px 0 15px 0"
                  labei-position="left"
                  prop="OtherComplicationsName"
                >
                  <el-input
                    v-model="form.OtherComplicationsName"
                    placeholder="请输入其他并发症"
                    style="width: 200px"
                  />
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allDisabled:true,allReadonly:true,
      form: {
        HasComplications: false,
        HasViralPneumonia: false,
        HasBacterialPneumonia: false,
        HasFungalPneumonia: false,
        HasRespiratoryFailure: false,
        HasARDS: false,
        HasDIC: false,
        HasToxicShock: false,
        HasMeningitis: false,
        HasEncephalitis: false,
        HasBacteremia: false,
        HasMyocarditis: false,
        HasAcuteLungInjury: false,
        HasAcuteKidneyInjury: false,
        HasEpilepsy: false,
        HasToxicHepatitis: false,
        HasFluidOverload: false,
        HasSuperinfection: false,
        HasHypoxemia: false,
        HasSepticShock: false,
        HasMetabolicAcidosis: false,
        HasElectrolyteImbalance: false,
        HasHemolysis: false,
        HasGastrointestinalBleeding: false,
        HasCoagulationDisorder: false,
        HasMultipleOrganFailure: false,
        HasAnemia: false,
        HasHepatosplenomegaly: false,
        HasBrainEdema: false,
        HasHUS: false,
        HasHematemesis: false,
        HasMelena: false,
        HasHemoptysis: false,
        HasAbdominalHemorrhage: false,
        HasHypovolemicShock: false,
        OtherComplications: false,
        OtherComplicationsName: "",
      },
      rules: {
        OtherComplicationsName:[
          {required:true,message:"请输入其他并发症"}
        ]
      },
    };
  },
  methods: {
    toggleTag(field) {
      this.form[field] = !this.form[field];
      if (field === "OtherComplications" && !this.form[field]) {
        this.form.OtherComplicationsName = "";
      }
    },
      validate() {
      return new Promise((resolve, reject) => {
        // 选择了有并发症，必须选择子选项
        if (this.form.HasComplications) {
          const hasComplications=
          this.form.HasViralPneumonia||
        this.form.HasBacterialPneumonia ||
        this.form.HasFungalPneumonia ||
        this.form.HasRespiratoryFailure ||
        this.form.HasARDS ||
        this.form.HasDIC ||
        this.form.HasToxicShock ||
        this.form.HasMeningitis ||
        this.form.HasEncephalitis ||
        this.form.HasBacteremia ||
        this.form.HasMyocarditis ||
        this.form.HasAcuteLungInjury ||
        this.form.HasAcuteKidneyInjury ||
        this.form.HasEpilepsy ||
        this.form.HasToxicHepatitis ||
        this.form.HasFluidOverload ||
        this.form.HasSuperinfection ||
        this.form.HasHypoxemia ||
        this.form.HasSepticShock ||
        this.form.HasMetabolicAcidosis ||
        this.form.HasElectrolyteImbalance ||
        this.form.HasHemolysis ||
        this.form.HasGastrointestinalBleeding ||
        this.form.HasCoagulationDisorder ||
        this.form.HasMultipleOrganFailure ||
        this.form.HasAnemia ||
        this.form.HasHepatosplenomegaly ||
        this.form.HasBrainEdema ||
        this.form.HasHUS ||
        this.form.HasHematemesis ||
        this.form.HasMelena ||
        this.form.HasHemoptysis ||
        this.form.HasAbdominalHemorrhage ||
        this.form.HasHypovolemicShock ||
        this.form.OtherComplications;
        if(!hasComplications)
        {
          return reject(new Error("请选择并发症"));
        }
        }
        // 验证通过
        this.$refs.form.validate((valid) => {
          valid ? resolve() : reject(new Error("表单提交失败，请检查必填字段是否未填写"));
        });
      });
    },
    getData(){
      return this.form;
    },
    handleReset(){
      this.form = this.getInitialForm();
    },
    getInitialForm() {
      return {
        HasComplications: false,
        HasViralPneumonia: false,
        HasBacterialPneumonia: false,
        HasFungalPneumonia: false,
        HasRespiratoryFailure: false,
        HasARDS: false,
        HasDIC: false,
        HasToxicShock: false,
        HasMeningitis: false,
        HasEncephalitis: false,
        HasBacteremia: false,
        HasMyocarditis: false,
        HasAcuteLungInjury: false,
        HasAcuteKidneyInjury: false,
        HasEpilepsy: false,
        HasToxicHepatitis: false,
        HasFluidOverload: false,
        HasSuperinfection: false,
        HasHypoxemia: false,
        HasSepticShock: false,
        HasMetabolicAcidosis: false,
        HasElectrolyteImbalance: false,
        HasHemolysis: false,
        HasGastrointestinalBleeding: false,
        HasCoagulationDisorder: false,
        HasMultipleOrganFailure: false,
        HasAnemia: false,
        HasHepatosplenomegaly: false,
        HasBrainEdema: false,
        HasHUS: false,
        HasHematemesis: false,
        HasMelena: false,
        HasHemoptysis: false,
        HasAbdominalHemorrhage: false,
        HasHypovolemicShock: false,
        OtherComplications: false,
        OtherComplicationsName: "",
      };
    },
  },
};
</script>

<style scoped>
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: var(--el-color-primary) !important;
  color: #fff !important;
  border-color: var(--el-color-primary) !important;
  font-weight: normal;
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
.Symptoms {
  margin-top: 20px;
  margin-left: 20px;
}
.NextContainer {
  width: 400px;
}
.Condition {
  margin-top: 20px;
}
.el-radio {
  margin-left: 20px;
}
</style>
