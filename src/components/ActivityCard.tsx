import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Activity } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getProgress = () => {
    return (activity.current_participants / activity.max_participants) * 100;
  };

  return (
    <div 
      className="card overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/activities/${activity.id}`)}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={activity.image_url}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-white text-lg mb-1">{activity.title}</h3>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(activity.start_time)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {activity.location}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--text-light)]">报名进度</span>
            <span className="text-sm font-medium">{activity.current_participants}/{activity.max_participants}</span>
          </div>
          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <img
              src={activity.user.avatar_url}
              alt={activity.user.nickname}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-[var(--text-primary)]">{activity.user.nickname}</span>
          </div>
          <button className="btn-primary text-sm px-4 py-1.5">
            立即报名
          </button>
        </div>
      </div>
    </div>
  );
}
