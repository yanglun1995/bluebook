# 健康管家 - 健康档案管理应用

一个纯前端单页应用，专注于本地加密存储用户的健康档案数据。

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS v3
- Lucide React (图标库)
- Recharts (数据可视化)
- React Router v6 (路由)
- IndexedDB (本地数据存储)
- Zustand (状态管理)

## 功能特性

### 🏥 档案页面
- 时间线展示所有健康记录
- 成员、类型、时间多维度筛选
- 搜索功能
- 记录详情查看
- 标星功能

### 📊 统计页面
- 核心数据概览卡片
- 年度就诊趋势图
- 就诊科室分布饼图
- 医疗花费趋势柱状图
- 健康综合报告
- 患病记录列表

### ➕ 上传页面
- 拍照和相册选择
- 图片预览
- 自动识别（演示）
- 表单编辑
- 快捷添加功能

### 👤 我的页面
- 个人信息展示
- 家庭成员管理
- 数据安全设置
- 本地备份/恢复
- 应用锁功能
- 系统设置
- 数据重置

## 核心卖点

**100% 本地加密存储**，所有健康数据只保存在用户设备上，绝对不上传任何服务器！

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173/` 启动。

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run check
```

## 项目结构

```
/workspace
├── src/
│   ├── components/        # 组件
│   │   ├── BottomNav.tsx # 底部导航
│   │   ├── RecordCard.tsx # 记录卡片
│   │   ├── TimelineGroup.tsx # 时间线分组
│   │   └── Toast.tsx # 提示消息
│   ├── pages/            # 页面
│   │   ├── ArchivePage.tsx # 档案页面
│   │   ├── StatisticsPage.tsx # 统计页面
│   │   ├── UploadPage.tsx # 上传页面
│   │   └── ProfilePage.tsx # 我的页面
│   ├── utils/            # 工具
│   │   └── db.ts # IndexedDB 封装
│   ├── store.ts # Zustand 状态管理
│   ├── types.ts # TypeScript 类型定义
│   ├── constants.ts # 常量和初始数据
│   ├── App.tsx # 应用入口
│   ├── index.css # 全局样式
│   └── main.tsx # 渲染入口
├── public/
├── .trae/
│   └── documents/ # 项目文档
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 设计规范

### 颜色系统
- 主色调：#22C55E (健康绿)
- 病历：#3B82F6 (蓝色)
- 检查报告：#22C55E (绿色)
- 检验结果：#F97316 (橙色)
- 警告/错误：#EF4444 (红色)

### 组件规范
- 卡片：圆角 12px，阴影 shadow-sm，内边距 16px
- 按钮：圆角 8px，高度 44px，字体 16px，font-medium
- 输入框：圆角 8px，高度 44px，边框 1px solid #D1D5DB，内边距 12px
- 底部导航：高度 56px，背景白色，阴影 shadow-md

## 版本信息

- 版本号：v1.4.0 演示版

## 许可证

MIT
