import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import { useAppStore } from './store';

function AppContent() {
  const location = useLocation();
  const { initDB, isLoggedIn, login } = useAppStore();
  const [showRegister, setShowRegister] = useState(false);
  const showBottomNav = !location.pathname.startsWith('/record/') && location.pathname !== '/family';

  useEffect(() => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    if (savedLoginStatus === 'true') {
      useAppStore.getState().login();
    }
  }, []);

  useEffect(() => {
    initDB();
  }, [initDB]);

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

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
