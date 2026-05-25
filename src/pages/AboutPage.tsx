import React from 'react';
import { Heart, Shield, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>返回</span>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              关于我们
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">健康管家</h2>
            <p className="text-white/90">您的私人健康管理专家</p>
            <div className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm">版本号</span>
              <span className="text-white font-bold">v1.4.0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            核心优势
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">本地加密存储</h4>
                <p className="text-sm text-gray-500 mt-1">
                  采用本地SQLite加密技术，所有数据均存储于设备本地，不上传任何服务器，确保您的健康数据绝对安全。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">智能健康分析</h4>
                <p className="text-sm text-gray-500 mt-1">
                  基于您的健康记录，提供专业的健康分析报告，帮助您更好地了解自己的身体状况。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">全家健康管理</h4>
                <p className="text-sm text-gray-500 mt-1">
                  支持添加家庭成员，集中管理全家的健康档案，让关爱更简单。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-bold text-gray-900 mb-4">服务条款</h3>
          <div className="space-y-3">
            <button
              onClick={() => alert('隐私政策：我们承诺保护您的隐私安全，所有数据仅存储在您的设备上。')}
              className="w-full text-left flex items-center justify-between py-3 hover:bg-blue-100/50 rounded-xl transition-colors"
            >
              <span className="text-gray-700">隐私政策</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => alert('用户协议：使用本应用即表示您同意我们的服务条款。')}
              className="w-full text-left flex items-center justify-between py-3 hover:bg-blue-100/50 rounded-xl transition-colors"
            >
              <span className="text-gray-700">用户协议</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => alert('联系我们：如有任何问题，请发送邮件至 support@health.com')}
              className="w-full text-left flex items-center justify-between py-3 hover:bg-blue-100/50 rounded-xl transition-colors"
            >
              <span className="text-gray-700">联系我们</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="text-center pt-4 pb-8">
          <p className="text-gray-400 text-sm">健康管家 v1.4.0</p>
          <p className="text-gray-300 text-xs mt-1">© 2026 健康管家 All Rights Reserved</p>
        </div>
      </main>
    </div>
  );
};
