<template>
  <div class="container">
    <div class="chart-container">
      <div class="chart-title">数据过滤和搜索</div>
      <div class="table">

        <!-- 手机号搜索框 -->
        <el-form-item label="手机号" prop="check" class="search" size="large">
          <el-input
            v-model="searchQuery"
            placeholder="请输入手机号"
            clearable
            size="default"
            style="width: 200px !important; margin-right: -15px"
            @input="filterData" 
          />
        </el-form-item>

        <!-- 数据表格 -->
        <el-table 
          :data="displayedData" 
          :header-cell-style="{height:'15px',background:'#FFFFFF',color: '#333333'}" 
          style="width: 100%; height: 100%;"
          :show-overflow-tooltip="true"
        >
          <el-table-column prop="Name" label="姓名" width="60" />
          <el-table-column prop="Department" label="部门" width="80" />
          <el-table-column prop="statu"  label="健康状况" width="80">
            <template #default="scope">
              <el-tag :type="scope.row.statu === '健康' ? 'success' : 'danger'">
                {{ scope.row.statu }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="statu"  label="诊断结果" width="80">
            <template #default="scope">
              <el-tag :type="scope.row.statu === '健康' ? 'success' : 'danger'">
                {{ scope.row.statu }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const data = ref([
  { id: 1, Name: '张三', Department: '测量队', statu: '健康', gender: '男', PhoneNumber: '13022045890' },
  { id: 2, Name: '李四', Department: '测量队', statu: '鼠疫', gender: '女', PhoneNumber: '13789645890' },
  { id: 3, Name: '王五', Department: '合约部', statu: '健康', gender: '男', PhoneNumber: '12022045890' },
  { id: 4, Name: '赵六', Department: '合约部', statu: '新型冠状病毒感染', gender: '女', PhoneNumber: '13022045890' },
  { id: 5, Name: '钱七', Department: '测量队', statu: '炭疽', gender: '男', PhoneNumber: '13022045890' },
  { id: 6, Name: '孙八', Department: '测量队', statu: '健康', gender: '男', PhoneNumber: '14900045890' },
  { id: 7, Name: '周九', Department: '测量队', statu: '健康', gender: '男', PhoneNumber: '12082045890' },
  { id: 8, Name: '吴十', Department: '测量队', statu: '健康', gender: '男', PhoneNumber: '19022333890' }
]);

const displayedData = ref([...data.value]);
const searchQuery = ref(''); // 搜索框内容

// 过滤数据
const filterData = () => {
  const query = searchQuery.value.trim();
  if (query === '') {
    displayedData.value = [...data.value]; // 如果请输入框为空，显示全部数据
  } else {
    displayedData.value = data.value.filter(item =>
      item.PhoneNumber.includes(query) // 根据手机号筛选
    );
  }
};

onMounted(() => {
  displayedData.value = [...data.value]; // 初始化数据
});
</script>

<style scoped>
.container {
  margin-top: 10px;
  width: 100%;
  height: auto;
}

.chart-container {
  width: 340px;
  height: 280px;
  background-color: #FAFAFA;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  padding: 10px;
  overflow: hidden;
}

.chart-title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #4A4A4A;
  background-color: #FAFAFA;
  padding: 2px 5px;
  border-radius: 3px;
  z-index: 10;
}

.search {
  margin-top: 30px;
  margin-left: 30px;
}

.table {
  height: 100%;
}

.el-table {
  margin-top: 25px;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
