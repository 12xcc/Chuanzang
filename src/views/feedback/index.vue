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
      <el-form-item label="" prop="check" size="default">
        <el-input
          v-model="queryParams.check"
          placeholder="请输入姓名/联系电话/意见标题 "
          clearable
          size="default"
          @keyup.enter.native="handleQuery"
          style="width:300px !important; margin-right:-15px;"
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
        :show-overflow-tooltip="true" 
      >
        <el-table-column 
          type="selection" 
          width="55"
        />
        <el-table-column prop="FeedbackID" label="序号" width="80" />
        <el-table-column prop="Name" label="姓名" width="150" />
        <el-table-column prop="PhoneNumber" label="联系电话" width="120" />
        <el-table-column prop="FeedbackTitle" label="意见标题" width="160" />
        <el-table-column prop="FeedbackText" label="反馈意见" width="240" />
        <el-table-column prop="FeedbackDate" label="提交日期" width="120" />
        <el-table-column fixed="right" label="操作" min-width="260">
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
  <Feedbackdata ref="Feedbackdata"/>
</template>

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/pagination.vue';
import Feedbackdata from './components/feedbackdata.vue';

export default {
  components: {
    Pagination,
    Feedbackdata,
  },
  
  mounted() {
  console.log(this.$refs.batchImportDialog); 
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
        {
          FeedbackID: '1',
          Name: '张伟',
          PhoneNumber: '13800000001',
          FeedbackTitle: '系统功能改进建议',
          FeedbackText: '建议增加用户自定义筛选条件的功能，方便更精准地筛选传染病相关数据。',
          FeedbackDate: '2025-01-01',
        },
        {
          FeedbackID: '2',
          Name: '李强',
          PhoneNumber: '13800033301',
          FeedbackTitle: '系统操作界面优化',
          FeedbackText: '当前操作界面布局有些复杂，希望能简化用户操作流程，提高操作的便捷性。',
          FeedbackDate: '2025-01-04',
        },
        {
          FeedbackID: '3',
          Name: '李娜',
          PhoneNumber: '13800024001',
          FeedbackTitle: '系统稳定性建议',
          FeedbackText: '系统在高峰时段偶尔出现崩溃现象，建议优化系统的稳定性，避免因高负荷造成的服务中断。',
          FeedbackDate: '2025-01-05',
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
      const { check } = this.queryParams;
      const lowerCaseCheck = check ? check.toLowerCase() : '';

      return this.allData.filter(item => {
        const fieldsToSearch = ['Name', 'PhoneNumber', 'FeedbackTitle'];
        const textMatch = fieldsToSearch.some(field => {
          const itemFieldValue = item[field]?.toString().toLowerCase() || '';
          return itemFieldValue.includes(lowerCaseCheck);
        });
        return  textMatch;
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
    // 添加用户弹窗
    handleAdd() {
      this.$refs.addUserDialog.showDrawer(); 
    },

    handleImport(){
       console.log(this.$refs.batchImportDialog);
      this.$refs.batchImportDialog.showDialog(); 
    },
   

    handleDownload() {
      // 逻辑处理
    },
    
    // 导出表格信息
    handleExport() {
      // 获取表格数据
      const data = this.allData.map(item => ({
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

      // 创建工作表
      const ws = XLSX.utils.json_to_sheet(data);

      // 创建工作簿
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "用户信息导出表");

      // 导出 Excel 文件
      XLSX.writeFile(wb, "用户信息导出表.xlsx");
    },

    handleClick(row) {
      this.$refs.Feedbackdata.showDrawer(row)
    },
    isActive() {
      // 逻辑处理
    },
    convertUserType(value) {
      switch (value) {
        case 1: return '系统管理员';
        case 2: return '铁路职工';
        case 3: return '疾控中心工作人员';
        case 4: return '专职医护';
        default: return '';
      }
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
