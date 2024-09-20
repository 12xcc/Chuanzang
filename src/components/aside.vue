<template>
  <el-menu
        default-active="2"
        class="aside-container"
        @open="handleOpen"
        @close="handleClose"
      >
      <p class="logo-lg">系统管理员-张三</p>
      <TreeMenu/>
      </el-menu>
</template>

<script setup>
import TreeMenu from './treemenu.vue'
const handleClose = () =>{

}
const handleOpen = () =>{

}
</script>

<style lang="less" scoped>

.aside-container{
  height: 100%;
  width: 210px;
}
.logo-lg{
  font-style: normal;
  font-size: 16px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #333333;
  font-weight: bold;
}

</style>