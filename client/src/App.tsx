import './App.css';
import React, { useState } from 'react';
import { Consumption } from '@/views/Consumption';
import { Dashboard } from '@/views/Dashboard';
import { Export } from '@/views/Export';
import { Header } from '@/views/Header';
import { Upload } from '@/views/Upload';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Tabs, TabsContent } from '@/components/ui/tabs';

const App: React.FC = () => {
  const [tab, setTab] = useState<string>('dashboard');

  return (
    <Tabs
      value={tab}
      onValueChange={(value: string) => setTab(value as string)}
      className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950"
    >
      <Header setTab={setTab} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <TabsContent value="dashboard">
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="upload">
            <ErrorBoundary>
              <Upload />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="consumption">
            <ErrorBoundary>
              <Consumption />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="export">
            <ErrorBoundary>
              <Export />
            </ErrorBoundary>
          </TabsContent>
        </div>
      </main>
    </Tabs>
  );
};

export default App;
