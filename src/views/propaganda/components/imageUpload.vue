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
      :disabled="!editable" 
      accept=".jpg,.jpeg,.png"
    >
      <!-- 如果是可编辑状态，显示上传按钮 -->
      <el-icon v-if="editable"><Plus /></el-icon>
    </el-upload>

    <!-- 预览图片弹窗 -->
    <el-dialog v-model="dialogVisible" class="custom-dialog" :modal="true">
      <img v-if="dialogImageUrl" :src="dialogImageUrl" alt="图片预览" class="dialog-image" />
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
    default: false,  // 父组件传递的状态，决定是否允许编辑
  },
});

// 已上传的文件列表
const files = ref([]);

// 用于控制预览弹窗
const dialogVisible = ref(false);
const dialogImageUrl = ref('');

// 初始化文件
onMounted(() => {
  if (props.filePath) {
    files.value.push({
      name: props.filePath.split('/').pop(),  // 从 filePath 提取文件名
      url: props.filePath,  // 使用完整的 URL 进行显示
    });
  }
});

// 当文件路径变化时，更新已上传的文件列表
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

// 删除图片
const handleRemove = (file, fileList) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    fileList.splice(index, 1);
    ElMessage.success('图片已删除');
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
