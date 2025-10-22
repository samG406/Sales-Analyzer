"use client"

import React, { useState, useEffect, memo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fetchBarChartData } from '../../lib/api';
import type { FilterState, BarChartData } from '../../types/index';

// Format number helper function
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

interface BarChartComponentProps {
  filters?: FilterState;
}

const BarChartComponent = memo(function BarChartComponent({ filters }: BarChartComponentProps) {
  const [data, setData] = useState<BarChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const chartData = await fetchBarChartData(filters);
        setData(chartData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  if (loading) return <div className="flex items-center justify-center h-64">Loading bar chart data...</div>;
  if (error) return <div className="flex items-center justify-center h-64 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-lg">
      <h2 className="text-lg font-bold text-black mb-4">Total Sales</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="0" />
          <XAxis 
            dataKey="category" 
            stroke="#000000"
            fontSize={12}
            tick={{ fill: '#000000' }}
          />
          <YAxis
            tickFormatter={tick => formatNumber(tick)}
            domain={[0, 'dataMax']} 
            stroke="#000000"
            fontSize={12}
            tick={{ fill: '#000000' }}
          />
          <Tooltip
            cursor={{ fill: "#f0f0f0" }}
            formatter={(value: number) => [formatNumber(value), 'Total Amount']}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Bar
            dataKey="totalAmount"
            name="Total Amount"
            fill="#000000"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default BarChartComponent;