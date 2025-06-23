import React from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/api/client';

const CONSUMPTION_SENSOR = 'ID742'; // Bezug
const METER_SENSOR = 'ID735'; // Einspeisung

/**
 * Triggers a download of JSON export for given sensorId
 */
async function downloadJson(sensorId: string) {
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
  } catch (err) {
    console.error('JSON export failed:', err);
  }
}

/**
 * Triggers a download of CSV export for given sensorId
 */
async function downloadCsv(sensorId: string) {
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
  } catch (err) {
    console.error('CSV export failed:', err);
  }
}

export const Export: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Export
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          onClick={() => downloadCsv(CONSUMPTION_SENSOR)}
        >
          CSV (Verbrauch) exportieren
        </Button>
        <Button
          className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          onClick={() => downloadJson(CONSUMPTION_SENSOR)}
        >
          JSON (Verbrauch) speichern
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={() => downloadCsv(METER_SENSOR)}
        >
          CSV (Einspeisung) exportieren
        </Button>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={() => downloadJson(METER_SENSOR)}
        >
          JSON (Einspeisung) speichern
        </Button>
      </div>
    </section>
  );
};
