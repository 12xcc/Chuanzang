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
          <el-table-column
            prop="phoneNumber"
            label="用户手机号码"
            width="200"
          />
          <el-table-column
            prop="satisfactionLevel"
            label="满意度等级"
            width="180"
          >
            <template #default="scope">
              <el-tag
                :type="
                  scope.row.satisfactionLevel === '非常满意'
                    ? 'success'
                    : scope.row.satisfactionLevel === '满意'
                    ? 'primary'
                    : scope.row.satisfactionLevel === '一般'
                    ? 'warning'
                    : scope.row.satisfactionLevel === '不满意'
                    ? 'danger'
                    : 'info'
                "
              >
                {{ scope.row.satisfactionLevel }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="ratingTime" label="打分时间" width="180" />
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
import { pageSelectSatisfactionRating } from "@/api/satisfaction/satisfaction.js"; // 导入封装的 API

export default {
  components: {
    Pagination,
    Card,
  },

  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        surveyID: null, // 调查ID，需要传入
      },
      visible: false,
      allData: [],
      total: 0,
      loading: false,
      title: null,
    };
  },

  computed: {
    tableHeight() {
      return window.innerHeight - 460;
    },
  },

  methods: {
    showDrawer(surveyID, title) {
      this.visible = true;
      this.title = title;
      this.queryParams.surveyID = surveyID; // 设置调查ID
      this.fetchSatisfactionData();
    },

    // 分页查询满意度打分列表
    async fetchSatisfactionData() {
      this.loading = true;
      try {
        const params = {
          pageNo: this.queryParams.pageNum,
          pageNumber: this.queryParams.pageSize,
          surveyID: this.queryParams.surveyID, // 传递调查ID
        };

        const response = await pageSelectSatisfactionRating(params);

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => {
            const formattedRatingTime = this.formatRatingTime(item.ratingTime); // 调用格式化函数

            return {
              serialNumber:
                (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
                index +
                1,
              phoneNumber: item.phoneNumber,
              satisfactionLevel: item.satisfactionLevel, // 满意度等级
              ratingTime: formattedRatingTime, // 使用格式化后的打分时间
            };
          });
          this.total = response.data.data.total;
        } else {
          this.$message.error("获取满意度数据失败，请重试！");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$message.error("获取满意度数据失败，请重试！");
      } finally {
        this.loading = false;
      }
    },

    // 格式化打分时间函数
    formatRatingTime(ratingTimeArray) {
      if (!ratingTimeArray || ratingTimeArray.length < 6) return ""; // 处理无效的时间数组

      const [year, month, day, hour, minute, second] = ratingTimeArray;

      // 格式化为 YYYY-MM-DD HH:mm:ss
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )} ${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}:${String(second).padStart(2, "0")}`;
    },

    handleCancel() {
      this.visible = false;
    },

    // 分页
    handlePagination({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.fetchSatisfactionData(); // 分页时重新获取数据
    },
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
 