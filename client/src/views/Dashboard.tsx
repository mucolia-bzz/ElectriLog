import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useMeterData } from '@/api/useMeterData';
import { formatDate2DigitYear, formatDateFullYear } from '@/lib/date';

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

  const chartData = useMemo(() => {
    if (!feedResponse?.data || !drawResponse?.data) return [];
    const map: Record<
      number,
      { date: number; einspeisung: number; bezug: number }
    > = {};

    feedResponse.data.forEach(({ ts, value }) => {
      const t = Number(ts) * 1000;
      map[t] = map[t] || { date: t, einspeisung: 0, bezug: 0 };
      map[t].einspeisung = value;
    });
    drawResponse.data.forEach(({ ts, value }) => {
      const t = Number(ts) * 1000;
      map[t] = map[t] || { date: t, einspeisung: 0, bezug: 0 };
      map[t].bezug = value;
    });

    return Object.values(map).sort((a, b) => a.date - b.date);
  }, [feedResponse, drawResponse]);

  if (feedLoading || drawLoading) {
    return (
      <section className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg mt-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-zinc-700 rounded w-1/3" />
          <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="h-40 bg-gray-200 dark:bg-zinc-700 rounded" />
            <div className="h-40 bg-gray-200 dark:bg-zinc-700 rounded" />
          </div>
          <div className="h-64 bg-gray-200 dark:bg-zinc-700 rounded" />
        </div>
      </section>
    );
  }
  if (feedError || drawError)
    return <div className="text-red-600 p-6">Fehler beim Laden der Daten.</div>;

  return (
    <section className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg dark:shadow-none mt-6 dark:ring-1 dark:ring-zinc-800">
      <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        Dashboard
      </h2>
      <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
        Aktuelle Zählerstände und Verbrauchsvergleich
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Zählerstand Card */}
        <Card className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg border shadow-lg dark:shadow-none dark:ring-1 dark:ring-zinc-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ArrowUp className="w-5 h-5 text-green-500" />
              <CardTitle>Zählerstand heute</CardTitle>
            </div>
            <CardDescription>Letzte Einspeisung abgelesen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {readingToday}
              </span>
              <span className="text-xl font-medium text-gray-500 dark:text-gray-400">
                kWh
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Verbrauch Card */}
        <Card className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg border shadow-lg dark:shadow-none dark:ring-1 dark:ring-zinc-800">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ArrowDown className="w-5 h-5 text-red-500" />
              <CardTitle>Aktueller Verbrauch</CardTitle>
            </div>
            <CardDescription>Momentaner Strombezug</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {currentUsage}
              </span>
              <span className="text-xl font-medium text-gray-500 dark:text-gray-400">
                kWh
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Einspeisung vs. Bezug Chart Card */}
        <Card className="md:col-span-2 bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg border shadow-lg dark:shadow-none dark:ring-1 dark:ring-zinc-800">
          <CardHeader>
            <CardTitle>Einspeisung vs. Bezug</CardTitle>
            <CardDescription>Verlauf der letzten Werte</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-gray-200 dark:stroke-zinc-800"
                  />
                  <XAxis
                    dataKey="date"
                    type="number"
                    scale="time"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={formatDate2DigitYear}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111',
                      borderColor: '#333',
                    }}
                    labelStyle={{ color: '#f9fafb', fontSize: 12 }}
                    itemStyle={{ color: '#f9fafb' }}
                    labelFormatter={formatDateFullYear}
                  />
                  <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                  <Line
                    type="monotone"
                    dataKey="bezug"
                    name="Bezug"
                    stroke="#EF4444"
                    dot={false}
                    unit=" kWh"
                  />
                  <Line
                    type="monotone"
                    dataKey="einspeisung"
                    name="Einspeisung"
                    stroke="#10B981"
                    dot={false}
                    unit=" kWh"
                  />
                  <Brush
                    dataKey="date"
                    height={30}
                    travellerWidth={10}
                    tickFormatter={formatDate2DigitYear}
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
