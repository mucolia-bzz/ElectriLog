import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const Dashboard: React.FC<{
  readingToday: number;
  currentUsage: number;
}> = ({ readingToday, currentUsage }) => {
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

        <Card className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-base text-gray-700 dark:text-gray-300 text-center">
              Einspeisung vs. Bezug
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 font-medium">
              Diagramm
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
