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
       <el-form-item label="疾病类型名" prop="check" size="default">
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
        <el-table-column prop="serialNumber" label="序号" width="80" />
        <el-table-column prop="DiseaseTypeName" label="疾病类型" width="300" />
        <el-table-column prop="HasSubtype" label="是否包含子类型" width="200">
          <template #default="scope">
            <el-tag  size="default" :type="scope.row.HasSubtype === '是' ? 'success' : ''" >
              {{ scope.row.HasSubtype }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="SubtypeName" label="子类型" min-width="500" />
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="handleClick">
              设置权重
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
</template>

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/pagination.vue';

export default {
  components: {
    Pagination,
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
        { serialNumber: 1, DiseaseTypeName: '新型冠状病毒感染', HasSubtype: '否', SubtypeName: '' },
        { serialNumber: 2, DiseaseTypeName: '流感', HasSubtype: '否', SubtypeName: '' },
        { serialNumber: 3, DiseaseTypeName: '鼠疫', HasSubtype: '是', SubtypeName: '腺鼠疫,肺鼠疫,败血型鼠疫,肠鼠疫,眼鼠疫,皮肤鼠疫,脑鼠疫' },
        { serialNumber: 4, DiseaseTypeName: '感染性腹泻', HasSubtype: '否', SubtypeName: '' },
        { serialNumber: 5, DiseaseTypeName: '炭疽', HasSubtype: '是', SubtypeName: '皮肤炭疽,肠炭疽,肺炭疽,脑膜炎型炭疽,败血症型炭疽' },
        { serialNumber: 6, DiseaseTypeName: '登革热（蚊媒传染病）', HasSubtype: '否', SubtypeName: '' },
        { serialNumber: 7, DiseaseTypeName: '疟疾（蚊媒传染病）', HasSubtype: '否', SubtypeName: '' },
        { serialNumber: 8, DiseaseTypeName: '铁路职工', HasSubtype: '否', SubtypeName: '' },



       
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
        const fieldsToSearch = ['DiseaseTypeName'];
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
      疾病类型: item.DiseaseTypeName,
      是否包含子类型: item.HasSubtype,
      子类型: item.SubtypeName,
    }));

      // 创建工作表
      const ws = XLSX.utils.json_to_sheet(data);

      // 创建工作簿
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "用户信息导出表");

      // 导出 Excel 文件
      XLSX.writeFile(wb, "用户信息导出表.xlsx");
    },

    handleClick() {
      // 逻辑处理
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
