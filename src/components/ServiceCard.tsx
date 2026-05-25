import { Star, MapPin, Clock } from 'lucide-react';
import { Service } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();

  const serviceTypeColors: Record<string, string> = {
    '遛狗': 'bg-green-100 text-green-600',
    '喂养': 'bg-blue-100 text-blue-600',
    '美容': 'bg-purple-100 text-purple-600',
    '寄养': 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="card overflow-hidden cursor-pointer" onClick={() => navigate(`/help/${service.id}`)}>
      <div className="relative h-40">
        <img
          src={service.image_url}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`tag ${serviceTypeColors[service.type] || 'bg-gray-100 text-gray-600'}`}>
            {service.type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          {service.title}
        </h3>

        <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{service.rating}</span>
            <span className="text-xs text-[var(--text-light)]">({service.review_count})</span>
          </div>
          <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-[var(--primary-color)]">
              ¥{service.price_min}
            </span>
            <span className="text-sm text-[var(--text-light)]">
              - ¥{service.price_max}/次
            </span>
          </div>
          <button className="px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300">
            立即预约
          </button>
        </div>
      </div>
    </div>
  );
}
