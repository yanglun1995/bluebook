import React, { useState, useMemo } from 'react';
import { Calendar, Users, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAppStore } from '../store';
import { STAT_TIME_RANGES } from '../constants';

const DISEASES = [
  '急性咽炎',
  '急性支气管炎',
  '右下肺炎',
  '细菌性感冒',
  '智齿冠周炎',
  '慢性浅表性胃炎',
  '急性荨麻疹',
  '急性上呼吸道感染',
  '腰椎间盘突出（L4-L5）',
  '过敏性鼻炎',
  '急性肠胃炎（细菌感染）',
  '急性扁桃体炎',
  '高脂血症',
  '甲状腺功能亢进',
  '脂肪肝',
  '幽门螺旋杆菌感染',
];

export const StatisticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { records } = useAppStore();
  const [timeRange, setTimeRange] = useState(STAT_TIME_RANGES[0]);
  const [member, setMember] = useState('李明');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const filterRecordsByTimeRange = (range: string, allRecords: typeof records) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    switch (range) {
      case '全部时间':
        return allRecords;
      case '2026年':
        return allRecords.filter(r => new Date(r.date).getFullYear() === 2026);
      case '2025年':
        return allRecords.filter(r => new Date(r.date).getFullYear() === 2025);
      case '2020-2025年':
        return allRecords.filter(r => {
          const year = new Date(r.date).getFullYear();
          return year >= 2020 && year <= 2025;
        });
      case '2010-2019年':
        return allRecords.filter(r => {
          const year = new Date(r.date).getFullYear();
          return year >= 2010 && year <= 2019;
        });
      default:
        return allRecords;
    }
  };

  const filteredRecords = useMemo(() => {
    return filterRecordsByTimeRange(timeRange, records);
  }, [timeRange, records]);

  const getYearlyData = () => {
    const yearlyData: { [key: string]: { count: number; cost: number } } = {};
    
    filteredRecords.forEach((record) => {
      const year = new Date(record.date).getFullYear();
      if (!yearlyData[year]) {
        yearlyData[year] = { count: 0, cost: 0 };
      }
      yearlyData[year].count++;
      yearlyData[year].cost += record.cost || 0;
    });

    return Object.entries(yearlyData)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([year, data]) => ({
        year: year.toString(),
        visits: data.count,
        cost: data.cost,
      }));
  };

  const yearlyVisitData = getYearlyData();

  const getDepartmentData = () => {
    const deptCount: { [key: string]: number } = {};
    
    filteredRecords.forEach((record) => {
      const dept = record.department || '其他';
      deptCount[dept] = (deptCount[dept] || 0) + 1;
    });

    const colors = ['#22C55E', '#3B82F6', '#F97316', '#8B5CF6', '#EC4899', '#06B6D4', '#EF4444', '#10B981'];
    
    return Object.entries(deptCount).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  };

  const departmentData = getDepartmentData();

  const stats = {
    totalVisits: filteredRecords.length,
    diseaseTypes: new Set(filteredRecords.map((r) => r.diagnosis)).size,
    totalCost: filteredRecords.reduce((sum, r) => sum + (r.cost || 0), 0),
    departments: new Set(filteredRecords.map((r) => r.department)).size,
    hospitals: new Set(filteredRecords.map((r) => r.hospital)).size,
    cities: new Set(filteredRecords.map((r) => r.city)).size,
  };

  const statItems = [
    { label: '累计就诊', value: stats.totalVisits, unit: '次', icon: '🏥' },
    { label: '患病种类', value: stats.diseaseTypes, unit: '种', icon: '📋' },
    { label: '历史花费', value: stats.totalCost, unit: '元', icon: '💰' },
    { label: '就诊科室', value: stats.departments, unit: '个', icon: '🏛️' },
    { label: '覆盖医院', value: stats.hospitals, unit: '家', icon: '🏪' },
    { label: '足迹城市', value: stats.cities, unit: '个', icon: '🌆' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <p className="text-sm font-bold text-gray-900 mb-2">{label}年</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-green-600 font-semibold">{payload[0]?.value || 0}次</span>
              <span className="text-gray-500 ml-1">就诊</span>
            </p>
            <p className="text-sm">
              <span className="text-blue-600 font-semibold">¥{payload[1]?.value || 0}</span>
              <span className="text-gray-500 ml-1">花费</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-20">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              健康统计
            </h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowTimeDropdown(!showTimeDropdown);
                    setShowMemberDropdown(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl text-sm text-gray-700 hover:from-gray-100 hover:to-gray-200 transition-all shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{timeRange}</span>
                </button>
                {showTimeDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[140px] z-50">
                    {STAT_TIME_RANGES.map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setTimeRange(range);
                          setShowTimeDropdown(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm ${
                          timeRange === range ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-700'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowMemberDropdown(!showMemberDropdown);
                    setShowTimeDropdown(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl text-sm text-green-700 hover:from-green-100 hover:to-emerald-100 transition-all shadow-sm"
                >
                  <Users className="w-4 h-4" />
                  <span>{member}</span>
                </button>
                {showMemberDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[120px] z-50">
                    <button
                      onClick={() => {
                        setMember('李明');
                        setShowMemberDropdown(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors text-sm ${
                        member === '李明' ? 'text-green-600 font-semibold bg-green-50' : 'text-gray-700'
                      }`}
                    >
                      李明
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {statItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {item.value.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">年度就诊趋势</h3>
              <p className="text-xs text-gray-500 mt-1">{timeRange}就诊次数统计</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">就诊次数</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">医疗花费</span>
              </div>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyVisitData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F3F4F6" />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  tickMargin={8}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  tickFormatter={(value) => `${value}次`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  domain={[0, 'auto']}
                  tickFormatter={(value) => `¥${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="visits"
                  stroke="#22C55E"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                  dot={{ fill: '#22C55E', strokeWidth: 3, r: 5, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#22C55E', stroke: '#fff', strokeWidth: 3 }}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCost)"
                  dot={{ fill: '#3B82F6', strokeWidth: 3, r: 4, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="text-gray-500 text-xs mb-1">总就诊</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {stats.totalVisits}<span className="text-sm font-normal text-gray-500 ml-1">次</span>
              </div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="text-gray-500 text-xs mb-1">总花费</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ¥{stats.totalCost.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="text-gray-500 text-xs mb-1">平均每年</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {yearlyVisitData.length > 0 ? (stats.totalVisits / yearlyVisitData.length).toFixed(1) : 0}<span className="text-sm font-normal text-gray-500 ml-1">次</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">就诊科室分布</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {departmentData.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">
                  {item.name} {item.value}次
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {timeRange}健康综合报告
          </h3>
          <div className="text-gray-600 text-sm space-y-2 mb-4">
            <p>• {timeRange}共就诊{stats.totalVisits}次</p>
            <p>• 医疗总花费{stats.totalCost.toLocaleString()}元</p>
            <p>• 涉及{stats.departments}个科室的就诊记录</p>
            <p>• 在{stats.hospitals}家医院就诊</p>
          </div>
          <button
            onClick={() => setShowReport(true)}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            查看完整报告
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">患病记录列表</h3>
          <div className="space-y-2">
            {DISEASES.map((disease, index) => {
              const count = filteredRecords.filter(r => r.diagnosis === disease).length;
              if (count === 0) return null;
              return (
                <button
                  key={index}
                  onClick={() => navigate('/')}
                  className="w-full text-left px-4 py-3 bg-gradient-to-r from-gray-50 to-white hover:from-green-50 hover:to-white rounded-xl transition-all flex items-center justify-between group"
                >
                  <span className="text-gray-800 group-hover:text-green-600 transition-colors">{disease}</span>
                  <span className="text-gray-400 group-hover:text-green-500 text-sm font-medium">{count}次 →</span>
                </button>
              );
            })}
          </div>
          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>该时间段内暂无就诊记录</p>
            </div>
          )}
        </div>
      </main>

      {showReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">健康综合报告</h2>
                  <p className="text-white/90 text-sm mt-1">{timeRange}健康数据分析</p>
                </div>
                <button
                  onClick={() => setShowReport(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📊</span> 总体概览
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-gray-500 text-sm">累计就诊</div>
                    <div className="text-3xl font-bold text-green-600">{stats.totalVisits}次</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-gray-500 text-sm">医疗总花费</div>
                    <div className="text-3xl font-bold text-blue-600">¥{stats.totalCost.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏥</span> 就诊分布
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-700">就诊科室</span>
                    <span className="font-bold text-gray-900">{stats.departments}个</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-700">覆盖医院</span>
                    <span className="font-bold text-gray-900">{stats.hospitals}家</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-700">足迹城市</span>
                    <span className="font-bold text-gray-900">{stats.cities}个</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span> 健康提示
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    呼吸系统疾病高发，建议加强锻炼，提高免疫力
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    建议定期体检，早发现、早治疗
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    注意季节变化，预防感冒和呼吸道疾病
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span> 健康建议
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    保持规律作息，充足睡眠
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    均衡饮食，多吃蔬菜水果
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    适量运动，增强体质
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    定期复查，关注健康指标
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
