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
        <h3>添加宣传材料</h3>
        <div class="footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </div>
      </div>
      <el-form
        :model="form"
        label-width="100px"
        class="form-container"
        ref="form"
        :rules="rules"
      >
        <div class="BaseInfo">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">宣传材料信息</span>
          </div>
          <div class="BaseInfoDetail">
            <el-form-item label="标题" prop="Title">
              <el-input
                v-model="form.Title"
                style="width: 200px"
                placeholder="请输入标题"
                @blur="$refs.form.validateField('Title')"
                clearable
              ></el-input>
            </el-form-item>

            <!-- 材料类型 -->
            <el-form-item label="材料类型" prop="MaterialType">
              <el-radio-group
                v-model="form.MaterialType"
              >
                <el-radio value="图片">图片</el-radio>
                <el-radio value="文章">文章</el-radio>
                <el-radio value="视频">视频</el-radio>
                <el-radio value="网页链接">网页链接</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>

        <!-- 文件上传或链接输入 -->
        <div class="select flex gap-2 mb-4">
          <div class="title-container">
            <div class="blue-box"></div>
            <span class="title-text">请上传材料文件</span>
          </div>
          <!-- 文章时启用 PdfUpload -->
          <PdfUpload
            v-if="form.MaterialType === '文章'"
            :file-path="form.filePath"
            :editable="true"
            ref="PdfUpload"
          />

          <!-- 图片时启用 ImageUpload -->
          <ImageUpload
            v-if="form.MaterialType === '图片'"
            :file-path="form.filePath"
             :editable="true"
            ref="ImageUpload"
          />

          <!-- 视频时启用 VedioUpload -->
          <VedioUpload
            v-if="form.MaterialType === '视频'"
            :file-path="form.filePath"
             :editable="true"
            ref="VedioUpload"
          />

          <!-- 网页链接时 -->
          <el-input
            v-model="form.Link"
            v-if="form.MaterialType === '网页链接'"
            style="width: 400px"
          />
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { ElMessage } from "element-plus";
import PdfUpload from "./pdfUpload.vue";
import ImageUpload from "./imageUpload.vue";
import VedioUpload from "./VideoUpload.vue";
import { saveMaterial } from "@/api/propaganda/propaganda.js"
export default {
  components: {
    PdfUpload,
    ImageUpload,
    VedioUpload,
  },
  data() {
    return {
      visible: false, // 控制弹窗显示
      form: {
        Title: '',
        MaterialType: '',
      },
      rules: {
        Title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        MaterialType: [{ required: true, message: '请选择材料类型', trigger: 'change' }],
      },
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.handleReset();
    },
    async handleSubmit() {
      try {
        await this.$refs.form.validate();
        this.visible = false;
        ElMessage({
          message: "提交成功",
          type: "success",
        });
        this.handleReset();
      } catch (error) {
        ElMessage({
          message: "提交失败",
          type: "error",
        });
      }
    },
    handleReset() {
      this.form = {
        Title: '',
        MaterialType: '',
      };
    },
  },
};
</script>

<style scoped>
.custom-drawer {
  height: 100%;
}
.form-container {
  padding: 20px;
  margin-top: 70px;
}
.title {
  position: fixed;
  top: 0;
  right: 0;
  width: 800px;
  background: #ffffff;
  padding: 3px;
  z-index: 100;
  border: 3px solid #fafafa;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: -25px;
  margin-right: 10px;
  margin-bottom: 20px;
}
h3 {
  margin-top: 20px;
  font-size: 16px;
  color: #333333;
  margin-left: 30px;
}
.custom-input {
  margin-bottom: 10px;
}
.el-dropdown-link:focus {
  outline: none;
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

.BaseInfo {
  margin-bottom: 50px;
}
.el-check-tag {
  margin: 10px;
  font-weight: normal;
}
.el-check-tag.is-checked {
  background-color: #333333 !important;
  color: #ffffff;
  font-weight: normal;
}
.select {
  margin-top: 10px;
  margin-bottom: 20px;
}
.LabTestReport {
  margin-top: 20px;
}
</style>
