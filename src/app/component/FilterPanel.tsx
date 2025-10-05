import React, { useState } from 'react';
import type { FilterPanelProps, FilterState } from '../../types/index';

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
    category: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = (): void => {
    const clearedFilters: FilterState = {
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: '',
      category: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="w-full mx-auto mb-8 px-4">
      <h3 className="text-2xl font-bold mb-4 text-center sm:text-left">Set Sales Threshold</h3>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 flex-wrap px-4 py-4 border-2 border-gray-300 rounded-lg bg-[#f9f9f9]">
        {/* Sales Amount Range - Only Filter */}
        <div className="w-full sm:w-auto">
          <label className="block mb-2 font-bold text-sm">
            Sales Amount Range:
          </label>
          <div className="flex gap-2 w-full">
            <input
              type="number"
              placeholder="Min Amount"
              value={filters.minAmount}
              onChange={(e) => handleFilterChange('minAmount', e.target.value)}
              className="p-2 rounded border border-gray-300 flex-1 min-w-0 text-sm"
            />
            <input
              type="number"
              placeholder="Max Amount"
              value={filters.maxAmount}
              onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
              className="p-2 rounded border border-gray-300 flex-1 min-w-0 text-sm"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="w-full sm:w-auto">
          <label className="block mb-2 font-bold text-sm">
            Date Range:
          </label>
          <div className="flex gap-2 w-full">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="p-2 rounded border border-gray-300 flex-1 min-w-0 text-sm"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="p-2 rounded border border-gray-300 flex-1 min-w-0 text-sm"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end w-full sm:w-auto">
          <button
            onClick={clearFilters}
            className="px-5 py-2 bg-gray-600 text-white border-none rounded cursor-pointer text-sm font-bold hover:bg-gray-900 transition-colors"
          >
            Clear 
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;