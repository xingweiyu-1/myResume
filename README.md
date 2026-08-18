# myResume · 纯前端简历工具

> 在线编辑简历，一键导出 **PDF / Word / JSON**。纯前端实现，无后端、无服务器，数据 100% 保存在本地浏览器。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 本地开发，浏览器打开 http://localhost:5173
npm run build      # 构建到 dist/，静态文件可直接部署/双击打开
npm run preview    # 预览构建产物
```

> 小提示：端口 5173 被占用时会自动递增到 5174。

## 功能

- **在线编辑**：左侧添加/排序模块，中间 A4 实时预览（含分页参考线），右侧编辑模块数据与样式
- **6 套内置模板**：经典商务蓝 / 现代双栏 / 简约清新绿 / 深色侧边商务 / 暖橙活力 / 极简高级灰
- **模块丰富**：基本资料、求职意向、教育背景、技能特长、校园/实习/工作/项目经历、荣誉奖项、兴趣爱好、自我评价、作品展示、自定义（每个模块 1~10 种样式变体）
- **导出**：
  - **PDF（打印）**：浏览器打印 → 另存为 PDF，矢量文字、可搜索、中文最稳（推荐投递用）
  - **PDF（一键下载）**：html2canvas 截图下载，方便快速
  - **Word（.docx）**：生成真正的 Word 文档，可在 Word/WPS 中二次编辑，招聘系统可解析
  - **JSON 导入/导出**：数据可备份、可迁移
- **数据存储**：编辑自动保存到 `localStorage`，首页可"继续上次编辑"

## 技术栈

Vue 3 + Vite 6 + TypeScript + Pinia + Element Plus

| 能力 | 方案 |
| --- | --- |
| 前端 | Vue 3.5 / Vite 6 / TS 5.7 / Pinia / Vue Router（hash 模式，静态文件即可跑） |
| UI | Element Plus |
| 拖拽 | vuedraggable |
| PDF 导出 | `@media print` + `window.print()`（高质量）+ `html2canvas` + `jspdf`（一键下载） |
| Word 导出 | `docx`（真正的 .docx） |
| 素材/模板 | 移植自 [猫步简历](https://github.com/Hacker233/resume-design)（MIT 许可，见 [ATTRIBUTION.md](./ATTRIBUTION.md)） |

## 目录结构

```
src/
├── material/        # 素材组件（124 个，模块渲染）
├── options/         # 属性面板（模块 + 全局样式）
├── templates/       # 6 套模板预设（LAYOUT + GLOBAL_STYLE + COMPONENTS）
├── views/           # Home（模板选择）、Designer（设计器）
├── components/      # SvgIcon、ColorPicker、ImportJsonDialog 等
├── hooks/           # 选中/复制/删除/字体/学历等 hooks
├── schema/          # 数据模型与默认数据
├── interface/       # TS 类型
├── store/           # Pinia（简历数据/选中模块/草稿）
└── utils/           # 导出工具（PDF/Word/JSON）、公共函数
```

## 文档

- [docs/README.md](./docs/README.md) — 文档索引
- [docs/01-方案对比与决策.md](./docs/01-方案对比与决策.md) — 技术选型对比与决策记录
- [docs/02-开发日志.md](./docs/02-开发日志.md) — 问题与解决方案（按日期倒序）

## 许可

MIT。其中素材组件、属性面板移植自 [猫步简历 resume-design](https://github.com/Hacker233/resume-design)（MIT），详见 [ATTRIBUTION.md](./ATTRIBUTION.md)。
