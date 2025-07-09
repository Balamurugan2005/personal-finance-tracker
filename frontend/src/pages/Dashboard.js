import React, { useState, useEffect } from 'react';
import { getDashboardSummary } from '../services/api';


const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-red-600">Error loading dashboard</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ${summary.totalIncome.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-red-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">Total Expense</h3>
          <p className="text-2xl font-bold text-red-600">
            ${summary.totalExpense.toFixed(2)}
          </p>
        </div>
        
        <div className={`p-6 rounded-lg ${
          summary.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'
        }`}>
          <h3 className={`text-lg font-semibold ${
            summary.balance >= 0 ? 'text-blue-800' : 'text-orange-800'
          }`}>Balance</h3>
          <p className={`text-2xl font-bold ${
            summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'
          }`}>
            ${summary.balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        {summary.recentTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {summary.recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{transaction.description || 'No description'}</p>
                  <p className="text-sm text-gray-600">
                    {transaction.category?.name} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 