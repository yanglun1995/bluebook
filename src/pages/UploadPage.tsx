import React, { useState } from 'react';
import { X, Camera, Image as ImageIcon, ChevronDown, ChevronUp, Plus, MapPin, Stethoscope, Calendar, User, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { RecordType } from '../types';



export const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord, showToast } = useAppStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    member: '李明',
    type: '检查报告' as RecordType,
    hospital: '珠海市人民医院',
    date: new Date().toISOString().split('T')[0],
    department: '呼吸内科',
    city: '广东珠海',
    diagnosis: '右下肺炎',
    notes: '',
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnimating(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTimeout(() => {
          setSelectedImage(event.target?.result as string);
          setIsAnimating(false);
        }, 300);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newRecord = {
      id: Date.now().toString(),
      ...formData,
      imageUrl: selectedImage || 'https://picsum.photos/id/110/600/800',
      starred: false,
      cost: 0,
      createdAt: new Date().toISOString(),
    };

    addRecord(newRecord);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <header className="relative bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="group p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              添加健康记录
            </h1>
            <div className="w-9" />
          </div>
        </div>
      </header>

      <main className="relative max-w-lg mx-auto px-4 py-8 space-y-6">
        {!selectedImage ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg mb-4 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">上传您的健康记录</h2>
              <p className="text-gray-500 text-sm">支持批量上传，最多9张图片</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => showToast('演示版：请从相册选择', 'info')}
                className="group relative bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Camera className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-gray-700 font-semibold">拍照</p>
                  <p className="text-xs text-gray-400 mt-1">即时上传</p>
                </div>
              </button>

              <label className="group relative bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ImageIcon className="w-8 h-8 text-teal-600" />
                  </div>
                  <p className="text-gray-700 font-semibold">从相册选择</p>
                  <p className="text-xs text-gray-400 mt-1">选择已有图片</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-gray-700 font-bold mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-600" />
                快捷添加
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: '💊', label: '用药记录' },
                  { icon: '📅', label: '复诊提醒' },
                  { icon: '💉', label: '疫苗接种' },
                  { icon: '📝', label: '其他' },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => showToast('演示功能', 'info')}
                    className="group flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">智能识别技术</h3>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    上传图片后，我们的AI系统将自动识别并填写健康信息，省时省力
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative group">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-56 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      移除图片
                    </button>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      已上传
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-800 font-bold">自动识别结果</h3>
                    <p className="text-xs text-gray-400">AI智能提取信息</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">已完成</span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                    归属成员
                  </label>
                  <input
                    type="text"
                    value={formData.member}
                    onChange={(e) => setFormData({ ...formData, member: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-300 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                    记录类型
                  </label>
                  <div className="relative">
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as RecordType })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-300 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="病历">病历</option>
                      <option value="检查报告">检查报告</option>
                      <option value="检验结果">检验结果</option>
                      <option value="其他">其他</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                    就诊医院
                  </label>
                  <input
                    type="text"
                    value={formData.hospital}
                    onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-300 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                    就诊日期
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-300 transition-all duration-300"
                  />
                </div>

                <button
                  onClick={() => setShowMoreInfo(!showMoreInfo)}
                  className="w-full flex items-center justify-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-200 py-3 hover:bg-emerald-50 rounded-xl -mx-4 px-4"
                >
                  {showMoreInfo ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  {showMoreInfo ? '收起更多信息' : '更多信息'}
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${showMoreInfo ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-5 pt-2">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Stethoscope className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                        就诊科室
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-300 transition-all duration-300"
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                        就诊城市
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-300 transition-all duration-300"
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                        诊断名称
                      </label>
                      <input
                        type="text"
                        value={formData.diagnosis}
                        onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-300 transition-all duration-300"
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                        备注
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-emerald-300 transition-all duration-300 resize-none"
                        placeholder="添加更多备注信息..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                保存健康记录
              </div>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
