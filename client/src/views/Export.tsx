// src/views/Export.tsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FileJson, Archive } from 'lucide-react';
import { api } from '@/api/client';
import JSZip from 'jszip';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const CONSUMPTION_SENSOR = 'ID742'; // Verbrauch
const METER_SENSOR = 'ID735'; // Einspeisung

interface LastExports {
  consumption: Date | null;
  meter: Date | null;
  all: Date | null;
}

export const Export: React.FC = () => {
  const [lastExport, setLastExport] = useState<LastExports>({
    consumption: null,
    meter: null,
    all: null,
  });

  // CSV Export helper
  async function downloadCsv(sensorId: string, key: 'consumption' | 'meter') {
    try {
      const response = await api.get(`/export/csv/${sensorId}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${sensorId}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success('CSV-Export erfolgreich!');
      setLastExport(prev => ({ ...prev, [key]: new Date() }));
    } catch (err) {
      console.error('CSV export failed:', err);
      toast.error('CSV-Export fehlgeschlagen');
    }
  }

  // JSON Export helper
  async function downloadJson(sensorId: string, key: 'consumption' | 'meter') {
    try {
      const response = await api.get(`/export/json/${sensorId}`);
      const data = response.data;
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${sensorId}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success('JSON-Export erfolgreich!');
      setLastExport(prev => ({ ...prev, [key]: new Date() }));
    } catch (err) {
      console.error('JSON export failed:', err);
      toast.error('JSON-Export fehlgeschlagen');
    }
  }

  // Bulk ZIP Export
  async function downloadAll() {
    try {
      const zip = new JSZip();

      // Verbrauch CSV + JSON
      const [csvCons, jsonCons] = await Promise.all([
        api.get(`/export/csv/${CONSUMPTION_SENSOR}`, { responseType: 'blob' }),
        api.get(`/export/json/${CONSUMPTION_SENSOR}`),
      ]);
      zip.file(`${CONSUMPTION_SENSOR}.csv`, csvCons.data);
      zip.file(
        `${CONSUMPTION_SENSOR}.json`,
        JSON.stringify(jsonCons.data, null, 2)
      );

      // Einspeisung CSV + JSON
      const [csvMet, jsonMet] = await Promise.all([
        api.get(`/export/csv/${METER_SENSOR}`, { responseType: 'blob' }),
        api.get(`/export/json/${METER_SENSOR}`),
      ]);
      zip.file(`${METER_SENSOR}.csv`, csvMet.data);
      zip.file(`${METER_SENSOR}.json`, JSON.stringify(jsonMet.data, null, 2));

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `all-exports.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success('Alle Exporte erfolgreich!');
      setLastExport({
        consumption: new Date(),
        meter: new Date(),
        all: new Date(),
      });
    } catch (err) {
      console.error('Bulk export failed:', err);
      toast.error('Bulk-Export fehlgeschlagen');
    }
  }

  const formatStamp = (d: Date) =>
    d.toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    });

  return (
    <>
      <Toaster position="top-center" />

      <section className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Daten exportieren
          </h2>
          <Button
            onClick={downloadAll}
            className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            <Archive className="w-5 h-5 text-white" />
            <span className="text-white">Alles exportieren</span>
          </Button>
        </div>
        {lastExport.all && (
          <p className="mb-4 text-sm text-gray-600 dark:text-zinc-400">
            Zuletzt alles exportiert: {formatStamp(lastExport.all)}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Verbrauch */}
          <Card className="dark:bg-zinc-950 shadow-lg dark:shadow-none dark:ring-1 dark:ring-zinc-800">
            <CardHeader>
              <CardTitle>Verbrauch</CardTitle>
              <CardDescription>
                CSV oder JSON deiner Verbrauchsdaten herunterladen
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => downloadCsv(CONSUMPTION_SENSOR, 'consumption')}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black"
              >
                <FileText className="w-5 h-5" />
                <span>CSV</span>
              </Button>
              <Button
                onClick={() => downloadJson(CONSUMPTION_SENSOR, 'consumption')}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black"
              >
                <FileJson className="w-5 h-5" />
                <span>JSON</span>
              </Button>
            </CardContent>
            {lastExport.consumption && (
              <CardContent className="pt-2 pb-4">
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  Zuletzt exportiert: {formatStamp(lastExport.consumption)}
                </p>
              </CardContent>
            )}
          </Card>

          {/* Einspeisung */}
          <Card className="dark:bg-zinc-950 shadow-lg dark:shadow-none dark:ring-1 dark:ring-zinc-800">
            <CardHeader>
              <CardTitle>Einspeisung</CardTitle>
              <CardDescription>
                CSV oder JSON deiner Einspeisungsdaten herunterladen
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => downloadCsv(METER_SENSOR, 'meter')}
                className="flex-1 flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-green-300"
              >
                <FileText className="w-5 h-5" />
                <span>CSV</span>
              </Button>
              <Button
                onClick={() => downloadJson(METER_SENSOR, 'meter')}
                className="flex-1 flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-green-300"
              >
                <FileJson className="w-5 h-5" />
                <span>JSON</span>
              </Button>
            </CardContent>
            {lastExport.meter && (
              <CardContent className="pt-2 pb-4">
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  Zuletzt exportiert: {formatStamp(lastExport.meter)}
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </section>
    </>
  );
};
