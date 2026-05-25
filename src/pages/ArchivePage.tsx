import React, { useState, useMemo } from 'react';
import { Search, Download, MoreVertical, X, ChevronDown, ChevronRight, Star, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { TimelineGroup } from '../components/TimelineGroup';
import { HealthRecord } from '../types';
import { RECORD_TYPES, TIME_RANGES } from '../constants';

export const ArchivePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    getFilteredRecords,
    filters,
    setFilters,
    toggleStar,
    showToast,
    familyMembers,
  } = useAppStore();
  
  const [showSearch, setShowSearch] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  
  const members = useMemo(() => {
    return ['全部', ...familyMembers.map(m => m.name)];
  }, [familyMembers]);

  const filteredRecords = getFilteredRecords();

  const groupedRecords = useMemo(() => {
    const groups: { [key: string]: HealthRecord[] } = {};
    filteredRecords.forEach((record) => {
      const date = new Date(record.date);
      const key = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(record);
    });
    return groups;
  }, [filteredRecords]);

  const handleExport = () => {
    showToast('演示版：导出为PDF/Excel', 'info');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '病历': return 'bg-blue-500';
      case '检查报告': return 'bg-green-500';
      case '检验结果': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-20">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              健康档案
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all shadow-sm"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleExport}
                className="p-2.5 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all shadow-sm"
              >
                <Download className="w-5 h-5 text-green-600" />
              </button>
              <button
                onClick={() => showToast('更多功能', 'info')}
                className="p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all shadow-sm"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {showSearch && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ searchQuery: e.target.value })}
                placeholder="搜索疾病、医院、备注..."
                className="w-full pl-12 pr-10 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters({ searchQuery: '' })}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">成员筛选</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {members.map((member) => (
                <button
                  key={member}
                  onClick={() => setFilters({ member })}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    filters.member === member
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {member}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">类型筛选</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {RECORD_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilters({ type })}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    filters.type === type
                      ? type === '病历'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : type === '检查报告'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                        : type === '检验结果'
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg shadow-gray-500/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">时间筛选</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <span className="text-gray-700">{filters.timeRange}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showTimeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                  {TIME_RANGES.map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setFilters({ timeRange: range });
                        setShowTimeDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        filters.timeRange === range ? 'text-green-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedRecords).map(([period, records]) => (
            <div key={period} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-800">{period}</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {records.length} 条记录
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {records.map((record) => (
                  <button
                    key={record.id}
                    onClick={() => navigate(`/record/${record.id}`)}
                    className="w-full p-5 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-white transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${getTypeColor(record.type)} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <span className="text-white text-lg font-bold">
                          {record.type === '病历' ? '📋' : record.type === '检查报告' ? '🏥' : record.type === '检验结果' ? '🧪' : '📄'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium text-white mb-2 ${
                              record.type === '病历' ? 'bg-blue-500' : 
                              record.type === '检查报告' ? 'bg-green-500' : 
                              record.type === '检验结果' ? 'bg-orange-500' : 'bg-gray-500'
                            }`}>
                              {record.type}
                            </span>
                            <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                              {record.diagnosis}
                            </h3>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(record.id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                record.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {record.hospital}
                          </span>
                          <span>·</span>
                          <span>{record.city}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          {record.date}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(groupedRecords).length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">未找到健康记录</p>
            <p className="text-gray-400 text-sm mt-1">尝试调整筛选条件</p>
          </div>
        )}
      </main>
    </div>
  );
};
