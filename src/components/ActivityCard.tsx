import { Calendar, MapPin, Users } from 'lucide-react';
import { Activity } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProgress = () => {
    return (activity.current_participants / activity.max_participants) * 100;
  };

  return (
    <div className="card overflow-hidden cursor-pointer" onClick={() => navigate(`/activities/${activity.id}`)}>
      <div className="relative h-48">
        <img
          src={activity.image_url}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{activity.title}</h3>
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

        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="text-sm text-[var(--text-secondary)]">
            {activity.current_participants} / {activity.max_participants} 人已报名
          </span>
        </div>

        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full transition-all duration-500"
            style={{ width: `${getProgress()}%` }}
          />
        </div>

        <div className="mt-3 flex justify-end">
          <button className="btn-primary text-sm px-6 py-2">
            立即报名
          </button>
        </div>
      </div>
    </div>
  );
}
