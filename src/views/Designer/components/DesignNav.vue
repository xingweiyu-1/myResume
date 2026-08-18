<template>
  <nav class="nav-box">
    <div class="nav-left">
      <span class="logo" @click="toHome">myResume</span>
    </div>
    <div class="nav-center">
      <span v-show="!isShowIpt" class="title-text" @click="changeTitle">
        {{ resumeJsonNewStore.TITLE }}
        <el-icon :size="16" color="#409eff"><Edit /></el-icon>
      </span>
      <el-input
        v-show="isShowIpt"
        ref="titleIpf"
        v-model="resumeJsonNewStore.TITLE"
        autofocus
        placeholder="请输入标题"
        @blur="blurTitle"
        @keyup.enter="blurTitle"
      />
    </div>
    <div class="nav-right">
      <el-button size="small" @click="saveDraft">
        <el-icon><FolderOpened /></el-icon>
        <span>保存草稿</span>
      </el-button>
      <el-button size="small" type="primary" @click="emit('export-pdf')">
        <el-icon><Document /></el-icon>
        <span>导出PDF</span>
      </el-button>
      <el-button size="small" type="success" @click="emit('export-image')">
        <el-icon><Picture /></el-icon>
        <span>一键下载PDF</span>
      </el-button>
      <el-button size="small" type="warning" @click="emit('export-word')">
        <el-icon><DocumentCopy /></el-icon>
        <span>导出Word</span>
      </el-button>
      <el-button size="small" @click="exportJSON">
        <el-icon><Download /></el-icon>
        <span>导出JSON</span>
      </el-button>
      <el-button size="small" @click="importJson">
        <el-icon><Upload /></el-icon>
        <span>导入JSON</span>
      </el-button>
      <el-button size="small" @click="resetAll">
        <el-icon><Refresh /></el-icon>
        <span>重置</span>
      </el-button>
    </div>
  </nav>

  <!-- 导入 JSON 弹窗 -->
  <import-json-dialog :dialog-visible="dialogVisible" @cancle="cancleJsonDialog" />
</template>
<script lang="ts" setup>
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';
  import { debounce } from 'lodash';
  import ImportJsonDialog from '@/components/ImportJsonDialog/ImportJsonDialog.vue';
  import { exportJson } from '@/utils/exportJson';

  const emit = defineEmits(['export-pdf', 'export-image', 'export-word', 'reset']);
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);

  const router = useRouter();
  const toHome = () => {
    router.push('/');
  };

  // 更改标题
  const isShowIpt = ref<boolean>(false);
  const titleIpf = ref<any>(null);
  const changeTitle = () => {
    isShowIpt.value = true;
    nextTick(() => titleIpf.value?.focus());
  };
  const blurTitle = () => {
    isShowIpt.value = false;
  };

  // ===== 草稿（localStorage，替代云端） =====
  const DRAFT_KEY = 'myresume-draft';
  const saveDraft = (showTip = true) => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(resumeJsonNewStore.value));
    if (showTip) {
      ElMessage({ message: '已保存到本地草稿', type: 'success' });
    }
  };
  // 自动保存
  const debouncedSave = debounce(() => saveDraft(false), 3000);
  watch(
    () => resumeJsonNewStore.value,
    () => debouncedSave(),
    { deep: true }
  );
  onBeforeUnmount(() => debouncedSave.cancel());

  // ===== 导出 JSON =====
  const exportJSON = () => {
    exportJson(resumeJsonNewStore.value);
  };

  // ===== 导入 JSON =====
  const dialogVisible = ref<boolean>(false);
  const importJson = () => {
    dialogVisible.value = true;
  };
  const cancleJsonDialog = () => {
    dialogVisible.value = false;
  };

  // ===== 重置 =====
  const resetAll = () => {
    ElMessageBox.confirm('此操作会重置简历至初始状态，是否继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        emit('reset');
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .nav-box {
    height: 52px;
    width: 100%;
    background-color: #fff;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
    z-index: 20;
    .nav-left {
      width: 180px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      .logo {
        font-size: 20px;
        font-weight: 700;
        color: #00c091;
        letter-spacing: 1px;
        cursor: pointer;
        user-select: none;
      }
    }
    .nav-center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .title-text {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #333;
        cursor: pointer;
        .el-icon {
          margin-left: 6px;
        }
      }
      .el-input {
        width: 220px;
      }
    }
    .nav-right {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-right: 16px;
      .el-button {
        margin: 0;
      }
    }
  }
</style>
