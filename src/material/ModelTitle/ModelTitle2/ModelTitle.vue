<!-- 模块公共标题 -->
<template>
  <div class="template2-model-title">
    <div class="icon-box">
      <svg-icon :icon-name="iconfont" color="#fff" size="15px"></svg-icon>
    </div>
    <div class="right-title">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    title: string;
    iconfont: string;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .template2-model-title {
    width: 100%;
    display: flex;
    align-items: center;
    .icon-box {
      width: 26px;
      height: 26px;
      flex-shrink: 0;
      background-color: v-bind('modelStyle.themeColor');
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      .svg-icon {
        font-size: 14px;
      }
    }
    .right-title {
      flex: 1;
      display: flex;
      align-items: center;
      border-bottom: 1px solid v-bind('modelStyle.themeColor');
      padding-bottom: 6px;
      min-height: 26px;
      h1 {
        margin: 0;
        font-size: v-bind('modelStyle.firstTitleFontSize');
        color: v-bind('modelStyle.themeColor');
        line-height: 1.2;
        font-weight: 600;
      }
    }
  }
</style>
