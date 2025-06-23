// src/components/ConsumptionPreview.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { testConsumptionData, testMeterData } from '@/data/test';

function toSeries(resp: typeof testConsumptionData) {
  return resp.data.map(d => ({ date: Number(d.ts) * 1000, value: d.value }));
}

export const ConsumptionPreview: React.FC = () => {
  const consSeries = toSeries(testConsumptionData);
  const meterSeries = toSeries(testMeterData);
  const fmtDate = (d: number) =>
    new Date(d).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Verbrauch & Zählerstände (Test Data)
      </h2>

      <div className="mb-8" style={{ height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={consSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              type="number"
              scale="time"
              tickFormatter={fmtDate}
              domain={['dataMin', 'dataMax']}
              tickCount={consSeries.length}
            />
            <YAxis />
            <Tooltip
              labelFormatter={v => new Date(v as number).toLocaleString()}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="Verbrauch"
              stroke="#3B82F6"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={meterSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              tickCount={consSeries.length}
              tickFormatter={fmtDate}
            />
            <YAxis />
            <Tooltip
              labelFormatter={v => new Date(v as number).toLocaleString()}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="Zählerstand"
              stroke="#F59E0B"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
