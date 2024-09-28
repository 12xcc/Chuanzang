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
      <el-form-item label="" prop="MaterialType" size="default">
        <el-select
          v-model="queryParams.MaterialType"
          placeholder="请选择疾病类型"
          clearable
          size="default"
          style="width: 200px; margin-right: -15px"
          @change="handleMaterialTypeChange"
        >
          <el-option :key="1" label="新型冠状病毒感染" :value="1"></el-option>
          <el-option :key="2" label="铁路职工" :value="2"></el-option>
          <el-option :key="3" label="疾控中心工作人员" :value="3"></el-option>
          <el-option :key="4" label="专职医护" :value="4"></el-option>
        </el-select>
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
        :default-sort="{ prop: 'LearningNumber', order: '' }" 
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="SequenceNumber" label="序号" width="80" />
        <el-table-column prop="MaterialType" label="宣传材料类型" width="150" />
        <el-table-column prop="Title" label="标题" width="100" />
        <el-table-column prop="FilePath" label="文件路径" width="160" />
        <el-table-column prop="Link" label="网页链接" width="160" />
        <el-table-column prop="PublishDate" label="发布日期" width="150" />
        <el-table-column prop="LearningNumber" label="学习总次数" width="140" sortable />
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
            <el-button
              link
              type="primary"
              size="large"
              @click="handleClickEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              link
              :type="scope.row.isActive ? 'primary' : 'danger'"
              size="large"
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.isActive ? "可用" : "已禁用" }}
            </el-button>
            <template v-if="scope.row.isActive"> </template>
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

<script>
import * as XLSX from "xlsx";
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";

export default {
  components: {
    Pagination,
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
          SequenceNumber: "1",
          MaterialType: "图片",
          Title: "标题1",
          FilePath: "http://localhost:5173/#/propaganda",
          Link: "",
          PublishDate: "2024-03-20 20:22",
          LearningNumber: 1000,
        },
        {
          SequenceNumber: "2",
          MaterialType: "文章",
          Title: "标题2",
          FilePath: "http://localhost:5173/#/propaganda",
          Link: "",
          PublishDate: "2024-03-20 20:22",
          LearningNumber: 10,
        },
        {
          SequenceNumber: "3",
          MaterialType: "图片",
          Title: "标题3",
          FilePath: "http://localhost:5173/#/propaganda",
          Link: "",
          PublishDate: "2024-03-20 20:22",
          LearningNumber: 100,
        },
        {
          SequenceNumber: "4",
          MaterialType: "视频",
          Title: "标题4",
          FilePath: "http://localhost:5173/#/propaganda",
          Link: "",
          PublishDate: "2024-03-20 20:22",
          LearningNumber: 219,
        },
        {
          SequenceNumber: "5",
          MaterialType: "网页链接",
          Title: "标题5",
          FilePath: "",
          Link: "http://localhost:5173/#/propaganda",
          PublishDate: "2024-03-20 20:22",
          LearningNumber: 91,
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
    handleDownload() {
      // 逻辑处理
    },

    toggleStatus(row) {
      row.isActive = !row.isActive;
      this.handleQuery();
    },

     handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.handleQuery();
    }
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
  background-color: #ffffff;
  border-radius: 5px;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>
