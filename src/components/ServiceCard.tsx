import { Star, MapPin, Clock } from 'lucide-react';
import { Service } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      '遛狗': '🐕',
      '喂养': '🍖',
      '美容': '💅',
      '寄养': '🏠',
      '陪伴': '❤️',
    };
    return icons[type] || '🐾';
  };

  return (
    <div 
      className="card overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/help/${service.id}`)}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={service.image_url}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[var(--text-primary)]">
            {getTypeIcon(service.type)} {service.type}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-[var(--primary-color)] text-white px-2 py-1 rounded-lg text-sm font-medium">
          ¥{service.price_min}-{service.price_max}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-color)] transition-colors">
          {service.title}
        </h3>

        <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-[var(--text-light)]">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{service.rating}</span>
            <span>({service.review_count})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center gap-3">
          <img
            src={service.user.avatar_url}
            alt={service.user.nickname}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-[var(--text-primary)] truncate">{service.user.nickname}</div>
            <div className="text-xs text-[var(--text-light)]">已服务 {service.review_count}+ 次</div>
          </div>
        </div>
      </div>
    </div>
  );
}
