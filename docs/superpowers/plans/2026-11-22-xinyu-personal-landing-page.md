# Xinyu Personal Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有网站重构为蔡欣渝的高端多领域个人品牌 Landing Page，并部署至现有 GitHub Pages。

**Architecture:** 继续使用单页静态网站结构，由 `index.html` 定义语义内容，`styles.css` 负责完整视觉系统与响应式布局，`script.js` 负责领域切换、移动导航和轻量交互。图片以本地静态资源存放在 `assets/`，避免第三方依赖。

**Tech Stack:** HTML5、CSS3、原生 JavaScript、Python 本地静态服务器、GitHub Pages

**Spec:** `docs/superpowers/specs/2026-11-22-xinyu-personal-landing-page.md`

## Global Constraints

- 保持纯 HTML/CSS/JS，不引入前端框架或追踪脚本。
- 不复制 Purple Salon 的品牌、商标、原文或图片。
- 不虚构联系方式、资历数字或客户评价。
- 两张用户照片必须成为仓库内资源并提供 alt 文本。
- 桌面与移动端都必须无横向溢出且导航可用。
- 最终推送至 `origin/main` 并验证 GitHub Pages 线上内容。

## Review Focus

- 图片路径含空格或非 ASCII 字符时仍能在 GitHub Pages 正常加载；使用安全的英文文件名固定该风险。
- JavaScript 被禁用时核心内容仍可阅读；首个领域内容必须默认可见。
- 窄屏设备不出现横向滚动；在约 390px 视口验证。
- 领域切换需同步更新可见内容与 ARIA 状态；通过按钮点击与 DOM 状态检查验证。
- 未配置联系链接时不得发送或提交数据；联系按钮仅滚动至待填写联系区。

---

### Task 1: 品牌图片资产

**Files:**
- Create: `assets/xinyu-portrait.jpeg`
- Create: `assets/xinyu-brand-overview.jpeg`

**Interfaces:**
- Consumes: 用户提供的两张 JPEG 图片。
- Produces: HTML 可通过相对路径引用的稳定图片资源。

- [ ] **Step 1:** 将职业肖像机械复制为 `assets/xinyu-portrait.jpeg`。
- [ ] **Step 2:** 将横向品牌介绍图机械复制为 `assets/xinyu-brand-overview.jpeg`。
- [ ] **Step 3:** 使用文件存在性与图片尺寸检查验证两个资源均可读取。

### Task 2: 语义页面与真实品牌文案

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: Task 1 的两个图片路径与设计说明中的品牌定位。
- Produces: `#home`、`#domains`、`#about`、`#services`、`#philosophy`、`#blog`、`#contact` 区块，以及 `.domain-tab` 控件和 `.domain-panel` 内容面板。

- [ ] **Step 1:** 重写页面标题、描述、导航和全屏首屏，使用“蔡欣渝”“让人生拥有更多可能”等确认文案。
- [ ] **Step 2:** 添加四个领域标签及每个领域对应的说明与服务清单，首个面板默认可见。
- [ ] **Step 3:** 添加品牌故事、服务、理念、Blog 和联系合作区，不填写未经提供的数据。
- [ ] **Step 4:** 用 HTML 结构检查确认所有必需 ID、图片 alt、按钮标签和标题层级存在。

### Task 3: Purple-inspired 视觉系统与响应式布局

**Files:**
- Modify: `styles.css`
- Remove: `blog.css`（其样式合并到主样式后）

**Interfaces:**
- Consumes: Task 2 的类名与区块 ID。
- Produces: 黑曜石/深紫/香槟金视觉、全屏首图、领域标签、卡片、动画与移动布局。

- [ ] **Step 1:** 定义颜色、字体、间距、按钮、半透明导航与焦点状态。
- [ ] **Step 2:** 完成首屏、领域切换、品牌故事、服务网格、理念和联系区布局。
- [ ] **Step 3:** 添加 `prefers-reduced-motion` 降级与 900px/600px 响应式断点。
- [ ] **Step 4:** 在桌面和约 390px 视口检查无横向溢出、文本对比和图片裁切。

### Task 4: 交互与渐进增强

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `.domain-tab`、`.domain-panel`、`#menuToggle` 与 `[data-reveal]`。
- Produces: `activateDomain(domainId)`，负责切换面板、更新 `aria-selected` 和键盘焦点；并提供移动导航与滚动显现。

- [ ] **Step 1:** 运行 `node --check script.js`，记录旧脚本仍依赖已删除 DOM 的失败风险。
- [ ] **Step 2:** 实现 `activateDomain(domainId)` 及点击、左右方向键切换。
- [ ] **Step 3:** 实现移动导航开关和 IntersectionObserver 显现效果，并为减少动画偏好降级。
- [ ] **Step 4:** 运行 `node --check script.js`，预期退出码 0。

### Task 5: 本地验证与 GitHub 部署

**Files:**
- Modify: repository root `index.html`, `styles.css`, `script.js`, `assets/*`

**Interfaces:**
- Consumes: Task 1–4 的本地源码。
- Produces: 与 `Xinyu Website Contain` 源码一致的 GitHub Pages 根目录构建。

- [ ] **Step 1:** 使用本地 HTTP 服务验证 HTML、CSS、JS 与两张图片均返回 200。
- [ ] **Step 2:** 在浏览器验证桌面首屏、领域切换、Blog 与移动布局，并检查控制台无错误。
- [ ] **Step 3:** 将源文件机械同步到仓库根目录，运行 `git diff --check` 并审查差异。
- [ ] **Step 4:** 提交为 `Build Xinyu personal brand landing page` 并推送到 `origin/main`。
- [ ] **Step 5:** 打开 `https://xinyuchua78-jpg.github.io/xinyuchua/`，确认线上姓名、首屏和四领域内容已更新。
