import React from 'react';
import { HealthRecord } from '../types';
import { COLORS } from '../constants';

interface VisitCardProps {
  visitId: string;
  date: string;
  hospital: string;
  department: string;
  mainDiagnosis: string;
  totalCost: number;
  records: HealthRecord[];
  onClick: () => void;
}

// 格式化日期为中文显示
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

// 根据项目数决定显示的标签
function getRecordTypeBadge(records: HealthRecord[]): { type: string; count: number; }[] {
  const typeMap = new Map<string, number>();
  records.forEach(r => {
    typeMap.set(r.type, (typeMap.get(r.type) || 0) + 1);
  });
  return Array.from(typeMap.entries()).map(([type, count]) => ({ type, count }));
}

export const VisitCard: React.FC<VisitCardProps> = ({
  date,
  hospital,
  department,
  mainDiagnosis,
  totalCost,
  records,
  onClick,
}) => {
  const badges = getRecordTypeBadge(records);

  return (
    <div
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer p-4 mb-3 active:scale-[0.99]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{mainDiagnosis}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-1 3 1 3-1 3 1z"/>
            </svg>
            <span className="truncate max-w-[200px]">{hospital}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>{formatDate(date)}</span>
            <span className="text-gray-300 mx-1">·</span>
            <span>{department}</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-sm font-semibold text-orange-600 mb-2">
            ¥{totalCost}
          </div>
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium whitespace-nowrap">
            查看详情 →
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">本次就诊包含 {records.length} 个项目</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {badges.map(({ type, count }) => (
            <div
              key={type}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium"
              style={{ backgroundColor: `${COLORS.record[type]}15`, color: COLORS.record[type] }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.record[type] }}></span>
              {type} {count > 1 && `×${count}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
