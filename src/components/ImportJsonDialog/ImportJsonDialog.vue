<template>
  <el-dialog
    :model-value="dialogVisible"
    width="60%"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    custom-class="import-json"
  >
    <template #header>
      <div class="header">
        <div class="header-left">
          <h1 class="title">请在下方输入简历 JSON 数据</h1>
          <span style="color: #f56c6c; font-size: 12px">
            注意：JSON 数据通常为自定义模板时导出的 JSON 数据！
          </span>
        </div>
        <div class="header-right">
          <el-tooltip class="box-item" effect="dark" content="示例数据" placement="bottom">
            <div class="icon-box" @click="fillExample">
              <svg-icon icon-name="icon-xiazai" color="#fff" size="17px"></svg-icon>
            </div>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div class="code-box">
      <el-input
        v-model="code"
        type="textarea"
        :rows="18"
        placeholder='请粘贴简历 JSON 数据，例如 {"TITLE":"个人简历","LAYOUT":"classical","COMPONENTS":[],"GLOBAL_STYLE":{}}'
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="confirmJson">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import { isJSON } from '@/utils/common';
  import appStore from '@/store';
  import RESUME_JSON from '@/schema/resume';

  const emit = defineEmits(['cancle']);
  withDefaults(
    defineProps<{
      dialogVisible: boolean;
    }>(),
    {
      dialogVisible: false
    }
  );

  const code = ref<string>('');

  const cancle = () => {
    emit('cancle');
  };

  // 填充示例
  const fillExample = () => {
    code.value = JSON.stringify(RESUME_JSON, null, 2);
  };

  // 提交JSON
  const { setUuid } = appStore.useUuidStore;
  const { changeResumeJsonData, changeImportJsonData } = appStore.useResumeJsonNewStore;
  const { resetSelectModel } = appStore.useSelectMaterialStore;
  const confirmJson = () => {
    if (!code.value) {
      ElMessage({ message: '数据不能为空！', type: 'error' });
      return;
    }
    if (!isJSON(code.value)) {
      ElMessage({ message: 'JSON 格式不正确！', type: 'error' });
      return;
    }
    const importJson = JSON.parse(code.value);
    changeResumeJsonData(importJson); // 更改 store 数据
    changeImportJsonData(importJson); // 保存 JSON 数据
    setUuid(); // 重新渲染左侧列表和右侧属性面板
    resetSelectModel(); // 重置选中模块
    emit('cancle');
  };
</script>
<style lang="scss">
  .import-json {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 20px;
          margin: 0;
        }
        span {
          margin-top: 4px;
        }
      }
      .header-right {
        display: flex;
        .icon-box {
          width: 35px;
          height: 35px;
          background-color: #74a274;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-left: 15px;
          transition: all 0.3s;
          &:hover {
            background-color: rgba(0, 192, 145, 0.8);
          }
        }
      }
    }
  }
</style>
