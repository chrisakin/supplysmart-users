import { Sidebar } from './components/Sidebar';
import { DataTable } from './components/DataTable';


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={true} onClose={() => {}} />
      <main className="pl-64">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, manage your transactions and activities</p>
          </div>
          <DataTable />
        </div>
      </main>
    </div>
  );
}

export default App;