import React from 'react';

export const Consumption: React.FC = () => (
  <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
      Verbrauch & Zählerstände
    </h2>
    <div className="space-y-6">
      <div className="h-40 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-medium">
        Verbrauchsdiagramm
      </div>
      <div className="h-40 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-medium">
        Zählerstand-Diagramm
      </div>
    </div>
  </section>
);
