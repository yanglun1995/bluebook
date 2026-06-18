import { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArchivePage } from './pages/ArchivePage';
import { StatisticsPage } from './pages/StatisticsPage';
import { UploadPage } from './pages/UploadPage';
import { ProfilePage } from './pages/ProfilePage';
import { RecordDetailPage } from './pages/RecordDetailPage';
import { FamilyManagementPage } from './pages/FamilyManagementPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { SplashScreen } from './components/SplashScreen';
import { useAppStore } from './store';

function AppContent() {
  const location = useLocation();
  const { isLoggedIn, login, fetchRecords } = useAppStore();
  const [showRegister, setShowRegister] = useState(false);
  const showBottomNav = !location.pathname.startsWith('/record/') && location.pathname !== '/family';

  useEffect(() => {
    if (isLoggedIn) {
      fetchRecords();
    }
  }, [isLoggedIn, fetchRecords]);

  if (showRegister) {
    return <RegisterPage onRegister={() => alert('注册成功！')} onBack={() => setShowRegister(false)} />;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={login} onRegister={() => setShowRegister(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<ArchivePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/record/:id" element={<RecordDetailPage />} />
        <Route path="/family" element={<FamilyManagementPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      {showBottomNav && <BottomNav />}
      <Toast />
    </div>
  );
}

// 从 localStorage 同步读取（避免初始渲染白屏）
// 返回 true 表示需要显示开屏动画
function shouldShowSplash(): boolean {
  try {
    return localStorage.getItem('health_app_splash_v1') !== 'true';
  } catch {
    return true;
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState(shouldShowSplash);
  const [splashKey, setSplashKey] = useState(0);

  const handleSplashComplete = useCallback(() => {
    try {
      localStorage.setItem('health_app_splash_v1', 'true');
    } catch {}
    setShowSplash(false);
  }, []);

  // 强制显示开屏动画（可通过 URL 参数调试）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('splash') === 'force') {
      try {
        localStorage.removeItem('health_app_splash_v1');
      } catch {}
      setShowSplash(true);
      setSplashKey(k => k + 1);
    }
  }, []);

  if (showSplash) {
    return <SplashScreen key={splashKey} onComplete={handleSplashComplete} />;
  }

  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
