import { useEffect } from 'react';
import { PawPrint, Users, Heart, Calendar, ChevronRight, Play, Sparkles } from 'lucide-react';
import { useAppStore, mockPosts, mockServices, mockActivities } from '../store/appStore';
import PostCard from '../components/PostCard';
import ServiceCard from '../components/ServiceCard';
import ActivityCard from '../components/ActivityCard';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const { posts, services, activities, addPost, addService, addActivity } = useAppStore();

  useEffect(() => {
    if (posts.length === 0) {
      mockPosts.forEach(post => addPost(post));
    }
    if (services.length === 0) {
      mockServices.forEach(service => addService(service));
    }
    if (activities.length === 0) {
      mockActivities.forEach(activity => addActivity(activity));
    }
  }, [posts.length, services.length, activities.length, addPost, addService, addActivity]);

  const features = [
    {
      icon: Users,
      title: '社区交流',
      description: '与宠物爱好者分享经验',
      color: 'from-orange-400 to-red-400',
    },
    {
      icon: Heart,
      title: '互助服务',
      description: '遛狗、喂养、寄养一站式',
      color: 'from-pink-400 to-rose-400',
    },
    {
      icon: Calendar,
      title: '精彩活动',
      description: '宠物聚会、训练课程',
      color: 'from-blue-400 to-cyan-400',
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg-color)]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 via-white to-[var(--secondary-color)]/20" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--primary-color)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[var(--secondary-color)]/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-[var(--primary-color)]" />
                <span className="text-sm font-medium text-[var(--primary-color)]">宠物爱好者的温馨家园</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
                让爱宠生活
                <span className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
                  更精彩
                </span>
              </h1>
              
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                加入宠物互助社区，与志同道合的朋友分享养宠心得，寻找可靠的互助服务，参与精彩的宠物活动。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <PawPrint className="w-5 h-5" />
                  立即加入
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  了解更多
                </button>
              </div>
              
              <div className="mt-10 flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--primary-color)]">50K+</div>
                  <div className="text-sm text-[var(--text-secondary)]">活跃用户</div>
                </div>
                <div className="w-px h-12 bg-[var(--border-color)]" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--secondary-color)]">10K+</div>
                  <div className="text-sm text-[var(--text-secondary)]">互助服务</div>
                </div>
                <div className="w-px h-12 bg-[var(--border-color)]" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--primary-color)]">500+</div>
                  <div className="text-sm text-[var(--text-secondary)]">精彩活动</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20happy%20pets%20dogs%20and%20cats%20playing%20together%20warm%20lighting&image_size=landscape_4_3"
                  alt="宠物乐园"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-light)]">今日互助服务</div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">128+</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-light)]">本周活动</div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => {
                  if (index === 0) navigate('/community');
                  if (index === 1) navigate('/help');
                  if (index === 2) navigate('/activities');
                }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">社区动态</h2>
              <p className="text-[var(--text-secondary)] mt-1">看看大家都在分享什么</p>
            </div>
            <button
              onClick={() => navigate('/community')}
              className="flex items-center gap-1 text-[var(--primary-color)] font-medium hover:text-[var(--primary-dark)] transition-colors"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">互助服务</h2>
              <p className="text-[var(--text-secondary)] mt-1">寻找身边的贴心服务</p>
            </div>
            <button
              onClick={() => navigate('/help')}
              className="flex items-center gap-1 text-[var(--primary-color)] font-medium hover:text-[var(--primary-dark)] transition-colors"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--secondary-color)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">精彩活动</h2>
              <p className="text-[var(--text-secondary)] mt-1">快来报名参加</p>
            </div>
            <button
              onClick={() => navigate('/activities')}
              className="flex items-center gap-1 text-[var(--primary-color)] font-medium hover:text-[var(--primary-dark)] transition-colors"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.slice(0, 3).map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[var(--text-primary)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">宠物互助社区</span>
              </div>
              <p className="text-gray-400 text-sm">
                让每一位宠物主人都能找到温暖的互助伙伴
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition-colors">首页</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">社区</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">互助</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">活动</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">帮助中心</h4>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white transition-colors">常见问题</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">联系客服</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">用户协议</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">隐私政策</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">关注我们</h4>
              <p className="text-gray-400 text-sm mb-4">订阅获取最新活动资讯</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="输入邮箱"
                  className="flex-1 px-4 py-2 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
                <button className="px-4 py-2 bg-[var(--primary-color)] rounded-full hover:bg-[var(--primary-dark)] transition-colors">
                  订阅
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            © 2024 宠物互助社区. 保留所有权利.
          </div>
        </div>
      </footer>
    </div>
  );
}
