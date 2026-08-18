<template>
  <el-icon :size="size" :color="color" :class="className">
    <component :is="iconMap[iconName] || Document" />
  </el-icon>
</template>
<script setup lang="ts">
  // 把原版 iconfont 图标名映射到 Element Plus 图标（纯前端版不再引入 iconfont）
  import {
    Plus,
    Delete,
    Fold,
    Expand,
    User,
    Document,
    Position,
    School,
    Tools,
    Trophy,
    Star,
    ChatDotRound,
    FolderOpened,
    Briefcase,
    Download,
    Upload,
    Refresh,
    EditPen,
    MagicStick,
    Files,
    Postcard,
  } from '@element-plus/icons-vue';

  defineProps<{
    iconName?: string;
    color?: string;
    size?: string | number;
    className?: string;
  }>();

  const iconMap: Record<string, any> = {
    'icon-jia': Plus,
    'icon-shanchu': Delete,
    'icon-shouqi': Fold,
    'icon-zhankai': Expand,
    'icon-jibenziliao': User, // 基本资料
    'icon-yixianggangwei': Position, // 求职意向
    'icon-education-1-copy': School, // 教育背景
    'icon-zhuanyezhishijineng': Tools, // 技能特长
    'icon-rongyu1': Trophy, // 荣誉奖项
    'icon-xingquaihao': Star, // 兴趣爱好
    'icon-ziwopingjia': ChatDotRound, // 自我评价
    'icon-xiangmu': FolderOpened, // 项目经验
    'icon-xiangmujingli-04': FolderOpened,
    'icon-gongzuojingyan': Briefcase, // 工作经历
    'icon-biyeshixi': Briefcase, // 实习经历
    'icon-jiatimianban_timu': Postcard, // 校园经历
    'icon-biaoti': EditPen, // 简历标题
    'icon-works': Files,
    'icon-caogaoxiang1': Files, // 保存草稿
    'icon-pdf': Document, // 导出PDF
    'icon-xiazai': Download, // 导出JSON
    'icon-yunduanshangchuan': Upload, // 导入JSON
    'icon-zhongzhi': Refresh, // 重置
  };
</script>
