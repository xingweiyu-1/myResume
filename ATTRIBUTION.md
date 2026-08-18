# 出处与许可证声明

本项目的**素材组件、属性面板、数据模型结构、设计器布局概念**移植/参考自开源项目：

**猫步简历（resume-design）** — https://github.com/Hacker233/resume-design
- 许可证：**MIT License**（Copyright (c) 2022 会飞的猪）
- MIT 许可允许使用、复制、修改、合并、发布，仅要求保留版权声明。

## 移植范围

| 目录 | 来源 | 说明 |
| --- | --- | --- |
| `src/material/` | resume-design `src/material/` | 素材组件（基本信息/经历/技能等 124 个变体），做了少量导入修复 |
| `src/options/` | resume-design `src/options/` | 模块属性面板 + 全局样式面板，头像上传改为纯前端 base64 |
| `src/hooks/` | resume-design `src/hooks/` | 选中/复制/删除/字体/学历等 hooks |
| `src/interface/` `src/schema/` | resume-design | 数据模型接口与默认数据（JSON 结构对齐，可兼容其模板数据） |
| `src/components/ColorPicker` | resume-design | 颜色选择组件，内部实现改用 Element Plus |

## 本项目的独立实现

设计器界面、顶部导航、模板注册表（6 套）、首页、导出工具（PDF 打印/一键下载、Word docx、JSON）、草稿存储、图标映射均为本项目独立编写。

## 差异说明

- 纯前端：无账号、无后端、无云端模板市场，数据存 `localStorage`
- 新增 Word 导出（猫步简历官方版没有）
- PDF 新增"打印导出"高质量路径
