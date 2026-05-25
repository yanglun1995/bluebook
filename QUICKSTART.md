# 🚀 快速开始 - 部署健康管家

## ⚡ 最快方案：Vercel 一键部署 (推荐)

### 步骤 1: 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 仓库名: `health-manager` (或其他名字)
3. 点击 **"Create repository"**

### 步骤 2: 推送代码
在你的终端中运行 (需要修改为你的用户名):

```bash
git remote add origin https://github.com/[你的用户名]/health-manager.git
git push -u origin main
```

### 步骤 3: 在 Vercel 部署
1. 访问 https://vercel.com/new
2. 点击 **"Import"** 你的仓库
3. 点击 **"Deploy"**
4. 等待 1-2 分钟，完成！

🎉 完成！你的应用链接类似: `https://health-manager.vercel.app`

---

## 📋 完整项目信息

### 演示账号
- **用户名**: `demo`
- **密码**: `health2026`

### 功能
- ✅ 用户登录/注册
- ✅ 健康档案 (24条预填记录)
- ✅ 统计图表
- ✅ 家庭管理
- ✅ 数据安全
- ✅ 响应式设计

### 本地运行
```bash
npm install
npm run dev
```
然后访问 http://localhost:5173

---

## 📄 更多部署选项

详细部署指南请查看: [DEPLOY.md](DEPLOY.md)

### GitHub Pages 部署
- 已配置自动部署 GitHub Actions
- 推送到 `main` 分支后自动部署

### 其他平台
- Netlify, Cloudflare Pages 等都支持 Vite 部署

---

## 🛠️ 技术栈
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts
- React Router
- LocalStorage/IndexedDB
