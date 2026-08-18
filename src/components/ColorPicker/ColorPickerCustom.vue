<!-- 主题色选择组件（用 Element Plus 颜色选择器替代原版 colorpicker-v3） -->
<template>
  <div class="color-picker-box">
    <el-tooltip content="自定义主题色">
      <div class="item-box">
        <el-color-picker :model-value="modelValue" @change="changeColorPicker" />
      </div>
    </el-tooltip>
    <div v-for="(item, index) in colorList" :key="item.hex" :class="['item-box']">
      <span
        :class="['item', { active: index === curentIndex || modelValue === item.hex }]"
        :style="{
          'background-color': item.hex
        }"
        @click="changTheme(index, item)"
      ></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits(['update:modelValue', 'change']);

  // 颜色列表
  const colorList = reactive<Array<{ rgb: string; hex: string }>>([
    { rgb: 'rgb(37,70,101)', hex: '#254665' },
    { rgb: 'rgb(221,65,94)', hex: '#dd415e' },
    { rgb: 'rgb(150,122,91)', hex: '#967a5b' },
    { rgb: 'rgb(51,144,205)', hex: '#3390cd' },
    { rgb: 'rgb(245,79,79)', hex: '#f54f4f' },
    { rgb: 'rgb(77,77,77)', hex: '#4d4d4d' },
    { rgb: 'rgb(170,132,96)', hex: '#aa8460' },
    { rgb: 'rgb(118,186,49)', hex: '#76ba31' },
    { rgb: 'rgb(100,126,201)', hex: '#647ec9' }
  ]);

  const hexToRgb = (hex: string): string => {
    const h = hex.replace('#', '')
    if (h.length !== 6) return `rgb(0,0,0)`
    const n = parseInt(h, 16)
    return `rgb(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255})`
  }

  // 更改主题色
  const curentIndex = ref<number>(-1);
  const changTheme = (index: number, item: { rgb: string; hex: string }) => {
    curentIndex.value = index;
    emit('update:modelValue', item.hex);
    emit('change', item);
  };

  // 颜色选择器颜色改变
  const changeColorPicker = (hex: string) => {
    curentIndex.value = -1;
    emit('update:modelValue', hex);
    emit('change', { hex, rgb: hexToRgb(hex) });
  };
</script>
<style lang="scss" scoped>
  .color-picker-box {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    user-select: none;
    .item-box {
      width: 30px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .item {
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .active {
      background-color: rgb(214, 21, 4);
      box-shadow: rgb(99, 100, 99) 0px 0px 10px;
    }
  }
</style>
