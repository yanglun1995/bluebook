import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Home, Users, Heart, Calendar, User, Menu, X, Search } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  const navItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: Users, label: '社区', path: '/community' },
    { icon: Heart, label: '互助', path: '/help' },
    { icon: Calendar, label: '活动', path: '/activities' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
              宠物互助社区
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-[var(--primary-color)]/10 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-all duration-300"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:bg-white transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  <img
                    src={currentUser?.avatar_url}
                    alt={currentUser?.nickname}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[var(--primary-color)]"
                  />
                  <span className="font-medium text-sm">{currentUser?.nickname}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                >
                  退出
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-[var(--primary-color)] font-medium hover:bg-[var(--primary-color)]/10 rounded-full transition-all duration-300"
                >
                  登录
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary text-sm px-5 py-2"
                >
                  注册
                </button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
            </div>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-[var(--primary-color)]/10 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-all duration-300"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            {isLoggedIn ? (
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-[var(--primary-color)]/10 transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">个人中心</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition-all duration-300 mt-1"
                >
                  <span className="font-medium">退出登录</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t flex gap-2">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-[var(--primary-color)] font-medium border-2 border-[var(--primary-color)] rounded-full"
                >
                  登录
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 py-2 btn-primary"
                >
                  注册
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
