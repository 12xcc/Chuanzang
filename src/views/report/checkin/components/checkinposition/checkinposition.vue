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
        <h3>职工打卡位置详情</h3>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
        disabled
      >
      <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">个人基本信息</span>
          </div>
          <div class="BaseInfoDetail">
            <!------------------------------- 姓名 --------------------------------------->
            <el-form-item label="姓名" prop="Name">
              <el-input
                v-model="form.Name"
                style="width: 200px"
                placeholder="请输入姓名"
                @blur="$refs.form.validateField('Name')"
                clearable
              ></el-input>
            </el-form-item>

            <!------------------------------- 性别 ----------------------------------------->
            <el-form-item label="性别" prop="Gender">
               <el-input
                 v-model="form.Gender"
                style="width: 200px"
                placeholder=""
                clearable
              ></el-input>
              <!-- <el-radio-group v-model="form.Gender">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
              </el-radio-group> -->
            </el-form-item>

            <!-- 年龄 -->
            <el-form-item label="年龄" prop="Age">
              <el-input
                v-model="form.Age"
                style="width: 200px"
                placeholder="根据身份证号生成"
                clearable
              ></el-input>
            </el-form-item>

            <!-- 民族 -->
            <el-form-item label="民族" prop="Ethnicity">
              <el-input
                v-model="form.Ethnicity"
                style="width: 200px"
                placeholder=""
                clearable
              ></el-input>
              <!-- <el-radio-group v-model="form.Ethnicity">
                <el-radio value="汉族">汉族</el-radio>
                <el-radio value="藏族">藏族</el-radio>
                <el-radio value="彝族">彝族</el-radio>
                <el-radio value="其他少数民族">其他少数民族</el-radio>
              </el-radio-group> -->
            </el-form-item>

            <!-- 部门/工种 -->
            <el-form-item label="部门/工种" prop="Department">
            <el-input
                v-model="form.Department"
                style="width: 200px"
                placeholder=""
                clearable
              ></el-input>
              <!-- <el-radio-group v-model="form.Department">
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
              </el-radio-group> -->
            </el-form-item>

            <el-form-item label="打卡时间" prop="CheckInDate">
              <el-input
                v-model="form.CheckInDate"
                style="width: 200px"
                @blur="$refs.form.validateField('CheckInDate')"
                disabled
                clearable
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">打卡位置</span>
          </div>
          <NormalMap />
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import NormalMap from './map.vue'
import {selectCheckinInfoById} from '@/api/report/checkin.js'
export default {
  components: {
    NormalMap,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {},
      rules: {},
    };
  },
  methods: {
    showDrawer(statusId) {
      this.fetchCheckinPosition(statusId) 
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
     // 根据id获取用户打卡位置信息
    async fetchCheckinPosition(statusId) {
      try {
        
        const response = await selectCheckinInfoById(statusId); 

        if (response.data.code === 1) {
          const data = response.data.data;

          // 映射数据到表单中
          this.form.UserType = data.userType; // 用户类型
          this.form.Name = data.name; // 姓名
          this.form.Age = data.age; // 年龄
          this.form.Gender = data.gender; // 性别
          this.form.Ethnicity = data.ethnicity; // 民族
          this.form.Department = data.department; // 部门/工种

          // 格式化 WorkOnPlateauStartDate
          if (data.checkinDate && data.checkinDate.length === 3) {
            const [year, month, day] = data.checkinDate;
            this.form.CheckinDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          } else {
            this.form.CheckinDate = ""; 
          }
        } else {
          console.error("获取用户信息失败:", response.data.msg);
        }
      } catch (error) {
        console.error("请求出错:", error);
      }
    },
  },
};
</script>



<style  scoped>
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


.BaseInfo {
  margin-bottom: 50px;
}
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: #333333 !important;
  color: #ffffff;
  font-weight: normal;
}
.select {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
