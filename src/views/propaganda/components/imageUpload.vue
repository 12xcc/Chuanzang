<template>
  <div>
    <!-- 上传组件，控制是否可编辑 -->
    <el-upload
  v-model:file-list="files"
  action="#"
  list-type="picture-card"
  :auto-upload="false"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :before-upload="handleBeforeUpload"
  :on-change="handleFileChange" 
  :disabled="!editable"
  accept=".jpg,.jpeg,.png"
>
  <el-icon v-if="editable"><Plus /></el-icon>
</el-upload>


    <!-- 预览图片弹窗 -->
    <el-dialog v-model="dialogVisible" class="custom-dialog" :modal="true">
      <img v-if="dialogImageUrl" :src="dialogImageUrl" alt="图片预览" class="dialog-image" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, watch, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue';

const props = defineProps({
  filePath: {
    type: String,
    required: false,
  },
  editable: {
    type: Boolean,
    default: false,  // 控制是否可编辑
  },
});
const emits = defineEmits(['file-selected']);

const files = ref([]);
const dialogVisible = ref(false);
const dialogImageUrl = ref('');

// 初始化文件
onMounted(() => {
  if (props.filePath) {
    files.value.push({
      name: props.filePath.split('/').pop(),
      url: props.filePath,
    });
  }
});

// 当 filePath 变化时更新文件列表
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

// 预览图片
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url || URL.createObjectURL(file.raw);
  dialogVisible.value = true;
};

// 删除文件
const handleRemove = (file, fileList) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    fileList.splice(index, 1);
    ElMessage.success('图片已删除');
  }
};

// 上传文件限制
const handleBeforeUpload = () => {
  if (!props.editable) {
    ElMessage.warning('请先进入编辑模式');
    return false;
  }
  return true;
};

// 选择文件后将文件对象传递到父组件
const handleFileChange = (file) => {
  if (file.raw) {
    emits('file-selected', file.raw); // 直接传递原始文件对象
  }
};

</script>



<style scoped>
.image-preview {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

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

</style>
