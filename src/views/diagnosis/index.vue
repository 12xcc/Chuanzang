<template>
  <div class="container">
    <!-- 表单部分 -->
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="default"
      :inline="true"
      v-show="showSearch"
      style="display: flex"
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
          end-placeholder="就诊日期范围"
          style="width: 300px"
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
        >搜索</el-button>
        <el-button
          type="primary"
          class="custom-button"
          @click="handleExport"
          size="default"
        >导出</el-button>
        <el-button
          type="warning"
          class="custom-button"
          @click="handleDownload"
          size="default"
        >含检测数据导出</el-button>
        <el-button
          type="primary"
          class="custom-button"
          @click="handleSubmitDiagnosis"
          size="default"
        >提交诊断信息</el-button>
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
        <el-table-column prop="serialNumber" label="序号" width="80" height="48" />
        <el-table-column prop="UserType" label="用户类型" width="120" />
        <el-table-column prop="Name" label="姓名" width="100">
          <template #default="scope">
            <el-button
              v-if="isNurse()"
              type="text"
              @click="handleCheckuser(scope.row)"
            >
              {{ scope.row.Name }}
            </el-button>
            <span v-else>{{ scope.row.Name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PhoneNumber" label="电话" width="120" />
        <el-table-column prop="Gender" label="性别" width="100" />
        <el-table-column prop="Age" label="年龄" width="100" />
        <el-table-column prop="Department" label="部门/工种" width="120" />
        <el-table-column prop="DiseaseType" label="确诊疾病" width="120">
          <template #default="scope">
            <el-tag
              size="default"
              :type="scope.row.DiseaseType === '健康' ? 'success' : 'danger'"
            >
              {{ scope.row.DiseaseType }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="DiscoveryMethod" label="发现途径" width="120" />
        <el-table-column prop="HospitalName" label="确诊医院" width="120" />
        <el-table-column prop="DiseaseOutcome" label="疾病转归" width="120">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.DiseaseOutcome === '治愈'
                  ? 'success'
                  : scope.row.DiseaseOutcome === '好转'
                  ? 'warning'
                  : 'danger'
              "
            >
              {{ scope.row.DiseaseOutcome }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="AdmissionDate" label="就诊/入院日期" width="120" />
        <el-table-column prop="DischargeDate" label="出院日期" width="120" />
        <el-table-column prop="DeathDate" label="死亡日期" width="120" />
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="handleCheck(scope.row)">
              查看 / 编辑
            </el-button>
            
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

    <Checkuser
      ref="Checkuser"
      :users="filteredData"
      :visible="checkUserVisible"
    />
    <Checkdaignosisdata ref="Checkdaignosisdata" />
    <Checkuserdata ref="Checkuserdata" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useUserStore } from "@/store/userrole.js"; // 引入用户角色存储
import Pagination from "@/components/pagination.vue";
import Checkuser from "./components/checkuser.vue";
import Checkdaignosisdata from "./components/checkdaignosisdata/checkdaignosisdata.vue";
import Checkuserdata from '../user/alluser/components/checkuserdata.vue';

export default {
  components: {
    Pagination,
    Checkuser,
    Checkdaignosisdata,
    Checkuserdata,
    Checkuserdata,
  },
  setup() {
    const userStore = useUserStore(); // 使用用户角色存储
    return { userStore };
  },
  data() {
    return {
      checkUserVisible: false,
      queryParams: {
        choice: "",
        check: "",
        date: [],
        pageNum: 1,
        pageSize: 15,
      },
      allData: [
          {
          serialNumber: "1",
          UserType: "铁路职工",
          Name: "张伟",
          PhoneNumber: "13800000001",
          Gender: "男",
          Age: "44",
          Department: "工程技术部",
          DiseaseType: "流感",
          DiscoveryMethod: "APP填报",
          HospitalName: "拉萨医院",
          DiseaseOutcome: "治愈",
          AdmissionDate: "2024-03-03",
          DischargeDate: "2024-03-04",
          DeathDate: "",
        },
        {
          serialNumber: "2",
          UserType: "铁路职工",
          Name: "李强",
          PhoneNumber: "13800000122",
          Gender: "男",
          Age: "35",
          Department: "工程技术部",
          DiseaseType: "流感",
          DiscoveryMethod: "APP填报",
          HospitalName: "拉萨医院",
          DiseaseOutcome: "死亡",
          AdmissionDate: "2024-03-03",
          DischargeDate: "2024-03-04",
          DeathDate: "",
        },
        {
          serialNumber: "3",
          UserType: "铁路职工",
          Name: "王丽",
          PhoneNumber: "13800000003",
          Gender: "女",
          Age: "28",
          Department: "合约部",
          DiseaseType: "肠炭疽",
          DiscoveryMethod: "APP填报",
          HospitalName: "拉萨医院",
          DiseaseOutcome: "治愈",
          AdmissionDate: "2024-03-03",
          DischargeDate: "2024-03-04",
          DeathDate: "",
        },
        {
          serialNumber: "4",
          UserType: "铁路职工",
          Name: "赵鹏",
          PhoneNumber: "13800340004",
          Gender: "男",
          Age: "39",
          Department: "测量队",
          DiseaseType: "新冠病毒感染",
          DiscoveryMethod: "APP填报",
          HospitalName: "拉萨医院",
          DiseaseOutcome: "好转",
          AdmissionDate: "2024-03-03",
          DischargeDate: "2024-03-04",
          DeathDate: "",
        },
        {
          serialNumber: "5",
          UserType: "铁路职工",
          Name: "陈梅",
          PhoneNumber: "13800000005",
          Gender: "女",
          Age: "41",
          Department: "测量队",
          DiseaseType: "鼠疫",
          DiscoveryMethod: "APP填报",
          HospitalName: "拉萨医院",
          DiseaseOutcome: "治愈",
          AdmissionDate: "2024-03-03",
          DischargeDate: "2024-03-04",
          DeathDate: "",
        },
        {
          serialNumber: "6",
          UserType: "铁路职工",
          Name: "刘洋",
          PhoneNumber: "13800000006",
          Gender: "男",
          Age: "32",
          Department: "工程技术部",
          DiseaseType: "流感",
          DiscoveryMethod: "APP填报",
          HospitalName: "拉萨医院",
          DiseaseOutcome: "治愈",
          AdmissionDate: "2024-03-03",
          DischargeDate: "2024-03-04",
          DeathDate: "",
        },
        {
          serialNumber: "6",
          UserType: "铁路职工",
          Name: "张伟",
          PhoneNumber: "13800000006",
          Gender: "男",
          Age: "32",
          Department: "工程技术部",
          DiseaseType: "流感",
          DiscoveryMethod: "APP填报",
          HospitalName: "拉萨医院",
          DiseaseOutcome: "治愈",
          AdmissionDate: "2024-03-08",
          DischargeDate: "2024-03-10",
          DeathDate: "",
        },
      ],
      showSearch: true,
      loading: false,
    };
  },
  computed: {
    filteredData() {
      const { check, date } = this.queryParams;
      const lowerCaseCheck = check ? check.toLowerCase() : "";
      if (!check && (!date || date.length === 0)) {
        return this.allData;
      }
      return this.allData.filter((item) => {
        const fieldsToSearch = ["Name", "PhoneNumber", "Department"];
        const textMatch = check
          ? fieldsToSearch.some((field) => {
              const itemFieldValue =
                item[field]?.toString().toLowerCase() || "";
              return itemFieldValue.includes(lowerCaseCheck);
            })
          : true;

        const AdmissionDate = new Date(item.AdmissionDate);
        const dateMatch =
          Array.isArray(date) &&
          date.length === 2
            ? AdmissionDate >= new Date(date[0]) && AdmissionDate <= new Date(date[1])
            : true;

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
    },
  },
  methods: {
    isNurse() {
      return this.userStore.isNurse(); // 用户角色存储的 isNurse 方法
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
    },
    handlePagination(pageNum) {
      this.queryParams.pageNum = pageNum;
    },
    handleExport() {
      console.log("导出功能未实现");
    },
    handleSubmitDiagnosis() {
      if (this.filteredData.length > 0) {
        this.checkUserVisible = true;
        this.$refs.Checkuser.showDialog();
      } else {
        console.warn("用户数据为空");
      }
    },
    handleCheck(row) {
      this.$refs.Checkdaignosisdata.showDrawer(row);
    },
    handleCheckuser(row){
this.$refs.Checkuserdata.showDrawer(row);
    },
    handleDownload() {
      console.log("下载功能未实现");
    },
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
