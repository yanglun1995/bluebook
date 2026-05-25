import { useState } from 'react';
import { useAppStore, mockPosts, mockServices, mockActivities } from '../store/appStore';
import { User, Edit3, Settings, Heart, Calendar, FileText, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, posts, services, activities, isLoggedIn } = useAppStore();
  const [activeTab, setActiveTab] = useState('posts');

  if (!isLoggedIn || !currentUser) {
    navigate('/login');
    return null;
  }

  const myPosts = posts.filter(p => p.user_id === currentUser.id);
  const myServices = services.filter(s => s.user_id === currentUser.id);
  const myActivities = activities.filter(a => a.organizer_id === currentUser.id);

  const tabs = [
    { id: 'posts', label: '我的帖子', icon: FileText, count: myPosts.length },
    { id: 'services', label: '我的服务', icon: Heart, count: myServices.length },
    { id: 'activities', label: '我的活动', icon: Calendar, count: myActivities.length },
  ];

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg-color)]">
      <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={currentUser.avatar_url}
                alt={currentUser.nickname}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Edit3 className="w-4 h-4 text-[var(--primary-color)]" />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{currentUser.nickname}</h1>
              <p className="text-white/80 mt-1">{currentUser.bio}</p>
              <div className="flex gap-6 mt-4">
                <div>
                  <div className="text-xl font-bold">{posts.length}</div>
                  <div className="text-sm text-white/80">帖子</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{services.length}</div>
                  <div className="text-sm text-white/80">服务</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{activities.length}</div>
                  <div className="text-sm text-white/80">活动</div>
                </div>
              </div>
            </div>
            <button className="ml-auto p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-6">
          <div className="flex gap-2 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {activeTab === 'posts' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPosts.map(post => (
                <div key={post.id} className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate(`/community/${post.id}`)}>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{post.content}</p>
                  {post.image_url && (
                    <img src={post.image_url} alt={post.title} className="w-full h-32 object-cover rounded-lg" />
                  )}
                </div>
              ))}
              {myPosts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-[var(--text-light)] mb-4" />
                  <p className="text-[var(--text-secondary)]">暂无帖子</p>
                  <button onClick={() => navigate('/community')} className="mt-4 text-[var(--primary-color)] font-medium">
                    去发布
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {myServices.map(service => (
                <div key={service.id} className="card overflow-hidden cursor-pointer" onClick={() => navigate(`/help/${service.id}`)}>
                  <img src={service.image_url} alt={service.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{service.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--primary-color)] font-bold">¥{service.price_min}</span>
                      <span className="text-xs text-[var(--text-light)]">{service.location}</span>
                    </div>
                  </div>
                </div>
              ))}
              {myServices.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-[var(--text-light)] mb-4" />
                  <p className="text-[var(--text-secondary)]">暂无服务</p>
                  <button onClick={() => navigate('/help')} className="mt-4 text-[var(--primary-color)] font-medium">
                    去发布
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myActivities.map(activity => (
                <div key={activity.id} className="card overflow-hidden cursor-pointer" onClick={() => navigate(`/activities/${activity.id}`)}>
                  <img src={activity.image_url} alt={activity.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{activity.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">{activity.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--text-light)]">{new Date(activity.start_time).toLocaleDateString()}</span>
                      <span className="text-xs bg-[var(--primary-color)]/10 text-[var(--primary-color)] px-2 py-1 rounded-full">
                        {activity.current_participants}/{activity.max_participants}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {myActivities.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-[var(--text-light)] mb-4" />
                  <p className="text-[var(--text-secondary)]">暂无活动</p>
                  <button onClick={() => navigate('/activities')} className="mt-4 text-[var(--primary-color)] font-medium">
                    去创建
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
