import React from 'react';
import { HealthRecord } from '../types';
import { COLORS } from '../constants';
import { FileText, Calendar, MapPin, Hospital, User, DollarSign } from 'lucide-react';

interface MedicalReportProps {
  record: HealthRecord;
}

export const MedicalReport: React.FC<MedicalReportProps> = ({ record }) => {
  const typeColor = COLORS.record[record.type] || COLORS.record['其他'];

  // 根据记录类型生成不同的报告样式
  const getReportContent = () => {
    switch (record.type) {
      case '病历':
        return <MedicalCaseReport record={record} />;
      case '检查报告':
        return <ExaminationReport record={record} />;
      case '检验结果':
        return <LabTestReport record={record} />;
      default:
        return <DefaultReport record={record} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {getReportContent()}
    </div>
  );
};

// 病历报告
const MedicalCaseReport: React.FC<{ record: HealthRecord }> = ({ record }) => {
  return (
    <div className="bg-white">
      {/* 报告头部 */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{record.hospital}</h2>
            <p className="text-blue-600 font-medium">门诊病历</p>
            <p className="text-sm text-gray-500">{record.department}</p>
          </div>
        </div>
      </div>

      {/* 报告内容 */}
      <div className="p-6 space-y-6">
        {/* 患者信息 */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            患者信息
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">姓名：</span>
              <span className="text-gray-900 font-medium">{record.member}</span>
            </div>
            <div>
              <span className="text-gray-500">就诊日期：</span>
              <span className="text-gray-900 font-medium">{record.date}</span>
            </div>
          </div>
        </div>

        {/* 诊断 */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">诊断</h3>
          <p className="text-blue-900 font-medium text-lg">{record.diagnosis}</p>
        </div>

        {/* 病历详情 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">病历摘要</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {record.notes}
            </p>
          </div>
        </div>

        {/* 费用信息 */}
        <div className="flex items-center justify-between bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">本次费用</span>
          </div>
          <span className="text-2xl font-bold text-green-600">¥{record.cost.toLocaleString()}</span>
        </div>
      </div>

      {/* 报告底部 */}
      <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
        <p className="text-xs text-gray-500">
          — 本报告由系统生成，仅供演示 —
        </p>
      </div>
    </div>
  );
};

// 检查报告
const ExaminationReport: React.FC<{ record: HealthRecord }> = ({ record }) => {
  return (
    <div className="bg-white">
      {/* 报告头部 */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 border-b border-green-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <FileText className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{record.hospital}</h2>
            <p className="text-green-600 font-medium">医学影像检查报告</p>
            <p className="text-sm text-gray-500">{record.department}</p>
          </div>
        </div>
      </div>

      {/* 报告内容 */}
      <div className="p-6 space-y-6">
        {/* 检查信息 */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">检查信息</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">患者：</span>
              <span className="text-gray-900 font-medium">{record.member}</span>
            </div>
            <div>
              <span className="text-gray-500">检查日期：</span>
              <span className="text-gray-900 font-medium">{record.date}</span>
            </div>
            <div>
              <span className="text-gray-500">检查科室：</span>
              <span className="text-gray-900 font-medium">{record.department}</span>
            </div>
            <div>
              <span className="text-gray-500">检查部位：</span>
              <span className="text-gray-900 font-medium">
                {record.diagnosis.includes('腰椎') ? '腰椎' : 
                 record.diagnosis.includes('肺') ? '胸部' : '相关部位'}
              </span>
            </div>
          </div>
        </div>

        {/* 模拟影像区域 */}
        <div className="bg-gray-100 rounded-lg p-8 border border-gray-300">
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-sm">医学影像预览区域</p>
              <p className="text-xs mt-1">（演示数据，非真实影像）</p>
            </div>
          </div>
        </div>

        {/* 诊断结果 */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="text-sm font-semibold text-green-800 mb-2">诊断意见</h3>
          <p className="text-green-900 font-medium text-lg">{record.diagnosis}</p>
          <p className="text-green-800 mt-2 text-sm">{record.notes}</p>
        </div>

        {/* 费用信息 */}
        <div className="flex items-center justify-between bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">检查费用</span>
          </div>
          <span className="text-2xl font-bold text-green-600">¥{record.cost.toLocaleString()}</span>
        </div>
      </div>

      {/* 报告底部 */}
      <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
        <p className="text-xs text-gray-500">
          — 本报告由系统生成，仅供演示 —
        </p>
      </div>
    </div>
  );
};

// 检验报告
const LabTestReport: React.FC<{ record: HealthRecord }> = ({ record }) => {
  // 模拟检验项目
  const mockLabItems = [
    { name: '白细胞计数 (WBC)', value: '12.5', unit: '×10⁹/L', range: '4.0-10.0', abnormal: true },
    { name: '中性粒细胞 (NEUT)', value: '85.2', unit: '%', range: '50.0-70.0', abnormal: true },
    { name: '红细胞计数 (RBC)', value: '4.8', unit: '×10¹²/L', range: '4.3-5.8', abnormal: false },
    { name: '血红蛋白 (HGB)', value: '145', unit: 'g/L', range: '130-175', abnormal: false },
    { name: '血小板计数 (PLT)', value: '235', unit: '×10⁹/L', range: '125-350', abnormal: false },
    { name: 'C反应蛋白 (CRP)', value: '45.8', unit: 'mg/L', range: '0-10', abnormal: true },
  ];

  return (
    <div className="bg-white">
      {/* 报告头部 */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 border-b border-orange-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <FileText className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{record.hospital}</h2>
            <p className="text-orange-600 font-medium">临床检验报告单</p>
            <p className="text-sm text-gray-500">{record.department}</p>
          </div>
        </div>
      </div>

      {/* 报告内容 */}
      <div className="p-6 space-y-6">
        {/* 患者信息 */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            检验信息
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">姓名：</span>
              <span className="text-gray-900 font-medium">{record.member}</span>
            </div>
            <div>
              <span className="text-gray-500">检验日期：</span>
              <span className="text-gray-900 font-medium">{record.date}</span>
            </div>
            <div>
              <span className="text-gray-500">检验科室：</span>
              <span className="text-gray-900 font-medium">{record.department}</span>
            </div>
            <div>
              <span className="text-gray-500">检验类型：</span>
              <span className="text-gray-900 font-medium">血液/生化</span>
            </div>
          </div>
        </div>

        {/* 临床诊断 */}
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <h3 className="text-sm font-semibold text-orange-800 mb-2">临床诊断</h3>
          <p className="text-orange-900 font-medium text-lg">{record.diagnosis}</p>
        </div>

        {/* 检验结果表格 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">检验结果</h3>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">项目名称</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">结果</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">单位</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">参考范围</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockLabItems.map((item, index) => (
                  <tr key={index} className={item.abnormal ? 'bg-red-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                    <td className={`px-4 py-3 text-sm text-right font-medium ${item.abnormal ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.value}
                      {item.abnormal && <span className="ml-1 text-xs font-bold">↑</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.unit}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* 结果异常（↑高于参考值，↓低于参考值）</p>
        </div>

        {/* 备注 */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">备注</h3>
          <p className="text-gray-700 text-sm">{record.notes}</p>
        </div>

        {/* 费用信息 */}
        <div className="flex items-center justify-between bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">检验费用</span>
          </div>
          <span className="text-2xl font-bold text-green-600">¥{record.cost.toLocaleString()}</span>
        </div>
      </div>

      {/* 报告底部 */}
      <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
        <p className="text-xs text-gray-500">
          — 本报告由系统生成，仅供演示 —
        </p>
      </div>
    </div>
  );
};

// 默认报告
const DefaultReport: React.FC<{ record: HealthRecord }> = ({ record }) => {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{record.hospital}</h2>
            <p className="text-gray-600 font-medium">{record.type}</p>
            <p className="text-sm text-gray-500">{record.department}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">基本信息</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">姓名：</span>
              <span className="text-gray-900 font-medium">{record.member}</span>
            </div>
            <div>
              <span className="text-gray-500">日期：</span>
              <span className="text-gray-900 font-medium">{record.date}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">记录内容</h3>
          <p className="text-gray-900 font-medium text-lg">{record.diagnosis}</p>
          <p className="text-gray-700 mt-2">{record.notes}</p>
        </div>

        <div className="flex items-center justify-between bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">费用</span>
          </div>
          <span className="text-2xl font-bold text-green-600">¥{record.cost.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-200 p-4 text-center">
        <p className="text-xs text-gray-500">
          — 本报告由系统生成，仅供演示 —
        </p>
      </div>
    </div>
  );
};
