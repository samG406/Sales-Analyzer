"use client"

import React, { useState, useEffect } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fetchFilteredData } from '../../../api/app';
import type { FilterState, LineChartData } from '../../types/index';

// Format currency helper function
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};
const formatDateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

interface LineChartComponentProps {
  filters?: FilterState;
}

export function LineChartComponent({ filters }: LineChartComponentProps) {
  const [data, setData] = useState<LineChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
  
        // 1) Fetch rows that match current filters (category intentionally empty)
        const raw = await fetchFilteredData({
          minAmount: filters?.minAmount ?? '',
          maxAmount: filters?.maxAmount ?? '',
          startDate: filters?.startDate ?? '',
          endDate: filters?.endDate ?? '',
          category: '' // no category filter
        });
  
        // 2) Group by date and sum totals
        const grouped = raw.reduce<Record<string, { date: string; totalAmount: number; transactionCount: number }>>((acc, item) => {
          const date = item.Date;
          if (!acc[date]) acc[date] = { date, totalAmount: 0, transactionCount: 0 };
          acc[date].totalAmount += item["Total Amount"];
          acc[date].transactionCount += 1;
          return acc;
        }, {});
  
        // 3) Sort by date so the x-axis shows the filtered range in order
        const chartData = Object.values(grouped).sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
  
        setData(chartData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [filters]);

  if (loading) return <div className="flex items-center justify-center h-64">Loading line chart data...</div>;
  if (error) return <div className="flex items-center justify-center h-64 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-lg">
      <h2 className="text-lg font-bold text-black mb-4">Total Sales</h2>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="0" />
          <XAxis 
            dataKey="date"
            stroke="#000000"
            fontSize={12}
            tick={{ fill: '#000000' }}
            tickFormatter={(value: string) => formatDateLabel(value)}
          />
          <YAxis
            tickFormatter={tick => formatCurrency(tick)}
            stroke="#000000"
            fontSize={12}
            tick={{ fill: '#000000' }}
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), 'Total Sales']}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Line
            dot={false}
            dataKey="totalAmount"
            type="monotone"
            name="Total Sales"
            stroke="#000000"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;