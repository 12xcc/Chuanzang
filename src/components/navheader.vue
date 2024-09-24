<template>
  <div class="container">
    <div class="left">
      <!-- <el-icon class="icon" size="20"><Fold /></el-icon> -->
    </div>
    <div class="right">
      <div class="tags-container">
        <el-tag
          v-for="tag in tagsList"
          :key="tag.path"
          :closable="true"
          :class="{ active: tag.path === currentPath }"
          @close="removeTag(tag.path)"
          @click="selectTag(tag)"
        >
          {{ tag.title }}
          <!-- <template #close>
           <el-icon class="closeicon"><Close /></el-icon>
          </template> -->
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { Fold, Close } from '@element-plus/icons-vue';
import { mapState } from 'pinia';
import { useTagsStore } from '@/store/tags';
import { useRouter } from 'vue-router';

export default {
  name: 'NavHeader',

  computed: {
    ...mapState(useTagsStore, ['tagsList']),
    currentPath() {
      return this.$router.currentRoute.value.path;
    },
  },

  methods: {
    selectTag(tag) {
      this.$router.push(tag.path);
    },

    removeTag(tagPath) {
      const currentTagIndex = this.tagsList.findIndex(tag => tag.path === tagPath);

      // 删除标签
      this.$store.removeTag(tagPath);

      // 如果删除的是当前标签
      if (tagPath === this.currentPath) {
        const previousTag = this.$store.getPreviousTag(currentTagIndex);
        if (previousTag) {
          this.$router.push(previousTag.path);
        } else {
          this.$router.push('/user/alluser');
        }
      }
    },
  },

  created() {
    this.$store = useTagsStore();
    this.$router = useRouter();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  height: 100%;
  padding-right: 25px;
}

.left {
  display: flex;
  align-items: center;
  height: 100%;
}

.icon {
  width: 45px;
  height: 100%;
  color: #333333 ;
  background-color: #FFFFFF;
}

.icon:hover {
  background-color: #fafafa;
  cursor: pointer;

}

.tags-container {
  display: flex;
  align-items: center; 
  gap: 10px;
  padding: 10px;
  cursor: pointer;
}

.el-tag {
  color: #A6A6A6; 
  border: 1px solid #A6A6A6;
  background-color: #FAFAFA; 
  height: 30px;
  line-height: 30px; 
  padding: 0 12px;
}

.el-tag.active {
  color: #285AC8;
  border: 1px solid #285AC8;
  background-color: #FAFAFA;
}

</style>
