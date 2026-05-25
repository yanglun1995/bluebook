import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Share2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activities, isLoggedIn } = useAppStore();

  const activity = activities.find(a => a.id === id);

  if (!activity) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-[var(--text-secondary)]">活动不存在</p>
          <button onClick={() => navigate('/activities')} className="mt-4 text-[var(--primary-color)]">
            返回活动列表
          </button>
        </div>
      </div>
    );
  }

  const handleSignup = () => {
    if (!isLoggedIn) {
      alert('请先登录');
      navigate('/login');
      return;
    }
    alert('报名成功！请准时参加活动。');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProgress = () => {
    return (activity.current_participants / activity.max_participants) * 100;
  };

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg-color)]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={activity.image_url}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-8">
          <button
            onClick={() => navigate('/activities')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回活动列表
          </button>
          <h1 className="text-3xl font-bold text-white">{activity.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(activity.start_time)}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl">
                  <MapPin className="w-5 h-5" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-xl">
                  <Users className="w-5 h-5" />
                  <span>{activity.current_participants} / {activity.max_participants}人</span>
                </div>
              </div>

              <h3 className="font-semibold text-[var(--text-primary)] mb-4">活动介绍</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {activity.description}
              </p>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">活动组织者</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={activity.user.avatar_url}
                    alt={activity.user.nickname}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[var(--primary-color)]/30"
                  />
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">{activity.user.nickname}</div>
                    <div className="text-sm text-[var(--text-light)]">{activity.user.bio}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4">活动须知</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <span className="text-[var(--text-secondary)]">请提前15分钟到达活动现场签到</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <span className="text-[var(--text-secondary)]">请确保您的宠物已完成疫苗接种</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <span className="text-[var(--text-secondary)]">活动期间请遵守现场工作人员的指引</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  <span className="text-[var(--text-secondary)]">如有特殊情况无法参加，请提前24小时告知</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6 sticky top-20">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--text-light)]">报名进度</span>
                  <span className="text-sm font-medium">{Math.round(getProgress())}%</span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full transition-all duration-500"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">
                  {activity.current_participants} / {activity.max_participants} 人已报名
                </div>
              </div>

              <button
                onClick={handleSignup}
                className="btn-primary w-full py-3 mb-4"
              >
                立即报名
              </button>

              <button className="w-full py-3 border-2 border-[var(--border-color)] rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                分享活动
              </button>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-[var(--text-primary)] mb-3">活动时间</h4>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Clock className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{formatDate(activity.start_time)}</div>
                    <div className="text-sm">至 {formatDate(activity.end_time)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
