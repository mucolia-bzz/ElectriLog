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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useMeterData } from '@/api/useMeterData';

const FEED_IN_ID = 'ID735';
const DRAW_ID = 'ID742';

export const Dashboard: React.FC = () => {
  const {
    data: feedResponse,
    isLoading: feedLoading,
    error: feedError,
  } = useMeterData(FEED_IN_ID);
  const {
    data: drawResponse,
    isLoading: drawLoading,
    error: drawError,
  } = useMeterData(DRAW_ID);

  // Derive metrics
  const readingToday = useMemo(() => {
    const arr = feedResponse?.data;
    return arr && arr.length > 0 ? arr[arr.length - 1].value : 0;
  }, [feedResponse]);

  const currentUsage = useMemo(() => {
    const arr = drawResponse?.data;
    return arr && arr.length > 1
      ? Number(
          (arr[arr.length - 1].value - arr[arr.length - 2].value).toFixed(2)
        )
      : 0;
  }, [drawResponse]);

  // Merge by timestamp for chart (numeric date)
  const chartData = useMemo(() => {
    if (!feedResponse?.data || !drawResponse?.data) return [];
    const map: Record<
      number,
      { date: number; einspeisung: number; bezug: number }
    > = {};

    feedResponse.data.forEach(({ ts, value }) => {
      const t = Number(ts) * 1000;
      if (!map[t]) map[t] = { date: t, einspeisung: 0, bezug: 0 };
      map[t].einspeisung = value;
    });
    drawResponse.data.forEach(({ ts, value }) => {
      const t = Number(ts) * 1000;
      if (!map[t]) map[t] = { date: t, einspeisung: 0, bezug: 0 };
      map[t].bezug = value;
    });

    return Object.values(map).sort((a, b) => a.date - b.date);
  }, [feedResponse, drawResponse]);

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });

  if (feedLoading || drawLoading)
    return <div className="p-6">Loading dashboard…</div>;
  if (feedError || drawError)
    return <div className="text-red-600 p-6">Error loading data.</div>;

  return (
    <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-gray-700 dark:text-gray-300 text-center">
              Zählerstand heute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              {readingToday} kWh
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-gray-700 dark:text-gray-300 text-center">
              Aktueller Verbrauch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              {currentUsage} kWh
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base text-gray-700 dark:text-gray-300 text-center">
              Einspeisung vs. Bezug
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    type="number"
                    scale="time"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={formatDate}
                    tickCount={chartData.length}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={value =>
                      new Date(Number(value)).toLocaleString()
                    }
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
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                Keine Diagrammdaten verfügbar.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
