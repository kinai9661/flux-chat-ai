'use client';
import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import ImageGenerator from '@/components/ImageGenerator';

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🤖 AI Chat + Image Generator
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'chat'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            💬 聊天
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'image'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🎨 文生图
          </button>
          <a
            href="/history"
            className="px-6 py-3 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            📚 历史记录
          </a>
        </div>

        {activeTab === 'chat' ? <ChatInterface /> : <ImageGenerator />}
      </div>
    </div>
  );
}