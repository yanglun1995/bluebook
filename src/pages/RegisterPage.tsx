import { useState } from 'react';
import { PawPrint, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useAppStore();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname || !email || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码长度至少为6位');
      return;
    }

    const newUser = {
      id: '5',
      email,
      nickname,
      avatar_url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20pet%20owner%20avatar%20friendly&image_size=square',
      bio: '新用户',
      is_verified: false,
    };

    setIsLoggedIn(true);
    setCurrentUser(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-color)]/10 via-white to-[var(--secondary-color)]/10 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </button>
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-2xl flex items-center justify-center shadow-lg">
            <PawPrint className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">创建账号</h1>
          <p className="text-[var(--text-secondary)] mt-2">加入宠物互助社区，与爱宠人士分享快乐</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">昵称</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setError('');
                  }}
                  placeholder="请输入昵称"
                  className="input-field pl-12"
                />
              </div>
            </div>

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
                  placeholder="请输入密码（至少6位）"
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

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="请再次输入密码"
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="agree" className="w-4 h-4 rounded border-[var(--border-color)] text-[var(--primary-color)] focus:ring-[var(--primary-color)] mt-0.5" />
              <label htmlFor="agree" className="text-sm text-[var(--text-secondary)]">
                我已阅读并同意
                <button className="text-[var(--primary-color)] hover:underline">用户协议</button>
                和
                <button className="text-[var(--primary-color)] hover:underline">隐私政策</button>
              </label>
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              注册
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-[var(--text-secondary)]">
              已有账号？
              <button onClick={() => navigate('/login')} className="text-[var(--primary-color)] font-medium ml-1 hover:text-[var(--primary-dark)] transition-colors">
                立即登录
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
