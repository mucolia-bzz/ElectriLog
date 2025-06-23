import React, { useState, useMemo } from 'react';
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

// Time windows with durations in ms
const TIME_WINDOWS: { label: string; value: number | 'all' }[] = [
  { label: '1 Tag', value: 24 * 60 * 60 * 1000 },
  { label: '1 Woche', value: 7 * 24 * 60 * 60 * 1000 },
  { label: '1 Monat', value: 30 * 24 * 60 * 60 * 1000 },
  { label: '3 Monate', value: 90 * 24 * 60 * 60 * 1000 },
  { label: 'Alle', value: 'all' },
];

const CONSUMPTION_SENSOR = 'ID742';
const METER_SENSOR = 'ID735';

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
  const [windowMs, setWindowMs] = useState<number | 'all'>('all');
  const now = Date.now();

  // Build full series with numeric dates
  const fullConsData = useMemo(
    () =>
      consResp?.data.map(d => ({
        date: Number(d.ts) * 1000,
        value: d.value,
      })) ?? [],
    [consResp]
  );
  const fullMeterData = useMemo(
    () =>
      meterResp?.data.map(d => ({
        date: Number(d.ts) * 1000,
        value: d.value,
      })) ?? [],
    [meterResp]
  );

  // Filter by window
  const consData = useMemo(() => {
    if (windowMs === 'all') return fullConsData;
    return fullConsData.filter(d => d.date >= now - windowMs);
  }, [fullConsData, windowMs, now]);
  const meterData = useMemo(() => {
    if (windowMs === 'all') return fullMeterData;
    return fullMeterData.filter(d => d.date >= now - windowMs);
  }, [fullMeterData, windowMs, now]);

  if (consLoad || meterLoad) return <div>Loading charts…</div>;
  if (consErr || meterErr)
    return (
      <div className="text-red-600">
        Error: {consErr?.message || meterErr?.message}
      </div>
    );

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Verbrauch & Zählerstände
      </h2>
      {/* Time window selectors */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TIME_WINDOWS.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => setWindowMs(value)}
            className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none ${
              windowMs === value
                ? 'bg-green-600 text-white dark:bg-green-500'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Consumption Chart */}
      <div className="mb-8">
        <h3 className="mb-2 text-lg text-gray-700 dark:text-gray-300">
          Verbrauch über Zeit
        </h3>
        {consData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={consData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                type="number"
                scale="time"
                domain={['dataMin', 'dataMax']}
                tickFormatter={formatDate}
                tickCount={consData.length}
              />
              <YAxis />
              <Tooltip
                labelFormatter={value =>
                  new Date(value as number).toLocaleString()
                }
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
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            Keine Verbrauchsdaten verfügbar.
          </div>
        )}
      </div>

      {/* Meter Reading Chart */}
      <div>
        <h3 className="mb-2 text-lg text-gray-700 dark:text-gray-300">
          Zählerstand über Zeit
        </h3>
        {meterData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={meterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                type="number"
                scale="time"
                domain={['dataMin', 'dataMax']}
                tickFormatter={formatDate}
                tickCount={meterData.length}
              />
              <YAxis />
              <Tooltip
                labelFormatter={value =>
                  new Date(value as number).toLocaleString()
                }
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
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            Keine Zählerstandsdaten verfügbar.
          </div>
        )}
      </div>
    </section>
  );
};
