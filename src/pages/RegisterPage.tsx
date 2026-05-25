import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setCurrentUser, setIsLoggedIn } = useAppStore();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!nickname || !email || !password || !confirmPassword) {
      setError('请填写完整信息');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    if (password.length < 6) {
      setError('密码长度至少6位');
      return;
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      phone: '',
      nickname,
      avatar_url: `https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20cartoon%20pet%20owner%20avatar%20friendly&image_size=square`,
      bio: '',
      is_verified: false,
    };
    
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
            <PawPrint className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">加入我们</h1>
          <p className="text-white/80 mt-1">创建您的宠物互助社区账号</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">昵称</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
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
                  placeholder="请输入密码（至少6位）"
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
            
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入密码"
                  className="input-field pl-12 pr-12"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-light)] hover:text-[var(--text-primary)]"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button
              onClick={handleRegister}
              className="btn-primary w-full py-3"
            >
              注册
            </button>
            
            <div className="text-center">
              <span className="text-[var(--text-secondary)] text-sm">
                已有账号？
                <button
                  onClick={() => navigate('/login')}
                  className="text-[var(--primary-color)] font-medium ml-1 hover:underline"
                >
                  立即登录
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
