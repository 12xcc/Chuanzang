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
       <el-form-item label="" prop="choice">
        <el-select
          v-model="queryParams.choice"
          placeholder="请选择字段"
          clearable
          size="default"
          style="width:200px; margin-right:-15px;"
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
        <el-button
          type="warning"
          class="custom-button"
          @click="handleDownload"
          size="default"
        >含检测报告导出</el-button>
        <el-button
          type="primary"
          class="custom-button"
          @click="handleDownload"
          size="default"
        >提交检测报告</el-button>
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
        <el-table-column prop="UserType" label="用户类型" width="120" />
        <el-table-column prop="Name" label="姓名" width="100" />
        <el-table-column prop="PhoneNumber" label="电话" width="120" />
        <el-table-column prop="Gender" label="性别" width="100" />
        <el-table-column prop="Age" label="年龄" width="100" />
        <el-table-column prop="Department" label="部门/工种" width="120" />
        <el-table-column prop="IsVirusAntigenTestDone" label="病毒抗原检测" width="120">
          <template #default="scope">
            <el-tag 
            v-if="scope.row.IsVirusAntigenTestDone === '√'"
            type="success">
              {{ scope.row.IsVirusAntigenTestDone }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="IsVirusNucleicAcidTestDone" label="病毒核酸检测" width="120">
          <template #default="scope">
            <el-tag 
            v-if="scope.row.IsVirusNucleicAcidTestDone === '√'"
            type="success">
              {{ scope.row.IsVirusNucleicAcidTestDone }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="IsVirusCultureIsolationDone" label="病毒培养分离" width="120">
          <template #default="scope">
            <el-tag 
            v-if="scope.row.IsVirusCultureIsolationDone === '√'"
            type="success">
              {{ scope.row.IsVirusCultureIsolationDone }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="IsSerologicalTestDone" label="血清学检测" width="120">
          <template #default="scope">
            <el-tag 
            v-if="scope.row.IsSerologicalTestDone === '√'"
            type="success">
              {{ scope.row.IsSerologicalTestDone }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="CheckInDate" label="检测日期" min-width="120"/>
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button link type="primary" size="large" @click="handleClick">
              查看
            </el-button>
            <el-button link type="primary" size="large">编辑</el-button>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/pagination.vue';

// 查询参数
const queryParams = ref({
  IsHealth: '',
  check: '',
  pageNum: 1,
  pageSize: 15
});

// 模拟表格数据
const allData = ref([
  {
    serialNumber: '1',
    UserType: '铁路职工',
    Name: '张伟',
    PhoneNumber: '13800000001',
    Gender: '男',
    Age: '44',
    Department: '工程技术部',
    IsVirusAntigenTestDone: '√',
    IsVirusNucleicAcidTestDone: '√',
    IsVirusCultureIsolationDone:'√',
    IsSerologicalTestDone: '√',
    CheckInDate: '2024-03-03',
  },
  { 
    serialNumber: '2',
    UserType: '铁路职工',
    Name: '李强',
    PhoneNumber: '13800000122',
    Gender: '男',
    Age: '35',
    Department: '测量队',
    Department: '工程技术部',
    IsVirusAntigenTestDone: '',
    IsVirusNucleicAcidTestDone: '√',
    IsVirusCultureIsolationDone:'√',
    IsSerologicalTestDone: '√',
    CheckInDate: '2024-04-15',
},
{ 
    serialNumber: '3',
    UserType: '铁路职工',
    Name: '王丽',
    PhoneNumber: '13800000003',
    Gender: '女',
    Age: '28',
    Department: '测量队',
    Department: '工程技术部',
    IsVirusAntigenTestDone: '',
    IsVirusNucleicAcidTestDone: '√',
    IsVirusCultureIsolationDone:'√',
    IsSerologicalTestDone: '',
    CheckInDate: '2024-05-10',
},
{ 
    serialNumber: '4',
    UserType: '铁路职工',
    Name: '赵鹏',
    PhoneNumber: '13800340004',
    Gender: '男',
    Age: '39',
    Department: '工程技术部',
    IsVirusAntigenTestDone: '√',
    IsVirusNucleicAcidTestDone: '√',
    IsVirusCultureIsolationDone:'',
    IsSerologicalTestDone: '√',
    CheckInDate: '2024-02-20',
},
{ 
    serialNumber: '5',
    UserType: '铁路职工',
    Name: '陈梅',
    PhoneNumber: '13800000005',
    Gender: '女',
    Age: '41',
    Department: '合约部',
    IsVirusAntigenTestDone: '√',
    IsVirusNucleicAcidTestDone: '√',
    IsVirusCultureIsolationDone:'√',
    IsSerologicalTestDone: '√',
    CheckInDate: '2024-06-01',
},
{ 
    serialNumber: '6',
    UserType: '铁路职工',
    Name: '刘洋',
    PhoneNumber: '13800000006',
    Gender: '男',
    Age: '32',
    Department: '工程技术部',
    IsVirusAntigenTestDone: '',
    IsVirusNucleicAcidTestDone: '',
    IsVirusCultureIsolationDone:'√',
    IsSerologicalTestDone: '√',
    CheckInDate: '2024-07-18',
},
{ 
    serialNumber: '4',
    UserType: '铁路职工',
    Name: '赵鹏',
    PhoneNumber: '13800340004',
    Gender: '男',
    Age: '39',
    Department: '工程技术部',
    IsVirusAntigenTestDone: '√',
    IsVirusNucleicAcidTestDone: '√',
    IsVirusCultureIsolationDone:'',
    IsSerologicalTestDone: '√',
    CheckInDate: '2024-02-20',
},
{ 
    serialNumber: '5',
    UserType: '铁路职工',
    Name: '陈梅',
    PhoneNumber: '13800000005',
    Gender: '女',
    Age: '41',
    Department: '合约部',
    IsVirusAntigenTestDone: '√',
    IsVirusNucleicAcidTestDone: '',
    IsVirusCultureIsolationDone:'',
    IsSerologicalTestDone: '√',
    CheckInDate: '2024-06-01',
},
]);

const tableData = ref([]);
const showSearch = ref(true);
const loading = ref(false);
const total = computed(() => filteredData.value.length);

const tableHeight = computed(() => {
  return window.innerHeight - 300;
});

// 实时过滤后的数据
const filteredData = computed(() => {
  const { IsHealth, check } = queryParams.value;
  const lowerCaseCheck = check ? check.toLowerCase() : '';

  return allData.value.filter(item => {
    // 是否患病匹配
    const IsHealthMatch = !IsHealth || item.IsHealth === convertIsHealth(IsHealth);

    // 搜索文本匹配
    const fieldsToSearch = ['Name', 'PhoneNumber', 'Department'];
    const textMatch = fieldsToSearch.some(field => {
      const itemFieldValue = item[field]?.toString().toLowerCase() || '';
      return itemFieldValue.includes(lowerCaseCheck);
    });

    return IsHealthMatch && textMatch;
  });
});

// 分页数据
const paginatedData = computed(() => {
  const start = (queryParams.value.pageNum - 1) * queryParams.value.pageSize;
  const end = start + queryParams.value.pageSize;
  return filteredData.value.slice(start, end);
});

// 处理用户类型选择变化
const handleQuery = () => {
  tableData.value = paginatedData.value;
};

// 添加用户
const handleAdd = () => {};

// 批量导入
const handleImport = () => {};

// 下载导入模板
const handleDownload = () => {};

// 导出
const handleExport = () => {};

// 查看用户
const handleClick = () => {};

// 将用户类型数字转换为字符串
const convertIsHealth = (value) => {
  switch (value) {
    case 1: return '是';
    case 2: return '否';
    default: return '';
  }
};

// 组件挂载时请求数据
onMounted(() => {
  handleQuery(); // 初始数据
});

// 处理分页器的变化
const handlePagination = ({ page, limit }) => {
  queryParams.value.pageNum = page;
  queryParams.value.pageSize = limit;
  handleQuery(); // 更新分页数据
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
