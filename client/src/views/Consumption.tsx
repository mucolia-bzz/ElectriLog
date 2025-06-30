import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { useConsumptionData } from '@/api/useConsumptionData';
import { useMeterData } from '@/api/useMeterData';
import { formatDate2DigitYear, formatDateFullYear } from '@/lib/date';

const CONSUMPTION_SENSOR = 'ID742';
const METER_SENSOR = 'ID735';

export const Consumption: React.FC = () => {
  const {
    data: consResp,
    isLoading: consLoading,
    error: consError,
  } = useConsumptionData(CONSUMPTION_SENSOR);
  const {
    data: meterResp,
    isLoading: meterLoading,
    error: meterError,
  } = useMeterData(METER_SENSOR);

  const consData = useMemo(
    () =>
      consResp?.data.map(d => ({
        date: Number(d.ts) * 1000,
        value: d.value,
      })) ?? [],
    [consResp]
  );

  const meterData = useMemo(
    () =>
      meterResp?.data.map(d => ({
        date: Number(d.ts) * 1000,
        value: d.value,
      })) ?? [],
    [meterResp]
  );

  if (consLoading || meterLoading) {
    return (
      <section className="mt-6">
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-800 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-1/3 mb-6" />
          <div className="space-y-6">
            <div className="h-48 bg-gray-200 dark:bg-zinc-700 rounded" />
            <div className="h-48 bg-gray-200 dark:bg-zinc-700 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (consError || meterError) {
    return (
      <div className="text-center py-10 text-red-600">
        Fehler beim Laden: {consError?.message || meterError?.message}
      </div>
    );
  }

  return (
    <section className="mt-6">
      <Card className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg dark:shadow-none border border-gray-200 dark:border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Verbrauch & Zählerstände
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Verbrauch über Zeit */}
          <Card className="bg-white dark:bg-zinc-950 rounded-lg shadow-lg dark:shadow-none border border-gray-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                Verbrauch über Zeit
              </CardTitle>
            </CardHeader>
            <CardContent>
              {consData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={consData}>
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
                    />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111',
                        borderColor: '#333',
                      }}
                      labelStyle={{ color: '#f9fafb', fontSize: 12 }}
                      itemStyle={{ color: '#f9fafb' }}
                      labelFormatter={formatDateFullYear}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Verbrauch"
                      stroke="#3B82F6"
                      dot={false}
                      activeDot={{ r: 6, fill: '#3B82F6' }}
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
                <div className="text-center text-gray-500 dark:text-zinc-400 py-10">
                  Keine Daten verfügbar.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Zählerstand über Zeit */}
          <Card className="bg-white dark:bg-zinc-950 rounded-lg shadow-lg dark:shadow-none border border-gray-200 dark:border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                Zählerstand über Zeit
              </CardTitle>
            </CardHeader>
            <CardContent>
              {meterData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={meterData}>
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
                    />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111',
                        borderColor: '#333',
                      }}
                      labelStyle={{ color: '#f9fafb', fontSize: 12 }}
                      itemStyle={{ color: '#f9fafb' }}
                      labelFormatter={formatDateFullYear}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Zählerstand"
                      stroke="#F59E0B"
                      dot={false}
                      activeDot={{ r: 6, fill: '#F59E0B' }}
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
                <div className="text-center text-gray-500 dark:text-zinc-400 py-10">
                  Keine Daten verfügbar.
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </section>
  );
};
