import { create } from 'zustand';
import { HealthRecord, FilterState } from './types';
import { db } from './utils/db';
import { INITIAL_RECORDS } from './constants';

// 内存存储作为后备方案
let memoryRecords: HealthRecord[] = [...INITIAL_RECORDS];
let useMemoryFallback = false;

// 家庭成员类型
interface FamilyMember {
  id: string;
  name: string;
  avatar?: string;
  relationship?: string;
}

interface AppState {
  isLoggedIn: boolean;
  records: HealthRecord[];
  filters: FilterState;
  loading: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  appLockEnabled: boolean;
  familyMembers: FamilyMember[];
  initDB: () => Promise<void>;
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
  getFilteredRecords: () => HealthRecord[];
  addFamilyMember: (name: string, relationship?: string) => void;
  deleteFamilyMember: (id: string) => void;
  login: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  records: [],
  filters: {
    member: '全部',
    type: '全部',
    timeRange: '全部时间',
    searchQuery: '',
  },
  loading: true,
  toast: null,
  appLockEnabled: false,
  isLoggedIn: false,
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

  initDB: async () => {
    try {
      await db.init();
      await db.initializeWithInitialData();
      await get().fetchRecords();
    } catch (error) {
      console.error('Failed to init DB, using memory fallback:', error);
      useMemoryFallback = true;
      // 使用内存数据
      set({ 
        records: [...memoryRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        loading: false 
      });
    }
  },

  fetchRecords: async () => {
    try {
      set({ loading: true });
      
      if (useMemoryFallback) {
        set({ 
          records: [...memoryRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
          loading: false 
        });
        return;
      }

      const records = await db.getAllRecords();
      set({ records: records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) });
    } catch (error) {
      console.error('Failed to fetch records, using memory fallback:', error);
      useMemoryFallback = true;
      set({ 
        records: [...memoryRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        loading: false 
      });
    } finally {
      set({ loading: false });
    }
  },

  addRecord: async (record) => {
    try {
      if (useMemoryFallback) {
        memoryRecords.push(record);
        set({ 
          records: [...memoryRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
        });
        get().showToast('记录添加成功', 'success');
        return;
      }

      await db.addRecord(record);
      await get().fetchRecords();
      get().showToast('记录添加成功', 'success');
    } catch (error) {
      console.error('Failed to add record:', error);
      get().showToast('添加记录失败', 'error');
    }
  },

  updateRecord: async (record) => {
    try {
      if (useMemoryFallback) {
        memoryRecords = memoryRecords.map(r => r.id === record.id ? record : r);
        set({ 
          records: [...memoryRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
        });
        get().showToast('记录更新成功', 'success');
        return;
      }

      await db.updateRecord(record);
      await get().fetchRecords();
      get().showToast('记录更新成功', 'success');
    } catch (error) {
      console.error('Failed to update record:', error);
      get().showToast('更新记录失败', 'error');
    }
  },

  deleteRecord: async (id) => {
    try {
      if (useMemoryFallback) {
        memoryRecords = memoryRecords.filter(r => r.id !== id);
        set({ 
          records: [...memoryRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
        });
        get().showToast('记录删除成功', 'success');
        return;
      }

      await db.deleteRecord(id);
      await get().fetchRecords();
      get().showToast('记录删除成功', 'success');
    } catch (error) {
      console.error('Failed to delete record:', error);
      get().showToast('删除记录失败', 'error');
    }
  },

  toggleStar: async (id) => {
    try {
      const record = get().records.find(r => r.id === id);
      if (record) {
        const updatedRecord = { ...record, starred: !record.starred };
        
        if (useMemoryFallback) {
          memoryRecords = memoryRecords.map(r => r.id === id ? updatedRecord : r);
          set({ 
            records: [...memoryRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
          });
          return;
        }

        await db.updateRecord(updatedRecord);
        await get().fetchRecords();
      }
    } catch (error) {
      console.error('Failed to toggle star:', error);
      get().showToast('操作失败', 'error');
    }
  },

  resetData: async () => {
    try {
      if (useMemoryFallback) {
        memoryRecords = [...INITIAL_RECORDS];
        set({ 
          records: [...memoryRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
        });
        get().showToast('数据已重置', 'success');
        return;
      }

      await db.resetToInitialData();
      await get().fetchRecords();
      get().showToast('数据已重置', 'success');
    } catch (error) {
      console.error('Failed to reset data:', error);
      get().showToast('重置失败', 'error');
    }
  },

  setFilters: (filters) => {
    set(state => ({ filters: { ...state.filters, ...filters } }));
  },

  showToast: (message, type) => {
    set({ toast: { message, type } });
    setTimeout(() => get().hideToast(), 3000);
  },

  hideToast: () => {
    set({ toast: null });
  },

  toggleAppLock: () => {
    set(state => ({ appLockEnabled: !state.appLockEnabled }));
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
