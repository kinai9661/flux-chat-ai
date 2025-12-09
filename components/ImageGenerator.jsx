'use client';
import { useState } from 'react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('flux-pro');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  // 可用的图像模型
  const imageModels = [
    { id: 'flux-pro', name: 'FLUX Pro', description: '最高质量', speed: '慢' },
    { id: 'flux-dev', name: 'FLUX Dev', description: '开发版本', speed: '中' },
    { id: 'flux-schnell', name: 'FLUX Schnell', description: '快速生成', speed: '快' },
    { id: 'sdxl', name: 'Stable Diffusion XL', description: '稳定扩散', speed: '中' },
  ];

  // 尺寸比例选项
  const aspectRatios = [
    { value: '1:1', label: '正方形 (1024x1024)', width: 1024, height: 1024 },
    { value: '16:9', label: '横屏 (1344x768)', width: 1344, height: 768 },
    { value: '9:16', label: '竖屏 (768x1344)', width: 768, height: 1344 },
    { value: '4:3', label: '标准 (1152x896)', width: 1152, height: 896 },
    { value: '3:4', label: '竖版 (896x1152)', width: 896, height: 1152 },
  ];

  const generateImages = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImages([]);

    try {
      const ratio = aspectRatios.find(r => r.value === aspectRatio);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          count,
          model: selectedModel,
          width: ratio.width,
          height: ratio.height
        })
      });

      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error('Generation error:', error);
      alert('生成失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url, index) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `flux-${selectedModel}-${Date.now()}-${index}.png`;
    a.click();
  };

  const optimizePrompt = async () => {
    if (!prompt.trim()) return;
    
    try {
      const response = await fetch('/api/optimize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      setPrompt(data.optimizedPrompt);
    } catch (error) {
      console.error('Optimize error:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* 模型和尺寸选择 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            🎨 图像模型
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          >
            {imageModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.speed}) - {model.description}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            📐 图片尺寸
          </label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          >
            {aspectRatios.map((ratio) => (
              <option key={ratio.value} value={ratio.value}>
                {ratio.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompt 输入 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            ✍️ 图片描述 Prompt
          </label>
          <button
            onClick={optimizePrompt}
            disabled={!prompt.trim()}
            className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition disabled:opacity-50"
          >
            ✨ AI 优化提示词
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你想要生成的图片... (中英文均可)\n\n示例：一只可爱的橘猫坐在窗台上，阳光洒在它身上，背景是城市风景"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-32 resize-none"
        />
        <p className="mt-2 text-xs text-gray-500">
          💡 提示: 详细的描述能生成更好的图片
        </p>
      </div>

      {/* 生成设置 */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            🔢 生成数量
          </label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value={1}>1 张</option>
            <option value={2}>2 张</option>
            <option value={3}>3 张</option>
            <option value={4}>4 张</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={generateImages}
            disabled={loading || !prompt.trim()}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium whitespace-nowrap"
          >
            {loading ? '🎨 生成中...' : '🎨 生成图片'}
          </button>
        </div>
      </div>

      {/* 生成中状态 */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">AI 正在创作中...</p>
            <p className="text-sm text-gray-500 mt-2">
              使用 {imageModels.find(m => m.id === selectedModel)?.name} 模型
            </p>
            <p className="text-xs text-gray-400 mt-1">预计 20-30 秒</p>
          </div>
        </div>
      )}

      {/* 生成结果 */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              🖼️ 生成结果 ({images.length} 张)
            </h3>
            <span className="text-sm text-gray-500">
              模型: {imageModels.find(m => m.id === selectedModel)?.name}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img.url}
                  alt={`Generated ${idx + 1}`}
                  className="w-full rounded-lg shadow-md hover:shadow-xl transition"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => downloadImage(img.url, idx)}
                    className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition"
                  >
                    📥 下载
                  </button>
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}