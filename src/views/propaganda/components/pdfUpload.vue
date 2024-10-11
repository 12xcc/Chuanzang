<template>
  <div>
    <el-upload
      v-model:file-list="files"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-preview="handlePdfPreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :disabled="!editable"
      accept=".pdf"
    >
      <el-icon v-if="editable"><Plus /></el-icon>
    </el-upload>

    <!-- PDF 预览弹窗 -->
    <el-dialog v-model="dialogVisible" class="custom-dialog" :modal="true">
      <iframe v-if="dialogPdfUrl" :src="dialogPdfUrl" class="pdf-preview" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue';

const props = defineProps({
  filePath: {
    type: String,
    required: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const files = ref([]);
const dialogVisible = ref(false);
const dialogPdfUrl = ref('');

// 初始化文件
onMounted(() => {
  if (props.filePath) {
    files.value.push({
      name: props.filePath.split('/').pop(),
      url: props.filePath,
    });
  }
});

// 监听 filePath 的变化
watch(() => props.filePath, (newFilePath) => {
  if (newFilePath) {
    files.value = [
      {
        name: newFilePath.split('/').pop(),
        url: newFilePath,
      }
    ];
  }
});

// 预览 PDF
const handlePdfPreview = (file) => {
  dialogPdfUrl.value = file.url || URL.createObjectURL(file.raw);
  dialogVisible.value = true;
};

// 删除 PDF
const handleRemove = (file, fileList) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    fileList.splice(index, 1);
    ElMessage.success('PDF文件已删除');
  }
};

// 防止未在编辑模式时上传文件
const handleBeforeUpload = () => {
  if (!props.editable) {
    ElMessage.warning('请先进入编辑模式');
    return false;
  }
  return true;
};
</script>

<style scoped>
.filestyle {
    display: flex;
    justify-content: center; 
    align-items: center; 
    position: relative; 
    width: 100%;
    height: 100%; 
}

.el-upload-list__item-thumbnail_pdf {
    width: 60%;
    height: 60%;
}

.el-upload-list__item-thumbnail_jpg {
    width: 70%;
    height: 70%;
    object-fit: contain; 
    border-radius: 5px;
}

.file-names {
    margin-top: 10px; 
}

.file-name {
    text-align: left; 
    font-size: 14px; 
}

.custom-dialog {
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: auto; 
    height: auto;
}

.dialog-image {
    margin: 10px 0; 
    max-width: 100%; 
    max-height: 100%; 
    object-fit: contain; 
}

.pdf-preview {
    width: 100%; 
    height: 500px;
}
</style>
