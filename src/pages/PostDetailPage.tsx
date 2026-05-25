import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, ArrowLeft, Send } from 'lucide-react';
import { useAppStore, mockComments } from '../store/appStore';
import { useState } from 'react';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, comments, addComment, currentUser, likePost } = useAppStore();
  const [newComment, setNewComment] = useState('');

  const post = posts.find(p => p.id === id);
  const postComments = comments.filter(c => c.post_id === id);

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐾</div>
          <p className="text-[var(--text-secondary)]">帖子不存在</p>
          <button onClick={() => navigate('/community')} className="mt-4 text-[var(--primary-color)]">
            返回社区
          </button>
        </div>
      </div>
    );
  }

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

  const handleSubmitComment = () => {
    if (!newComment.trim() || !currentUser) {
      if (!currentUser) alert('请先登录');
      return;
    }
    
    const comment = {
      id: Date.now().toString(),
      post_id: post.id,
      user_id: currentUser.id,
      content: newComment,
      created_at: new Date().toISOString(),
      user: currentUser,
    };
    addComment(comment);
    setNewComment('');
  };

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg-color)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/community')}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回社区
        </button>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={post.user.avatar_url}
              alt={post.user.nickname}
              className="w-12 h-12 rounded-full object-cover border-2 border-[var(--primary-color)]/30"
            />
            <div>
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

          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            {post.title}
          </h1>

          <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
            {post.content}
          </p>

          {post.image_url && (
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-6 pb-6 border-b">
            <button
              onClick={() => likePost(post.id)}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-red-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{postComments.length}</span>
            </button>
            <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--secondary-color)] transition-colors">
              <Share2 className="w-5 h-5" />
              <span>分享</span>
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-[var(--text-primary)] mb-4">评论 ({postComments.length})</h3>
            
            {currentUser && (
              <div className="flex gap-3 mb-6">
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.nickname}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                    placeholder="写下你的评论..."
                    className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 pr-12"
                  />
                  <button
                    onClick={handleSubmitComment}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 rounded-full transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {postComments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.user.avatar_url}
                    alt={comment.user.nickname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[var(--text-primary)]">{comment.user.nickname}</span>
                      <span className="text-xs text-[var(--text-light)]">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="text-[var(--text-secondary)]">{comment.content}</p>
                  </div>
                </div>
              ))}
              
              {postComments.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 mx-auto text-[var(--text-light)] mb-2" />
                  <p className="text-[var(--text-light)]">暂无评论，快来发表第一条评论吧</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
