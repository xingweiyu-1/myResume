<!-- 简历主体渲染：根据 LAYOUT 渲染单栏 / 左右双栏 -->
<template>
  <div ref="customContentPdf" class="content-box">
    <!-- 传统单栏布局 -->
    <template v-if="resumeJsonNewStore.LAYOUT === 'classical'">
      <draggable
        class="dragArea list-group"
        :list="resumeJsonNewStore.COMPONENTS"
        animation="500"
        group="custom"
        :sort="true"
        item-key="keyId"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <model-box :components="MaterialComponents" :item="element"></model-box>
          </div>
        </template>
      </draggable>
    </template>

    <!-- 左右两列布局 -->
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'leftRight'">
      <div class="left-box">
        <draggable
          class="left-drag-area"
          :list="leftList"
          animation="500"
          group="custom"
          :sort="true"
          item-key="keyId"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              <model-box :components="MaterialComponents" :item="element"></model-box>
            </div>
          </template>
        </draggable>
      </div>
      <div class="right-box">
        <draggable
          class="right-drag-area"
          :list="rightList"
          animation="500"
          group="custom"
          :sort="true"
          item-key="keyId"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              <model-box :components="MaterialComponents" :item="element"></model-box>
            </div>
          </template>
        </draggable>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import ModelBox from './ModelBox.vue';
  import draggable from 'vuedraggable';
  import MaterialComponents from '@/utils/registerMaterialCom';
  defineOptions({ name: 'custom' });
  const emit = defineEmits(['contentHeightChange']);

  // store相关数据
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;

  // 监听内容高度发生变化
  const customContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let height = 0;
  const changeHeight = () => {
    observer = new ResizeObserver(async (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        height = (entry.target as HTMLElement).offsetHeight;
        emit('contentHeightChange', height);
      }
    });
    observer.observe(customContentPdf.value); // 监听元素
  };
  onMounted(() => {
    changeHeight();
  });

  /**
   * 左右两列布局
   */
  const leftList = ref<any[]>([]);
  const rightList = ref<any[]>([]);
  if (resumeJsonNewStore.LAYOUT === 'leftRight') {
    leftList.value = resumeJsonNewStore.COMPONENTS.filter((item: any) => item.layout === 'left');
    rightList.value = resumeJsonNewStore.COMPONENTS.filter((item: any) => item.layout === 'right');
  }

  watch(
    () => leftList.value,
    () => {
      leftList.value.forEach((item: any) => {
        item.layout = 'left';
      });
      resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
    },
    { deep: true }
  );
  watch(
    () => rightList.value,
    () => {
      rightList.value.forEach((item: any) => {
        item.layout = 'right';
      });
      resumeJsonNewStore.COMPONENTS = leftList.value.concat(rightList.value);
    },
    { deep: true }
  );
</script>
<style lang="scss" scoped>
  .content-box {
    .dragArea {
      min-width: 820px;
      width: 820px;
      min-height: 1160px;
      background-color: #fff;
      box-sizing: border-box;
      position: relative;
      z-index: 0;
    }
    .left-box {
      width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
      box-sizing: border-box;
      background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftThemeColor');
      min-height: 1160px;
      position: absolute;
      height: 100%;
      .left-drag-area {
        min-height: 1160px;
        width: 100%;
      }
    }
    .right-box {
      min-height: 1160px;
      width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightWidth');
      margin-left: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
      background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightThemeColor');
      .right-drag-area {
        min-height: 1160px;
        width: 100%;
      }
    }
  }
</style>
