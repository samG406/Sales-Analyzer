import React, { useState, useEffect } from 'react';
import type { FilterPanelProps, FilterState } from '../../types/index';
import { useDebounce} from '../../hooks/useDebounce';

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange }) => {
  console.log('FilterPanel rendered!', new Date().toISOString());
  const [filters, setFilters] = useState<FilterState>({
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: '',
  });


  const debouncedFilters = useDebounce<FilterState>(filters, 300);

  useEffect(() => {
    console.log('Debounced filters changed:', debouncedFilters);
    const validationErrors = validateFilters(debouncedFilters);
    setErrors(validationErrors);

    if( validationErrors.length === 0) {
      onFiltersChange(debouncedFilters);
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilters]);


  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const validationErrors = validateFilters(newFilters);
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      onFiltersChange(newFilters);
    }
  };

  const clearFilters = (): void => {
    const clearedFilters: FilterState = {
      minAmount: '',
      maxAmount: '',
      startDate: '',
      endDate: ''
    };
    setFilters(clearedFilters);
    setErrors([]);
    onFiltersChange(clearedFilters);
  };
  const [errors, setErrors] = useState<string[]>([]);

  const validateFilters = (filters: FilterState): string[] => {
    const errors: string[] = [];

    if (filters.minAmount && filters.maxAmount) {
      if (Number(filters.minAmount) > Number(filters.maxAmount)) {
        errors.push('Min Amount must be less than Max Amount');
      }
    }

    if (filters.startDate && filters.endDate) {
      if (new Date(filters.startDate) > new Date(filters.endDate)) {
        errors.push('Start Date must be before End Date');
      }
    }
    return errors;
  }


  return (
    <div className="w-full mx-auto mb-8 px-4">
      <h3 className="text-2xl font-bold mb-4 text-center sm:text-left">Set Sales Threshold</h3>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 flex-wrap px-4 py-4 border-2 border-gray-300 rounded-lg bg-[#f9f9f9]">
        {/* Sales Amount Range - Only Filter */}
        <div className="w-full sm:w-auto">
          <fieldset>
            <legend className="block mb-2 font-bold text-sm">
              Sales Amount Range:
            </legend>
            <div className="flex gap-2 w-full">
              <label htmlFor="minAmount" className="sr-only">Minimum Amount</label>
              <input
                id="minAmount"
                type="number"
                placeholder="Min Amount"
                value={filters.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                className="p-2 rounded border border-gray-300 flex-1 min-w-0 text-sm"
                aria-label="Minimum sales amount"
                aria-describedby={errors.length > 0 ? "errorMessages" : undefined}
              />
              <label htmlFor="maxAmount" className="sr-only">Maximum Amount</label>
              <input
                id="maxAmount"
                type="number"
                placeholder="Max Amount"
                value={filters.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                className="p-2 rounded border border-gray-300 flex-1 min-w-0 text-sm"
                aria-label="Maximum sales amount"
                aria-describedby={errors.length > 0 ? "errorMessages" : undefined}
              />
            </div>
          </fieldset>
        </div>

        {/* Date Range */}
        <div className="w-full sm:w-auto">
          <fieldset>
            <legend className="block mb-2 font-bold text-sm">
              Date Range:
            </legend>
            <div className="flex gap-2 w-full">
              <label htmlFor="startDate" className="sr-only">Start Date</label>
              <input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="p-2 rounded border border-gray-300 flex-1 min-w-0 text-sm"
                min="2023-01-13"
                max="2024-01-01"
                aria-label="Start date for sales data filter"
                aria-describedby={errors.length > 0 ? "errorMessages" : undefined}
              />
              <label htmlFor="endDate" className="sr-only">End Date</label>
              <input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="p-2 rounded border border-gray-300 flex-1 min-w-0 text-sm"
                min="2023-01-13"
                max="2024-01-01"
                aria-label="End date for sales data filter"
                aria-describedby={errors.length > 0 ? "errorMessages" : undefined}
              />
            </div>
          </fieldset>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end w-full sm:w-auto">
          <button
            onClick={clearFilters}
            className="px-5 py-2 bg-gray-600 text-white border-none rounded cursor-pointer text-sm font-bold hover:bg-gray-900 transition-colors"
            aria-label="Clear all filters and reset form"
          >
            Clear 
          </button>
        </div>
      </div>
      {errors.length > 0 && (
      <div 
        id="errorMessages"
        className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        role="alert"
        aria-live="polite"
      >
        <h4 className="font-bold mb-2">Please fix the following errors:</h4>
        <ul className="list-disc list-inside">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
};

export default FilterPanel;