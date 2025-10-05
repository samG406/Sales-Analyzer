"use client"

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fetchFilteredData } from '../../../api/app';
import type { FilterState, BarChartData } from '../../types/index';

// Format number helper function
const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

interface BarChartComponentProps {
  filters?: FilterState;
}

export function BarChartComponent({ filters }: BarChartComponentProps) {
  const [data, setData] = useState<BarChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
  
        // 1) Get rows that match current filters (no category filter needed)
        const raw = await fetchFilteredData({
          minAmount: filters?.minAmount ?? '',
          maxAmount: filters?.maxAmount ?? '',
          startDate: filters?.startDate ?? '',
          endDate: filters?.endDate ?? '',
          category: '' // keep empty
        });
  
        // 2) Group by Product Category and sum totals and quantity
        const grouped = raw.reduce<Record<string, BarChartData>>((acc, item) => {
          const category = item['Product Category'];
          if (!acc[category]) {
            acc[category] = { category, totalAmount: 0, quantity: 0 };
          }
          acc[category].totalAmount += item['Total Amount'];
          acc[category].quantity += item.Quantity;
          return acc;
        }, {});
  
        // 3) Convert to array for Recharts
        const chartData = Object.values(grouped);
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
            formatter={(value: number) => [formatNumber(value), 'New Customers']}
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
            name="New Customers"
            fill="#000000"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;