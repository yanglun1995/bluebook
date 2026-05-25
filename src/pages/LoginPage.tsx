import { useState } from 'react';
import { PawPrint, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, mockUsers } from '../store/appStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('请输入邮箱和密码');
      return;
    }

    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      navigate('/');
    } else {
      setError('邮箱或密码错误');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-color)]/10 via-white to-[var(--secondary-color)]/10 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </button>
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-2xl flex items-center justify-center shadow-lg text-3xl">
            🐶
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">欢迎回来</h1>
          <p className="text-[var(--text-secondary)] mt-2">登录您的宠物互助社区账号</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="请输入密码"
                  className="input-field pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <input type="checkbox" className="w-4 h-4 rounded border-[var(--border-color)] text-[var(--primary-color)] focus:ring-[var(--primary-color)]" />
                记住我
              </label>
              <button className="text-sm text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors">
                忘记密码？
              </button>
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              登录
            </button>
          </form>



          <div className="mt-6 text-center">
            <span className="text-sm text-[var(--text-secondary)]">
              还没有账号？
              <button onClick={() => navigate('/register')} className="text-[var(--primary-color)] font-medium ml-1 hover:text-[var(--primary-dark)] transition-colors">
                立即注册
              </button>
            </span>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--text-light)] mt-6">
          登录即表示同意我们的
          <button className="text-[var(--primary-color)] hover:underline">用户协议</button>
          和
          <button className="text-[var(--primary-color)] hover:underline">隐私政策</button>
        </p>
      </div>
    </div>
  );
}
