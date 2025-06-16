import './App.css';
import React, { useState } from 'react';
import { Consumption } from './views/Consumption';
import { Dashboard } from './views/Dashboard';
import { Export } from './views/Export';
import { Header } from './views/Header';
import { Upload } from './views/Upload';
import { Tabs, TabsContent } from '@/components/ui/tabs';

const App: React.FC = () => {
  const [tab, setTab] = useState<string>('dashboard');

  return (
    <Tabs
      value={tab}
      onValueChange={(value: string) => setTab(value as string)}
      className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <Header setTab={setTab} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <TabsContent value="dashboard">
            <Dashboard readingToday={12345.6} currentUsage={1.2} />
          </TabsContent>

          <TabsContent value="upload">
            <Upload />
          </TabsContent>

          <TabsContent value="consumption">
            <Consumption />
          </TabsContent>

          <TabsContent value="export">
            <Export />
          </TabsContent>
        </div>
      </main>
    </Tabs>
  );
};

export default App;
