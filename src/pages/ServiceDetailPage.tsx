import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Phone, Shield } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, isLoggedIn } = useAppStore();

  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐶</div>
          <p className="text-[var(--text-secondary)]">服务不存在</p>
          <button onClick={() => navigate('/help')} className="mt-4 text-[var(--primary-color)]">
            返回互助
          </button>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    if (!isLoggedIn) {
      alert('请先登录');
      navigate('/login');
      return;
    }
    alert('预约成功！服务提供者将尽快联系您。');
  };

  const reviews = [
    { name: '用户A', rating: 5, content: '服务非常好，狗狗很开心！', date: '2024-01-10' },
    { name: '用户B', rating: 5, content: '很专业，准时到达，值得信赖。', date: '2024-01-08' },
    { name: '用户C', rating: 4, content: '总体不错，希望下次能提前沟通时间。', date: '2024-01-05' },
  ];

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg-color)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/help')}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回互助
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card overflow-hidden">
              <img
                src={service.image_url}
                alt={service.title}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="tag tag-primary mb-2">{service.type}</span>
                  <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-2">
                    {service.title}
                  </h1>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{service.rating}</span>
                  <span className="text-[var(--text-light)]">({service.review_count}条评价)</span>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-[var(--primary-color)]" />
                  <div>
                    <div className="text-sm text-[var(--text-light)]">服务区域</div>
                    <div className="font-medium">{service.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-[var(--secondary-color)]" />
                  <div>
                    <div className="text-sm text-[var(--text-light)]">服务时间</div>
                    <div className="font-medium">灵活安排</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">服务提供者</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={service.user.avatar_url}
                    alt={service.user.nickname}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--primary-color)]/30"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-[var(--text-primary)]">{service.user.nickname}</div>
                    <div className="text-sm text-[var(--text-light)]">{service.user.bio}</div>
                  </div>
                  {service.user.is_verified && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      <Shield className="w-4 h-4" />
                      已认证
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">用户评价</h3>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.name}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">{review.content}</p>
                    <span className="text-xs text-[var(--text-light)]">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6 sticky top-20">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-[var(--primary-color)]">¥{service.price_min}</span>
                <span className="text-[var(--text-light)]">- ¥{service.price_max}/次</span>
              </div>

              <button
                onClick={handleBook}
                className="btn-primary w-full py-3 mb-4"
              >
                立即预约
              </button>

              <button className="w-full py-3 border-2 border-[var(--primary-color)] text-[var(--primary-color)] rounded-xl font-medium hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                联系服务提供者
              </button>

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>实名认证保障</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>准时服务承诺</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>服务评价体系</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
