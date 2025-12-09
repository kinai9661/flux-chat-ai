# 🤖 Flux Chat AI

一个集成了 AI 聊天和图片生成功能的 Next.js 应用，支持一键部署到 Zeabur 免费版。

## ✨ 功能特性

- 💬 **AI 聊天**: 基于 Typli API (Grok-2-1212) 的智能对话
- 🎨 **AI 文生图**: FLUX API 图片生成
- 🖼️ **批量生成**: 支持一次生成 1-4 张图片
- 📚 **历史记录**: 自动保存生成的图片（需要数据库）
- 📥 **图片下载**: 支持下载生成的图片
- 📱 **响应式设计**: 完美适配移动端和桌面端

## 🚀 快速开始

### 方法1: 一键部署到 Zeabur (推荐)

1. **Fork 此仓库**
   - 点击右上角 "Fork" 按钮

2. **部署到 Zeabur**
   - 访问 [Zeabur Dashboard](https://zeabur.com)
   - 点击 "Deploy New Service"
   - 选择 "Deploy from GitHub"
   - 授权并选择 `flux-chat-ai` 仓库
   - Zeabur 会自动识别并部署

3. **配置环境变量**
   
   必需配置：
   ```env
   TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
   FLUX_API_ENDPOINT=your_flux_api_endpoint
   FLUX_API_KEY=your_flux_api_key
   ```
   
   可选配置（启用历史功能）：
   ```env
   POSTGRES_URL=your_postgres_connection_url
   ```

4. **添加数据库（可选）**
   - 在同一项目点击 "Add Service"
   - 选择 "PostgreSQL"
   - Zeabur 会自动连接并配置 `POSTGRES_URL`

### 方法2: 本地开发

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

复制 `.env.example` 为 `.env.local`：
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：
```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
FLUX_API_ENDPOINT=your_flux_api_endpoint
FLUX_API_KEY=your_flux_api_key
POSTGRES_URL=your_postgres_url  # 可选
```

4. **运行开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 📦 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL (可选)
- **部署**: Zeabur 免费版
- **AI API**: 
  - 聊天: Typli API (Grok-2-1212)
  - 图片: FLUX API

## 🔧 API 配置说明

### 1. 聊天 API
默认使用免费的 Typli API：
```
https://fluxes.zeabur.app/v1/chat/completions
```

支持模型：
- `xai/grok-2-1212` (默认)
- `xai/grok-4-fast`
- 其他兼容 OpenAI 格式的模型

### 2. 图片生成 API

需要配置你自己的 FLUX API 端点。推荐选项：

**方案 A: 使用 Replicate**
```env
FLUX_API_ENDPOINT=https://api.replicate.com/v1/predictions
FLUX_API_KEY=your_replicate_api_key
```

**方案 B: 使用 BFL API**
```env
FLUX_API_ENDPOINT=https://api.bfl.ml/v1/flux-pro-1.1
FLUX_API_KEY=your_bfl_api_key
```

**方案 C: 自建 FLUX 服务**
使用你自己部署的 FLUX API 端点

### 3. 数据库配置（可选）

如果想启用历史记录功能，需要配置 PostgreSQL。

**Zeabur 上配置**：
- 在项目中添加 PostgreSQL 服务
- Zeabur 会自动注入 `POSTGRES_URL`

**其他免费数据库选项**：
- [Neon](https://neon.tech) - 免费 0.5GB
- [Supabase](https://supabase.com) - 免费 500MB
- [Vercel Postgres](https://vercel.com/storage/postgres) - 免费 256MB

数据库表会自动创建，无需手动设置。

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
│   ├── layout.jsx              # 布局
│   └── globals.css             # 全局样式
├── components/
│   ├── ChatInterface.jsx       # 聊天界面
│   └── ImageGenerator.jsx      # 图片生成器
├── lib/
│   └── db.js                   # 数据库工具
├── public/
├── package.json
├── .env.example
├── zbpack.json             # Zeabur 配置
└── README.md
```

## 🌟 使用说明

### 聊天功能

1. 在主页点击「💬 聊天」标签
2. 输入你的问题
3. AI 会实时回复
4. 支持多轮对话上下文

### 图片生成

1. 点击「🎨 文生图」标签
2. 输入图片描述 (Prompt)
   - 中文和英文均可
   - 建议使用详细描述
3. 选择生成数量 (1-4 张)
4. 点击「生成图片」按钮
5. 等待 AI 创作完成 (20-30秒)
6. 鼠标悬停在图片上可下载

### 历史记录

1. 点击「📚 历史记录」查看所有生成的图片
2. 每张图片显示 Prompt 和生成时间
3. 悬停可以下载图片

> 注意：历史功能需要配置数据库才能使用

## 🎯 Zeabur 部署步骤

### Step 1: 准备仓库
```bash
git clone https://github.com/kinai9661/flux-chat-ai.git
cd flux-chat-ai

# 或者 Fork 到你的 GitHub 账号
```

### Step 2: 登录 Zeabur
- 访问 [zeabur.com](https://zeabur.com)
- 使用 GitHub 登录

### Step 3: 创建项目
1. 点击 "Create Project"
2. 命名项目（如 `flux-chat-ai`）

### Step 4: 部署服务
1. 点击 "Deploy New Service"
2. 选择 "Deploy from GitHub"
3. 选择 `flux-chat-ai` 仓库
4. 选择 `main` 分支

### Step 5: 配置环境变量
在 Zeabur 控制面板中添加：
```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
FLUX_API_ENDPOINT=your_flux_endpoint
FLUX_API_KEY=your_flux_key
```

### Step 6: 添加数据库（可选）
1. 在同一项目点击 "Add Service"
2. 选择 "PostgreSQL"
3. Zeabur 自动连接

### Step 7: 部署完成
- 等待构建完成 (2-3分钟)
- 点击生成的域名访问应用

## 📊 Zeabur 免费版限制

| 项目 | 限制 |
|------|------|
| 月流量 | 10GB |
| 构建时间 | 无限制 |
| 部署数量 | 无限制 |
| SSL 证书 | 免费 |
| CI/CD | 自动 |
| 域名 | 免费子域名 |

## ❓ 常见问题

### Q: 聊天功能不可用？
A: 检查 `TYPLI_API_URL` 是否配置正确，默认使用 `https://fluxes.zeabur.app/v1/chat/completions`

### Q: 图片生成失败？
A: 需要配置有效的 `FLUX_API_ENDPOINT` 和 `FLUX_API_KEY`

### Q: 历史记录不显示？
A: 历史功能需要配置 `POSTGRES_URL`，如不需要可以不配置

### Q: 如何更换聊天模型？
A: 修改 `app/api/chat/route.js` 中的 `model` 参数

### Q: 支持哪些 FLUX 模型？
A: 支持所有 FLUX 系列模型，只需配置对应的 API 端点

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关链接

- [Zeabur 文档](https://zeabur.com/docs)
- [Next.js 14 文档](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [FLUX AI](https://blackforestlabs.ai)

## ⭐ Star History

如果这个项目对你有帮助，请给个 Star 支持一下！

---

**Made with ❤️ by [kinai9661](https://github.com/kinai9661)**