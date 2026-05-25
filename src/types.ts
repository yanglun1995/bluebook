export type RecordType = '病历' | '检查报告' | '检验结果' | '其他';

export interface HealthRecord {
  id: string;
  member: string;
  type: RecordType;
  diagnosis: string;
  hospital: string;
  city: string;
  date: string;
  department: string;
  notes: string;
  imageUrl: string;
  starred: boolean;
  cost: number;
  createdAt: string;
}

export interface FilterState {
  member: string;
  type: string;
  timeRange: string;
  searchQuery: string;
}
