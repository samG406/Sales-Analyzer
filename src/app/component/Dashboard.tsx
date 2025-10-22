import React, { useState, useCallback } from "react";
import FilterPanel from "./FilterPanel";
import type { FilterState } from "../../types/index";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./card"
import PieChartComponent from "./PieChartComponent";
import LineChartComponent from "./LineChartComponent";
import BarChartComponent from "./BarChartComponent";

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: ''
  });

  const handleFiltersChange = useCallback((newFilters: FilterState): void => {
    setFilters(newFilters);
  }, []);

  const [isActiveChart, setActiveChart] = useState('line');
  const showLineChart = () => setActiveChart('line');
  const showBarChart = () => setActiveChart('bar');
  const showPieChart = () => setActiveChart('pie');

  return (
    <main className='w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 mb-4'>
      <h1 className="text-4xl font-semibold text-center mb-8">
        Sales Visualization Dashboard
      </h1>
      
      {/* Filter Panel */}
      <div className="mb-8">
        <FilterPanel onFiltersChange={handleFiltersChange} />
      </div>

      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-4 mb-6" role="tablist" aria-label="Chart type selection">
        <button 
          onClick={showLineChart} 
          className="rounded-2xl font-semibold w-24 border-2 bg-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white p-2"
          aria-label="Switch to line chart view"
          aria-pressed={isActiveChart === 'line'}
        >
          Line Chart
        </button>
        <button 
          onClick={showBarChart} 
          className="rounded-2xl font-semibold w-24 border-2 bg-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white p-2"
          aria-label="Switch to bar chart view"
          aria-pressed={isActiveChart === 'bar'}
        >
          Bar Chart
        </button>
        <button 
          onClick={showPieChart} 
          className="rounded-2xl font-semibold w-24 border-2 bg-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white p-2"
          aria-label="Switch to pie chart view"
          aria-pressed={isActiveChart === 'pie'}
        >
          Pie Chart
        </button>
      </div>
      
      
      {/* Charts in Card Layout */}
      {( isActiveChart == 'line' &&
        <div>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <LineChartComponent filters={filters} />
          </CardContent>
        </Card>
        </div>
      )}

      {( isActiveChart == 'bar' &&
        <div>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <BarChartComponent filters={filters} />
          </CardContent>
        </Card>
        </div>
        )}

      {( isActiveChart == "pie" &&
        <div>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Sales by Product Category</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <PieChartComponent filters={filters} />
          </CardContent>
        </Card>
        </div>
      )}

      </main>
  );
};

export default Dashboard;