<template>
  <div class="design-box">
    <!-- 顶部导航 -->
    <design-nav
      @export-pdf="generatePdfByPrint"
      @export-image="generatePdfByImage"
      @export-word="generateWord"
      @reset="reset"
    ></design-nav>

    <!-- 内容区域 -->
    <div class="bottom">
      <!-- 左侧：模块列表 + 添加模块 -->
      <div ref="leftRef" class="left">
        <Title show-collapse @unfold-or-collapse="unfoldOrCollapse" title="模块"></Title>
        <el-tabs v-model="leftTab" class="left-tabs">
          <el-tab-pane label="模块列表" name="list">
            <model-list :left-show-status="leftShowStatus"></model-list>
          </el-tab-pane>
          <el-tab-pane label="添加模块" name="add">
            <module-catalog></module-catalog>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 中间：A4 实时预览 -->
      <div :key="refreshUuid" class="center">
        <div id="printArea" ref="html2Pdf" class="design">
          <div ref="htmlContentPdf" class="design-content">
            <custom @content-height-change="contentHeightChange" />
          </div>
          <!-- 分页线（仅编辑时显示，打印时隐藏） -->
          <template v-if="linesNumber > 0">
            <div
              v-for="(item, index) in linesNumber"
              :key="index"
              class="lines"
              :style="{ top: `${1128 + 1132 * index}px` }"
            >
              <p class="tips">分割线仅为分页参考，打印时不显示</p>
              <p class="page">{{ index + 1 }}/{{ linesNumber }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- 右侧：属性设置 -->
      <div :key="refreshUuid" class="config">
        <Title :title="cptTitle"></Title>
        <div class="config-body">
          <component
            :is="optionsComponents[appStore.useSelectMaterialStore.cptOptionsName]"
            v-if="appStore.useSelectMaterialStore.cptName"
            :key="appStore.useSelectMaterialStore.cptKeyId"
          />
          <global-style-options v-else></global-style-options>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Title from './components/Title.vue';
  import ModelList from './components/ModelList.vue';
  import ModuleCatalog from './components/ModuleCatalog.vue';
  import DesignNav from './components/DesignNav.vue';
  import GlobalStyleOptions from '@/options/GlobalStyleOptions.vue';
  import custom from '@/template/custom/index.vue';
  import optionsComponents from '@/utils/registerMaterialOptionsCom';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { ElMessage } from 'element-plus';
  import { getTemplateById } from '@/templates';
  import { exportPdfByPrint } from '@/utils/exportPdfPrint';
  import { exportPdfByImage } from '@/utils/exportPdfImage';
  import { exportDocx } from '@/utils/exportDocx';

  const route = useRoute();
  const { cptTitle } = storeToRefs(appStore.useSelectMaterialStore);
  const { changeResumeJsonData } = appStore.useResumeJsonNewStore;
  const { refreshUuid } = storeToRefs(appStore.useUuidStore);
  const { setUuid } = appStore.useUuidStore;
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);

  // ===== 加载简历：有 ?template= 加载该模板；否则加载本地草稿；否则默认模板 =====
  const DRAFT_KEY = 'myresume-draft';
  const loadResume = (templateId?: string, fromDraft = false) => {
    if (templateId) {
      changeResumeJsonData(getTemplateById(templateId));
    } else if (fromDraft) {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        try {
          changeResumeJsonData(JSON.parse(draft));
        } catch {
          changeResumeJsonData(getTemplateById());
        }
      } else {
        changeResumeJsonData(getTemplateById());
      }
    } else {
      changeResumeJsonData(getTemplateById());
    }
    setUuid();
  };

  const templateId = route.query.template as string | undefined;
  loadResume(templateId, !templateId);

  // 重置：恢复初始模板
  const reset = () => {
    const tid = route.query.template as string | undefined;
    changeResumeJsonData(getTemplateById(tid));
    appStore.useSelectMaterialStore.resetSelectModel();
    setUuid();
    ElMessage({ message: '已重置', type: 'success' });
  };

  // ===== 分页线：监听内容高度 =====
  const html2Pdf = ref<any>(null);
  const htmlContentPdf = ref<any>(null);
  let observer: ResizeObserver | null = null;
  let linesNumber = ref<number>(0);
  const PAGE_HEIGHT = 1160; // 预览一页高度

  const resizeDOM = () => {
    observer?.disconnect();
    observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const height = (entry.target as HTMLElement).offsetHeight;
        linesNumber.value = Math.ceil(height / PAGE_HEIGHT);
        html2Pdf.value.style.height = PAGE_HEIGHT * linesNumber.value + 'px';
        htmlContentPdf.value.style.height = PAGE_HEIGHT * linesNumber.value + 'px';
      }
    });
    observer.observe(htmlContentPdf.value);
  };

  const contentHeightChange = async (height: number) => {
    htmlContentPdf.value.style.height = height + 'px';
    await nextTick();
    resizeDOM();
  };

  onMounted(async () => {
    await nextTick();
    resizeDOM();
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  // ===== 左侧栏折叠 =====
  const leftRef = ref<any>(null);
  const leftShowStatus = ref<boolean>(true);
  const leftTab = ref<string>('list');
  const unfoldOrCollapse = (status: boolean) => {
    setTimeout(() => {
      leftShowStatus.value = status;
    }, 100);
    leftRef.value.style.width = status ? '280px' : '60px';
  };

  // ===== 导出 =====
  const generatePdfByPrint = () => {
    exportPdfByPrint(resumeJsonNewStore.value.TITLE || '简历');
  };
  const generatePdfByImage = async () => {
    await exportPdfByImage(html2Pdf.value, resumeJsonNewStore.value.TITLE || '简历');
  };
  const generateWord = async () => {
    try {
      await exportDocx(resumeJsonNewStore.value);
      ElMessage({ message: 'Word 导出成功', type: 'success' });
    } catch (e) {
      console.error(e);
      ElMessage.error('Word 导出失败');
    }
  };
</script>

<style lang="scss">
  .design-box {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background: #f0f2f5;

    .bottom {
      display: flex;
      width: 100%;
      height: calc(100vh - 52px);

      .left {
        width: 280px;
        background-color: #fff;
        overflow: auto;
        transition: all 0.3s;
        border-right: 1px solid #eee;
        .left-tabs {
          padding: 0 8px;
        }
      }

      .center {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex: 1;
        min-width: 840px;
        height: calc(100vh - 52px);
        overflow: auto;
        padding: 24px;

        .design {
          background: white;
          width: 820px;
          min-height: 1160px;
          margin: 0;
          position: relative;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
          .lines {
            z-index: 10;
            width: 820px;
            height: 24px;
            background: #f3f3f3;
            user-select: none;
            pointer-events: none;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 12px;
            box-sizing: border-box;
            .tips {
              font-size: 9px;
              color: #c7c7c7;
            }
            .page {
              font-size: 9px;
              color: #999999;
              margin: 0;
            }
          }
        }
      }

      .config {
        width: 330px;
        background-color: #fff;
        border-left: 1px solid #eee;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 52px);
        .config-body {
          padding: 12px;
          flex: 1;
          overflow: auto;
        }
      }
    }
  }

  /* ===== 打印样式：只打印简历主体，A4 ===== */
  @media print {
    @page {
      size: A4;
      margin: 10mm 8mm;
    }
    body {
      background: #fff !important;
    }
    .design-box {
      height: auto !important;
      overflow: visible !important;
      background: #fff !important;
    }
    .design-box .bottom {
      height: auto !important;
      display: block !important;
    }
    .design-box .bottom .left,
    .design-box .bottom .config,
    .nav-box {
      display: none !important;
    }
    .design-box .bottom .center {
      display: block !important;
      height: auto !important;
      overflow: visible !important;
      padding: 0 !important;
      min-width: 0 !important;
    }
    .design {
      width: 190mm !important;
      min-height: 0 !important;
      box-shadow: none !important;
      margin: 0 !important;
    }
    .design-content {
      height: auto !important;
    }
    .lines {
      display: none !important;
    }
    /* 左右布局：保证两列在打印时正常 */
    .left-box,
    .right-box {
      min-height: auto !important;
    }
  }
</style>
