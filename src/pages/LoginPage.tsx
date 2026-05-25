import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAppStore, mockUsers } from '../store/appStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser, setIsLoggedIn } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('请填写完整信息');
      return;
    }
    
    const mockUser = mockUsers.find(u => u.email === email);
    if (mockUser) {
      setCurrentUser(mockUser);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setError('邮箱或密码错误');
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
            <PawPrint className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">欢迎回来</h1>
          <p className="text-white/80 mt-1">登录您的宠物互助社区账号</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入邮箱"
                  className="input-field pl-12"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="input-field pl-12 pr-12"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] hover:text-[var(--text-primary)]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button
              onClick={handleLogin}
              className="btn-primary w-full py-3"
            >
              登录
            </button>
            
            <div className="text-center">
              <span className="text-[var(--text-secondary)] text-sm">
                还没有账号？
                <button
                  onClick={() => navigate('/register')}
                  className="text-[var(--primary-color)] font-medium ml-1 hover:underline"
                >
                  立即注册
                </button>
              </span>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="text-center text-sm text-[var(--text-light)] mb-4">或者使用以下方式登录</div>
              <div className="flex gap-3">
                <button className="flex-1 py-2 border border-[var(--border-color)] rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex-1 py-2 border border-[var(--border-color)] rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#07C160">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c4.801 0 8.692-3.287 8.692-7.342 0-4.054-3.891-7.334-8.692-7.334z"/>
                  </svg>
                  微信
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
