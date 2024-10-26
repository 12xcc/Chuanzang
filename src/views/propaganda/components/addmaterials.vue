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
        label-width="200px"
        class="form-container"
        ref="form"
        :rules="rules"
        label-position="left"
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
              <el-radio-group v-model="form.MaterialType">
                <el-radio value="图片">图片</el-radio>
                <el-radio value="文章">文章</el-radio>
                <el-radio value="视频">视频</el-radio>
                <el-radio value="网页链接">网页链接</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="材料所属疾病类型" prop="diseaseTypeName" size="default">
              <el-select
                v-model="form.diseaseTypeName"
                placeholder="请选择疾病类型"
                clearable
                size="default"
                style="width: 200px; margin-right: -15px"
                @clear="handleQuery"
              >
                <el-option
                  value="新型冠状病毒感染"
                  label="新型冠状病毒感染"
                ></el-option>
                <el-option value="流感" label="流感"></el-option>
                <el-option value="鼠疫" label="鼠疫"></el-option>
                <el-option value="感染性腹泻" label="感染性腹泻"></el-option>
                <el-option value="炭疽" label="炭疽"></el-option>
                <el-option value="结核病" label="结核病"></el-option>
                <el-option
                  value="登革热（蚊媒传染病）"
                  label="登革热（蚊媒传染病）"
                ></el-option>
                <el-option
                  value="疟疾（蚊媒传染病）"
                  label="疟疾（蚊媒传染病）"
                ></el-option>
                <el-option
                  value="森林脑炎（蜱媒传染病）"
                  label="森林脑炎（蜱媒传染病）"
                ></el-option>
                <el-option
                  value="发热伴血小板减少综合征（蜱媒传染病）"
                  label="发热伴血小板减少综合征（蜱媒传染病）"
                ></el-option>
                <el-option value="斑疹伤寒" label="斑疹伤寒"></el-option>
                <el-option
                  value="流行性出血热"
                  label="流行性出血热"
                ></el-option>
                <el-option value="其他" label="其他"></el-option>
              </el-select>
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
            @file-selected="handleFileUpload"
          />

          <!-- 图片时启用 ImageUpload -->
          <ImageUpload
            v-if="form.MaterialType === '图片'"
            :file-path="form.filePath"
            :editable="true"
            ref="ImageUpload"
            @file-selected="handleFileUpload"
          />
          <!-- 视频时启用 VedioUpload -->
          <VedioUpload
            v-if="form.MaterialType === '视频'"
            :file-path="form.filePath"
            :editable="true"
            ref="VedioUpload"
            @file-selected="handleFileUpload"
          />

          <!-- 网页链接时 -->
          <el-input
            v-model="form.link"
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
import { saveMaterial } from "@/api/propaganda/propaganda.js";

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
        Title: null,
        MaterialType: null,
        diseaseTypeName: null, // 疾病类型名称
        file: null, // 文件对象
        link: null, // 链接
      },
      rules: {
        Title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        MaterialType: [
          { required: true, message: "请选择材料类型", trigger: "change" },
        ],
        diseaseTypeName: [
          { required: true, message: "请选择材料所属疾病类型", trigger: "change" },
        ],
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

        const formData = new FormData();
        formData.append("title", this.form.Title);
        formData.append("materialType", this.form.MaterialType);
        formData.append("diseaseTypeName", this.form.diseaseTypeName);

        // 根据材料类型判断是文件上传还是链接
        if (this.form.MaterialType === "网页链接") {
          if (!this.form.link) throw new Error("链接不能为空");
          formData.append("link", this.form.link);
        } else {
          if (!this.form.file) throw new Error("文件不能为空");
          formData.append("file", this.form.file);
        }

        // 调试代码：打印 FormData 内容
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}:`, pair[1]);
        }
        const response = await saveMaterial(formData);
        if (response.data.code === 1) {
          ElMessage.success("提交成功");
          this.visible = false;
          this.$emit("update-materails");
          this.handleReset();
        } else {
          throw new Error(response.data.msg || "提交失败");
        }
      } catch (error) {
        ElMessage.error(error.message || "提交失败");
      }
    },
    handleReset() {
      this.form = {
        Title: null,
        MaterialType: null,
        diseaseTypeName: null,
        file: null,
        link: null,
      };
    },
    // 接收子组件传递的文件，并确保它是一个有效的 File 对象
    handleFileUpload(file) {
      if (file instanceof File) {
        this.form.file = file;
        console.log("文件已上传:", this.form.file); // 调试信息
      } else {
        console.error("上传的文件无效");
      }
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
