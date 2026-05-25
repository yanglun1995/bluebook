import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const { likePost } = useAppStore();

  const formatDate = (dateString: string) => {
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

  return (
    <div className="card p-4 cursor-pointer" onClick={() => navigate(`/community/${post.id}`)}>
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.user.avatar_url}
          alt={post.user.nickname}
          className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary-color)]/30"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--text-primary)]">{post.user.nickname}</span>
            {post.user.is_verified && (
              <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </span>
            )}
          </div>
          <span className="text-sm text-[var(--text-light)]">{formatDate(post.created_at)}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">
        {post.title}
      </h3>

      <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">
        {post.content}
      </p>

      {post.image_url && (
        <div className="mb-3 rounded-xl overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="tag tag-primary">{post.category}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              likePost(post.id);
            }}
            className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-red-500 transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>评论</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--secondary-color)] transition-colors">
            <Share2 className="w-4 h-4" />
            <span>分享</span>
          </button>
        </div>
      </div>
    </div>
  );
}
