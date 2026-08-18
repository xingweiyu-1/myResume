<template>
  <div class="module-catalog">
    <div
      v-for="(list, key, index) in MATERIAL_JSON"
      :key="key"
      class="cat-group"
    >
      <div class="cat-title" @click="toggle(key)">
        <svg-icon :icon-name="modelOfIcon[key] || 'icon-jibenziliao'" color="#2cbd99" size="16px"></svg-icon>
        <span>{{ modelOfTitle[key] || key }}</span>
        <el-icon class="arrow" :class="{ open: openKey === key }"><ArrowDown /></el-icon>
      </div>
      <div v-if="openKey === key" class="cat-variants">
        <div
          v-for="item in list"
          :key="item.cptName"
          class="variant-item"
          @click="addModel(item)"
        >
          <span>{{ variantLabel(item) }}</span>
          <el-icon color="#2cbd99"><Plus /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { MATERIAL_JSON } from '@/schema/materialList';
  import { modelOfTitle, modelOfIcon } from '@/dictionary';
  import MODEL_DATA_JSON from '@/schema/modelData';
  import appStore from '@/store';
  import { cloneDeep } from 'lodash';
  import { getUuid } from '@/utils/common';

  const openKey = ref<string>('');
  const toggle = (key: any) => {
    openKey.value = openKey.value === key ? '' : key;
  };

  // 样式变体名称（如"样式 1"）
  const variantLabel = (item: any) => {
    const idx = (item.cptName || '').split('_').pop();
    return `${modelOfTitle[item.model] || item.model} · 样式${idx || ''}`;
  };

  // 添加模块
  const { pushComponent } = appStore.useResumeJsonNewStore;
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const addModel = (item: any) => {
    const cptData = cloneDeep(item);
    cptData.data = cloneDeep(MODEL_DATA_JSON[cptData.model] || { model: cptData.model, title: cptData.model });
    cptData.keyId = getUuid();
    cptData.show = true;
    cptData.layout = resumeJsonNewStore.LAYOUT === 'leftRight' ? 'right' : 'center';
    pushComponent(cptData);
  };
</script>
<style lang="scss" scoped>
  .module-catalog {
    padding: 8px;
    .cat-group {
      border: 1px solid #eee;
      border-radius: 6px;
      margin-bottom: 8px;
      overflow: hidden;
      .cat-title {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        cursor: pointer;
        font-size: 13px;
        color: #333;
        background: #fafbfc;
        user-select: none;
        .arrow {
          margin-left: auto;
          transition: transform 0.2s;
          &.open {
            transform: rotate(180deg);
          }
        }
      }
      .cat-variants {
        .variant-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          font-size: 12px;
          color: #555;
          cursor: pointer;
          border-top: 1px solid #f5f5f5;
          &:hover {
            background: #f0faf6;
          }
        }
      }
    }
  }
</style>
