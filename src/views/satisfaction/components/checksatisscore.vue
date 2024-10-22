<template>
<el-drawer
    :model-value="visible"
    direction="rtl"
    size="800px"
    :with-header="false"
    custom-class="custom-drawer"
    @close="handleCancel"
  >
  <div class="container">
    <div class="title">
        <h3>具体满意度反馈列表——{{ title }}</h3>
      </div>
    <!-- 表格部分 -->
    <Card ref="Card" />
    <div class="usertable">
       <div class="title-container">
        <div class="blue-box"></div>
        <span class="title-text">满意度统计列表</span>
      </div>
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
        :show-overflow-tooltip="true"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="serialNumber" label="序号" width="150" />
        <el-table-column prop="phoneNumber" label="用户名" width="200" />
         <el-table-column prop="satisfactionScore" label="满意度打分" width="180">
          <template #default="scope">
            <el-tag
              :type="
                scope.row.diseaseOutcome === '非常满意'
                  ? 'danger'
                  : scope.row.diseaseOutcome === '满意'
                  ? 'warning'
                  :  scope.row.diseaseOutcome === '一般'
                  ? 'success'
                  :  scope.row.diseaseOutcome === '不满意'
                  ? 'primary'
                  : 'info'
              "
            >
              {{ scope.row.diseaseOutcome }}
            </el-tag>
          </template>
        </el-table-column>
         <el-table-column prop="WorkOnPlateauStartDatet" label="提交时间" width="120" />
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
  </el-drawer>
</template>

<script>
import Pagination from "@/components/pagination.vue";
import Card from "./card.vue";
import {
  fetchUserData,
} from "@/api/user/alluser.js"; // 导入封装的 API

export default {
  components: {
    Pagination,
    Card,
  },

  data() {
    return {
      queryParams: {
        userType: "",
        choice: "", // 选择的字段
        check: "", // 搜索关键词
        pageNum: 1,
        pageSize: 15,
      },
      visible:false,
      allData: [],
      total: 0,
      showSearch: true,
      loading: false,
      title:null,
    };
  },

  computed: {
    tableHeight() {
      return window.innerHeight -460;
    },
  },

  methods: {
    showDrawer(user,title) {
      this.visible = true;
      // 调用接口获取数据
      this.form = { ...user };
      this.title=title;
    },

    // 获取用户列表
    async fetchUserData() {
      // console.log("Fetching user data...");
      this.loading = true;
      try {
        const params = {
          userType: this.queryParams.userType || "",
          pageNo: this.queryParams.pageNum || 1,
          pageSize: this.queryParams.pageSize || 15,
        };

        if (this.queryParams.choice && this.queryParams.check) {
          params[this.queryParams.choice] = this.queryParams.check;
        }

        // 封装的api
        const response = await fetchUserData(params);

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => ({
            serialNumber:
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1,
            userType: item.userType,
            name: item.name,
            phoneNumber: item.phoneNumber,
            gender: item.gender,
            age: item.age,
            ethnicity: item.ethnicity,
            EducationLevel: item.educationLevel,

            // 日期格式转换
            WorkOnPlateauStartDate: item.workOnPlateauStartDate
              ? `${item.workOnPlateauStartDate[0]}-${String(
                  item.workOnPlateauStartDate[1]
                ).padStart(2, "0")}-${String(
                  item.workOnPlateauStartDate[2]
                ).padStart(2, "0")}`
              : "",

            department: item.department,
            SpecificOccupation: item.specificOccupation,
            isActive: item.isActived,
            userId: item.userId,
          }));
          this.total = response.data.data.total;
        } else {
          this.$message.error(
            "获取用户数据失败，请重试！" + response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$message.error("获取用户数据失败，请重试！");
      } finally {
        this.loading = false;
      }
    },


    handleCancel() {
      this.visible = false;
    },
    // 分页
    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.fetchUserData();
    },

  },

  mounted() {
    this.fetchUserData();
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
.title-container {
    display: flex;
    margin-left: 0px;
    margin-bottom: 20px;
    margin-top: 20px;
}

.blue-box {
    width: 6px;
    height: 18px;
    background-color: #285ac8;
    margin-right: 10px;
}

.title-text {
    font-size: 12px;
    font-weight: bold;
    color: #4a4a4a;
}
</style>
 