import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        
        {/* 浮动粒子 */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo容器 */}
        <div 
          className={`mb-8 transition-all duration-1000 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
          {/* 医生插画 SVG */}
          <svg 
            viewBox="0 0 200 200" 
            className="w-40 h-40 md:w-48 md:h-48 drop-shadow-2xl"
          >
            {/* 身体 */}
            <ellipse cx="100" cy="150" rx="35" ry="40" fill="#2563eb" />
            
            {/* 上衣装饰 */}
            <rect x="85" y="130" width="30" height="35" fill="#1d4ed8" rx="5" />
            <line x1="100" y1="130" x2="100" y2="165" stroke="#60a5fa" strokeWidth="2" />
            <circle cx="100" cy="145" r="4" fill="#60a5fa" />
            
            {/* 头部 */}
            <circle cx="100" cy="70" r="35" fill="#fcd34d" />
            
            {/* 头发 */}
            <path d="M68 55 Q65 45 80 40 Q100 35 120 40 Q135 45 132 55" fill="#1f2937" />
            <path d="M75 58 Q70 48 85 43" fill="#1f2937" />
            <path d="M125 58 Q130 48 115 43" fill="#1f2937" />
            
            {/* 帽子 */}
            <rect x="70" y="35" width="60" height="12" fill="#ffffff" rx="3" />
            <rect x="75" y="30" width="50" height="8" fill="#dc2626" rx="2" />
            <text x="100" y="36" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">+</text>
            
            {/* 眼睛 */}
            <circle cx="88" cy="68" r="5" fill="#1f2937" />
            <circle cx="112" cy="68" r="5" fill="#1f2937" />
            <circle cx="90" cy="66" r="2" fill="white" />
            <circle cx="114" cy="66" r="2" fill="white" />
            
            {/* 眉毛 */}
            <path d="M80 58 Q88 54 96 58" stroke="#1f2937" strokeWidth="2" fill="none" />
            <path d="M104 58 Q112 54 120 58" stroke="#1f2937" strokeWidth="2" fill="none" />
            
            {/* 眼镜 */}
            <circle cx="88" cy="68" r="8" fill="none" stroke="#374151" strokeWidth="2" />
            <circle cx="112" cy="68" r="8" fill="none" stroke="#374151" strokeWidth="2" />
            <path d="M96 68 L104 68" stroke="#374151" strokeWidth="2" />
            
            {/* 鼻子 */}
            <path d="M100 76 L100 84" stroke="#1f2937" strokeWidth="2" />
            <circle cx="100" cy="82" r="3" fill="#1f2937" />
            
            {/* 嘴巴 */}
            <path d="M90 92 Q100 98 110 92" stroke="#1f2937" strokeWidth="2" fill="none" />
            
            {/* 手臂 */}
            <ellipse cx="60" cy="145" rx="15" ry="25" fill="#2563eb" transform="rotate(-30 60 145)" />
            <ellipse cx="140" cy="145" rx="15" ry="25" fill="#2563eb" transform="rotate(30 140 145)" />
            
            {/* 听诊器 */}
            <path d="M60 120 Q40 100 50 80 Q60 65 70 75" stroke="#6b7280" strokeWidth="4" fill="none" />
            <circle cx="70" cy="75" r="8" fill="none" stroke="#6b7280" strokeWidth="4" />
            <path d="M140 120 Q160 100 150 80 Q140 65 130 75" stroke="#6b7280" strokeWidth="4" fill="none" />
            <circle cx="130" cy="75" r="8" fill="none" stroke="#6b7280" strokeWidth="4" />
            <path d="M70 120 Q100 115 130 120" stroke="#6b7280" strokeWidth="4" fill="none" />
          </svg>
        </div>

        {/* 品牌名称 */}
        <div 
          className={`text-center mb-4 transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>健</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>康</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.7s' }}>管</span>
            <span className="inline-block animate-bounce" style={{ animationDelay: '0.8s' }}>家</span>
          </h1>
        </div>

        {/* 副标题 */}
        <div 
          className={`transition-all duration-1000 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-lg md:text-xl text-blue-100 drop-shadow-md tracking-wide">
            专属于您的私人健康管理专家
          </p>
        </div>

        {/* 加载指示器 */}
        <div 
          className={`mt-10 transition-all duration-1000 delay-700 ${animate ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white/80 text-sm">正在加载...</span>
          </div>
        </div>
      </div>

      {/* CSS 动画 */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};
