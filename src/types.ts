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
  visitId: string; // 就诊ID - 同一次就诊的所有记录共用此ID
}

export interface FilterState {
  member: string;
  type: string;
  timeRange: string;
  searchQuery: string;
}

// 一次就诊（包含多条记录）
export interface Visit {
  visitId: string;
  member: string;
  date: string;
  hospital: string;
  department: string;
  records: HealthRecord[];
  totalCost: number;
  mainDiagnosis: string; // 主要诊断（就诊标题）
}
