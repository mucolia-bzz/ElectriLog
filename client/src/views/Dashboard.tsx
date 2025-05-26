import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const Dashboard: React.FC<{
  readingToday: number;
  currentUsage: number;
}> = ({ readingToday, currentUsage }) => {
  return (
    <section className="p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Zählerstand heute</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{readingToday} kWh</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aktueller Verbrauch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{currentUsage} kWh</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Einspeisung vs. Bezug</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-green-100 flex items-center justify-center text-green-600 font-medium">
              Diagramm
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
