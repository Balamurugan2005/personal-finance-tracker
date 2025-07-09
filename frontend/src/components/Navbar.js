import React from 'react';

const Navbar = ({ activePage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💰' },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Finance Tracker</h1>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activePage === item.id
                  ? 'bg-blue-700 text-white'
                  : 'hover:bg-blue-500'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 