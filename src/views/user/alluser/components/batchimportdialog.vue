<template>
  <el-dialog
    v-model="dialogVisible"
    title="批量导入"
    width="500px"
    right
  >
    <el-upload
      class="upload-demo"
      drag
      action="#"
      :show-file-list="true"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        拖拽文件到这里，或
        <em>点击上传</em>
      </div>
      <el-button slot="tip" type="text" size="default">支持格式：xlsx、csv</el-button>
    </el-upload>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  name: 'BatchImportDialog',
  data() {
    return {
      dialogVisible: false,
      fileList: [],
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleConfirm() {
      this.fileList = []; 
      ElMessage.success('上传成功');
      this.dialogVisible = false;
    },
    beforeUpload(file) {
      this.fileList.push(file); 
      return false; 
    }
  }
};
</script>

<style scoped>
.el-button{
  margin-left: 20px;
  margin-right: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
