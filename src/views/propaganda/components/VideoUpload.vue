<template>
  <div>
    <el-upload
      v-model:file-list="files"
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :disabled="!editable"
      accept=".mp4"
      :on-change="handleFileChange"  
    >
      <el-icon v-if="editable"><Plus /></el-icon>

      <template #file="{ file }">
        <div class="filestyle">
          <img 
            v-if="file.thumbnailUrl" 
            :src="file.thumbnailUrl" 
            class="el-upload-list__item-thumbnail" 
            alt="Video Thumbnail" 
          />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="() => handlePictureCardPreview(file)"
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

    <el-dialog 
      v-model="dialogVisible" 
      class="custom-dialog" 
      :modal="true" 
      @close="stopVideo"
    >
      <template #title>
        <span>{{ currentFileName }}</span>
      </template>
      <div class="video-container">
        <video 
          v-if="isVideo" 
          class="dialog-video" 
          :src="dialogImageUrl" 
          controls 
          autoplay 
          playsinline 
          muted
          @error="handleVideoError"
          @ended="stopVideo"
          ref="videoPlayer"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadProps } from 'element-plus'

// 扩展 UploadFile 类型
interface ExtendedUploadFile extends UploadFile {
  thumbnailUrl?: string;
}

const props = defineProps({
  filePath: {
    type: String,
    required: false,
  },
  editable: {
    type: Boolean,
    default: false, // 控制是否处于编辑模式
  },
});

// 用于控制文件上传和预览
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const files = ref<ExtendedUploadFile[]>([]);
const currentFileName = ref('');
const isVideo = ref(false); // 判断是否为视频
const videoPlayer = ref<HTMLVideoElement | null>(null); // 视频播放器引用

// 初始化文件
onMounted(() => {
  if (props.filePath) {
    files.value.push({
      name: props.filePath.split('/').pop(),  // 提取文件名
      url: props.filePath,  // 设置完整的 URL 用于预览
      status: 'success',  // 状态为已成功上传
      uid: Date.now(),  // 使用当前时间戳生成唯一的 uid
    });
  }
});

// 当 filePath 改变时更新文件列表
watch(() => props.filePath, (newFilePath) => {
  if (newFilePath) {
    files.value = [
      {
        name: newFilePath.split('/').pop(),  // 提取文件名
        url: newFilePath,  // 设置完整的 URL 用于预览
        status: 'success',  // 设置状态为已成功上传
        uid: Date.now(),  // 使用时间戳作为唯一 ID
      }
    ];
  }
});

// 预览视频
const handlePictureCardPreview = (file: ExtendedUploadFile) => {
  dialogImageUrl.value = file.url || URL.createObjectURL(file.raw);
  isVideo.value = file.raw && file.raw.type === 'video/mp4'; // 判断是否为视频
  currentFileName.value = file.name; // 获取当前文件名
  dialogVisible.value = true; // 打开对话框
}

// 处理文件删除
const handleRemove: UploadProps['onRemove'] = (file, fileList) => {
  const index = fileList.indexOf(file);
  if (index !== -1) {
    fileList.splice(index, 1);
    ElMessage.success('视频已删除');
  }
}

// 处理文件上传时的限制逻辑
const handleBeforeUpload = () => {
  if (!props.editable) {
    ElMessage.warning('请先进入编辑模式');
    return false;
  }
  return true;
};

// 处理文件更改时生成视频缩略图
const handleFileChange = (file: ExtendedUploadFile) => {
  if (file.raw && file.raw.type === 'video/mp4') {
    const videoElement = document.createElement('video');
    const reader = new FileReader();
    
    reader.onload = (e) => {
      videoElement.src = e.target.result as string;
      videoElement.addEventListener('loadedmetadata', () => {
        // 设置适当的延时以确保视频准备就绪
        setTimeout(() => {
          videoElement.currentTime = 0; // 跳到视频的开头
          videoElement.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
              canvas.width = 120; // 缩略图宽度
              canvas.height = 90;  // 缩略图高度
              context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
              file.thumbnailUrl = canvas.toDataURL(); // 存储缩略图 URL
            }
          });
        }, 200); // 设置适当的延时
      });
    };
    reader.readAsDataURL(file.raw);
  }
};

// 停止视频播放
const stopVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.pause(); // 停止播放
    videoPlayer.value.currentTime = 0; // 重置到开头
  }
  isVideo.value = false; // 重置视频状态
};

// 处理视频错误
const handleVideoError = () => {
  console.error('视频播放错误，无法加载视频。');
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

.el-upload-list__item-thumbnail {
    width: 100%;
    height: auto;
    object-fit: cover; 
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

.video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: auto; 
}

.dialog-video {
    max-width: 90%; 
    max-height: 80%; 
    width: auto; 
    height: auto; 
}
</style>
