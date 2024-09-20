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
          style="width:200px !important; margin-right:-15px;"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="custom-button"
          @click="handleQuery"
          plain
          size="default"
          style="margin-left:5px;"
        >搜索</el-button>
        <el-button
          type="primary"
          class="custom-button"
          @click="handleExport"
          size="default"
        >导出</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <div class="usertable">
      <el-table 
        :header-cell-style="{height:'40px',background:'#f5f7fa',color: '#333333'}" 
        v-loading="loading" 
        :data="paginatedData" 
        style="width: 100%;"
        :height="tableHeight"
      >
        <el-table-column 
          type="selection" 
          width="55" 
        />
        <el-table-column prop="serialNumber" label="序号" width="80" height="48" />
        <el-table-column prop="Name" label="姓名" width="100" />
        <el-table-column prop="WorkStationName" label="工务段名称" width="200" />
        <el-table-column prop="WorkStationAltitude" label="海拔高度(米)" width="200" />
        <el-table-column prop="AvgMonthlyPressure" label="当月平均气压(kpa)" width="200" />
        <el-table-column prop="MaxTemperature" label="当月最高气温(℃)" width="200" />
        <el-table-column prop="MinTemperature" label="当月最低气温(℃)" width="200" />
        <el-table-column prop="SubmissionTime" label="提交时间" width="120" />
        <el-table-column fixed="right" label="操作" min-width="140">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="handleClick(scope.row)">
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
  <AddUserDialog ref="addUserDialog" />
  <BatchImportDialog ref="batchImportDialog" />
  <Envdata ref="Envdata" />
</template>

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/pagination.vue';
import Envdata from './components/envdata.vue'

export default {
  components: {
    Pagination,
    Envdata
  },

  data() {
    return {
      queryParams: {
        WorkStationName: '',
        pageNum: 1,
        pageSize: 15
      },
      allData: [
        { serialNumber: '1', Name: '张伟', WorkStationName: '西藏林芝', WorkStationAltitude: '4400', AvgMonthlyPressure: '65.9', MaxTemperature: '12', MinTemperature: '10', SubmissionTime: '2024-08-15' },
  { serialNumber: '2', Name: '李娜', WorkStationName: '四川成都', WorkStationAltitude: '500', AvgMonthlyPressure: '78.2', MaxTemperature: '30', MinTemperature: '20', SubmissionTime: '2024-08-16' },
  { serialNumber: '3', Name: '王强', WorkStationName: '四川成都', WorkStationAltitude: '1100', AvgMonthlyPressure: '85.4', MaxTemperature: '28', MinTemperature: '18', SubmissionTime: '2024-08-17' },
  { serialNumber: '4', Name: '赵敏', WorkStationName: '四川成都', WorkStationAltitude: '1890', AvgMonthlyPressure: '70.3', MaxTemperature: '25', MinTemperature: '15', SubmissionTime: '2024-08-18' },
  { serialNumber: '5', Name: '孙涛', WorkStationName: '西藏林芝', WorkStationAltitude: '400', AvgMonthlyPressure: '77.8', MaxTemperature: '32', MinTemperature: '22', SubmissionTime: '2024-08-19' },
  { serialNumber: '6', Name: '周华', WorkStationName: '四川成都', WorkStationAltitude: '60', AvgMonthlyPressure: '80.1', MaxTemperature: '34', MinTemperature: '24', SubmissionTime: '2024-08-20' },
  { serialNumber: '7', Name: '吴刚', WorkStationName: '四川成都', WorkStationAltitude: '200', AvgMonthlyPressure: '82.5', MaxTemperature: '29', MinTemperature: '21', SubmissionTime: '2024-08-21' },
  { serialNumber: '8', Name: '郑丽', WorkStationName: '四川成都', WorkStationAltitude: '30', AvgMonthlyPressure: '76.6', MaxTemperature: '35', MinTemperature: '25', SubmissionTime: '2024-08-22' },
  { serialNumber: '9', Name: '冯飞', WorkStationName: '西藏日喀则', WorkStationAltitude: '40', AvgMonthlyPressure: '74.2', MaxTemperature: '33', MinTemperature: '23', SubmissionTime: '2024-08-23' },
  { serialNumber: '10', Name: '蔡艳', WorkStationName: '四川成都', WorkStationAltitude: '15', AvgMonthlyPressure: '78.7', MaxTemperature: '31', MinTemperature: '21', SubmissionTime: '2024-08-24' },
  { serialNumber: '11', Name: '张伟', WorkStationName: '西藏林芝', WorkStationAltitude: '4400', AvgMonthlyPressure: '65.9', MaxTemperature: '12', MinTemperature: '10', SubmissionTime: '2024-08-15' },
  { serialNumber: '12', Name: '李娜', WorkStationName: '四川成都', WorkStationAltitude: '500', AvgMonthlyPressure: '78.2', MaxTemperature: '30', MinTemperature: '20', SubmissionTime: '2024-08-16' },
  { serialNumber: '13', Name: '王强', WorkStationName: '四川成都', WorkStationAltitude: '1100', AvgMonthlyPressure: '85.4', MaxTemperature: '28', MinTemperature: '18', SubmissionTime: '2024-08-17' },
  { serialNumber: '14', Name: '赵敏', WorkStationName: '四川成都', WorkStationAltitude: '1890', AvgMonthlyPressure: '70.3', MaxTemperature: '25', MinTemperature: '15', SubmissionTime: '2024-08-18' },
  { serialNumber: '15', Name: '孙涛', WorkStationName: '四川成都', WorkStationAltitude: '400', AvgMonthlyPressure: '77.8', MaxTemperature: '32', MinTemperature: '22', SubmissionTime: '2024-08-19' },
  { serialNumber: '16', Name: '周华', WorkStationName: '四川成都', WorkStationAltitude: '60', AvgMonthlyPressure: '80.1', MaxTemperature: '34', MinTemperature: '24', SubmissionTime: '2024-08-20' },
  { serialNumber: '17', Name: '吴刚', WorkStationName: '四川成都', WorkStationAltitude: '200', AvgMonthlyPressure: '82.5', MaxTemperature: '29', MinTemperature: '21', SubmissionTime: '2024-08-21' },
  { serialNumber: '18', Name: '郑丽', WorkStationName: '西藏日喀则', WorkStationAltitude: '30', AvgMonthlyPressure: '76.6', MaxTemperature: '35', MinTemperature: '25', SubmissionTime: '2024-08-22' },
  { serialNumber: '19', Name: '冯飞', WorkStationName: '西藏林芝', WorkStationAltitude: '40', AvgMonthlyPressure: '74.2', MaxTemperature: '33', MinTemperature: '23', SubmissionTime: '2024-08-23' },
  { serialNumber: '20', Name: '蔡艳', WorkStationName: '四川成都', WorkStationAltitude: '15', AvgMonthlyPressure: '78.7', MaxTemperature: '31', MinTemperature: '21', SubmissionTime: '2024-08-24' }

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
      const { WorkStationName } = this.queryParams;
      const lowerCaseCheck = WorkStationName ? WorkStationName.toLowerCase() : '';

      return this.allData.filter(item => {
        // 搜索文本匹配
        const fieldsToSearch = ['WorkStationName'];
        return fieldsToSearch.some(field => {
          const itemFieldValue = item[field]?.toString().toLowerCase() || '';
          return itemFieldValue.includes(lowerCaseCheck);
        });
      });
    },
    paginatedData() {
      const start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize;
      const end = start + this.queryParams.pageSize;
      return this.filteredData.slice(start, end);
    }
  },

  methods: {
    handleQuery() {
      this.tableData = this.paginatedData;
    },

    // 导出表格信息
    handleExport() {
      const data = this.allData.map(item => ({
        序号: item.serialNumber,
        姓名: item.Name,
        工务段名称: item.WorkStationName,
        海拔高度: item.WorkStationAltitude,
        当月平均气压: item.AvgMonthlyPressure,
        当月最高气温: item.MaxTemperature,
        当月最低气温: item.MinTemperature,
        提交时间: item.SubmissionTime
      }));

      // 创建工作表
      const ws = XLSX.utils.json_to_sheet(data);

      // 创建工作簿
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "工作环境基本信息导出表");

      // 导出 Excel 文件
      XLSX.writeFile(wb, "工作环境基本信息导出表.xlsx");
    },

    handleClick(row) {
      this.$refs.Envdata.showDrawer(row);
      console.log("触发",row);
      // this.$router.push({ name: "userdata", params: { id: serialNumber } });
    },

    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery();
    }
  },

  mounted() {
    this.handleQuery();
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 5px;
}

.custom-button {
  margin-right: 10px;
}
</style>
