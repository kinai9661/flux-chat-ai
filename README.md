# 🤖 Flux Chat AI

一个集成了 AI 聊天和图片生成功能的 Next.js 应用，支持一键部署到 Zeabur 免费版。

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates)

## ✨ 功能特性

- 💬 **AI 聊天**: 基于 Typli API (Grok-2-1212) 的智能对话
- 🎨 **AI 文生图**: FLUX API 图片生成
- 🖼️ **批量生成**: 支持一次生成 1-4 张图片
- 📚 **历史记录**: 自动保存生成的图片（需要数据库）
- 📥 **图片下载**: 支持下载生成的图片
- 📱 **响应式设计**: 完美适配移动端和桌面端

## 🚀 快速开始

### ⚡ 5 分钟快速部署

1. **Fork 此仓库**
2. **获取 API Keys** → [查看详细指南](ENV_SETUP.md#api-密钥获取)
3. **部署到 Zeabur** → [快速开始](docs/QUICK_START.md)
4. **配置环境变量** → [环境变量设置](ENV_SETUP.md)

### 📋 必需环境变量

```env
# 聊天功能 (免费)
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions

# 图片生成 (需要申请)
FLUX_API_ENDPOINT=your_flux_endpoint
FLUX_API_KEY=your_flux_key

# 数据库 (可选 - 用于历史记录)
POSTGRES_URL=your_postgres_url
```

完整配置说明 → [ENV_SETUP.md](ENV_SETUP.md)

## 📦 技术栈

- **前端框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL (可选)
- **部署**: Zeabur 免费版
- **AI API**: 
  - 聊天: Typli API (Grok-2-1212)
  - 图片: FLUX API

## 🔧 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/kinai9661/flux-chat-ai.git
cd flux-chat-ai

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的 API keys

# 4. 启动开发服务器
npm run dev

# 5. 打开浏览器访问
open http://localhost:3000
```

## 📖 文档

- 📝 [环境变量设置完整指南](ENV_SETUP.md)
- ⚡ [5 分钟快速部署](docs/QUICK_START.md)
- 🎯 [API 配置说明](#api-配置说明)
- ❓ [常见问题](#常见问题)

## 🎯 API 配置说明

### 聊天 API

使用免费的 Typli API，无需申请：

```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
```

支持模型：
- `xai/grok-2-1212` (默认)
- `xai/grok-4-fast`

### 图片生成 API

需要选择以下服务之一：

#### 选项 A: Replicate (推荐)
```env
FLUX_API_ENDPOINT=https://api.replicate.com/v1/predictions
FLUX_API_KEY=r8_your_key
```
- 官网: https://replicate.com
- 新用户 $5 免费额度
- 获取: [Replicate API Tokens](https://replicate.com/account/api-tokens)

#### 选项 B: Hugging Face (免费)
```env
FLUX_API_ENDPOINT=https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev
FLUX_API_KEY=hf_your_token
```
- 官网: https://huggingface.co
- 免费但有速率限制
- 获取: [HF Tokens](https://huggingface.co/settings/tokens)

#### 选项 C: BFL API
```env
FLUX_API_ENDPOINT=https://api.bfl.ml/v1/flux-pro-1.1
FLUX_API_KEY=your_bfl_key
```
- 官网: https://blackforestlabs.ai
- 按使用付费

详细对比 → [API 密钥获取](ENV_SETUP.md#api-密钥获取)

## 🏗️ 项目结构

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
├── docs/
│   └── QUICK_START.md          # 快速开始指南
├── .env.example                # 环境变量模板
├── ENV_SETUP.md                # 环境变量完整指南
└── README.md                   # 本文件
```

## 🌟 使用说明

### 💬 聊天功能

1. 点击「💬 聊天」标签
2. 输入你的问题
3. AI 实时回复
4. 支持多轮对话

### 🎨 图片生成

1. 点击「🎨 文生图」标签
2. 输入图片描述 (中英文均可)
3. 选择生成数量 (1-4 张)
4. 点击「生成图片」
5. 等待 20-30 秒
6. 悬停图片可下载

### 📚 历史记录

1. 点击「📚 历史记录」
2. 查看所有生成的图片
3. 显示 Prompt 和生成时间
4. 支持下载

> 注意：历史功能需要配置数据库

## 🚀 部署指南

### Zeabur 部署 (推荐)

详细步骤 → [快速开始指南](docs/QUICK_START.md)

1. Fork 此仓库
2. 登录 [Zeabur](https://zeabur.com)
3. 创建新项目
4. 从 GitHub 部署
5. 配置环境变量
6. 完成！

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 配置环境变量
vercel env add TYPLI_API_URL
vercel env add FLUX_API_ENDPOINT
vercel env add FLUX_API_KEY

# 重新部署
vercel --prod
```

## 💾 数据库配置

### Zeabur 添加数据库

1. 在项目中点击 "Add Service"
2. 选择 "PostgreSQL"
3. 自动连接和配置

### 其他免费数据库

| 服务 | 免费额度 | 获取链接 |
|------|---------|----------|
| Neon | 0.5GB | [neon.tech](https://neon.tech) |
| Supabase | 500MB | [supabase.com](https://supabase.com) |
| Vercel Postgres | 256MB | [vercel.com](https://vercel.com/storage/postgres) |

## ❓ 常见问题

### Q: 聊天功能不工作？

A: 检查 `TYPLI_API_URL` 环境变量：
```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
```

### Q: 图片生成失败？

A: 确认：
1. ✅ `FLUX_API_ENDPOINT` 已配置
2. ✅ `FLUX_API_KEY` 已配置且有效
3. ✅ API 账户有余额
4. ✅ API 端点 URL 正确

测试 API 连接：
```bash
curl -X POST $FLUX_API_ENDPOINT \
  -H "Authorization: Bearer $FLUX_API_KEY" \
  -d '{"prompt":"test"}'
```

### Q: 历史记录不显示？

A: 历史功能需要：
1. 配置 `POSTGRES_URL`
2. 数据库连接有效
3. 表会自动创建

### Q: 环境变量修改后不生效？

A: 
- **本地**: 重启 `npm run dev`
- **Zeabur**: 保存后自动重新部署
- **Vercel**: 手动触发重新部署

### Q: 如何更换聊天模型？

A: 修改 `app/api/chat/route.js`：
```javascript
model: 'xai/grok-4-fast'  // 或其他模型
```

更多问题 → [完整 FAQ](ENV_SETUP.md#常见问题)

## 📊 Zeabur 免费版限制

| 项目 | 限制 |
|------|------|
| 月流量 | 10GB |
| 构建时间 | 无限制 |
| 部署数量 | 无限制 |
| SSL 证书 | 免费 |
| CI/CD | 自动 |
| 自定义域名 | 支持 |

## 🤝 贡献

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
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [FLUX AI](https://blackforestlabs.ai)
- [Replicate](https://replicate.com)

## ⭐ Star History

如果这个项目对你有帮助，请给个 Star 支持一下！

[![Star History Chart](https://api.star-history.com/svg?repos=kinai9661/flux-chat-ai&type=Date)](https://star-history.com/#kinai9661/flux-chat-ai&Date)

---

**Made with ❤️ by [kinai9661](https://github.com/kinai9661)**

**最后更新**: 2025-12-09