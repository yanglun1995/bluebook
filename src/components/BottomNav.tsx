import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FileText, BarChart3, PlusCircle, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: '档案',
      icon: FileText,
      iconFilled: FileText,
    },
    {
      path: '/statistics',
      label: '统计',
      icon: BarChart3,
      iconFilled: BarChart3,
    },
    {
      path: '/upload',
      label: '上传',
      icon: PlusCircle,
      iconFilled: PlusCircle,
    },
    {
      path: '/profile',
      label: '我的',
      icon: User,
      iconFilled: User,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 group ${
                  active ? 'transform -translate-y-1' : ''
                }`}
              >
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/40 scale-110'
                      : 'bg-transparent group-hover:bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      active
                        ? 'text-white transform scale-110'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  {active && (
                    <div className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full shadow-lg"></div>
                  )}
                </div>
                <span
                  className={`text-xs font-medium mt-1 transition-all duration-300 ${
                    active
                      ? 'text-green-600 font-bold'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
