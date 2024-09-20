<template>
  <div class="container">
    <!-- 表单部分 -->
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="default"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="" prop="UserType" size="default">
        <el-select
          v-model="queryParams.UserType"
          placeholder="请选择用户类型"
          clearable
          size="default"
          style="width: 200px; margin-right: -15px"
          @change="handleUserTypeChange"
        >
          <el-option :key="1" label="系统管理员" :value="1"></el-option>
          <el-option :key="2" label="铁路职工" :value="2"></el-option>
          <el-option :key="3" label="疾控中心工作人员" :value="3"></el-option>
          <el-option :key="4" label="专职医护" :value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" prop="choice">
        <el-select
          v-model="queryParams.choice"
          placeholder="请选择字段"
          clearable
          size="default"
          style="width: 200px; margin-right: -15px"
        >
          <el-option :key="1" label="姓名" :value="1"></el-option>
          <el-option :key="2" label="电话" :value="2"></el-option>
          <el-option :key="3" label="部门/工种" :value="3"></el-option>
          <el-option :key="4" label="特殊职业" :value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" prop="check">
        <el-input
          v-model="queryParams.check"
          placeholder="请输入文本"
          clearable
          size="default"
          @keyup.enter.native="handleQuery"
          style="width: 200px !important; margin-right: -15px"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="custom-button"
          @click="handleQuery"
          plain
          size="default"
          style="margin-left: 5px"
          >搜索</el-button
        >
        <el-button
          type="primary"
          class="custom-button"
          @click="handleAdd"
          size="default"
          >添加用户</el-button
        >
        <el-button
          type="primary"
          class="custom-button"
          @click="handleImport"
          size="default"
          >批量导入</el-button
        >
        <el-button
          type="warning"
          class="custom-button"
          @click="handleDownload"
          size="default"
          >下载导入模板</el-button
        >
        <el-button
          type="primary"
          class="custom-button"
          @click="handleExport"
          size="default"
          >导出</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <div class="usertable">
      <el-table
        :header-cell-style="{
          height: '40px',
          background: '#f5f7fa',
          color: '#333333',
        }"
        v-loading="loading"
        :data="paginatedData"
        style="width: 100%"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="serialNumber" label="序号" width="80" />
        <el-table-column prop="UserType" label="用户类型" width="150" />
        <el-table-column prop="Name" label="姓名" width="150" />
        <el-table-column prop="PhoneNumber" label="电话" width="120" />
        <el-table-column prop="Gender" label="性别" width="100" />
        <el-table-column prop="Age" label="年龄" width="100" />
        <el-table-column prop="Ethnicity" label="民族" width="120" />
        <el-table-column prop="EducationLevel" label="学历" width="120" />
        <el-table-column
          prop="WorkOnPlateauStartDate"
          label="高原工作时间"
          width="120"
        />
        <el-table-column prop="Department" label="部门/工种" width="120" />
        <el-table-column
          prop="SpecificOccupation"
          label="特殊职业"
          min-width="120"
        />
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClick(scope.row)"
            >
              查看
            </el-button>
            <el-button link type="primary" size="large" @click="handleClickEdit(scope.row)">编辑</el-button>
            <el-button
              link
              :type="scope.row.isActive ? 'primary' : 'danger'"
              size="large"
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.isActive ? "可用" : "禁用" }}
            </el-button>
            <template v-if="scope.row.isActive">
              <el-button
                link
                type="primary"
                size="large"
                @click="initializePassword(scope.row)"
              >
                初始化密码
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        @pagination="handlePagination"
      />
    </div>
  </div>
  <AddUserDialog ref="AddUserDialog" @add-user="handleAddUser" />
  <BatchImportDialog ref="batchImportDialog" @import="handleImportData" />
  <Checkuserdata ref="Checkuserdata" />
  <Editdata ref="Editdata" />
</template>

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import AddUserDialog from "./components/adduserdialog.vue";
import BatchImportDialog from "./components/batchimportdialog.vue";
import Checkuserdata from "./components/checkuserdata.vue";
import Editdata from './components/editdata.vue'

export default {
  components: {
    Pagination,
    AddUserDialog,
    BatchImportDialog,
    Checkuserdata,
    Editdata,
  },

  data() {
    return {
      queryParams: {
        UserType: "",
        choice: "",
        check: "",
        pageNum: 1,
        pageSize: 15,
      },
      allData: [
        {
        serialNumber: 1,
          UserType: "铁路职工",
          Name: "张伟",
          PhoneNumber: "13800000001",
          Gender: "男",
          Age: "44",
          Ethnicity: "汉族",
          EducationLevel: "大专/本科",
          WorkOnPlateauStartDate: "2010-08-15",
          Department: "工程技术部",
          SpecificOccupation: "否",
          isActive: true,
        },
        {
          serialNumber: 2,
          UserType: "铁路职工",
          Name: "李四",
          PhoneNumber: "13800000002",
          Gender: "男",
          Age: "38",
          Ethnicity: "汉族",
          EducationLevel: "大专/本科",
          WorkOnPlateauStartDate: "2012-04-20",
          Department: "技术部",
          SpecificOccupation: "是",
          isActive: true,
        },
        {
          serialNumber: 3,
          UserType: "系统管理员",
          Name: "王芳",
          PhoneNumber: "13900000003",
          Gender: "女",
          Age: "32",
          Ethnicity: "汉族",
          EducationLevel: "硕士及以上",
          WorkOnPlateauStartDate: "2015-09-10",
          Department: "人力资源部",
          SpecificOccupation: "否",
          isActive: true,
        },
        {
          serialNumber: 4,
          UserType: "疾控中心工作人员",
          Name: "赵强",
          PhoneNumber: "13700000004",
          Gender: "男",
          Age: "45",
          Ethnicity: "汉族",
          EducationLevel: "大专/本科",
          WorkOnPlateauStartDate: "2018-03-25",
          Department: "公共卫生部",
          SpecificOccupation: "是",
          isActive: false,
        },
        {
          serialNumber: 5,
          UserType: "专职医护",
          Name: "孙婷",
          PhoneNumber: "13600000005",
          Gender: "女",
          Age: "29",
          Ethnicity: "汉族",
          EducationLevel: "大专/本科",
          WorkOnPlateauStartDate: "2020-01-30",
          Department: "急诊科",
          SpecificOccupation: "否",
          isActive: true,
        },
        {
          serialNumber: 6,
          UserType: "铁路职工",
          Name: "刘洋",
          PhoneNumber: "13500000006",
          Gender: "男",
          Age: "40",
          Ethnicity: "汉族",
          EducationLevel: "大专/本科",
          WorkOnPlateauStartDate: "2011-12-01",
          Department: "运输部",
          SpecificOccupation: "是",
          isActive: false,
        },
        {
          serialNumber: 7,
          UserType: "系统管理员",
          Name: "陈刚",
          PhoneNumber: "13400000007",
          Gender: "男",
          Age: "50",
          Ethnicity: "汉族",
          EducationLevel: "硕士及以上",
          WorkOnPlateauStartDate: "2012-11-20",
          Department: "信息技术部",
          SpecificOccupation: "否",
          isActive: true,
        },
        {
          serialNumber: 8,
          UserType: "专职医护",
          Name: "杨美",
          PhoneNumber: "13300000008",
          Gender: "女",
          Age: "34",
          Ethnicity: "汉族",
          EducationLevel: "大专/本科",
          WorkOnPlateauStartDate: "2017-07-10",
          Department: "内科",
          SpecificOccupation: "是",
          isActive: false,
        },
        {
          serialNumber: 9,
          UserType: "疾控中心工作人员",
          Name: "吴军",
          PhoneNumber: "13200000009",
          Gender: "男",
          Age: "42",
          Ethnicity: "汉族",
          EducationLevel: "大专/本科",
          WorkOnPlateauStartDate: "2014-05-15",
          Department: "流行病部",
          SpecificOccupation: "否",
          isActive: true,
        },
        {
          serialNumber: 10,
          UserType: "铁路职工",
          Name: "陈梅",
          PhoneNumber: "13100000010",
          Gender: "女",
          Age: "37",
          Ethnicity: "汉族",
          EducationLevel: "大专/本科",
          WorkOnPlateauStartDate: "2016-08-25",
          Department: "维修部",
          SpecificOccupation: "是",
          isActive: false,
        },
        {
          serialNumber: 11,
          UserType: "系统管理员",
          Name: "刘星",
          PhoneNumber: "13900000011",
          Gender: "女",
          Age: "28",
          Ethnicity: "汉族",
          EducationLevel: "硕士及以上",
          WorkOnPlateauStartDate: "2019-06-10",
          Department: "技术支持部",
          SpecificOccupation: "否",
          isActive: true,
        },
        {
          serialNumber: 12,
          UserType: "铁路职工",
          Name: "王强",
          PhoneNumber: "13800000012",
          Gender: "男",
          Age: "36",
          Ethnicity: "汉族",
          EducationLevel: "本科",
          WorkOnPlateauStartDate: "2014-11-20",
          Department: "运营部",
          SpecificOccupation: "是",
          isActive: false,
        },
        {
          serialNumber: 13,
          UserType: "专职医护",
          Name: "马丽",
          PhoneNumber: "13600000013",
          Gender: "女",
          Age: "30",
          Ethnicity: "汉族",
          EducationLevel: "大专",
          WorkOnPlateauStartDate: "2021-02-15",
          Department: "妇产科",
          SpecificOccupation: "否",
          isActive: true,
        },
        {
          serialNumber: 14,
          UserType: "疾控中心工作人员",
          Name: "刘伟",
          PhoneNumber: "13700000014",
          Gender: "男",
          Age: "40",
          Ethnicity: "汉族",
          EducationLevel: "硕士",
          WorkOnPlateauStartDate: "2017-04-10",
          Department: "疾病控制部",
          SpecificOccupation: "是",
          isActive: false,
        },
      ], 
      tableData: [],
      showSearch: true,
      loading: false,
    };
  },

  computed: {
    total() {
      return this.filteredData.length;
    },
    tableHeight() {
      return window.innerHeight - 300;
    },
    filteredData() {
      const { UserType, check } = this.queryParams;
      const lowerCaseCheck = check ? check.toLowerCase() : "";

      return this.allData.filter((item) => {
        const userTypeMatch =
          !UserType || item.UserType === this.convertUserType(UserType);
        const fieldsToSearch = [
          "Name",
          "PhoneNumber",
          "Department",
          "SpecificOccupation",
        ];
        const textMatch = fieldsToSearch.some((field) => {
          const itemFieldValue = item[field]?.toString().toLowerCase() || "";
          return itemFieldValue.includes(lowerCaseCheck);
        });
        return userTypeMatch && textMatch;
      });
    },
    paginatedData() {
      const start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize;
      const end = start + this.queryParams.pageSize;
      return this.filteredData.slice(start, end);
    },
  },

  methods: {
    handleUserTypeChange() {
      this.handleQuery();
    },

    handleQuery() {
      this.tableData = this.paginatedData;
    },

    handleAdd() {
      this.$refs.AddUserDialog.showDrawer();
    },

    handleImport() {
      this.$refs.batchImportDialog.showDialog();
    },

    handleDownload() {
      // 逻辑处理
    },

    handleExport() {
        const data = this.allData.map((item) => ({
        序号: item.serialNumber,
        用户类型: item.UserType,
        姓名: item.Name,
        电话: item.PhoneNumber,
        性别: item.Gender,
        年龄: item.Age,
        民族: item.Ethnicity,
        学历: item.EducationLevel,
        高原工作时间: item.WorkOnPlateauStartDate,
        部门工种: item.Department,
        特殊职业: item.SpecificOccupation,
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "用户信息导出表");
      XLSX.writeFile(wb, "用户信息导出表.xlsx");
    },

    handleClick(row) {
      this.$refs.Checkuserdata.showDrawer(row);
      console.log("触发", row);
    },
    handleClickEdit(row) {
      this.$refs.Editdata.showDrawer(row);
      console.log("触发", row);
    },

    toggleStatus(row) {
      row.isActive = !row.isActive;
      this.handleQuery(); 
    },

    convertUserType(value) {
      switch (value) {
        case 1:
          return "系统管理员";
        case 2:
          return "铁路职工";
        case 3:
          return "疾控中心工作人员";
        case 4:
          return "专职医护";
        default:
          return "";
      }
    },

    handlePagination({ pageNum, pageSize }) {
      this.queryParams.pageNum = pageNum;
      this.queryParams.pageSize = pageSize;
      this.handleQuery();
    },

    initializePassword(row) {
      const password = ""; // 实际身份证号后六位
      this.$message.success(`初始化密码成功，为身份证后六位${password}`);
    },
  },

  onMounted() {
    this.handleQuery(); 
  },
};
</script>

<style scoped>
.custom-button {
  margin: 0 5px;
}

.usertable {
  margin-top: 20px;
}

.el-table th,
.el-table td {
  text-align: center;
}

.container {
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 5px;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>
