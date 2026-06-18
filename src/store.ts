import { create } from 'zustand';
import { HealthRecord, FilterState } from './types';
import { INITIAL_RECORDS } from './constants';

const DATA_VERSION = 'v6_20260618_full_records';

interface FamilyMember {
  id: string;
  name: string;
  avatar?: string;
  relationship?: string;
}

const loadRecords = (): HealthRecord[] => {
  try {
    const savedVersion = localStorage.getItem('health_records_version');
    const saved = localStorage.getItem('health_records');
    
    // 1. 强制清除旧版本缓存，强制使用最新数据
    if (savedVersion !== DATA_VERSION) {
      try {
        localStorage.removeItem('health_records');
        localStorage.removeItem('health_records_version');
      } catch (e) {}
      const initial = [...INITIAL_RECORDS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      try {
        localStorage.setItem('health_records', JSON.stringify(initial));
        localStorage.setItem('health_records_version', DATA_VERSION);
      } catch (e) {}
      return initial;
    }
    
    // 2. 即使版本匹配，也要校验数据完整性
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // 检查每条记录是否有 notes（病历摘要）字段
        const hasValidNotes = parsed.every((r: HealthRecord) => r.notes && r.notes.length > 50);
        if (hasValidNotes) {
          return parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        // 数据不完整，使用新数据
        try {
          localStorage.removeItem('health_records');
        } catch (e) {}
      }
    }
  } catch (e) {
    console.error('Failed to load saved records', e);
  }
  
  const initial = [...INITIAL_RECORDS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  try {
    localStorage.setItem('health_records', JSON.stringify(initial));
    localStorage.setItem('health_records_version', DATA_VERSION);
  } catch (e) {}
  return initial;
};

const saveRecords = (records: HealthRecord[]) => {
  try {
    localStorage.setItem('health_records', JSON.stringify(records));
    localStorage.setItem('health_records_version', DATA_VERSION);
  } catch (e) {
    console.error('Failed to save records', e);
  }
};

const loadLoginStatus = (): boolean => {
  try {
    const saved = localStorage.getItem('isLoggedIn');
    return saved === 'true';
  } catch (e) {
    console.error('Failed to load login status', e);
  }
  return false;
};

const loadAppLockPassword = (): string | null => {
  try {
    return localStorage.getItem('appLockPassword') || null;
  } catch (e) {
    return null;
  }
};

interface AppState {
  isLoggedIn: boolean;
  records: HealthRecord[];
  filters: FilterState;
  loading: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  appLockEnabled: boolean;
  appLockPassword: string | null;
  familyMembers: FamilyMember[];
  fetchRecords: () => Promise<void>;
  addRecord: (record: HealthRecord) => Promise<void>;
  updateRecord: (record: HealthRecord) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
  toggleStar: (id: string) => Promise<void>;
  resetData: () => Promise<void>;
  setFilters: (filters: Partial<FilterState>) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  toggleAppLock: () => void;
  setAppLockPassword: (password: string) => void;
  clearAppLockPassword: () => void;
  verifyAppLockPassword: (password: string) => boolean;
  getFilteredRecords: () => HealthRecord[];
  addFamilyMember: (name: string, relationship?: string) => void;
  deleteFamilyMember: (id: string) => void;
  login: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  records: loadRecords(),
  filters: {
    member: '全部',
    type: '全部',
    timeRange: '全部时间',
    searchQuery: '',
  },
  loading: false,
  toast: null,
  appLockEnabled: false,
  appLockPassword: loadAppLockPassword(),
  isLoggedIn: loadLoginStatus(),
  familyMembers: [
    { id: '1', name: '李明', relationship: '本人' }
  ],

  login: () => {
    set({ isLoggedIn: true });
    localStorage.setItem('isLoggedIn', 'true');
  },

  logout: () => {
    set({ isLoggedIn: false });
    localStorage.setItem('isLoggedIn', 'false');
  },

  fetchRecords: async () => {
    set({ loading: true });
    await new Promise(r => setTimeout(r, 100));
    set({ records: loadRecords(), loading: false });
  },

  addRecord: async (record) => {
    const newRecords = [record, ...get().records];
    saveRecords(newRecords);
    set({ records: newRecords });
    get().showToast('记录添加成功', 'success');
  },

  updateRecord: async (record) => {
    const newRecords = get().records.map(r => r.id === record.id ? record : r);
    saveRecords(newRecords);
    set({ records: newRecords });
    get().showToast('记录更新成功', 'success');
  },

  deleteRecord: async (id) => {
    const newRecords = get().records.filter(r => r.id !== id);
    saveRecords(newRecords);
    set({ records: newRecords });
    get().showToast('记录删除成功', 'success');
  },

  toggleStar: async (id) => {
    const newRecords = get().records.map(r => 
      r.id === id ? { ...r, starred: !r.starred } : r
    );
    saveRecords(newRecords);
    set({ records: newRecords });
  },

  resetData: async () => {
    const records = [...INITIAL_RECORDS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    saveRecords(records);
    set({ records });
    get().showToast('数据已重置', 'success');
  },

  setFilters: (filters: Partial<FilterState>) => {
    set(state => ({
      filters: { ...state.filters, ...filters }
    }));
  },

  showToast: (message, type) => {
    set({ toast: { message, type } });
    setTimeout(() => get().hideToast(), 3000);
  },

  hideToast: () => {
    set({ toast: null });
  },

  toggleAppLock: () => {
    const currentState = get();
    if (!currentState.appLockPassword) {
      get().showToast('请先设置应用锁密码', 'error');
      return;
    }
    set(state => ({ appLockEnabled: !state.appLockEnabled }));
    const newState = get();
    get().showToast(newState.appLockEnabled ? '应用锁已开启' : '应用锁已关闭', 'success');
  },

  setAppLockPassword: (password: string) => {
    set({ appLockPassword: password });
    localStorage.setItem('appLockPassword', password);
    get().showToast('应用锁密码设置成功', 'success');
  },

  clearAppLockPassword: () => {
    set({ appLockPassword: null, appLockEnabled: false });
    localStorage.removeItem('appLockPassword');
    get().showToast('应用锁密码已清除', 'success');
  },

  verifyAppLockPassword: (password: string): boolean => {
    return get().appLockPassword === password;
  },

  addFamilyMember: (name: string, relationship?: string) => {
    set(state => ({
      familyMembers: [
        ...state.familyMembers,
        {
          id: Date.now().toString(),
          name,
          relationship: relationship || '家人'
        }
      ]
    }));
    get().showToast('家庭成员添加成功', 'success');
  },

  deleteFamilyMember: (id: string) => {
    set(state => ({
      familyMembers: state.familyMembers.filter(member => member.id !== id)
    }));
    get().showToast('家庭成员已删除', 'success');
  },

  getFilteredRecords: () => {
    const { records, filters } = get();
    return records.filter(record => {
      const matchesMember = filters.member === '全部' || record.member === filters.member;
      const matchesType = filters.type === '全部' || record.type === filters.type;
      const matchesSearch = !filters.searchQuery ||
        record.diagnosis.includes(filters.searchQuery) ||
        record.hospital.includes(filters.searchQuery) ||
        record.notes.includes(filters.searchQuery);

      let matchesTime = true;
      if (filters.timeRange !== '全部时间') {
        const now = new Date();
        const recordDate = new Date(record.date);
        if (filters.timeRange === '近3个月') {
          const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
          matchesTime = recordDate >= threeMonthsAgo;
        } else if (filters.timeRange === '近半年') {
          const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
          matchesTime = recordDate >= sixMonthsAgo;
        } else if (filters.timeRange === '近1年') {
          const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
          matchesTime = recordDate >= oneYearAgo;
        }
      }

      return matchesMember && matchesType && matchesSearch && matchesTime;
    });
  },
}));
