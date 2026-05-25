import React from 'react';
import { Star } from 'lucide-react';
import { HealthRecord } from '../types';
import { COLORS } from '../constants';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface RecordCardProps {
  record: HealthRecord;
  onToggleStar: (id: string) => void;
  onClick: () => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({ record, onToggleStar, onClick }) => {
  const color = COLORS.record[record.type] || COLORS.record['其他'];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}20`, color }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          </div>
          <div className="w-0.5 h-full bg-gray-100 mt-2" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  {record.type}
                </span>
                <span className="text-gray-500 text-sm">{record.date}</span>
              </div>
              <h3 className="text-gray-900 font-semibold text-base mb-1 truncate">
                {record.diagnosis}
              </h3>
              <p className="text-gray-500 text-sm truncate">
                {record.hospital} · {record.city}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(record.id);
              }}
              className="p-1.5 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0"
            >
              <Star
                className={cn(
                  'w-5 h-5 transition-all duration-200',
                  record.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 group-hover:text-gray-400'
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
