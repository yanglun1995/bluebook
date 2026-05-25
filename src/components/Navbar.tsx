import { useState } from 'react';
import { PawPrint, Search, Menu, X, User, MessageCircle, Bell, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: '首页', path: '/' },
    { name: '社区', path: '/community' },
    { name: '互助', path: '/help' },
    { name: '活动', path: '/activities' },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/community?search=${searchQuery}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl flex items-center justify-center shadow-md text-xl">
              🐕
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)] hidden sm:block">宠物互助社区</span>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="搜索帖子、服务、活动..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/30 transition-all"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-[var(--primary-color)]/10 text-[var(--primary-color)]'
                    : 'text-[var(--text-secondary)] hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && currentUser ? (
              <>
                <button className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <div className="relative group">
                  <button className="flex items-center gap-2 pl-2 pr-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                    <img
                      src={currentUser.avatar_url}
                      alt={currentUser.nickname}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[var(--primary-color)]/30"
                    />
                    <span className="text-sm font-medium text-[var(--text-primary)] hidden sm:block">
                      {currentUser.nickname}
                    </span>
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={() => navigate('/profile')}
                      className="w-full px-4 py-2 text-left text-sm text-[var(--text-secondary)] hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      个人中心
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors"
                >
                  登录
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary text-sm px-5 py-2"
                >
                  注册
                </button>
              </>
            )}

            <button
              className="md:hidden p-2 text-[var(--text-secondary)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/30"
              />
            </form>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-3 text-left text-sm font-medium rounded-xl transition-all ${
                    location.pathname === item.path
                      ? 'bg-[var(--primary-color)]/10 text-[var(--primary-color)]'
                      : 'text-[var(--text-secondary)] hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
