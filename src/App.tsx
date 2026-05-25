import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import CommunityPage from "@/pages/CommunityPage";
import PostDetailPage from "@/pages/PostDetailPage";
import HelpPage from "@/pages/HelpPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import ActivityDetailPage from "@/pages/ActivityDetailPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/:id" element={<PostDetailPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/help/:id" element={<ServiceDetailPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:id" element={<ActivityDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
