import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <Navbar activePage={activePage} onPageChange={setActivePage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
