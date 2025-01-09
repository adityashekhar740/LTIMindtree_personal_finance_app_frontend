import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown } from 'lucide-react';

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onRangeSelect: (range: string) => void;
}

export default function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onRangeSelect,
}: DateRangeFilterProps) {
  const [showCustomRange, setShowCustomRange] = useState(false);

  const ranges = [
    { label: 'Last Week', value: 'week' },
    { label: 'Last Month', value: 'month' },
    { label: 'Last Quarter', value: 'quarter' },
    { label: 'Last Year', value: 'year' },
    { label: 'Custom Range', value: 'custom' },
  ];

  return (
    <div className="glass-card rounded-xl p-6 mb-8 relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Filter className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Time Period</h2>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowCustomRange(!showCustomRange)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg text-white hover:bg-blue-500/20 transition-colors"
          >
            <Calendar className="h-5 w-5 text-blue-400" />
            <span>Select Range</span>
            <ChevronDown className="h-4 w-4 text-blue-400" />
          </button>

          {showCustomRange && (
            <div className="absolute right-0 top-full mt-2 w-64 glass-card rounded-lg p-2 z-10">
              {ranges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => {
                    onRangeSelect(range.value);
                    setShowCustomRange(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  {range.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              max={endDate}
              className="pl-10 w-full rounded-lg glass-input py-3 px-4 text-white border-blue-500/20 focus:border-blue-500/40 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              min={startDate}
              className="pl-10 w-full rounded-lg glass-input py-3 px-4 text-white border-blue-500/20 focus:border-blue-500/40 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}