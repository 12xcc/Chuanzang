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
      <el-form-item label="医院名称" prop="check" size="default">
        <el-input
          v-model="queryParams.check"
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
          @click="handleImport"
          size="default"
        >导入</el-button>
        <el-button
          type="warning"
          class="custom-button"
          @click="handleDownload"
          size="default"
        >导入模板下载</el-button>
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
        :data="tableData" 
        style="width: 100%;"
        :height="tableHeight"
      >
        <el-table-column 
          type="selection" 
          width="55" 
        />
        <el-table-column prop="HospitalID" label="序号" width="80" />
        <el-table-column prop="HospitalName" label="医院名" width="300" />
        <el-table-column prop="HospitalPhoneNumber" label="联系电话" width="200" />
        <el-table-column prop="Address" label="地址" min-width="500" />
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="handleClick(scope.row)">
              修改
            </el-button>
            <el-button link type="primary" size="large" @click="handleDelete(scope.row)">
              删除
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


    <!-- 医院信息弹窗 -->
    <Hospitaldata ref="Hospitaldata" />
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/pagination.vue';
import Hospitaldata from './components/hospitaldata.vue';

export default {
  components: {
    Pagination,
    Hospitaldata,
  },
  
  data() {
    return {
      queryParams: {
        UserType: '',
        choice: '',
        check: '',
        pageNum: 1,
        pageSize: 15
      },
      allData: [
        { HospitalID: 1, HospitalName: '医院1', HospitalPhoneNumber: '028-******', Address: '成都市十陵' },
        { HospitalID: 2, HospitalName: '医院2', HospitalPhoneNumber: '028-******', Address: '成都市十陵' },
        { HospitalID: 3, HospitalName: '医院3', HospitalPhoneNumber: '028-******', Address: '成都市十陵' },
        { HospitalID: 4, HospitalName: '医院4', HospitalPhoneNumber: '028-******', Address: '成都市十陵' },
        { HospitalID: 5, HospitalName: '医院5', HospitalPhoneNumber: '028-******', Address: '成都市十陵' },
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
      const lowerCaseCheck = check ? check.toLowerCase() : '';

      return this.allData.filter(item => {
        const userTypeMatch = !UserType || item.UserType === this.convertUserType(UserType);
        const fieldsToSearch = ['HospitalName'];
        const textMatch = fieldsToSearch.some(field => {
          const itemFieldValue = item[field]?.toString().toLowerCase() || '';
          return itemFieldValue.includes(lowerCaseCheck);
        });
        return userTypeMatch && textMatch;
      });
    },
    paginatedData() {
      const start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize;
      const end = start + this.queryParams.pageSize;
      return this.filteredData.slice(start, end);
    }
  },

  methods: {
    handleUserTypeChange() {
      this.handleQuery();
    },
    handleQuery() {
      this.tableData = this.paginatedData;
    },
    handleAdd() {
      this.$refs.addUserDialog.showDrawer(); 
    },
    handleImport() {
      this.$refs.batchImportDialog.showDialog(); 
    },
    handleDownload() {
      // 逻辑处理
    },
    handleExport() {
      const data = this.allData.map(item => ({
        // 可以添加更多字段
      }));
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "医院基础信息导出表");
      XLSX.writeFile(wb, "医院基础信息导出表.xlsx");
    },
    handleClick(row) {
      this.$refs.Hospitaldata.showDrawer(row);
    },
    handleDelete(row) {
      // 删除逻辑
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
  margin-right:10px;
}
</style>
