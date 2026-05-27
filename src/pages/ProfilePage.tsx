import React, { useState } from 'react';
import {
  User,
  Users,
  Lock,
  Shield,
  Settings,
  Mail,
  Info,
  LogOut,
  Trash2,
  ChevronRight,
  Heart,
  Edit3,
  Key,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    resetData, 
    showToast, 
    appLockEnabled, 
    toggleAppLock, 
    familyMembers, 
    logout,
    appLockPassword,
    setAppLockPassword,
    clearAppLockPassword
  } = useAppStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [editName, setEditName] = useState('李明');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      logout();
    }
  };

  const handleReset = () => {
    resetData();
    setShowResetConfirm(false);
    showToast('数据已重置', 'success');
  };

  const handleSaveProfile = () => {
    showToast('个人信息已更新', 'success');
    setShowEditProfile(false);
  };

  const handleSetPassword = () => {
    if (password.length < 4) {
      showToast('密码至少需要4位数字', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast('两次输入的密码不一致', 'error');
      return;
    }
    setAppLockPassword(password);
    setShowSetPassword(false);
    setPassword('');
    setConfirmPassword('');
  };

  const handleClearPassword = () => {
    if (confirm('确定要清除应用锁密码吗？')) {
      clearAppLockPassword();
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 px-4 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-xl">
                <User className="w-10 h-10 text-green-600" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-3 h-3 text-white fill-white" />
              </div>
              <button
                onClick={() => setShowEditProfile(true)}
                className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Edit3 className="w-3.5 h-3.5 text-green-600" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-white text-2xl font-bold mb-1">{editName}</h2>
              <p className="text-white/80 text-sm">我的健康档案</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-medium">本地加密存储</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <h3 className="text-gray-900 font-bold">家庭管理</h3>
            </div>
            <button
              onClick={() => navigate('/family')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-white hover:from-blue-100/50 hover:to-gray-50 rounded-xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 font-semibold">家庭成员管理</p>
                  <p className="text-gray-500 text-sm">点击添加家人，管理全家健康档案</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                  {familyMembers.length}位成员
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              <h3 className="text-gray-900 font-bold">数据安全</h3>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">核心卖点</span>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl hover:from-green-100/50 hover:to-emerald-100/50 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-900 font-semibold">数据安全与存储</p>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                        <Lock className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">已启用</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      采用本地SQLite加密技术，所有数据均存储于手机本地，不上传网络
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-all">
                <button
                  onClick={() => showToast('演示功能', 'info')}
                  className="w-full flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-xl">💾</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800 font-medium">本地备份</p>
                    <p className="text-gray-400 text-xs">备份到本地存储</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-all">
                <button
                  onClick={() => showToast('演示功能', 'info')}
                  className="w-full flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-xl">📥</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800 font-medium">恢复数据</p>
                    <p className="text-gray-400 text-xs">从备份恢复数据</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-all">
                <button
                  onClick={() => showToast('演示功能', 'info')}
                  className="w-full flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-xl">📤</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800 font-medium">导出全部数据</p>
                    <p className="text-gray-400 text-xs">导出为JSON格式</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 font-semibold">应用锁</p>
                      {appLockPassword && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded-full">已设置密码</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">开启后进入应用需要验证密码，保护您的隐私安全</p>
                  </div>
                </div>
                <button
                  onClick={toggleAppLock}
                  disabled={!appLockPassword}
                  className={`w-14 h-7 rounded-full transition-all duration-300 relative ${
                    appLockEnabled 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30' 
                      : appLockPassword 
                        ? 'bg-gray-300' 
                        : 'bg-gray-200 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${
                      appLockEnabled ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {!appLockPassword ? (
              <div className="mt-3">
                <button
                  onClick={() => setShowSetPassword(true)}
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                >
                  <Key className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">设置应用锁密码</span>
                </button>
              </div>
            ) : (
              <div className="mt-3">
                <button
                  onClick={handleClearPassword}
                  className="w-full flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
                >
                  <Key className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-medium">清除应用锁密码</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full"></div>
              <h3 className="text-gray-900 font-bold">系统设置</h3>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => showToast('演示功能', 'info')}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50/50 rounded-xl transition-all group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 font-medium">通用设置</p>
                  <p className="text-gray-400 text-xs">通知管理、主题切换、语言设置</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => showToast('演示功能', 'info')}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50/50 rounded-xl transition-all group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 font-medium">反馈与建议</p>
                  <p className="text-gray-400 text-xs">帮助我们做得更好</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50/50 rounded-xl transition-all group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 font-medium">关于我们</p>
                  <p className="text-gray-400 text-xs">版本号 v1.4.0</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-5">
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 hover:bg-red-50/50 rounded-xl transition-all group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 font-medium">退出登录</p>
                  <p className="text-gray-400 text-xs">切换到其他账号</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center gap-4 p-4 hover:bg-red-50/50 rounded-xl transition-all group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-red-600 font-medium">重置应用数据</p>
                  <p className="text-gray-400 text-xs">清除所有数据，恢复初始状态</p>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 text-center pb-4">
          <p className="text-xs text-gray-400 mb-2">健康管家 v1.4.0</p>
          <p className="text-xs text-gray-300">© 2026 健康管家 All Rights Reserved</p>
        </div>
      </main>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">确认重置</h3>
              <p className="text-gray-600 leading-relaxed">
                此操作将清除所有数据并恢复至初始状态，
                <span className="text-red-600 font-semibold">此操作不可逆</span>。
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
              >
                取消
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30"
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-3xl">
              <h3 className="text-xl font-bold">编辑个人信息</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-12 h-12 text-green-600" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <span className="text-white text-lg">📷</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500">点击更换头像</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="请输入姓名"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSetPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-t-3xl">
              <h3 className="text-xl font-bold">设置应用锁密码</h3>
              <p className="text-white/80 text-sm mt-1">请设置4位数字密码</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">数字密码</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="请输入4位数字"
                    maxLength={4}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="请再次输入密码"
                    maxLength={4}
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-blue-600 text-sm">
                  🔒 设置后可开启应用锁，保护您的隐私安全
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSetPassword(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  取消
                </button>
                <button
                  onClick={handleSetPassword}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg"
                >
                  设置密码
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
