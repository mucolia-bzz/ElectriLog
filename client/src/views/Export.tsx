import React from 'react';
import { Button } from '@/components/ui/button';

export const Export: React.FC = () => (
  <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
      Export
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
        CSV exportieren
      </Button>
      <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
        JSON speichern
      </Button>
    </div>
  </section>
);
