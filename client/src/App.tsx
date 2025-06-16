import './App.css';
import { Consumption } from './views/Consumption';
import { Dashboard } from './views/Dashboard';
import { Export } from './views/Export';
import { Header } from './views/Header';
import { Upload } from './views/Upload';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 space-y-6">
          <Dashboard readingToday={12304.43} currentUsage={10.3} />
          <Upload />
          <Consumption />
          <Export />
        </div>
      </main>
    </div>
  );
}

export default App;
