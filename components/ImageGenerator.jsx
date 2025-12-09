'use client';
import { useState } from 'react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImages = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImages([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, count })
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
    a.download = `flux-${Date.now()}-${index}.png`;
    a.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">图片描述 Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="描述你想要生成的图片..."
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-32 resize-none"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">生成数量</label>
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
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
          >
            {loading ? '生成中...' : '🎨 生成图片'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">AI 正在创作中...</p>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative group">
              <img
                src={img.url}
                alt={`Generated ${idx + 1}`}
                className="w-full rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => downloadImage(img.url, idx)}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  📥 下载
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}