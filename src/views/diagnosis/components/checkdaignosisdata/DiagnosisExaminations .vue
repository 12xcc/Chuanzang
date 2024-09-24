<template>
  <div>
    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">影像学检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.imaging"
      :specimen-type="'影像学'"
      report-type="'影像学检查报告'"
    />

    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">B超报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.ultrasound"
      :specimen-type="'B超'"
      report-type="'B超报告'"
    />

    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">血液检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.blood"
      :specimen-type="'血'"
      report-type="'血液检查报告'"
    />

    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">粪便常规检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.fecal"
      :specimen-type="'粪便'"
      report-type="'粪便常规检查报告'"
    />

    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">尿常规检查报告（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.urine"
      :specimen-type="'尿'"
      report-type="'尿常规检查报告'"
    />

    <div class="title-container">
      <div class="blue-box"></div>
      <span class="title-text">病案首页（请上传jpg或pdf格式）</span>
    </div>
    <UploadSection
      v-model="reports.caseReport"
      :specimen-type="'病案'"
      report-type="'病案首页'"
    />
  </div>
</template>

<script>
import UploadSection from '@/components/UploadSection.vue';

export default {
  components: {
    UploadSection,
  },
  data() {
    return {
      reports: {
        imaging: [],         // 影像学检查报告
        ultrasound: [],      // B超报告
        blood: [],           // 血液检查报告
        fecal: [],           // 粪便常规检查报告
        urine: [],           // 尿常规检查报告
        caseReport: [],      // 病案首页
      },
    };
  },
  methods: {
    // 可以在这里添加其他方法
  },
};
</script>

<style scoped>
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
</style>
