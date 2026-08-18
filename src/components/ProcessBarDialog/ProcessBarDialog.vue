<template>
  <el-dialog
    :model-value="dialogVisible"
    width="300px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <template #title>
      <span>正在导出...</span>
    </template>
    <el-progress :percentage="percentageNum" :stroke-width="6" />
  </el-dialog>
</template>
<script setup lang="ts">
  withDefaults(
    defineProps<{
      dialogVisible: boolean;
      percentageNum: number;
    }>(),
    {
      dialogVisible: false,
      percentageNum: 10
    }
  );
  const emit = defineEmits(['cancle']);
  const cancle = () => {
    emit('cancle');
  };
</script>
