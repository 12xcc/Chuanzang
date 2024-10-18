<template>
  <div class="container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="default"
      :inline="true"
      v-show="showSearch"
    >
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

       <el-form-item prop="date">
      <el-date-picker
        v-model="queryParams.date"
        type="daterange"
        range-separator="到"
        start-placeholder="请选择"
        end-placeholder="检测日期范围"
        style="width:300px"
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
          @click="handleExport"
          size="default"
          >导出</el-button
        >
        <el-button
          type="warning"
          class="custom-button"
          @click="handleDownload"
          size="default"
          >含检测报告导出</el-button
        >
        <el-button
          type="primary"
          class="custom-button"
          @click="handleSubmitCheck"
          size="default"
          >提交检测报告</el-button
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
        show-overflow-tooltip="true"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="serialNumber" label="序号" width="80" />
        <el-table-column prop="userType" label="用户类型" width="120" />
         <el-table-column prop="name" label="姓名" width="100">
          <template #default="scope">
            <el-button
              v-if="isNurse()"
              type="text"
              @click="handleCheckuser(scope.row)"
            >
              {{ scope.row.name }}
            </el-button>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="电话" width="120" />
        <el-table-column prop="gender" label="性别" width="100" />
        <el-table-column prop="age" label="年龄" width="100" />
        <el-table-column prop="department" label="部门/工种" width="120" />
        <el-table-column
          prop="isVirusAntigenTestDone"
          label="病毒抗原检测"
          width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isVirusAntigenTestDone" type="success">
              √
            </el-tag>
            <span v-else></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="isVirusNucleicAcidTestDone"
          label="病毒核酸检测"
          width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isVirusNucleicAcidTestDone" type="success">
              √
            </el-tag>
            <span v-else></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="isVirusCultureIsolationDone"
          label="病毒培养分离"
          width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isVirusCultureIsolationDone" type="success">
              √
            </el-tag>
            <span v-else></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="isSerologicalTestDone"
          label="血清学检测"
          width="120"
        >
          <template #default="scope">
            <el-tag v-if="scope.row.isSerologicalTestDone" type="success">
              √
            </el-tag>
            <span v-else></span>
          </template>
        </el-table-column>

        <el-table-column prop="checkInDate" label="检测日期" min-width="120" />
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="handleCheck(scope.row)"
              >查看 / 编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        @pagination="handlePagination"
      />
    </div>
    <Checkuser
      ref="Checkuser"
      :users="filteredData"
      :visible="checkUserVisible"
    />
    <Checkcheckdata ref="Checkcheckdata" />
    <Checkuserdata ref="Checkuserdata" />
  </div>
</template>

<script>
import { useUserStore } from "@/store/userrole.js"; // 引入用户角色存储
import Checkuser from "./components/checkuser.vue";
import Checkcheckdata from "./components/checkcheckdata/checkchekcdata.vue"
import Checkuserdata from '../user/alluser/components/checkuserdata.vue';
import {pageSelectLabTest,getDetectionInformationExportFormExcel,getUserByBaseInfo,saveLabTestReport,selectLabTest} from "@/api/check/check"
export default {
  components: {
    Checkuser,
    Checkcheckdata,
    Checkuserdata,
  },
  data() {
    return {
      checkUserVisible: false,
      queryParams: {
        isHealth: "",
        check: "",
        date:[],
        pageNum: 1,
        pageSize: 15,
        date:"",
      },
      allData: [
        {
          serialNumber: "1",
          userType: "铁路职工",
          name: "张伟",
          phoneNumber: "13800000001",
          gender: "男",
          age: "44",
          department: "工程技术部",
          isVirusAntigenTestDone: true,
          isVirusNucleicAcidTestDone: true,
          isVirusCultureIsolationDone: true,
          isSerologicalTestDone: true,
          checkInDate: "2024-03-03",
        },
        {
          serialNumber: "2",
          userType: "铁路职工",
          name: "李强",
          phoneNumber: "13800000122",
          gender: "男",
          age: "35",
          department: "测量队",
          department: "工程技术部",
          isVirusAntigenTestDone: false,
          isVirusNucleicAcidTestDone: true,
          isVirusCultureIsolationDone: true,
          isSerologicalTestDone: true,
          checkInDate: "2024-04-15",
        },
        {
          serialNumber: "3",
          userType: "铁路职工",
          name: "王丽",
          phoneNumber: "13800000003",
          gender: "女",
          age: "28",
          department: "测量队",
          department: "工程技术部",
          isVirusAntigenTestDone: false,
          isVirusNucleicAcidTestDone: true,
          isVirusCultureIsolationDone: true,
          isSerologicalTestDone: false,
          checkInDate: "2024-05-10",
        },
        {
          serialNumber: "4",
          userType: "铁路职工",
          name: "赵鹏",
          phoneNumber: "13800340004",
          gender: "男",
          age: "39",
          department: "工程技术部",
          isVirusAntigenTestDone: true,
          isVirusNucleicAcidTestDone: true,
          isVirusCultureIsolationDone: false,
          isSerologicalTestDone: true,
          checkInDate: "2024-02-20",
        },
        {
          serialNumber: "5",
          userType: "铁路职工",
          name: "陈梅",
          phoneNumber: "13800000005",
          gender: "女",
          age: "41",
          department: "合约部",
          isVirusAntigenTestDone: true,
          isVirusNucleicAcidTestDone: true,
          isVirusCultureIsolationDone: true,
          isSerologicalTestDone: true,
          checkInDate: "2024-06-01",
        },
        {
          serialNumber: "6",
          userType: "铁路职工",
          name: "刘洋",
          phoneNumber: "13800000006",
          gender: "男",
          age: "32",
          department: "工程技术部",
          isVirusAntigenTestDone: false,
          isVirusNucleicAcidTestDone:false,
          isVirusCultureIsolationDone: true,
          isSerologicalTestDone: false,
          checkInDate: "2024-07-18",
        },
        {
          serialNumber: "4",
          userType: "铁路职工",
          name: "赵鹏",
          phoneNumber: "13800340004",
          gender: "男",
          age: "39",
          department: "工程技术部",
          isVirusAntigenTestDone: true,
          isVirusNucleicAcidTestDone: true,
          isVirusCultureIsolationDone: false,
          isSerologicalTestDone: true,
          checkInDate: "2024-02-20",
        },
        {
          serialNumber: "5",
          userType: "铁路职工",
          name: "陈梅",
          phoneNumber: "13800000005",
          gender: "女",
          age: "41",
          department: "合约部",
          isVirusAntigenTestDone: true,
          isVirusNucleicAcidTestDone: false,
          isVirusCultureIsolationDone: false,
          isSerologicalTestDone: true,
          checkInDate: "2024-06-01",
        },
      ],
      showSearch: true,
      loading: false,
    };
  },
setup() {
    const userStore = useUserStore(); // 使用用户角色存储
    return { userStore };
  },
  computed: {
    filteredData() {
      const { check ,date } = this.queryParams;
      const lowerCaseCheck = check ? check.toLowerCase() : "";
   // 如果没有筛选条件，直接返回所有数据
      if (!check && (!date || date.length === 0)) {
        return this.allData;
      }
      return this.allData.filter((item) => {
        // const userTypeMatch = !userType || item.userType === this.convertuserType(userType);
        const fieldsToSearch = ["name", "phoneNumber", "department",""];
        const textMatch = check
          ? fieldsToSearch.some((field) => {
              const itemFieldValue =
                item[field]?.toString().toLowerCase() || "";
              return itemFieldValue.includes(lowerCaseCheck);
            })
          : true; // 如果没有输入文本，默认匹配为 true

           const checkInDate = new Date(item.checkInDate);
        const dateMatch =
          Array.isArray(date) && date.length === 2
            ? checkInDate >= new Date(date[0]) &&
              checkInDate <= new Date(date[1])
            : true; // 如果没有选择日期，默认匹配为 true


        return textMatch && dateMatch;
      });
    },
    paginatedData() {
      const { pageNum, pageSize } = this.queryParams;
      return this.filteredData.slice(
        (pageNum - 1) * pageSize,
        pageNum * pageSize
      );
    },
    total() {
      return this.filteredData.length;
    },
    tableHeight() {
      return window.innerHeight - 300;
      // return `${this.filteredData.length > 0 ? this.filteredData.length * 48 : 500}px`; // 动态计算表格高度
    },
  },

  methods: {
    handleQuery() {
      // 查询逻辑
    },
    handleExport() {
      // 导出逻辑
    },
    handleDownload() {
      // 下载逻辑
    },
    handleClick() {
      // 查看用户逻辑
    },
     isNurse() {
      return this.userStore.isNurse(); // 用户角色存储的 isNurse 方法
    },
    handleCheck(row) {
      this.$refs.Checkcheckdata.showDrawer(row);
    },
        handleCheckuser(row){
this.$refs.Checkuserdata.showDrawer(row);
    },
    handleSubmitCheck() {
      if (this.filteredData.length > 0) {
        this.checkUserVisible = true; // 显示 Checkuser
        this.$refs.Checkuser.showDialog();
      } else {
        console.warn("用户数据为空");
      }
    },

    convertisHealth(value) {
      switch (value) {
        case 1:
          return "是";
        case 2:
          return "否";
        default:
          return "";
      }
    },
    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery(); // 更新分页数据
    },
  },
  mounted() {
    this.handleQuery(); // 初始数据
  },
};
</script>

<style scoped>
.container {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
}

.custom-button {
  margin-right: 10px;
}
</style>
