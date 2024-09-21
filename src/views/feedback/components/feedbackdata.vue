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
        <h3>查看反馈信息</h3>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
        disabled
      >
        <div class="BaseInofo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">反馈人姓名</span>
          </div>
          <el-form-item label="" prop="Name">
            <el-input
              v-model="form.Name"
              style="width: 200px;margin-left: -60px;"
              placeholder=""
              clearable
              @blur="$refs.form.validateField('Name')"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="联系电话" prop="PhoneNumber">
            <el-input
              v-model="form.PhoneNumber"
              style="width: 200px"
              placeholder=""
              clearable
              @blur="$refs.form.validateField('PhoneNumber')"
            ></el-input>
          </el-form-item> -->



          <div class="BaseInofo">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">反馈人联系电话</span>
            </div>
           <el-form-item label="" prop="PhoneNumber">
            <el-input
              v-model="form.PhoneNumber"
              style="width: 200px;margin-left: -60px;"
              placeholder=""
              clearable
              @blur="$refs.form.validateField('PhoneNumber')"
            ></el-input>
          </el-form-item>
          </div>

          <div class="BaseInofo">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">意见标题</span>
            </div>
            <el-form-item label="" prop="FeedbackTitle">
              <el-input
                v-model="form.FeedbackTitle"
                style="width: 500px; margin-left: -60px"
                placeholder=""
                clearable
                @blur="$refs.form.validateField('FeedbackTitle')"
              ></el-input>
            </el-form-item>
          </div>

          <div class="BaseInofo">
            <div class="title-container">
              <div class="blue-box"></div>
              <span class="title-text">意见内容</span>
            </div>
            <el-form-item label="" prop="FeedbackText">
              <el-input
                v-model="form.FeedbackText"
                style="width: 500px; margin-left: -60px"
                placeholder=""
                type="textarea"
                clearable
                @blur="$refs.form.validateField('FeedbackText')"
                row="4"
              ></el-input>
            </el-form-item>
          </div>
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
        Name: "",
        PhoneNumber: "",
        FeedbackTitle: "",
        FeedbackText: "",
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
        Name: "",
        PhoneNumber: "",
        FeedbackTitle: "",
        FeedbackText: "",
      };
    },
  },
};
</script>



<style  scoped>
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


.BaseInfo {
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
</style>
