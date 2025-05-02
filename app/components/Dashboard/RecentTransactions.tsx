'use client';

import { FiArrowDown, FiArrowUp, FiMoreVertical } from 'react-icons/fi';

// Mock data for recent transactions
const transactions = [
  {
    id: 'TX123456',
    type: 'deposit',
    amount: 250.00,
    currency: 'USD',
    sender: 'John Smith',
    recipient: 'Wallet (USD)',
    date: '2023-05-01T10:30:00',
    status: 'completed'
  },
  {
    id: 'TX123457',
    type: 'withdrawal',
    amount: 100.00,
    currency: 'USD',
    sender: 'Wallet (USD)',
    recipient: 'Bank Account',
    date: '2023-05-01T11:45:00',
    status: 'completed'
  },
  {
    id: 'TX123458',
    type: 'transfer',
    amount: 75.50,
    currency: 'USD',
    sender: 'Wallet (USD)',
    recipient: 'Alice Johnson',
    date: '2023-05-01T14:20:00',
    status: 'completed'
  },
  {
    id: 'TX123459',
    type: 'airtime',
    amount: 10.00,
    currency: 'USD',
    sender: 'Wallet (USD)',
    recipient: '+1234567890',
    date: '2023-05-01T16:05:00',
    status: 'completed'
  },
  {
    id: 'TX123460',
    type: 'merchant',
    amount: 45.75,
    currency: 'USD',
    sender: 'Wallet (USD)',
    recipient: 'SuperMart Store',
    date: '2023-05-01T17:30:00',
    status: 'pending'
  }
];

const RecentTransactions = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'failed':
        return '#F44336';
      default:
        return '#555';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <FiArrowDown size={16} color="#4CAF50" />;
      case 'withdrawal':
        return <FiArrowUp size={16} color="#F44336" />;
      case 'transfer':
        return <FiArrowUp size={16} color="#2D64D8" />;
      default:
        return <FiArrowUp size={16} color="#555" />;
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>Recent Transactions</h3>
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#2D64D8',
          cursor: 'pointer',
          fontWeight: 500,
        }}>
          View All
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#777', fontWeight: 500 }}>Transaction ID</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#777', fontWeight: 500 }}>Type</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#777', fontWeight: 500 }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#777', fontWeight: 500 }}>Sender</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#777', fontWeight: 500 }}>Recipient</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#777', fontWeight: 500 }}>Date</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#777', fontWeight: 500 }}>Status</th>
              <th style={{ textAlign: 'center', padding: '12px 16px', color: '#777', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '16px', color: '#333', fontWeight: 500 }}>{transaction.id}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '8px' }}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <span style={{ textTransform: 'capitalize' }}>{transaction.type}</span>
                  </div>
                </td>
                <td style={{ padding: '16px', fontWeight: 500 }}>
                  {transaction.currency} {transaction.amount.toFixed(2)}
                </td>
                <td style={{ padding: '16px' }}>{transaction.sender}</td>
                <td style={{ padding: '16px' }}>{transaction.recipient}</td>
                <td style={{ padding: '16px' }}>{formatDate(transaction.date)}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    textTransform: 'capitalize',
                    backgroundColor: `${getStatusColor(transaction.status)}20`,
                    color: getStatusColor(transaction.status),
                  }}>
                    {transaction.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                  }}>
                    <FiMoreVertical size={18} color="#777" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions; 