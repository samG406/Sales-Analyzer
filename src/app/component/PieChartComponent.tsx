import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { fetchPieChartData } from '../../lib/api';
import type { FilterState, PieChartData } from '../../types/index';


interface PieChartComponentProps {
  filters?: FilterState;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ filters }) => {
  const [data, setData] = useState<PieChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const chartData = await fetchPieChartData();
        setData(chartData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters?.minAmount, filters?.maxAmount, filters?.startDate, filters?.endDate, filters?.category]);

  if (loading) return <div>Loading pie chart data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-lg">
      <h2 className="text-lg font-bold text-black mb-4">Total Sales</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((Number(percent) || 0) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#000000"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === 'Female' ? '#000000' : '#9ca3af'}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;

