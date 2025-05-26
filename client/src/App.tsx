import "./App.css";
import { Dashboard } from "./views/Dashboard";
import { Header } from "./views/Header";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Dashboard readingToday={12404.43} currentUsage={12.2} />
          {/* Additional sections (upload area, Verbrauch & Zählerstände) go here */}
        </div>
      </main>
    </div>
  );
}

export default App;
