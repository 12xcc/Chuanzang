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
      <el-form-item label="工作地点名" prop="WorkStationName" size="default">
        <el-input
          v-model="queryParams.WorkStationName"
          placeholder="请输入文本"
          clearable
          size="default"
          @keyup.enter.native="handleQuery"
          style="width: 200px !important; margin-right: -15px"
        />
      </el-form-item>
      <!-- 格式：YYYY-MM-DD -->
      <!-- <el-form-item prop="date">
        <el-date-picker
          v-model="queryParams.date"
          type="daterange"
          range-separator="到"
          start-placeholder="请选择"
          end-placeholder="提交日期范围"
          style="width: 300px"
        />
      </el-form-item> -->

      <!-- 格式：YYYY-MM -->
      <el-form-item prop="date">
        <el-date-picker
          v-model="queryParams.date"
          type="daterange"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM"
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
          >搜索</el-button
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
        :data="allData"
        style="width: 100%"
        :height="tableHeight"
        show-overflow-tooltip="true"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="serialNumber"
          label="序号"
          width="80"
          height="48"
        />
        <el-table-column prop="Name" label="姓名" width="100" />
        <el-table-column
          prop="WorkStationName"
          label="工务段名称"
          width="200"
        />
        <el-table-column
          prop="WorkStationAltitude"
          label="海拔高度(米)"
          width="200"
        />
        <el-table-column
          prop="AvgMonthlyPressure"
          label="当月平均气压(kpa)"
          width="200"
        />
        <el-table-column
          prop="MaxTemperature"
          label="当月最高气温(℃)"
          width="200"
        />
        <el-table-column
          prop="MinTemperature"
          label="当月最低气温(℃)"
          width="200"
        />
        <el-table-column prop="SubmissionTime" label="提交时间" width="120" />
        <el-table-column fixed="right" label="操作" min-width="140">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClick(scope.row)"
            >
              查看
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
  </div>
  <Envdata ref="Envdata" />
</template>

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import Envdata from "./components/envdata.vue";
import { fetchWorkenvData } from "@/api/workenv/workenv.js";

export default {
  components: {
    Pagination,
    Envdata,
  },

  data() {
    return {
      queryParams: {
        WorkStationName: "",
        date: [],
        pageNum: 1,
        pageSize: 15,
      },
      allData: [],
      tableData: [],
      total: 0,
      showSearch: true,
      loading: false,
    };
  },

  computed: {
    tableHeight() {
      return window.innerHeight - 300;
    },
  },

  methods: {

     // 格式化提交时间
    formatDate(submissionTime) {
      const [year, month, day, hour, minute, second] = submissionTime;
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    },

    async handleQuery() {
  this.loading = true;
  
  try {
    const [beginYearMonth, endYearMonth] = this.queryParams.date;
    const params = {
      beginYearMonth: beginYearMonth || "",
      endYearMonth: endYearMonth || "",
      pageNo: this.queryParams.pageNum || 1,
      pageSize: this.queryParams.pageSize || 15,
      workStationName: this.queryParams.WorkStationName || "",
    };
    const response = await fetchWorkenvData(params);

    if (response.data.code === 1) {
      // 格式化反馈日期并映射后端字段
      this.allData = response.data.data.records.map((item, index) => ({
        serialNumber:
          (this.queryParams.pageNum - 1) * this.queryParams.pageSize + index + 1,  // 保持serialNumber不变
        Name: item.name,  // 后端的name字段映射到表格中的Name列
        WorkStationName: item.workStationName,  // workStationName映射
        WorkStationAltitude: item.workStationAltitude,  // workStationAltitude映射
        AvgMonthlyPressure: item.avgMonthlyPressure,  // avgMonthlyPressure映射
        MaxTemperature: item.maxTemperature,  // maxTemperature映射
        MinTemperature: item.minTemperature,  // minTemperature映射
        submissionTime: this.formatDate(item.submissionTime),  // 格式化submissionTime
      }));
      this.total = response.data.data.total;
    } else {
      this.$message.error(
        "获取用户数据失败，请重试！" + response.data.message
      );
    }
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    this.$message.error(
      "获取用户数据失败，请重试！" +
        (error.response ? error.response.data.message : error.message)
    );
  } finally {
    this.loading = false;
  }
},

    // 导出表格信息
    handleExport() {},

    handleClick(row) {
      this.$refs.Envdata.showDrawer(row);
      console.log("触发", row);
      // this.$router.push({ name: "userdata", params: { id: serialNumber } });
    },

    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery();
    },
  },

  mounted() {
    this.handleQuery();
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
