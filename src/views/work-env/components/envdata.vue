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
        <h3>查看用户工作环境</h3>
      </div>
      <el-form
        :model="form"
        label-width="166px"
        class="form-container"
        ref="form"
        :rules="rules"
        disabled
      >
        <div class="WorkEnvironmentBaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">工作环境基本信息</span>
          </div>
          <el-form-item label="工务段海拔高度(米)" prop="WorkStationAltitude">
            <el-input
              v-model="form.WorkStationAltitude"
              style="width: 200px"
              placeholder="工务段海拔高度"
              clearable
              @blur="$refs.form.validateField('WorkStationAltitude')"
            ></el-input>
          </el-form-item>

          <el-form-item label="工务段名称" prop="WorkStationName">
            <el-input
              v-model="form.WorkStationName"
              style="width: 200px"
              placeholder="工务段所在名称"
              clearable
              @blur="$refs.form.validateField('WorkStationName')"
            ></el-input>
          </el-form-item>

          <div class="Dormitory">
            <el-form-item label="宿舍幢数" prop="DormitoryBuildingNumber">
              <el-input
                v-model="form.DormitoryBuildingNumber"
                style="width: 80px"
                placeholder="宿舍幢数"
                clearable
                @blur="$refs.form.validateField('DormitoryBuildingNumber')"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="宿舍室数"
              prop="DormitoryRoomNumber"
              class="DormitoryRoomNumber"
            >
              <el-input
                v-model="form.DormitoryRoomNumber"
                style="width: 80px"
                placeholder="宿舍室数"
                clearable
                @blur="$refs.form.validateField('DormitoryRoomNumber')"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="同居人数"
              prop="DormitoryOccupants"
              class="DormitoryOccupants"
            >
              <el-input
                v-model="form.DormitoryOccupants"
                style="width: 80px"
                placeholder="宿舍同居人数"
                clearable
                @blur="$refs.form.validateField('DormitoryOccupants ')"
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item label="宿舍面积(㎡)" prop="DormitoryArea">
            <el-input
              v-model="form.DormitoryArea"
              style="width: 200px"
              placeholder="宿舍面积"
              clearable
              @blur="$refs.form.validateField('DormitoryArea')"
            ></el-input>
          </el-form-item>
          <el-form-item label="宿舍窗户可打开面积(㎡)" prop=" WindowOpenArea">
            <el-input
              v-model="form.WindowOpenArea"
              style="width: 200px"
              placeholder="宿舍窗户可打开面积"
              clearable
              @blur="$refs.form.validateField(' WindowOpenArea')"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="宿舍通风"
            prop="VentilationCondition"
            size="default"
          >
            <el-select
              v-model="form.VentilationCondition"
              placeholder="宿舍通风"
              clearable
              size="default"
              style="width: 200px"
            >
              <el-option :key="1" label="不开窗通风" :value="1"></el-option>
              <el-option :key="2" label="不定时开窗通风" :value="2"></el-option>
              <el-option :key="3" label="每日开窗通风" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="WorkEnvironmentInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">本月情况</span>
          </div>

          <div class="daytime">
            <p>
              上一周
              <span class="highlight">白天</span>
              工作时间段，平均大约和
              <el-input
                v-model="form.AvgWorkRoomPeople"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgWorkRoomPeople')"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgWorkFaceToFace"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgWorkFaceToFace')"
              />
              人进行了面对面语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgWorkPhysicalContact"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgWorkPhysicalContact')"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>

          <!-- 上一周早餐 -->
          <div class="breakfast">
            <p>
              上一周
              <span class="highlight">早餐</span>
              时间段，平均大约和
              <el-input
                v-model="form.AvgBreakfastRoomPeople"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgBreakfastRoomPeople')"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgBreakfastFaceToFace"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgBreakfastFaceToFace')"
              />
              人进行了面对面语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgBreakfastPhysicalContact"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgBreakfastPhysicalContact')"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>

          <!-- 上一周午餐 -->
          <div class="lunch">
            <p>
              上一周
              <span class="highlight">午餐</span>
              时间段，平均大约和
              <el-input
                v-model="form.AvgLunchRoomPeople"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgLunchRoomPeople')"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgLunchFaceToFace"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgLunchFaceToFace')"
              />
              人进行了面对面语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgLunchPhysicalContact"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgLunchPhysicalContact')"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>

          <!-- 上一周晚餐 -->
          <div class="dinner">
            <p>
              上一周
              <span class="highlight">晚餐</span>
              时间段，平均大约和
              <el-input
                v-model="form.AvgDinnerRoomPeople"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgDinnerRoomPeople')"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgDinnerFaceToFace"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgDinnerFaceToFace')"
              />
              人进行了面对面语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgDinnerPhysicalContact"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgDinnerPhysicalContact')"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>

          <!-- 上一周一共参加的活动 -->
          <div class="activity">
            <p>
              上一周
              <span class="highlight">共参加</span>
              <el-input
                v-model="form.CollectiveActivitiesCount"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('CollectiveActivitiesCount')"
              />
              次集体性活动（如开会），每次平均大约和
              <el-input
                v-model="form.AvgActivityRoomPeople"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgActivityRoomPeople')"
              />
              人处于同一房间/空间，大约和
              <el-input
                v-model="form.AvgActivityFaceToFace"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgActivityFaceToFace')"
              />
              人进行了语言交流（1米以内），大约和
              <el-input
                v-model="form.AvgActivityPhysicalContact"
                placeholder="请输入"
                size="small"
                class="Monthsocial"
                @blur="$refs.form.validateField('AvgActivityPhysicalContact')"
              />
              人进行了肢体接触（如握手）。
            </p>
          </div>
        </div>

        <div class="TemandPre">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">本月气温气压情况</span>
          </div>
           <el-form-item label="当月平均气压(kPa)" prop="AvgMonthlyPressure">
            <el-input
              v-model="form.AvgMonthlyPressure"
              style="width: 200px"
              placeholder="当月平均气压"
              clearable
              @blur="$refs.form.validateField('AvgMonthlyPressure')"
            ></el-input>
          </el-form-item>

          <el-form-item label="当月最高气温(℃)" prop="MaxTemperature">
            <el-input
              v-model="form.MaxTemperature"
              style="width: 200px"
              placeholder="当月平均气压"
              clearable
              @blur="$refs.form.validateField('MaxTemperature')"
            ></el-input>
          </el-form-item>

          <el-form-item label="当月最低气温(℃)" prop="MinTemperature">
            <el-input
              v-model="form.MinTemperature"
              style="width: 200px"
              placeholder="当月平均气压"
              clearable
              @blur="$refs.form.validateField('MinTemperature')"
            ></el-input>
          </el-form-item>

        </div>
      </el-form>
    </div>
  </el-drawer>
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
        WorkStationAltitude: "",
        WorkStationName: "",
        DormitoryBuildingNumber: "",
        DormitoryRoomNumber: "",
        DormitoryOccupants: "",
        DormitoryArea: "",
        WindowOpenArea: "",
        VentilationCondition: "",
        AvgWorkRoomPeople: "",
        AvgWorkFaceToFace: "",
        AvgWorkPhysicalContact: "",

        AvgBreakfastRoomPeople: "",
        AvgBreakfastFaceToFace: "",
        AvgBreakfastPhysicalContact: "",

        AvgLunchRoomPeople: "",
        AvgLunchFaceToFace: "",
        AvgLunchPhysicalContact: "",

        AvgDinnerRoomPeople: "",
        AvgDinnerFaceToFace: "",
        AvgDinnerPhysicalContact: "",

        CollectiveActivitiesCoun: "",
        AvgActivityRoomPeople: "",
        AvgActivityFaceToFace: "",
        AvgActivityPhysicalContact: "",

        AvgMonthlyPressure: "",
        MaxTemperature: "",
        MinTemperature: "",
      },

      rules: {},
    };
  },
  methods: {
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

    handleReset() {
      this.form = this.getInitialForm();
      this.message = "";
    },
    getInitialForm() {
      return {
        WorkStationAltitude: "",
        WorkStationName: "",
        DormitoryBuildingNumber: "",
        DormitoryRoomNumber: "",
        DormitoryOccupants: "",
        DormitoryArea: "",
        WindowOpenArea: "",
        VentilationCondition: "",

        AvgWorkRoomPeople: "",
        AvgWorkFaceToFace: "",
        AvgWorkPhysicalContact: "",

        AvgBreakfastRoomPeople: "",
        AvgBreakfastFaceToFace: "",
        AvgBreakfastPhysicalContact: "",

        AvgLunchRoomPeople: "",
        AvgLunchFaceToFace: "",
        AvgLunchPhysicalContact: "",

        AvgDinnerRoomPeople: "",
        AvgDinnerFaceToFace: "",
        AvgDinnerPhysicalContact: "",

        CollectiveActivitiesCoun: "",
        AvgActivityRoomPeople: "",
        AvgActivityFaceToFace: "",
        AvgActivityPhysicalContact: "",

        AvgMonthlyPressure: "",
        MaxTemperature: "",
        MinTemperature: "",
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
  padding-bottom: 25px;
  z-index: 100;
  border: 3px solid #fafafa;
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

.Dormitory {
  display: flex;
}
.DormitoryRoomNumber {
  margin-left: -60px;
}
.DormitoryOccupants {
  margin-left: -60px;
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
.WorkEnvironmentInfo {
  margin-top: 30px;
  margin-bottom: 30px;
}

p {
  font-size: 14px;
  margin-bottom: 15px;
}
.highlight {
  color: #285ac8;
  font-weight: bold;
}

.Monthsocial {
  width: 80px;
  display: inline-block;
  margin: 5px;
  font-size: 14px;
  color: #285ac8;
}
</style>
