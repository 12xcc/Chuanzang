<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  total: Number,
  currentPage: Number,
  pageSize: Number
});

const emit = defineEmits(['pagination']);

const handleSizeChange = (size) => {
  emit('pagination', { page: props.currentPage, limit: size });
};

const handlePageChange = (page) => {
  emit('pagination', { page, limit: props.pageSize });
};
</script>

<style scoped>
.pagination {
  margin: 20px 0;
}
</style>
