'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FiSearch, FiDownload, FiFilter, FiCalendar, FiArrowDown, FiArrowUp, FiMoreVertical } from 'react-icons/fi';

// Mock transaction data
const transactionsData = [
  {
    id: 'TX10001',
    user: 'John Smith',
    userId: 1,
    type: 'deposit',
    amount: 250.00,
    currency: 'USD',
    fee: 2.50,
    channel: 'Bank Transfer',
    source: 'Commercial Bank',
    destination: 'Wallet (USD)',
    date: '2023-05-01T10:30:00',
    status: 'completed'
  },
  {
    id: 'TX10002',
    user: 'Alice Johnson',
    userId: 2,
    type: 'withdrawal',
    amount: 100.00,
    currency: 'USD',
    fee: 1.00,
    channel: 'Bank Transfer',
    source: 'Wallet (USD)',
    destination: 'Savings Bank',
    date: '2023-05-01T11:45:00',
    status: 'completed'
  },
  {
    id: 'TX10003',
    user: 'Michael Brown',
    userId: 3,
    type: 'transfer',
    amount: 75.50,
    currency: 'USD',
    fee: 0.75,
    channel: 'Internal Transfer',
    source: 'Wallet (USD)',
    destination: 'Alice Johnson',
    date: '2023-05-01T14:20:00',
    status: 'completed'
  },
  {
    id: 'TX10004',
    user: 'Emma Wilson',
    userId: 4,
    type: 'airtime',
    amount: 10.00,
    currency: 'USD',
    fee: 0.25,
    channel: 'Mobile Operator',
    source: 'Wallet (USD)',
    destination: '+1234567890',
    date: '2023-05-01T16:05:00',
    status: 'completed'
  },
  {
    id: 'TX10005',
    user: 'James Davis',
    userId: 5,
    type: 'merchant',
    amount: 45.75,
    currency: 'USD',
    fee: 0.45,
    channel: 'QR Payment',
    source: 'Wallet (USD)',
    destination: 'SuperMart Store',
    date: '2023-05-01T17:30:00',
    status: 'pending'
  },
  {
    id: 'TX10006',
    user: 'John Smith',
    userId: 1,
    type: 'electricity',
    amount: 35.00,
    currency: 'USD',
    fee: 0.35,
    channel: 'Bill Payment',
    source: 'Wallet (USD)',
    destination: 'City Power Co.',
    date: '2023-05-02T09:15:00',
    status: 'completed'
  },
  {
    id: 'TX10007',
    user: 'Michael Brown',
    userId: 3,
    type: 'withdrawal',
    amount: 200.00,
    currency: 'USD',
    fee: 2.00,
    channel: 'ATM',
    source: 'Wallet (USD)',
    destination: 'Cash',
    date: '2023-05-02T13:40:00',
    status: 'failed'
  }
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.id.toLowerCase().includes(search.toLowerCase()) ||
      tx.user.toLowerCase().includes(search.toLowerCase()) ||
      tx.source.toLowerCase().includes(search.toLowerCase()) ||
      tx.destination.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    
    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && new Date(tx.date) >= new Date(startDate);
    }
    if (endDate) {
      matchesDate = matchesDate && new Date(tx.date) <= new Date(endDate);
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

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
      default:
        return <FiArrowUp size={16} color="#2D64D8" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotalAmount = () => {
    return filteredTransactions.reduce((total, tx) => total + tx.amount, 0).toFixed(2);
  };

  const calculateTotalFees = () => {
    return filteredTransactions.reduce((total, tx) => total + tx.fee, 0).toFixed(2);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Transaction Management</h2>
          
          <button style={{
            backgroundColor: '#2D64D8',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: 500,
          }}>
            <FiDownload size={18} />
            Export
          </button>
        </div>
        
        {/* Transaction Statistics */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Total Transactions</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{filteredTransactions.length}</div>
          </div>
          
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Total Amount</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>USD {calculateTotalAmount()}</div>
          </div>
          
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Total Fees</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>USD {calculateTotalFees()}</div>
          </div>
        </div>
        
        <div style={{
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '10px 16px',
              width: '300px'
            }}>
              <FiSearch size={18} color="#777" />
              <input 
                type="text" 
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ 
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  marginLeft: '10px',
                  width: '100%'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FiFilter size={18} color="#555" style={{ marginRight: '8px' }} />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="transfer">Transfer</option>
                  <option value="airtime">Airtime</option>
                  <option value="merchant">Merchant</option>
                  <option value="electricity">Electricity</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FiCalendar size={18} color="#555" style={{ marginRight: '8px' }} />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    padding: '9px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px' }}>to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    padding: '9px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Transaction ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>User</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Type</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Amount</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Fee</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Source</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Destination</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Date</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '16px', color: '#2D64D8', fontWeight: 500 }}>{tx.id}</td>
                    <td style={{ padding: '16px' }}>{tx.user}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '8px' }}>
                          {getTransactionIcon(tx.type)}
                        </div>
                        <span style={{ textTransform: 'capitalize' }}>{tx.type}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontWeight: 500 }}>
                      {tx.currency} {tx.amount.toFixed(2)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {tx.currency} {tx.fee.toFixed(2)}
                    </td>
                    <td style={{ padding: '16px' }}>{tx.source}</td>
                    <td style={{ padding: '16px' }}>{tx.destination}</td>
                    <td style={{ padding: '16px' }}>{formatDate(tx.date)}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '16px',
                        backgroundColor: `${getStatusColor(tx.status)}20`,
                        color: getStatusColor(tx.status),
                        fontWeight: 500,
                        fontSize: '14px',
                        textTransform: 'capitalize'
                      }}>
                        {tx.status}
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
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <div>
              <span style={{ color: '#555' }}>Showing {filteredTransactions.length} of {transactions.length} transactions</span>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                backgroundColor: 'white',
                borderRadius: '6px',
                color: '#555',
                cursor: 'pointer',
              }}>
                Previous
              </button>
              
              <button style={{
                padding: '8px 12px',
                backgroundColor: '#2D64D8',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}>
                1
              </button>
              
              <button style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                backgroundColor: 'white',
                borderRadius: '6px',
                color: '#555',
                cursor: 'pointer',
              }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 