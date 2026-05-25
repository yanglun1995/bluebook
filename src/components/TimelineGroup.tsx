import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { HealthRecord } from '../types';
import { RecordCard } from './RecordCard';

interface TimelineGroupProps {
  yearMonth: string;
  records: HealthRecord[];
  onToggleStar: (id: string) => void;
  onRecordClick: (record: HealthRecord) => void;
}

export const TimelineGroup: React.FC<TimelineGroupProps> = ({
  yearMonth,
  records,
  onToggleStar,
  onRecordClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 mb-3 text-gray-700 font-semibold hover:text-green-600 transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        <span>{yearMonth}</span>
        <span className="text-gray-400 text-sm font-normal">({records.length})</span>
      </button>

      {isExpanded && (
        <div className="space-y-3 pl-6">
          {records.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onToggleStar={onToggleStar}
              onClick={() => onRecordClick(record)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
