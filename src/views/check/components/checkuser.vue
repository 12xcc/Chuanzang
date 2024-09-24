<template>
  <el-drawer
    title="查找用户"
    v-model="dialogVisible"
    size="800px"
    direction="rtl"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
    <div class="container">
      <div class="title">
        <h3>查找用户</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <!-- <el-button @click="handleReset">重置</el-button> -->
          <!-- <el-button type="primary" @click="handleSubmit">提交</el-button> -->
        </div>
      </div>
      <el-form
        label-width="160px"
        class="form-container"
        ref="form"
      >
        <div>
          <el-form-item label="姓名">
            <el-input v-model="Name" placeholder="请输入姓名" clearable />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="PhoneNumber" placeholder="请输入联系电话" clearable />
          </el-form-item>
        </div>

        <div>
          <el-form-item label="性别">
            <el-select v-model="Gender" placeholder="选择性别" clearable>
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="Age" placeholder="请输入年龄" clearable />
          </el-form-item>
        </div>
      </el-form>
      <div style="margin-left: 620px">
        <el-form-item>
          <el-button type="primary" @click="searchUsers">查找</el-button>
        </el-form-item>
      </div>
    </div>

    <el-table
      v-if="filteredUsers.length"
      :data="filteredUsers"
      style="margin-top: 20px; margin-left: 40px; width: 700px"
    >
      <el-table-column prop="Name" label="姓名" width="100" />
      <el-table-column prop="Gender" label="性别" width="60" />
      <el-table-column prop="Age" label="年龄" width="60" />
      <el-table-column prop="Ethnicity" label="民族" width="80" />
      <el-table-column prop="Department" label="部门/工种" width="120" />
      <el-table-column prop="PhoneNumber" label="电话" width="120" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="selectUser(row)">添加检测信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="filteredUsers.length" style="margin-top: 20px">
      <!-- <el-button type="success" @click="confirmSelection">确认提交</el-button> -->
    </div>
    <div v-if="filteredUsers.length === 0 " style="margin-top: 20px; font-size:13px;text-align: center; color: #999">
      暂无数据
    </div>
  </el-drawer>
  <Addcheckdata ref="Addcheckdata" />
</template>

<script>
import Addcheckdata from "./addcheckdata/addcheckdata.vue";
export default {
  components: {
    Addcheckdata,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },

  emits: ["update:visible", "user-selected"],
  data() {
    return {
      Name: "",
      PhoneNumber: "",
      Gender: "",
      Age: null,
      selectedUser: null,
      filteredUsers: [],
      dialogVisible: this.visible, // 初始状态与 props 绑定
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    searchUsers() {
      this.filteredUsers = this.users.filter((user) => {
        return (
          (!this.Name || user.Name.includes(this.Name)) &&
          (!this.PhoneNumber || user.PhoneNumber.includes(this.PhoneNumber)) &&
          (!this.Gender || user.Gender === this.Gender) &&
          (!this.Age || user.Age === this.Age)
        );
      });
    },
    selectUser(row) {
      this.selectedUser = row;
      this.$refs.Addcheckdata.showDrawer(row);
    },
    confirmSelection() {
      this.$emit("user-selected", this.selectedUser);
      this.$emit("update:visible", false); // 关闭对话框
    },
    resetForm() {
      this.Name = "";
      this.PhoneNumber = "";
      this.Gender = "";
      this.Age = null;
      this.filteredUsers = [];
      this.selectedUser = null;
    },
    handleCancel() {
      this.dialogVisible = false;
      this.resetForm();
    },
  },
  watch: {
    visible(val) {
      this.dialogVisible = val; // 监听 props.visible 变化
      if (!val) {
        this.resetForm(); // 重置表单
      }
    },
  },
};
</script>

<style scoped>
.el-dialog {
  max-width: 800px;
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
  width: 800px;
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
.el-form {
  margin-top: 100px;
  display: flex;
  margin-left: -60px;
}
.el-input {
  width: 200px;
}
.el-select {
  width: 200px;
}
</style>
