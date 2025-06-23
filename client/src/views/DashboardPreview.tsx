import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { testFeedInData, testDrawData } from '@/data/test';

// Merge feed-in and draw by timestamp (ms) into numeric chart data
function mergeFeedAndDraw() {
  type Point = { date: number; einspeisung: number; bezug: number };
  const map = new Map<number, Point>();

  testFeedInData.data.forEach(({ ts, value }) => {
    const t = Number(ts) * 1000;
    map.set(t, { date: t, einspeisung: value, bezug: 0 });
  });
  testDrawData.data.forEach(({ ts, value }) => {
    const t = Number(ts) * 1000;
    const rec = map.get(t) || { date: t, einspeisung: 0, bezug: 0 };
    rec.bezug = value;
    map.set(t, rec);
  });

  return Array.from(map.values()).sort((a, b) => a.date - b.date);
}

export const DashboardPreview: React.FC = () => {
  const chartData = useMemo(() => mergeFeedAndDraw(), []);
  const fmtDate = (d: number) =>
    new Date(d).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });

  return (
    <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Einspeisung vs. Bezug (Test Data)
      </h2>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              type="number"
              domain={['dataMin', 'dataMax']}
              scale="time"
              tickFormatter={fmtDate}
              tickCount={chartData.length}
            />
            <YAxis />
            <Tooltip
              labelFormatter={v => new Date(v as number).toLocaleString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="einspeisung"
              name="Einspeisung"
              stroke="#10B981"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="bezug"
              name="Bezug"
              stroke="#EF4444"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
