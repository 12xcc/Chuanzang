<template>
  <div class="container">
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
        :show-overflow-tooltip="true"
        :default-sort="{ prop: 'LearningNumber', order: '' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="SequenceNumber" label="序号" width="200" />
        <el-table-column link type="primary" prop="Title" label="满意度调查标题" width="300">
        <template #default="scope">
            <el-button
              link
              type="primary"
              @click="handleClick(scope.row.materialId)"
            >
              {{ scope.row.Title }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="materialId" label="满意度" width="300">
          <template #default="scope">
            <el-tag :type="scope.row.materialId">
            <el-button
              link
              type="primary"
              @click="handleCheckScore(scope.row.materialId,scope.row.Title)"
            >
              {{ scope.row.materialId }}
            </el-button>
            </el-tag>
          </template>
        <!-- <template #default="scope">
            <el-tag :type="scope.row.materialId">
              {{ scope.row.materialId }}
            </el-tag>
          </template> -->
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="300">
          <template #default="scope">
            <el-button
              link
              :type="scope.row.isDeleted ? 'danger' : 'primary'"
              size="large"
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.isDeleted ? "已关闭" : "开放中" }}
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
      <Checksatis ref="Checksatis" :form="queryParams" />
      <Addmaterials ref="Addmaterials" />
      <CheckSatisScore ref="CheckSatisScore" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Pagination from "@/components/pagination.vue";
import Checksatis from "./components/checksatis.vue";
import Addmaterials from "../propaganda/components/addmaterials.vue";
import CheckSatisScore from "./components/checksatisscore.vue"
import {
  pageSelectDiseaseLearningMaterials,
  startOrStopMaterial,
} from "@/api/propaganda/propaganda.js";

export default {
  components: {
    Pagination,
    Checksatis,
    Addmaterials,
    CheckSatisScore,
  },

  data() {
    return {
      queryParams: {
        diseaseTypeName: "",
        pageNum: 1,
        pageSize: 15,
      },
      allData: [],
      loading: false,
      total: 0,
      showSearch: true,
    };
  },

  computed: {
    tableHeight() {
      return window.innerHeight - 300;
    },
  },

  methods: {
    handleClick(materialId) {
      this.$refs.Checksatis.showDrawer(materialId);
    },

    // 获取宣传材料列表
    async handleQuery() {
      this.loading = true;
      try {
        const params = {
          diseaseTypeName: this.queryParams.diseaseTypeName || "",
          pageNo: this.queryParams.pageNum || 1,
          pageSize: this.queryParams.pageSize || 15,
        };

        const response = await pageSelectDiseaseLearningMaterials(params);

        if (response.data.code === 1) {
          this.allData = response.data.data.records.map((item, index) => ({
            SequenceNumber:
              (this.queryParams.pageNum - 1) * this.queryParams.pageSize +
              index +
              1,
            MaterialType: item.materialType || "未知类型",
            Title: item.title || "-",
            FilePath: item.filePath || "-",
            Link: item.link || "-",
            PublishDate: item.publishDate
              ? `${item.publishDate[0]}-${String(item.publishDate[1]).padStart(
                  2,
                  "0"
                )}-${String(item.publishDate[2]).padStart(2, "0")} ${String(
                  item.publishDate[3]
                ).padStart(2, "0")}:${String(item.publishDate[4]).padStart(
                  2,
                  "0"
                )}:${String(item.publishDate[5]).padStart(2, "0")}`
              : "无发布日期",
            LearningNumber: item.studyCount || 0,
            isDeleted: item.isDeleted,
            materialId: item.materialId,
          }));
          this.total = response.data.data.total;
        } else {
          this.$message.error(
            "获取满意度调查问卷数据失败，请重试！" + response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.$message.error("获取满意度调查问卷数据失败，请重试！");
      } finally {
        this.loading = false;
      }
    },

    handleAdd() {
      this.$refs.Addmaterials.showDrawer();
    },

// 切换问卷状态
  async toggleStatus(row) {
    // 检查当前是否有其他开放中的问卷
    const openSurvey = this.allData.find((item) => !item.isDeleted && item.materialId !== row.materialId);

    // 如果有其他开放中的调查，并且当前要切换的调查是想要开放，则阻止操作
    if (openSurvey && row.isDeleted) {
      this.$message.warning('只能开放一个调查问卷，若要开放此问卷，请先关闭另一个');
      return;
    }

    // 弹出确认框
    try {
      await this.$confirm("您确定要切换问卷状态吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });

      // 切换问卷状态
      const newStatus = !row.isDeleted;
      const response = await startOrStopMaterial(row.materialId, newStatus);

      // 成功后刷新数据
      if (response.data.code === 1) {
        row.isDeleted = newStatus;
        this.$message.success(`问卷已${newStatus ? "禁用" : "启用"}！`);
        
        // 更新 allData，确保视图刷新
        this.$set(this.allData, this.allData.indexOf(row), { ...row });
      } else {
        this.$message.error("切换状态失败：" + response.data.message);
      }
    } catch (error) {
    }
  },
    handleCheckScore(user,title){
      this.$refs.CheckSatisScore.showDrawer(user,title);
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
