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
        <h3>修改医院信息</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="120px"
        class="form-container"
        ref="form"
        :rules="rules"
      >
        <el-form-item label="医院名称" prop="HospitalName">
          <el-input
            v-model="form.HospitalName"
            style="width: 200px"
            placeholder="请输入医院名称"
            @blur="$refs.form.validateField('HospitalName')"
          ></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="HospitalPhoneNumber">
          <el-input
            v-model="form.HospitalPhoneNumber"
            style="width: 200px"
            placeholder="请输入医院电话"
            @blur="$refs.form.validateField('HospitalPhoneNumber')"
          ></el-input>
        </el-form-item>

         <el-form-item label="医院地址" prop="Address">
          <el-input
            v-model="form.Address"
            style="width: 200px"
            placeholder="请输入医院地址"
            @blur="$refs.form.validateField('Address')"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  components: {
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        HospitalName: '',
        HospitalPhoneNumber: '',
        Address: '',
      },

      rules: {
      },
    };
  },
  methods: {
    showDrawer(user) {
      this.form = {...user}
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
      this.message="";
    },
    getInitialForm() {
      return {
        HospitalName: '',
        HospitalPhoneNumber: '',
        Address: '',
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
</style>
