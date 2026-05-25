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
  Plus,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

const AVATARS = [
  '👨', '👩', '👧', '👦', '👴', '👵', '🧑',
];

export const FamilyManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { familyMembers, addFamilyMember, deleteFamilyMember, showToast } = useAppStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', relationship: '', avatar: '👨' });

  const handleAddMember = () => {
    if (!newMember.name.trim()) {
      showToast('请输入姓名', 'error');
      return;
    }
    addFamilyMember(newMember.name, newMember.relationship || '其他');
    setShowAddModal(false);
    setNewMember({ name: '', relationship: '', avatar: '👨' });
    showToast('添加成功', 'success');
  };

  const handleDelete = (id: string) => {
    if (familyMembers.length <= 1) {
      showToast('至少保留一位成员', 'error');
      return;
    }
    if (confirm('确定要删除该成员吗？')) {
      deleteFamilyMember(id);
      showToast('删除成功', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
              家庭成员
            </h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">我的家人</h3>
            <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
              {familyMembers.length}位成员
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {familyMembers.map((member, index) => (
              <div
                key={member.id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {AVATARS[index % AVATARS.length]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.relationship || '家庭成员'}</p>
                  </div>
                  {familyMembers.length > 1 && (
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {familyMembers.length < 5 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full mt-4 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-green-400 hover:text-green-500 transition-colors"
            >
              <Plus className="w-6 h-6 inline-block mr-2" />
              添加家庭成员
            </button>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">管理全家健康</h3>
              <p className="text-sm text-gray-600 mt-1">
                添加家庭成员后，可以分别查看和管理每位家人的健康档案，让全家人的健康一目了然。
              </p>
            </div>
          </div>
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-3xl">
              <h3 className="text-xl font-bold">添加家庭成员</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">选择头像</label>
                <div className="flex gap-2 flex-wrap">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setNewMember({ ...newMember, avatar })}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                        newMember.avatar === avatar
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 scale-110 shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="请输入姓名"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">关系</label>
                <div className="grid grid-cols-4 gap-2">
                  {['本人', '配偶', '子女', '父母', '其他'].map((rel) => (
                    <button
                      key={rel}
                      onClick={() => setNewMember({ ...newMember, relationship: rel })}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        newMember.relationship === rel
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  取消
                </button>
                <button
                  onClick={handleAddMember}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
