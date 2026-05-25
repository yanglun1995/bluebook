import { useState } from 'react';
import { Search, MapPin, Plus, X, Clock } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import ServiceCard from '../components/ServiceCard';

export default function HelpPage() {
  const { services, addService, currentUser } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('全部');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    type: '遛狗',
    price_min: 0,
    price_max: 0,
    location: '',
    image_url: '',
  });

  const serviceTypes = ['全部', '遛狗', '喂养', '美容', '寄养'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === '全部' || service.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateService = () => {
    if (!currentUser) {
      alert('请先登录');
      return;
    }
    const service = {
      id: Date.now().toString(),
      user_id: currentUser.id,
      title: newService.title,
      description: newService.description,
      type: newService.type,
      price_min: newService.price_min,
      price_max: newService.price_max,
      location: newService.location,
      image_url: newService.image_url || 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20pet%20service%20cute&image_size=landscape_4_3',
      rating: 0,
      review_count: 0,
      created_at: new Date().toISOString(),
      user: currentUser,
    };
    addService(service);
    setNewService({
      title: '',
      description: '',
      type: '遛狗',
      price_min: 0,
      price_max: 0,
      location: '',
      image_url: '',
    });
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg-color)]">
      <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">宠物互助服务</h1>
          <p className="text-white/80">找到身边可靠的宠物服务，让爱宠得到最好的照顾</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {serviceTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'bg-white text-[var(--text-secondary)] hover:bg-[var(--primary-color)]/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            发布服务
          </button>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
          <input
            type="text"
            placeholder="搜索服务..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🐶</div>
            <p className="text-[var(--text-secondary)]">暂无相关服务</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">发布服务</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">服务名称</label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  placeholder="例如：专业遛狗服务"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">服务类型</label>
                <select
                  value={newService.type}
                  onChange={(e) => setNewService({ ...newService, type: e.target.value })}
                  className="input-field"
                >
                  {serviceTypes.filter(t => t !== '全部').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">服务描述</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="详细描述您的服务内容..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">最低价格</label>
                  <input
                    type="number"
                    value={newService.price_min}
                    onChange={(e) => setNewService({ ...newService, price_min: Number(e.target.value) })}
                    placeholder="最低价"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">最高价格</label>
                  <input
                    type="number"
                    value={newService.price_max}
                    onChange={(e) => setNewService({ ...newService, price_max: Number(e.target.value) })}
                    placeholder="最高价"
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">服务区域</label>
                <input
                  type="text"
                  value={newService.location}
                  onChange={(e) => setNewService({ ...newService, location: e.target.value })}
                  placeholder="例如：朝阳区"
                  className="input-field"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 border-2 border-[var(--border-color)] rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateService}
                  className="flex-1 btn-primary"
                >
                  发布
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
