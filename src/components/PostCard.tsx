import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../store/appStore';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '日常': 'bg-blue-100 text-blue-600',
      '训练': 'bg-green-100 text-green-600',
      '求助': 'bg-red-100 text-red-600',
      '分享': 'bg-purple-100 text-purple-600',
      '领养': 'bg-orange-100 text-orange-600',
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div 
      className="card p-5 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/community/${post.id}`)}
    >
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.user.avatar_url}
          alt={post.user.nickname}
          className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary-color)]/20"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--text-primary)]">{post.user.nickname}</span>
            {post.user.is_verified && (
              <span className="w-5 h-5 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          <span className="text-xs text-[var(--text-light)]">{formatTime(post.created_at)}</span>
        </div>
      </div>

      <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors">
        {post.title}
      </h3>

      <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
        {post.content}
      </p>

      {post.image_url && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className={`tag ${getCategoryColor(post.category)}`}>
          {post.category}
        </span>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
          <button className="text-sm text-[var(--text-light)] hover:text-[var(--primary-color)] transition-colors" onClick={(e) => { e.stopPropagation(); }}>
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
