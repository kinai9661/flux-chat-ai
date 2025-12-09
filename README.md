# 🤖 Flux Chat AI

一个集成了 AI 聊天和图片生成功能的 Next.js 应用，支持一键部署到 Zeabur 免费版。

## ✨ 功能特性

- 💬 **AI 聊天**: 基于 Typli API 的智能对话
- 🎨 **AI 文生图**: FLUX/Nano Banana AI 图片生成
- 🖼️ **批量生成**: 支持一次生成 1-4 张图片
- 📚 **历史记录**: 自动保存生成的图片
- 📥 **图片下载**: 支持下载生成的图片
- 📱 **响应式设计**: 完美适配移动端和桌面端

## 🚀 快速开始

### 一键部署到 Zeabur

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates)

### 本地开发

1. **克隆仓库**
```bash
git clone https://github.com/kinai9661/flux-chat-ai.git
cd flux-chat-ai
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**

创建 `.env.local` 文件：
```env
POSTGRES_URL=your_postgres_connection_url
FLUX_API_ENDPOINT=your_flux_api_endpoint
FLUX_API_KEY=your_flux_api_key
TYPLI_API_URL=https://fluxes.zeabur.app/v1
```

4. **运行开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 📦 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL (Vercel Postgres / Neon)
- **部署**: Zeabur 免费版
- **AI API**: Typli API, FLUX API

## 🔧 配置说明

### 数据库设置

需要创建以下表结构：

```sql
CREATE TABLE IF NOT EXISTS images (
  id VARCHAR(21) PRIMARY KEY,
  prompt TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_images_created_at ON images(created_at DESC);
```

### API 配置

- **聊天 API**: 使用 `https://fluxes.zeabur.app/v1`
- **图片生成**: 需要配置你自己的 FLUX API 端点

## 📁 项目结构

```
flux-chat-ai/
├── app/
│   ├── api/
│   │   ├── chat/route.js       # 聊天 API
│   │   ├── generate/route.js   # 图片生成 API
│   │   └── history/route.js    # 历史记录 API
│   ├── history/
│   │   └── page.jsx            # 历史记录页面
│   ├── page.jsx                # 主页面
│   └── layout.jsx              # 布局
├── components/
│   ├── ChatInterface.jsx       # 聊天界面
│   └── ImageGenerator.jsx      # 图片生成器
├── lib/
│   └── db.js                   # 数据库配置
└── public/
```

## 🌟 使用说明

### 聊天功能

1. 在主页点击「💬 聊天」标签
2. 输入你的问题
3. AI 会实时回复

### 图片生成

1. 点击「🎨 文生图」标签
2. 输入图片描述 (Prompt)
3. 选择生成数量 (1-4 张)
4. 点击「生成图片」按钮
5. 等待 AI 创作完成
6. 鼠标悬停在图片上可下载

### 历史记录

点击「📚 历史记录」查看所有生成的图片

## 🎯 部署到 Zeabur

1. Fork 此仓库到你的 GitHub 账号
2. 访问 [Zeabur Dashboard](https://zeabur.com)
3. 点击「Deploy New Service」
4. 选择「Deploy from GitHub」
5. 授权并选择 `flux-chat-ai` 仓库
6. 添加环境变量
7. 点击部署

### 添加数据库

在同一项目中：
1. 点击「Add Service」
2. 选择「PostgreSQL」
3. Zeabur 会自动连接数据库

## 📊 Zeabur 免费版限制

- ✅ 免费 SSL 证书
- ✅ 自动 CI/CD
- ✅ 10GB 月流量
- ⚠️ 需要配合免费数据库服务

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 许可证

MIT License

## 🔗 相关链接

- [Zeabur 文档](https://zeabur.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

⭐ 如果这个项目对你有帮助，请给个 Star！