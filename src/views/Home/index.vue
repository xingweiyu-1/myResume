<template>
  <div class="home-page">
    <!-- 头部 -->
    <header class="header">
      <div class="header-inner">
        <h1 class="logo">myResume</h1>
        <p class="slogan">纯前端在线简历工具 · 本地编辑，数据不上传</p>
      </div>
    </header>

    <main class="main">
      <!-- 继续上次编辑 -->
      <div v-if="hasDraft" class="draft-bar">
        <el-alert type="info" :closable="false" show-icon>
          <template #title>
            检测到本地草稿「{{ draftTitle }}」
            <router-link to="/designer" class="draft-link">继续编辑 →</router-link>
          </template>
        </el-alert>
      </div>

      <!-- 模板选择 -->
      <h2 class="section-title">选择一个模板开始</h2>
      <div class="template-grid">
        <div
          v-for="t in TEMPLATES"
          :key="t.ID"
          class="template-card"
          @click="goDesigner(t.ID)"
        >
          <div class="preview" :style="previewStyle(t)">
            <div class="preview-badge">{{ t.LAYOUT === 'leftRight' ? '双栏' : '单栏' }}</div>
            <div class="preview-title">{{ t.NAME }}</div>
          </div>
          <div class="card-footer">
            <span>{{ t.NAME }}</span>
            <el-button type="primary" size="small" link>开始制作</el-button>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>数据仅保存在本地浏览器（localStorage）· 支持导出 PDF / Word / JSON · 开源许可：MIT（参考猫步简历）</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
  import { TEMPLATES, type ITemplate } from '@/templates';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const DRAFT_KEY = 'myresume-draft';

  // 是否有草稿
  const hasDraft = ref<boolean>(false);
  const draftTitle = ref<string>('个人简历');
  try {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      const parsed = JSON.parse(draft);
      hasDraft.value = true;
      draftTitle.value = parsed.TITLE || '个人简历';
    }
  } catch {
    hasDraft.value = false;
  }

  const goDesigner = (id: string) => {
    router.push({ path: '/designer', query: { template: id } });
  };

  // 模板卡片预览样式：用主题色渐变
  const previewStyle = (t: ITemplate) => {
    const gs = t.GLOBAL_STYLE || {};
    const left = gs.leftThemeColor || gs.themeColor || '#2b6cb0';
    const right = gs.themeColor || '#2b6cb0';
    return {
      background: `linear-gradient(135deg, ${left} 0%, ${right} 100%)`,
    };
  };
</script>
<style lang="scss" scoped>
  .home-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f5f7fa;
  }
  .header {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    .header-inner {
      max-width: 1080px;
      margin: 0 auto;
      padding: 40px 24px;
      text-align: center;
      .logo {
        font-size: 40px;
        color: #00c091;
        margin: 0;
        letter-spacing: 2px;
      }
      .slogan {
        color: #888;
        margin: 8px 0 0;
      }
    }
  }
  .main {
    max-width: 1080px;
    margin: 0 auto;
    padding: 24px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    .draft-bar {
      margin-bottom: 24px;
      .draft-link {
        color: #00c091;
        font-weight: 600;
        margin-left: 12px;
      }
    }
    .section-title {
      font-size: 20px;
      color: #333;
    }
    .template-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
      .template-card {
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: all 0.25s;
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        .preview {
          height: 160px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .preview-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(255, 255, 255, 0.85);
            color: #333;
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 4px;
          }
          .preview-title {
            color: #fff;
            font-size: 22px;
            font-weight: 700;
            text-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          }
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
  .footer {
    text-align: center;
    color: #aaa;
    font-size: 12px;
    padding: 20px;
  }
</style>
