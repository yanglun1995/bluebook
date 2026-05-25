import { useState } from 'react';
import { Search, Calendar, Plus, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import ActivityCard from '../components/ActivityCard';

export default function ActivitiesPage() {
  const { activities, addActivity, currentUser } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    location: '',
    start_time: '',
    end_time: '',
    max_participants: 50,
    image_url: '',
  });

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateActivity = () => {
    if (!currentUser) {
      alert('请先登录');
      return;
    }
    const activity = {
      id: Date.now().toString(),
      organizer_id: currentUser.id,
      title: newActivity.title,
      description: newActivity.description,
      location: newActivity.location,
      start_time: newActivity.start_time || new Date().toISOString(),
      end_time: newActivity.end_time || new Date().toISOString(),
      max_participants: newActivity.max_participants,
      current_participants: 0,
      image_url: newActivity.image_url || 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pet%20event%20gathering%20happy&image_size=landscape_16_9',
      created_at: new Date().toISOString(),
      user: currentUser,
    };
    addActivity(activity);
    setNewActivity({
      title: '',
      description: '',
      location: '',
      start_time: '',
      end_time: '',
      max_participants: 50,
      image_url: '',
    });
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg-color)]">
      <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">精彩活动</h1>
          <p className="text-white/80">参与宠物聚会，结识志同道合的朋友</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
            <input
              type="text"
              placeholder="搜索活动..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            创建活动
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-[var(--text-secondary)]">暂无活动</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">创建活动</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">活动名称</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="例如：宠物运动会"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">活动地点</label>
                <input
                  type="text"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                  placeholder="例如：朝阳公园"
                  className="input-field"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">开始时间</label>
                  <input
                    type="datetime-local"
                    value={newActivity.start_time}
                    onChange={(e) => setNewActivity({ ...newActivity, start_time: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">结束时间</label>
                  <input
                    type="datetime-local"
                    value={newActivity.end_time}
                    onChange={(e) => setNewActivity({ ...newActivity, end_time: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">最大参与人数</label>
                <input
                  type="number"
                  value={newActivity.max_participants}
                  onChange={(e) => setNewActivity({ ...newActivity, max_participants: Number(e.target.value) })}
                  placeholder="50"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">活动描述</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  placeholder="详细描述活动内容..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 border-2 border-[var(--border-color)] rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateActivity}
                  className="flex-1 btn-primary"
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
