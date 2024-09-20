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
      <el-form-item label="是否患病" prop="IsHealth" size="default">
        <el-select
          v-model="queryParams.IsHealth"
          placeholder="请选择"
          clearable
          size="default"
          style="width:140px; margin-right:-15px;"
          @change="handleQuery"
        >
          <el-option :key="1" label="是" :value="1"></el-option>
          <el-option :key="2" label="否" :value="2"></el-option>
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
        >含AI数据导出</el-button>
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
        <el-table-column prop="IsHealth" label="患病" width="120">
          <template #default="scope">
            <el-tag :type="scope.row.IsHealth === '否' ? 'success' : 'danger'">
              {{ scope.row.IsHealth }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="LocationName" label="位置信息" min-width="120"/>
        <el-table-column prop="CheckInDate" label="打卡日期" min-width="120"/>
        <el-table-column prop="DiseaseTypeName" label="最有可能疾病" min-width="120"/>
        <el-table-column fixed="right" label="操作" min-width="260">
          <template #default="scope">
            <el-button v-if="scope.row.IsHealth === '是'" class="checksymptom" link type="primary" size="large" @click="handleClick(scope.row)">
              查看症状
            </el-button>
            <el-button link type="primary" size="large" @click="handleClickPosition(scope.row)">查看位置</el-button>
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

    <Checkindata ref="Checkindata" />
    <Checkinposition ref="Checkinposition" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Pagination from '@/components/pagination.vue';
import Checkindata from './components/checkindata/checkindata.vue';
import Checkinposition from './components//checkinposition/checkinposition.vue'
export default {
  components: {
    Pagination,
    Checkindata,
    Checkinposition
  },
  data() {
    return {
      queryParams: {
        IsHealth: '',
        check: '',
        pageNum: 1,
        pageSize: 15
      },
      allData: [
        {
          serialNumber: '1',
          UserType: '铁路职工',
          Name: '张伟',
          PhoneNumber: '13800000001',
          Gender: '男',
          Age: '44',
          Department: '工程技术部',
          IsHealth: '是',
          LocationName: '西藏林芝',
          CheckInDate: '2024-03-03',
          DiseaseTypeName: '正常',
        },
        { 
          serialNumber: '2',
          UserType: '铁路职工',
          Name: '李强',
          PhoneNumber: '13800000122',
          Gender: '男',
          Age: '35',
          Department: '测量队',
          IsHealth: '是',
          LocationName: '四川甘孜',
          CheckInDate: '2024-04-15',
          DiseaseTypeName: '正常',
        },
        { 
          serialNumber: '3',
          UserType: '铁路职工',
          Name: '王丽',
          PhoneNumber: '13800000003',
          Gender: '女',
          Age: '28',
          Department: '测量队',
          IsHealth: '否',
          LocationName: '四川雅安',
          CheckInDate: '2024-05-10',
          DiseaseTypeName: '炭疽',
        },
        { 
          serialNumber: '4',
          UserType: '铁路职工',
          Name: '赵鹏',
          PhoneNumber: '13800340004',
          Gender: '男',
          Age: '39',
          Department: '工程技术部',
          IsHealth: '是',
          LocationName: '四川康定',
          CheckInDate: '2024-02-20',
          DiseaseTypeName: '正常',
        },
        { 
          serialNumber: '5',
          UserType: '铁路职工',
          Name: '陈梅',
          PhoneNumber: '13800000005',
          Gender: '女',
          Age: '41',
          Department: '合约部',
          IsHealth: '是',
          LocationName: '西藏昌都',
          CheckInDate: '2024-06-01',
          DiseaseTypeName: '正常',
        },
        { 
          serialNumber: '6',
          UserType: '铁路职工',
          Name: '刘洋',
          PhoneNumber: '13800000006',
          Gender: '男',
          Age: '32',
          Department: '工程技术部',
          IsHealth: '否',
          LocationName: '西藏那曲',
          CheckInDate: '2024-07-18',
          DiseaseTypeName: '鼠疫',
        },
        { 
          serialNumber: '4',
          UserType: '铁路职工',
          Name: '赵鹏',
          PhoneNumber: '13800340004',
          Gender: '男',
          Age: '39',
          Department: '工程技术部',
          IsHealth: '是',
          LocationName: '四川康定',
          CheckInDate: '2024-02-20',
          DiseaseTypeName: '正常',
        },
        { 
          serialNumber: '5',
          UserType: '铁路职工',
          Name: '陈梅',
          PhoneNumber: '13800000005',
          Gender: '女',
          Age: '41',
          Department: '合约部',
          IsHealth: '是',
          LocationName: '西藏昌都',
          CheckInDate: '2024-06-01',
          DiseaseTypeName: '正常',
        },
      ],
      showSearch: true,
      loading: false
    };
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 300;
    },
    filteredData() {
      const { IsHealth, check } = this.queryParams;
      const lowerCaseCheck = check ? check.toLowerCase() : '';

      return this.allData.filter(item => {
        // 是否患病匹配
        const IsHealthMatch = !IsHealth || item.IsHealth === this.convertIsHealth(IsHealth);

        // 搜索文本匹配
        const fieldsToSearch = ['Name', 'PhoneNumber', 'Department'];
        const textMatch = fieldsToSearch.some(field => {
          const itemFieldValue = item[field]?.toString().toLowerCase() || '';
          return itemFieldValue.includes(lowerCaseCheck);
        });

        return IsHealthMatch && textMatch;
      });
    },
    paginatedData() {
      const start = (this.queryParams.pageNum - 1) * this.queryParams.pageSize;
      const end = start + this.queryParams.pageSize;
      return this.filteredData.slice(start, end);
    },
    total() {
      return this.filteredData.length;
    }
  },
  methods: {
    handleQuery() {
      this.tableData = this.paginatedData;
    },
    handleAdd() {
      // 添加用户
    },
    handleImport() {
      // 批量导入
    },
    handleDownload() {
      // 下载导入模板
    },
    handleExport() {
      // 导出
    },
     handleClick(row) {
      this.$refs.Checkindata.showDrawer(row);
      console.log("触发",row);
      // this.$router.push({ name: "userdata", params: { id: serialNumber } });
    },
    handleClickPosition(row){
      this.$refs.Checkinposition.showDrawer(row)
    },
    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery(); // 更新分页数据
    },
    convertIsHealth(value) {
      switch (value) {
        case 1: return '是';
        case 2: return '否';
        default: return '';
      }
    }
  },
  mounted() {
    this.handleQuery(); // 初始数据
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
