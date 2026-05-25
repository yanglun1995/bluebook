import React, { useState } from 'react';
import { Eye, EyeOff, Heart, Shield, Lock, User, ChevronDown } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (username === 'demo' && password === 'health2026') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1500);
    } else {
      alert('演示账号或密码错误，请使用提供的演示账号登录');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 relative overflow-hidden">
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 大圆形装饰 */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-teal-300/15 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s' }}></div>
        
        {/* 浮动粒子 */}
        <div className="absolute top-20 left-[10%] w-3 h-3 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-[15%] w-2 h-2 bg-white/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-[20%] w-4 h-4 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[60%] right-[25%] w-2 h-2 bg-white/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* 网格背景 */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* 渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5"></div>
      </div>

      {/* 顶部品牌区域 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo区域 */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl mb-6 animate-float">
                <Heart className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                <span className="text-lg">✨</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">健康管家</h1>
            <p className="text-white/90 text-base">您的私人健康档案管理专家</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white text-sm">100%本地加密存储</span>
            </div>
          </div>

          {/* 登录表单 */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="space-y-5">
              {/* 用户名输入 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">用户名</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="请输入用户名"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:bg-gray-100"
                  />
                </div>
              </div>

              {/* 密码输入 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">密码</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all hover:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* 记住密码和忘记密码 */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-gray-600">记住密码</span>
                </label>
                <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
                  忘记密码？
                </button>
              </div>

              {/* 登录按钮 */}
              <button
                onClick={handleLogin}
                disabled={isLoading || !username || !password}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-green-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>登录中...</span>
                  </div>
                ) : (
                  '登录'
                )}
              </button>

              {/* 注册入口 */}
              <div className="text-center pt-2">
                <span className="text-gray-500 text-sm">还没有账号？</span>
                <button
                  onClick={onRegister}
                  className="text-green-600 hover:text-green-700 font-bold text-sm ml-1 transition-colors"
                >
                  立即注册
                </button>
              </div>

              {/* 其他登录方式 */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">其他登录方式</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-2xl transition-all border border-gray-200 hover:shadow-md">
                  <span className="text-2xl">📱</span>
                  <span className="text-sm text-gray-700 font-medium">手机验证码</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl transition-all border border-green-200 hover:shadow-md">
                  <span className="text-2xl">💬</span>
                  <span className="text-sm text-green-700 font-medium">微信登录</span>
                </button>
              </div>
            </div>
          </div>

          {/* 演示账号提示 */}
          <div className="mt-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 mb-2">演示账号</h3>
                <div className="space-y-1.5 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">👤 用户名：</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded-lg font-bold text-green-600">demo</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">🔒 密码：</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded-lg font-bold text-green-600">health2026</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 底部版权 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/80">
              登录即表示同意
              <button className="text-white font-medium hover:underline mx-1">《用户协议》</button>
              和
              <button className="text-white font-medium hover:underline mx-1">《隐私政策》</button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
