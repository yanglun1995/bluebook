# 🚀 健康管家 - 部署指南

## 📋 项目信息
- 项目名称: 健康管家
- 版本: v1.4.0
- 框架: React + TypeScript + Vite
- 构建状态: ✅ 已构建完成

---

## 🎯 方式一: Vercel 一键部署 (推荐 ⭐)

### 步骤:

1. **访问 Vercel**
   - 打开 https://vercel.com/new

2. **导入 GitHub 仓库**
   - 点击 "Import Project"
   - 选择你的 GitHub 仓库

3. **配置部署**
   - 保持默认配置（会自动检测 Vite）
   - 点击 "Deploy"

4. **完成!**
   - 大约 1-2 分钟后，你会得到一个可访问的链接
   - 例如: https://health-manager.vercel.app

---

## 🎯 方式二: GitHub Pages 自动部署

### 步骤:

1. **在 GitHub 上创建仓库**
   - 访问 https://github.com/new
   - 仓库名: `health-manager` (或其他你喜欢的名字)
   - 选择 Public 或 Private
   - 不要初始化任何文件

2. **推送代码到 GitHub**
   ```bash
   # 如果你还没有提交
   git add .
   git commit -m "Initial commit: 健康管家 v1.4.0"
   git branch -M main
   git remote add origin https://github.com/[你的用户名]/health-manager.git
   git push -u origin main
   ```

3. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 选择 Pages (左侧菜单)
   - Source: 选择 "GitHub Actions"
   - 点击 "Save"

4. **启用自动部署**
   - 每次推送到 `main` 分支都会自动部署
   - 在 Actions 标签页可以查看部署状态

5. **获取访问链接**
   - 部署完成后，链接为: `https://[你的用户名].github.io/health-manager`

---

## 🎯 方式三: 手动部署到 GitHub Pages

### 步骤:

1. **更新 vite.config.ts**
   ```typescript
   // 在 vite.config.ts 中添加 base 配置
   export default defineConfig({
     base: '/health-manager/',  // 如果你的仓库名不同，请替换
     // ... 其他配置
   })
   ```

2. **重新构建并部署**
   ```bash
   npm run build
   # 使用 gh-pages 工具
   npm install -g gh-pages
   gh-pages -d dist
   ```

---

## 📝 本地部署测试

如果你想在本地测试构建结果:

```bash
npm run build
npm run preview
```

然后访问: http://localhost:4173

---

## 🔧 项目说明

### 功能特性:
- ✅ 用户登录 (demo / health2026)
- ✅ 健康档案管理 (24条预填记录)
- ✅ 健康统计与图表
- ✅ 家庭管理
- ✅ 数据安全与隐私
- ✅ 响应式设计

### 技术栈:
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts (图表)
- LocalStorage/IndexedDB (数据存储)

---

## 📞 问题排查

### 构建失败?
- 确保 Node 版本 >= 18
- 运行 `npm install` 安装依赖

### 部署后图片加载失败?
- 确保使用的是绝对路径或正确的 base 配置

### 其他问题?
- 查看 Actions 日志 (GitHub) 或 部署日志 (Vercel)

---

## 📄 License

此项目为演示版本，仅供学习和演示使用。
