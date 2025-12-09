# 🔐 环境变量设置指南

本文档详细说明如何在不同平台配置 Flux Chat AI 的环境变量。

## 📋 目录

- [必需环境变量](#必需环境变量)
- [可选环境变量](#可选环境变量)
- [平台配置指南](#平台配置指南)
  - [Zeabur 部署](#zeabur-部署)
  - [Vercel 部署](#vercel-部署)
  - [本地开发](#本地开发)
- [API 密钥获取](#api-密钥获取)
- [常见问题](#常见问题)

---

## 必需环境变量

### 1. TYPLI_API_URL (聊天功能)

**描述**: Typli 聊天 API 端点

**默认值**: `https://fluxes.zeabur.app/v1/chat/completions`

**获取方式**: 免费使用，无需申请

**示例**:
```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
```

---

### 2. FLUX_API_ENDPOINT (图片生成)

**描述**: FLUX 图片生成 API 端点

**获取方式**: 需要注册以下服务之一

**选项 A - Replicate** (推荐)
```env
FLUX_API_ENDPOINT=https://api.replicate.com/v1/predictions
FLUX_API_KEY=r8_your_api_key_here
```
- 官网: https://replicate.com
- 价格: 按使用付费，新用户有免费额度
- 注册: https://replicate.com/signin

**选项 B - Black Forest Labs**
```env
FLUX_API_ENDPOINT=https://api.bfl.ml/v1/flux-pro-1.1
FLUX_API_KEY=your_bfl_api_key
```
- 官网: https://blackforestlabs.ai
- 价格: 按使用付费
- 注册: https://api.bfl.ml

**选项 C - Hugging Face** (免费)
```env
FLUX_API_ENDPOINT=https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev
FLUX_API_KEY=hf_your_token_here
```
- 官网: https://huggingface.co
- 价格: 有免费额度
- 注册: https://huggingface.co/join

---

### 3. FLUX_API_KEY

**描述**: FLUX API 访问密钥

**获取方式**: 在对应的 API 服务商获取

**示例**:
```env
FLUX_API_KEY=your_api_key_here
```

---

## 可选环境变量

### POSTGRES_URL (历史记录功能)

**描述**: PostgreSQL 数据库连接字符串

**必要性**: 仅当需要历史记录功能时配置

**格式**:
```env
POSTGRES_URL=postgresql://user:password@host:5432/database
```

**免费数据库选项**:

1. **Zeabur PostgreSQL** (推荐)
   - 在 Zeabur 项目中直接添加 PostgreSQL 服务
   - 自动配置连接

2. **Neon** (推荐)
   - 官网: https://neon.tech
   - 免费额度: 0.5GB 存储
   - 获取: https://console.neon.tech

3. **Supabase**
   - 官网: https://supabase.com
   - 免费额度: 500MB 存储
   - 获取: https://app.supabase.com

4. **Vercel Postgres**
   - 官网: https://vercel.com/storage/postgres
   - 免费额度: 256MB 存储
   - 获取: https://vercel.com/dashboard

---

## 平台配置指南

### Zeabur 部署

#### 方法 1: 通过 Web 界面配置

1. **进入项目设置**
   - 登录 [Zeabur Dashboard](https://zeabur.com)
   - 选择你的项目
   - 点击你的服务

2. **添加环境变量**
   - 点击 "Variables" 标签
   - 点击 "Add Variable"
   - 输入变量名和值

3. **必填变量**
   ```
   TYPLI_API_URL = https://fluxes.zeabur.app/v1/chat/completions
   FLUX_API_ENDPOINT = your_flux_endpoint
   FLUX_API_KEY = your_flux_key
   ```

4. **保存并重新部署**
   - 点击 "Save"
   - Zeabur 会自动重新部署

#### 方法 2: 通过配置文件

创建 `zeabur.json`:
```json
{
  "env": {
    "TYPLI_API_URL": "https://fluxes.zeabur.app/v1/chat/completions",
    "FLUX_API_ENDPOINT": "${FLUX_API_ENDPOINT}",
    "FLUX_API_KEY": "${FLUX_API_KEY}"
  }
}
```

#### 添加 PostgreSQL 数据库

1. 在同一项目中点击 "Add Service"
2. 选择 "PostgreSQL"
3. Zeabur 会自动:
   - 创建数据库实例
   - 注入 `POSTGRES_URL` 环境变量
   - 连接到你的应用

---

### Vercel 部署

1. **导入项目**
   - 访问 [Vercel Dashboard](https://vercel.com)
   - 点击 "Add New" → "Project"
   - 从 GitHub 导入 `flux-chat-ai`

2. **配置环境变量**
   - 在项目设置中找到 "Environment Variables"
   - 添加以下变量:
   ```
   TYPLI_API_URL = https://fluxes.zeabur.app/v1/chat/completions
   FLUX_API_ENDPOINT = your_endpoint
   FLUX_API_KEY = your_key
   ```

3. **添加数据库**
   - 进入 "Storage" 标签
   - 选择 "Postgres"
   - 创建数据库
   - `POSTGRES_URL` 会自动配置

4. **部署**
   - 点击 "Deploy"

---

### 本地开发

1. **复制环境变量模板**
   ```bash
   cp .env.example .env.local
   ```

2. **编辑 `.env.local`**
   ```bash
   nano .env.local
   # 或使用你喜欢的编辑器
   ```

3. **填入你的配置**
   ```env
   TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
   FLUX_API_ENDPOINT=https://api.replicate.com/v1/predictions
   FLUX_API_KEY=r8_your_replicate_key
   POSTGRES_URL=postgresql://localhost:5432/flux_chat
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

---

## API 密钥获取

### 获取 Replicate API Key (推荐)

1. 访问 https://replicate.com/signin
2. 使用 GitHub 登录
3. 进入 https://replicate.com/account/api-tokens
4. 点击 "Create token"
5. 复制生成的 token (格式: `r8_xxx`)

**价格**: 
- 新用户: $5 免费额度
- FLUX.1 Pro: ~$0.055/张图
- FLUX.1 Dev: ~$0.025/张图

### 获取 Hugging Face Token (免费)

1. 访问 https://huggingface.co/join
2. 注册账号
3. 进入 https://huggingface.co/settings/tokens
4. 点击 "New token"
5. 选择 "Read" 权限
6. 复制 token (格式: `hf_xxx`)

**免费额度**:
- 有限制的免费调用
- 响应速度较慢
- 适合测试使用

### 获取 BFL API Key

1. 访问 https://api.bfl.ml
2. 注册账号
3. 获取 API Key
4. 充值使用

---

## 环境变量优先级

在 Next.js 中，环境变量加载优先级为：

1. `process.env` (系统环境变量)
2. `.env.local` (所有环境，Git 忽略)
3. `.env.production` (生产环境)
4. `.env.development` (开发环境)
5. `.env` (所有环境)

---

## 安全最佳实践

### ⚠️ 不要提交的文件

```gitignore
.env.local
.env.production
.env.development
.env
```

### ✅ 可以提交的文件

```
.env.example  # 模板文件，不包含实际密钥
```

### 🔒 密钥保护

1. **永远不要** 将真实的 API 密钥提交到 Git
2. **使用** `.env.local` 存储敏感信息
3. **定期轮换** API 密钥
4. **使用** 环境变量而不是硬编码

---

## 常见问题

### Q: 聊天功能不工作？

**A**: 检查 `TYPLI_API_URL` 是否正确配置：
```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
```

### Q: 图片生成失败？

**A**: 确认以下事项：
1. `FLUX_API_ENDPOINT` 和 `FLUX_API_KEY` 都已配置
2. API 密钥有效且有余额
3. API 端点 URL 正确

测试 API 连接:
```bash
curl -X POST $FLUX_API_ENDPOINT \
  -H "Authorization: Bearer $FLUX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test"}'
```

### Q: 历史记录不显示？

**A**: 历史功能需要配置数据库：
1. 确认 `POSTGRES_URL` 已配置
2. 确认数据库连接有效
3. 应用会自动创建表结构

### Q: 环境变量修改后不生效？

**A**: 
- **本地开发**: 重启开发服务器 `npm run dev`
- **Zeabur**: 保存后会自动重新部署
- **Vercel**: 需要手动触发重新部署

### Q: 如何验证环境变量已加载？

**A**: 在 API 路由中添加日志：
```javascript
console.log('TYPLI_API_URL:', process.env.TYPLI_API_URL);
console.log('FLUX_API_ENDPOINT:', process.env.FLUX_API_ENDPOINT);
console.log('Has FLUX_API_KEY:', !!process.env.FLUX_API_KEY);
```

---

## 完整配置示例

### 最小配置 (仅聊天)

```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
```

### 基础配置 (聊天 + 图片)

```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
FLUX_API_ENDPOINT=https://api.replicate.com/v1/predictions
FLUX_API_KEY=r8_your_replicate_key
```

### 完整配置 (所有功能)

```env
TYPLI_API_URL=https://fluxes.zeabur.app/v1/chat/completions
FLUX_API_ENDPOINT=https://api.replicate.com/v1/predictions
FLUX_API_KEY=r8_your_replicate_key
POSTGRES_URL=postgresql://user:pass@host:5432/db
```

---

## 技术支持

如果遇到问题:

1. 查看 [README.md](README.md) 常见问题部分
2. 提交 [GitHub Issue](https://github.com/kinai9661/flux-chat-ai/issues)
3. 检查 Zeabur/Vercel 部署日志

---

**更新日期**: 2025-12-09  
**维护者**: [kinai9661](https://github.com/kinai9661)