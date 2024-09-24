<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    size="850px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>设置疾病权重</h3>
        <div class="footer">
          <!-- <el-button v-if="isEditing" @click="handleQuit">取消</el-button> -->
          <!-- <el-button v-if="!isEditing" @click="handleEdit">编辑</el-button> -->
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
        label-position="left"
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">疾病名称</span>
          </div>
          <div class="BaseInfoDetail">
            <!------------------------------- 姓名 --------------------------------------->
            <el-form-item label="疾病名称" prop="DiseaseTypeName">
              <el-input
                v-model="form.DiseaseTypeName"
                style="width: 200px"
                placeholder=""
                @blur="$refs.form.validateField('DiseaseTypeName')"
                clearable
                :disabled="allDisabled"
                :readonly="allReadonly"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">当前权重总分(必须等于100)</span>
          </div>
          <div class="BaseInfoDetail">
            <!------------------------------- 姓名 --------------------------------------->
            <el-form-item label="当前权重总分" prop="WeightScore ">
              <el-input
                v-model="form.WeightScore"
                style="width: 200px"
                placeholder=""
                @blur="$refs.form.validateField('WeightScore ')"
                clearable
                :disabled="allDisabled"
                :readonly="allReadonly"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <!------------------------------------ 症状标签 ------------------------------->
        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">全身症状</span>
          </div>

          <div class="slider-demo-block">
            <el-tag type="primary"> 口唇、颜面、四肢及全身皮肤发绀 </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasCyanosisScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag type="primary"> 皮下及黏膜出血或出血点 </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasSubcutaneousAndMucosalBleedingSpotsScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag type="primary"> 皮肤可见剧痛的红色丘疹 </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasPainfulRedRashScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              皮肤可见周边呈灰黑色、基底坚硬的血性水泡
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasBloodBlistersScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              皮肤出现呈灰黑色创面的溃疡
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasSkinUlcerScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              皮疹：充血性或点状出血疹
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasCongestiveOrPetechialRashScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              皮疹：起初压之退色，后期压之不退
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasPressureInsensitiveRashScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              失水
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasDehydrationScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              瘙痒性斑丘疹/水疱
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasItchyRashScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              水肿
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasEdemaScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              盗汗
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasNightSweatsScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              消瘦
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasWeightLossScore"
              show-input
            />
          </div>

          <div class="slider-demo-block">
            <el-tag
              type="primary"
            >
              虚脱/全身无力
            </el-tag>
            <el-slider
              class="custom-slider"
              v-model.number="form.HasExhaustionScore"
              show-input
            />
          </div>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  components: {},
  data() {
    return {
      allDisabled: true,
      allReadonly: true,
      visible: false, // 控制弹窗显示
      isEditing: false,
      form: {
        HasCyanosisScore: 0,
        HasSubcutaneousAndMucosalBleedingSpotsScore: 0,
        HasPainfulRedRashScore: 0,
        HasBloodBlistersScore: 10,
        HasSkinUlcerScore: 0,
        HasCongestiveOrPetechialRashScore: 0,
        HasPressureInsensitiveRashScore: 0,
        HasItchyRashScore: 0,
        ItchyRashOnFingersScore: 0,
        ItchyRashOnBackOfHandsScore: 0,
        ItchyRashOnUpperLimbsScore: 0,
        ItchyRashOnLowerLimbsScore: 0,
        ItchyRashOnFeetScore: 0,
        ItchyRashOnFaceScore: 0,
        ItchyRashOnOtherScore: 0,
        HasEdemaScore: 0,
        HasNightSweatsScore: 0,
        HasWeightLossScore: 0,
        HasExhaustionScore: 0,
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

    handleEdit() {
      this.allDisabled = false;
      this.isEditing = true; // 进入编辑模式
    },
    async handleSubmit() {
      console.log("触发");

      try {
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
  width: 850px;
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
.el-tag {
  margin: 10px;
  font-weight: normal;
}

.select {
  margin-top: 10px;
  margin-bottom: 20px;
  display: block;
}
.el-form-item {
  margin-left: 20px;
}
.slider-demo-block {
  width: 700px;
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-left: 12px;
}
.custom-slider .el-input-number {
  width: 130px !important;
}
.el-slider__input {
  width: 130px;
}
.custom-slider {
  width: 400px;
}
.el-slider {
  --el-slider-button-size: 15px !important;
}
.el-slider__runway .show-input {
  width: 200px !important;
}
</style>


