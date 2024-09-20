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
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">个人基本信息</span>
          </div>
          <div class="BaseInfoDetail">
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

            <el-form-item label="打卡时间" prop="CheckInDate">
              <el-input
                v-model="form.CheckInDate"
                style="width: 200px"
                @blur="$refs.form.validateField('CheckInDate')"
                disabled
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
    showDrawer(user) {
      this.form = { ...user };
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },

    getInitialForm() {
      return {
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
