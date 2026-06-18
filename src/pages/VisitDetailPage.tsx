import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { COLORS } from '../constants';
import { HealthRecord } from '../types';

// 格式化日期为中文显示
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

// 简单的就诊记录详情卡片（用于就诊详情页）
function VisitRecordCard({ record, onClick }: { record: HealthRecord; onClick: () => void }) {
  const color = COLORS.record[record.type];

  // 从 notes 提取主诉内容用于显示
  const getSummaryText = () => {
    if (!record.notes) return '';
    const lines = record.notes.split('\n');
    const firstLine = lines.find(l => l.trim().length > 0);
    if (firstLine && firstLine.length > 60) {
      return firstLine.substring(0, 60) + '...';
    }
    return firstLine || record.notes.substring(0, 60);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-100 p-4 mb-3 cursor-pointer hover:shadow-sm transition-all active:scale-[0.99]"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-1 rounded-md text-xs font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {record.type}
          </span>
          <span className="text-sm font-semibold text-gray-800">{record.diagnosis}</span>
        </div>
        <span className="text-sm font-bold text-orange-600">¥{record.cost}</span>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed mb-3">
        {getSummaryText()}
      </p>

      {record.imageUrl && (
        <div className="mb-3">
          <img
            src={record.imageUrl}
            alt={record.diagnosis}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>点击查看完整报告 →</span>
        {record.starred && (
          <span className="text-yellow-500 font-bold">★ 重要</span>
        )}
      </div>
    </div>
  );
}

export default function VisitDetailPage() {
  const { visitId } = useParams<{ visitId: string }>();
  const navigate = useNavigate();
  const { getRecordsByVisit, records } = useAppStore();

  const [visitRecords, setVisitRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visitId) {
      const visitRecords = getRecordsByVisit(visitId);
      setVisitRecords(visitRecords);
    }
    setLoading(false);
  }, [visitId, getRecordsByVisit, records]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (visitRecords.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">未找到就诊记录</div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回档案
          </button>
        </div>
      </div>
    );
  }

  const firstRecord = visitRecords[0];
  const hospital = firstRecord.hospital;
  const date = firstRecord.date;
  const department = firstRecord.department;
  const totalCost = visitRecords.reduce((sum, r) => sum + r.cost, 0);

  // 找到主要诊断（优先选择病历）
  const mainDiagnosisRecord = visitRecords.find(r => r.type === '病历') || visitRecords[0];
  const mainDiagnosis = mainDiagnosisRecord.diagnosis;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* 顶部导航栏 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            <span className="text-sm font-medium">返回</span>
          </button>
          <h1 className="text-base font-bold text-gray-800">就诊详情</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 就诊信息头部 */}
      <div className="max-w-4xl mx-auto px-4 mt-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white shadow-lg">
          <div className="mb-3">
            <h2 className="text-xl font-bold mb-1">{mainDiagnosis}</h2>
            <p className="text-blue-100 text-sm">{department}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-1 3 1 3-1 3 1z"/>
              </svg>
              <span>{hospital}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>{formatDate(date)}</span>
            </div>
          </div>

          <div className="border-t border-blue-500/30 mt-4 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-blue-100 text-sm">包含项目</span>
              <span className="text-lg font-bold">{visitRecords.length} 项</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-blue-100 text-sm">本次就诊费用</span>
              <span className="text-lg font-bold">¥{totalCost}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 就诊项目列表 */}
      <div className="max-w-4xl mx-auto px-4 mt-5">
        <h3 className="text-base font-bold text-gray-800 mb-3">检查/检验项目</h3>
        {visitRecords.map(record => (
          <VisitRecordCard
            key={record.id}
            record={record}
            onClick={() => navigate(`/record/${record.id}`)}
          />
        ))}
      </div>

      {/* 底部操作区 */}
      <div className="max-w-4xl mx-auto px-4 mt-6 mb-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span>记录ID</span>
            <span className="font-mono">{visitId}</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors font-medium text-sm"
          >
            返回档案列表
          </button>
        </div>
      </div>
    </div>
  );
}
