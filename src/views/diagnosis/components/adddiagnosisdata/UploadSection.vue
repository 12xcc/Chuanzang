<template>
  <div>
    <el-upload
      v-model:file-list="files"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      accept=".jpg,.jpeg,.pdf"
    >
      <el-icon><Plus /></el-icon>

      <template #file="{ file }">
        <div class="filestyle">
          <img 
            v-if="file.raw && file.raw.type === 'application/pdf'" 
            class="el-upload-list__item-thumbnail_pdf" 
            src="@/assets/filesicon-PDF.svg" 
            alt="PDF Icon" 
          />
          <img 
            v-else 
            class="el-upload-list__item-thumbnail_jpg" 
            :src="file.url || URL.createObjectURL(file.raw)" 
            alt="Image Preview" 
          />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><ZoomIn /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="() => handleRemove(file, files)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <div class="file-names">
      <div v-for="file in files" :key="file.uid" class="file-name">
        {{ file.name }}
      </div>
    </div>

    <el-dialog v-model="dialogVisible" class="custom-dialog" :modal="true">
      <img class="dialog-image" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const files = ref<UploadFile[]>([]); // 存储文件列表

const handleRemove: UploadProps['onRemove'] = (file, fileList) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    fileList.splice(index, 1); // 删除文件
  }
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url || URL.createObjectURL(file.raw);
  dialogVisible.value = true;
}

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
    margin-top: 10px; /* 调整文件名与上传框之间的间距 */
}

.file-name {
    text-align: left; /* 文件名居中 */
    font-size: 14px; /* 文件名字体大小 */
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
