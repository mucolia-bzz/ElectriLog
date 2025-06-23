// src/components/ConsumptionSection.tsx
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
import { useConsumptionData } from '@/api/useConsumptionData';
import { useMeterData } from '@/api/useMeterData';

const CONSUMPTION_SENSOR = 'ID742'; // Bezug as “consumption”
const METER_SENSOR = 'ID735'; // Einspeisung as meter-read

export const Consumption: React.FC = () => {
  const {
    data: consResp,
    isLoading: consLoad,
    error: consErr,
  } = useConsumptionData(CONSUMPTION_SENSOR);
  const {
    data: meterResp,
    isLoading: meterLoad,
    error: meterErr,
  } = useMeterData(METER_SENSOR);

  if (consLoad || meterLoad) return <div>Loading charts…</div>;
  if (consErr || meterErr)
    return (
      <div className="text-red-600">
        Error: {consErr?.message || meterErr?.message}
      </div>
    );

  // Prepare data arrays
  const consData =
    consResp?.data.map(d => ({
      date: new Date(+d.ts * 1000),
      value: d.value,
    })) ?? [];
  const meterData =
    meterResp?.data.map(d => ({
      date: new Date(+d.ts * 1000),
      value: d.value,
    })) ?? [];

  const formatDate = (d: Date) =>
    d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  const chartStyle = 'bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6';

  return (
    <section className={chartStyle}>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Verbrauch & Zählerstände
      </h2>
      <div className="space-y-6">
        {/* Consumption over time */}
        <div>
          <h3 className="mb-2 text-lg text-gray-700 dark:text-gray-300">
            Verbrauch über Zeit
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={consData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                type="number"
                domain={['dataMin', 'dataMax']}
                tickCount={consData.length}
                scale="time"
              />
              <YAxis />
              <Tooltip
                labelFormatter={v => new Date(v as number).toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="value"
                name="Verbrauch"
                unit=" kWh"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Meter reading over time */}
        <div>
          <h3 className="mb-2 text-lg text-gray-700 dark:text-gray-300">
            Zählerstand über Zeit
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={meterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                type="number"
                domain={['auto', 'auto']}
                scale="time"
              />
              <YAxis />
              <Tooltip
                labelFormatter={v => new Date(v as number).toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="value"
                name="Zählerstand"
                unit=" kWh"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
