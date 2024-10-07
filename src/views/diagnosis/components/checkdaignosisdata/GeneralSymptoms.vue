<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="140px"
      class="form-container"
      ref="form"
      :rules="rules"
      :disabled="allDisabled"
       
    >
      <div class="GeneralSymptoms">
        <div class="Condition">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">发热情况</span>
          </div>
          <el-form-item label="是否发热(≥37.3℃)" prop="HasFever">
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
            :disabled="allDisabled"
             
          >
            寒战
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSweating"
            type="primary"
            @change="toggleTag('HasSweating')"
            :disabled="allDisabled"
             
          >
            大汗
          </el-check-tag>
          <el-check-tag
            :checked="form.HasFatigue"
            type="primary"
            @change="toggleTag('HasFatigue')"
            :disabled="allDisabled"
             
          >
            乏力
          </el-check-tag>
          <el-check-tag
            :checked="form.HasHeadache"
            type="primary"
            @change="toggleTag('HasHeadache')"
            :disabled="allDisabled"
             
          >
            头痛
          </el-check-tag>
          <el-check-tag
            :checked="form.HasMusclePain"
            type="primary"
            @change="toggleTag('HasMusclePain')"
            :disabled="allDisabled"
             
          >
            肌肉酸痛
          </el-check-tag>
          <el-check-tag
            :checked="form.HasJointPain"
            type="primary"
            @change="toggleTag('HasJointPain')"
            :disabled="allDisabled"
             
          >
            关节酸痛
          </el-check-tag>
        </div>

        <el-check-tag
          :checked="form.HasLymphNodeSwelling"
          type="primary"
          @change="toggleTag('HasLymphNodeSwelling')"
          prop="HasLymphNodeSwelling"
          :disabled="allDisabled"
           
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
            :disabled="allDisabled"
             
          >
            腹股沟
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingArmpit"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingArmpit')"
            :disabled="allDisabled"
             
          >
            腋下
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingSubclavian"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingSubclavian')"
            :disabled="allDisabled"
             
          >
            锁骨下
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingNeck"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingNeck')"
            :disabled="allDisabled"
             
          >
            颈部
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingElbow"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingElbow')"
            :disabled="allDisabled"
             
          >
            肘
          </el-check-tag>
          <el-check-tag
            :checked="form.HasLymphNodeSwellingPopliteal"
            type="primary"
            @change="toggleTag('HasLymphNodeSwellingPopliteal')"
            :disabled="allDisabled"
             
          >
            腘窝
          </el-check-tag>
        </div>

        <div class="flex gap-2 mt-4">
          <el-check-tag
            :checked="form.HasCyanosis"
            type="primary"
            @change="toggleTag('HasCyanosis')"
            :disabled="allDisabled"
             
          >
            口唇、颜面、四肢及全身皮肤发绀
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSubcutaneousAndMucosalBleedingSpots"
            type="primary"
            @change="toggleTag('HasSubcutaneousAndMucosalBleedingSpots')"
            :disabled="allDisabled"
             
          >
            皮下及黏膜出血或出血点
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSevereAnemia"
            type="primary"
            @change="toggleTag('HasSevereAnemia')"
            :disabled="allDisabled"
             
          >
            严重贫血
          </el-check-tag>
          <el-check-tag
            :checked="form.HasPainfulRedRash"
            type="primary"
            @change="toggleTag('HasPainfulRedRash')"
            :disabled="allDisabled"
             
          >
            皮肤可见剧痛的红色丘疹
          </el-check-tag>
          <el-check-tag
            :checked="form.HasBloodBlisters"
            type="primary"
            @change="toggleTag('HasBloodBlisters')"
            :disabled="allDisabled"
             
          >
            皮肤可见周边呈灰黑色、基底坚硬的血性水泡
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSkinUlcer"
            type="primary"
            @change="toggleTag('HasSkinUlcer')"
            :disabled="allDisabled"
             
          >
            皮肤出现呈灰黑色创面的溃疡
          </el-check-tag>
          <el-check-tag
            :checked="form.HasSubcutaneousAndMucosalBleedingCavity"
            type="primary"
            @change="toggleTag('HasSubcutaneousAndMucosalBleedingCavity')"
            :disabled="allDisabled"
             
          >
            皮下及粘膜出血腔道出血
          </el-check-tag>
          <el-check-tag
            :checked="form.HasCongestiveOrPetechialRash"
            type="primary"
            @change="toggleTag('HasCongestiveOrPetechialRash')"
            :disabled="allDisabled"
             
          >
            皮疹：充血性或点状出血疹
          </el-check-tag>
          <el-check-tag
            :checked="form.HasPressureInsensitiveRash"
            type="primary"
            @change="toggleTag('HasPressureInsensitiveRash')"
            :disabled="allDisabled"
             
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
              :disabled="allDisabled"
               
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
            :disabled="allDisabled"
             
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
              :disabled="allDisabled"
               
            >
              手指
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnBackOfHands"
              type="primary"
              @change="toggleTag('ItchyRashOnBackOfHands')"
              :disabled="allDisabled"
               
            >
              手背
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnUpperLimbs"
              type="primary"
              @change="toggleTag('ItchyRashOnUpperLimbs')"
              :disabled="allDisabled"
               
            >
              上肢
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnLowerLimbs"
              type="primary"
              @change="toggleTag('ItchyRashOnLowerLimbs')"
              :disabled="allDisabled"
               
            >
              下肢
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnFeet"
              type="primary"
              @change="toggleTag('ItchyRashOnFeet')"
              :disabled="allDisabled"
               
            >
              足背
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnFace"
              type="primary"
              @change="toggleTag('ItchyRashOnFace')"
              :disabled="allDisabled"
               
            >
              面部
            </el-check-tag>
            <el-check-tag
              :checked="form.ItchyRashOnOther"
              type="primary"
              @change="toggleTag('ItchyRashOnOther')"
              :disabled="allDisabled"
               
            >
              其他
            </el-check-tag>
          </div>

          <!-- 水肿 -->
          <el-check-tag
            :checked="form.HasEdema"
            type="primary"
            @change="toggleTag('HasEdema')"
            :disabled="allDisabled"
             
          >
            水肿
          </el-check-tag>

          <!-- 盗汗 -->
          <el-check-tag
            :checked="form.HasNightSweats"
            type="primary"
            @change="toggleTag('HasNightSweats')"
            :disabled="allDisabled"
             
          >
            盗汗
          </el-check-tag>

          <!-- 消瘦 -->
          <el-check-tag
            :checked="form.HasWeightLoss"
            type="primary"
            @change="toggleTag('HasWeightLoss')"
            :disabled="allDisabled"
             
          >
            消瘦
          </el-check-tag>

          <!-- 虚脱/全身无力 -->
          <el-check-tag
            :checked="form.HasExhaustion"
            type="primary"
            @change="toggleTag('HasExhaustion')"
            :disabled="allDisabled"
             
          >
            虚脱/全身无力
          </el-check-tag>
          <el-check-tag
            :checked="form.HasWhiteBloodCells"
            type="primary"
            @change="toggleTag('HasWhiteBloodCells')"
            :disabled="allDisabled"
             
          >
            白细胞明显增高
          </el-check-tag>

          <div>
            <el-check-tag
              :checked="form.HasBloodPressureDrop"
              type="primary"
              @change="toggleTag('HasBloodPressureDrop')"
              :disabled="allDisabled"
               
            >
              血压下降
            </el-check-tag>
            <div class="NextContainer">
              <el-form-item
                label="最低血压(mmHg)"
                v-if="form.HasBloodPressureDrop"
                style="margin-left: 20px; padding: 15px 0 15px 0"
                label-position="left"
                prop="HasBloodPressureDrop"
              >
                <el-input
                  v-model="form.LowestBloodPressure"
                  style="width: 200px"
                  placeholder="请输入最低血压"
                  prop="LowestBloodPressure"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>

          <el-check-tag
            :checked="form.HasShockSyndrome"
            type="primary"
            @change="toggleTag('HasShockSyndrome')"
            :disabled="allDisabled"
             
          >
            休克症候群
          </el-check-tag>

          <el-check-tag
            :checked="form.HasHighIntracranialPressure"
            type="primary"
            @change="toggleTag('HasHighIntracranialPressures')"
            :disabled="allDisabled"
             
          >
            颅压高
          </el-check-tag>

          <el-check-tag
            :checked="form.HasTurbidCerebrospinalFluid"
            type="primary"
            @change="toggleTag('HasTurbidCerebrospinalFluid')"
            :disabled="allDisabled"
             
          >
            脑脊液浊浑
          </el-check-tag>

          <div>
            <el-check-tag
              :checked="form.HasBleeding"
              type="primary"
              @change="toggleTag('HasBleeding')"
              prop="HasBleeding"
              :disabled="allDisabled"
               
            >
              出血
            </el-check-tag>

            <div class="NextContainer">
              <el-form-item
                label="出血量(ml)"
                v-if="form.HasBleeding"
                style="margin-left: 20px; padding: 15px 0 0 0"
                label-position="left"
                prop="BleedingVolume"
              >
                <el-input
                  v-model="form.BleedingVolume"
                  style="width: 200px"
                  placeholder="请输入出血量"
                >
                </el-input>
              </el-form-item>
              <el-form-item
                label="出血腔道"
                v-if="form.HasBleeding"
                style="margin-left: 20px; padding: 0 0 15px 0"
                label-position="left"
                prop="BleedingCavity"
              >
                <el-input
                  v-model="form.BleedingCavity"
                  style="width: 200px"
                  placeholder="请输入出血腔道"
                >
                </el-input>
              </el-form-item>
            </div>
          </div>

          <el-check-tag
            :checked="form.HasPlasmaLeakage"
            type="primary"
            @change="toggleTag('HasPlasmaLeakage')"
            :disabled="allDisabled"
             
          >
            血浆渗漏表现
          </el-check-tag>

          <el-check-tag
            :checked="form.HasOtherOrganDamage"
            type="primary"
            @change="toggleTag('HasOtherOrganDamage')"
            :disabled="allDisabled"
             
          >
            其他重要脏器损伤
          </el-check-tag>

          <el-check-tag
            :checked="form.HasKernigSign"
            type="primary"
            @change="toggleTag('HasKernigSign')"
            :disabled="allDisabled"
             
          >
            Kernig征
          </el-check-tag>
          <el-check-tag
            :checked="form.HasBrudzinskiSign"
            type="primary"
            @change="toggleTag('HasBrudzinskiSign')"
            :disabled="allDisabled"
             
          >
            Brudzinski征
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
      allDisabled: true,
       
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
        HasSevereAnemia: false, // 是否严重贫血
        HasPainfulRedRash: false,
        HasBloodBlisters: false,
        HasSkinUlcer: false,
        HasSubcutaneousAndMucosalBleedingCavity: false, //皮下及粘膜出血腔道出血
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

        HasWhiteBloodCells: false, //是否白细胞明显增高
        HasBloodPressureDrop: false, // 是否血压下降
        LowestBloodPressure: "", //最低血压（mmHg）

        HasShockSyndrome: false, //是否休克症候群
        HasHighIntracranialPressure: false, //是否颅压高
        HasTurbidCerebrospinalFluid: false, // 是否脑脊液浊浑

        HasBleeding: false, // 是否出血
        BleedingVolume: "", //INT 出血量（ml）
        BleedingCavity: "", // VARCHAR(255), -- 出血腔道

        HasPlasmaLeakage: false, // 是否血浆渗漏表现
        HasOtherOrganDamage: false, // 是否其他重要脏器损伤

        HasKernigSign: false, // 是否Kernig征
        HasBrudzinskiSign: false, //是否Brudzinski征
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
      if (field === "HasItchyRash" && !this.form[field]) {
        this.form.ItchyRashOnFingers = false;
        this.form.ItchyRashOnBackOfHands = false;
        this.form.ItchyRashOnUpperLimbs = false;
        this.form.ItchyRashOnLowerLimbs = false;
        this.form.ItchyRashOnFeet = false;
        this.form.ItchyRashOnFace = false;
        this.form.ItchyRashOnOther = false;
      }
      // 清空血压下降子项
      if (field === "HasBloodPressureDrop" && !this.form[field]) {
        this.form.LowestBloodPressure = "";
      }
      // 清空出血子项
      if (field === "HasBleeding" && !this.form[field]) {
        this.form.BleedingVolume = "";
        this.form.BleedingCavity = "";
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        // 验证失水
        if (this.form.HasDehydration && !this.form.Dehydration) {
          return reject(new Error("请选择失水程度"));
        }

        // 验证淋巴结肿大
        if (this.form.HasLymphNodeSwelling) {
          const hasSelectedLymphNode =
            this.form.HasLymphNodeSwellingGroin ||
            this.form.HasLymphNodeSwellingArmpit ||
            this.form.HasLymphNodeSwellingSubclavian ||
            this.form.HasLymphNodeSwellingNeck ||
            this.form.HasLymphNodeSwellingElbow ||
            this.form.HasLymphNodeSwellingPopliteal;

          if (!hasSelectedLymphNode) {
            return reject(new Error("请选择淋巴结肿大的部位"));
          }
        }

        // 验证瘙痒性斑丘疹/水疱
        if (this.form.HasItchyRash) {
          const hasSelectedRashLocation =
            this.form.ItchyRashOnFingers ||
            this.form.ItchyRashOnBackOfHands ||
            this.form.ItchyRashOnUpperLimbs ||
            this.form.ItchyRashOnLowerLimbs ||
            this.form.ItchyRashOnFeet ||
            this.form.ItchyRashOnFace ||
            this.form.ItchyRashOnOther;

          if (!hasSelectedRashLocation) {
            return reject(new Error("请选择瘙痒性斑丘疹/水疱的部位"));
          }
        }

        // 验证血压下降
        if (this.form.HasBloodPressureDrop && !this.form.LowestBloodPressure) {
          return reject(new Error("请输入最低血压"));
        }

        // 验证出血
        if (this.form.HasBleeding) {
          if (!this.form.BleedingVolume || !this.form.BleedingCavity) {
            return reject(new Error("请填写出血量和出血腔道"));
          }
        }

        // 验证通过
        this.$refs.form.validate((valid) => {
          valid
            ? resolve()
            : reject(new Error("表单提交失败，请检查必填字段是否未填写"));
        });
      });
    },

    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },

    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    handleAble() {
      this.allDisabled = false;
       
    },
    handleCancel(){
      this.allDisabled = true;
       
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
        HasSevereAnemia: false, // 是否严重贫血
        HasPainfulRedRash: false,
        HasBloodBlisters: false,
        HasSkinUlcer: false,
        HasSubcutaneousAndMucosalBleedingCavity: false, //皮下及粘膜出血腔道出血
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

        HasWhiteBloodCells: false, //是否白细胞明显增高
        HasBloodPressureDrop: false, // 是否血压下降
        LowestBloodPressure: "", //最低血压（mmHg）

        HasShockSyndrome: false, //是否休克症候群
        HasHighIntracranialPressure: false, //是否颅压高
        HasTurbidCerebrospinalFluid: false, // 是否脑脊液浊浑

        HasBleeding: false, // 是否出血
        BleedingVolume: "", //INT 出血量（ml）
        BleedingCavity: "", // VARCHAR(255), -- 出血腔道

        HasPlasmaLeakage: false, // 是否血浆渗漏表现
        HasOtherOrganDamage: false, // 是否其他重要脏器损伤

        HasKernigSign: false, // 是否Kernig征
        HasBrudzinskiSign: false, //是否Brudzinski征
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
.NextContainer {
  width: 380px;
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
</style>
