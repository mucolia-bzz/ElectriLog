import './App.css';
import { Consumption } from './views/Consumption';
import { Dashboard } from './views/Dashboard';
import { Export } from './views/Export';
import { Header } from './views/Header';
import { Upload } from './views/Upload';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Dashboard readingToday={12404.43} currentUsage={12.2} />
          <Upload />
          <Consumption />
          <Export />
        </div>
      </main>
    </div>
  );
}

export default App;
